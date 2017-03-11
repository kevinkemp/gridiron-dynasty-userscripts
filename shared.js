// ==UserScript==
// @name         shared
// @namespace    Gridiron Dynasty
// @version      0.1.3
// @description  shared functionality for calculating player OVR ratings
// @author       Scott Burleigh/Kevin Kemp
// @grant        none
// ==/UserScript==

var guessOvrFormula = function(player) {
    var ATH = player.ath;
    var SPD = player.spd;
    var STR = player.str;
    var HAN = player.h;
    var GI = player.gi;
    var ELU = player.e;
    var TEC = player.t;
    var BLK = player.blk;
    var TKL = player.tkl;
    
    switch (player.pos) {
        case 'QB':
            return 0.1 * ATH + 0.04 * SPD + 0.26 * STR + 0.24 * GI + 0.08 * ELU + 0.28 * TEC;
        case 'RB':
            return 0.1 * ATH + 0.22 * SPD + 0.21 * STR + 0.03 * HAN + 0.11 * GI + 0.25 * ELU + 0.08 * TEC;
        case 'WR':
            return 0.18 * ATH + 0.16 * SPD + 0.04 * STR + 0.16 * HAN + 0.2 * GI + 0.18 * ELU + 0.08 * TEC;
        case 'TE':
            return 0.15 * ATH + 0.06 * SPD + 0.19 * STR + 0.13 * BLK + 0.13 * HAN + 0.2 * GI + 0.06 * ELU + 0.08 * TEC;
        case 'OL':
            return 0.13 * ATH + 0.34 * STR + 0.33 * BLK + 0.12 * GI + 0.08 * TEC;
        case 'DL':
            return 0.12 * ATH + 0.06 * SPD + 0.3 * STR + 0.32 * TKL + 0.12 * GI + 0.08 * TEC;
        case 'LB':
            return 0.15 * ATH + 0.08 * SPD + 0.21 * STR + 0.21 * TKL + 0.05 * HAN + 0.22 * GI + 0.08 * TEC;
        case 'DB':
            return 0.2 * ATH + 0.2 * SPD + 0.06 * STR + 0.1 * TKL + 0.12 * HAN + 0.24 * GI + 0.08 * TEC;
        case 'K':
            return 0.43 * STR + 0.14 * GI + 0.43 * TEC;
        case 'P':
            return 0.38 * STR + 0.24 * GI + 0.38 * TEC;
    }
};

window.KB = window.KB || {};
window.KB.getPlayerOvr = function(player, ovrFormula) {
    if (!ovrFormula) {
        ovrFormula = guessOvrFormula;
    }
    
    return ovrFormula(player);
};


function getOverall(row) {
    var getValue = function(td) {
        return $(td).text();
    };
    var player = {};
    player.pos = getValue(row[2]);
    player.ath = getValue(row[4]);
    player.spd = getValue(row[5]);
    player.d = getValue(row[6]);
    player.we = getValue(row[7]);
    player.st = getValue(row[8]);
    player.str = getValue(row[9]);
    player.blk = getValue(row[10]);
    player.tkl = getValue(row[11]);
    player.h = getValue(row[12]);
    player.gi = getValue(row[13]);
    player.e = getValue(row[14]);
    player.t = getValue(row[15]);
    var ovr =  window.KB.getPlayerOvr(player);
    return Math.round(ovr * 100) / 100;
}

window.KB.writeOvrTd = function(row) {
    var childTds = $(row).children('td');
    var ovr = getOverall(childTds);
    $(row).append('<td>' + ovr + '</td>');
};

window.KB.actOnPlayerRows = function(args) {
    var positions = ['00_pos1', '01_pos2', '02_pos3', '03_pos4', '04_pos5', '05_pos6', '06_pos7', '07_pos8', '08_pos9', '09_pos10'];
    var headerRow = '.thead tr';

    $.each(positions, function(index, pos) {
        var selector = args.rowSelectorBase + pos + ' tr';
        var rows = $(selector, args.root).not('#ctl00_ctl00_Main_Main_TeamPlayerRatingsCtl_rptPosition_ctl00_trAverages').not('.tfoot');
        $.each(args.rows || rows, function(indx, row) {
            args.action(row);
        });
    });
    
    $(headerRow, args.root).append('<th title="OVR"><a href="#" class="sortheader" onclick="ts_resortTable(this,17);return false;">OVR<span class="sortarrow"></span></a></th>');
};
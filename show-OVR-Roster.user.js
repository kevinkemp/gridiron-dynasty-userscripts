// ==UserScript==
// @name         show-OVR-Roster
// @namespace    Gridiron Dynasty
// @version      0.1.3
// @description  shows OVR scores for players on PlayerRatings page
// @author       Scott Burleigh/Kevin Kemp
// @include      https://www.whatifsports.com/gd/Coaching/
// @include      https://www.whatifsports.com/gd/Coaching/Default.aspx*
// @grant        GM_xmlhttpRequest
// @require      https://b7e3f7ecd0022dc06c066e7fe84da2c3fa944846.googledrive.com/host/0BzvzZtanqhjkfkpqNnE5YW1FNGw3YVJ6V1I2MVZZSTlNVnNWOUNFOHpRNVpLTXBpTFoxQjQ/shared.js#2
// @updateURL    https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/show-OVR-Roster.user.js
// @downloadURL  https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/show-OVR-Roster.user.js
// ==/UserScript==

var scrapeTeamPage = function(teamId) {
    var teamPage   = 'http://www.whatifsports.com/gd/TeamProfile/PlayerRatings.aspx?tid=' + teamId;

    GM_xmlhttpRequest ( {
        method:     'GET',
        url:        teamPage,
        onload:     getOvrs,
        onabort:    reportAJAX_Error,
        onerror:    reportAJAX_Error,
        ontimeout:  reportAJAX_Error
    } );
};

var ovrIndex = 17;
var getPlayerOvrs = function(htmlRoot) {
    //write the ovr column first
    window.KB.actOnPlayerRows({
        root: $('table', htmlRoot).first(), 
        rowSelectorBase: '#ctl00_ctl00_Main_Main_TeamPlayerRatingsCtl_rptPosition_ctl', 
        action: window.KB.writeOvrTd
    });
    //then query it
    var playerOvrs = {};
    window.KB.actOnPlayerRows({
        root: $('table', htmlRoot).first(), 
        rowSelectorBase: '#ctl00_ctl00_Main_Main_TeamPlayerRatingsCtl_rptPosition_ctl', 
        action: function(row) {
            var childTds = $(row).children('td');
            var playerName = $('a', childTds.first()).text();
            var overallScore = childTds.eq(ovrIndex).text();
            playerOvrs[playerName] = overallScore;
        }
    });
    return playerOvrs;
}

var populateOvrsOnPage = function(ovrs) {
    var headerRow = $('#playerTable thead tr');
    var rows = $('#playerTable tbody tr');
    
    headerRow.append('<th title="OVR"><a href="#" class="sortheader" onclick="ts_resortTable(this,' + ovrIndex + ');return false;">OVR<span class="sortarrow"></span></a></th>');
    $.each(rows, function(index, row) {
        var playerName = $('a', row).text();
        var playerOverall = ovrs[playerName];
        $(row).append('<td>' + playerOverall + '</td>');
    });
};

var getOvrs = function(respObject) {
    if (respObject.status != 200  &&  respObject.status != 304) {
        reportAJAX_Error (respObject);
        return;
    }
    var startIndex = respObject.responseText.indexOf('<html');
    var html = respObject.responseText.substring(startIndex);
    var doc = $.parseHTML(html);
    var ovrs = getPlayerOvrs(doc);
    populateOvrsOnPage(ovrs);
};

var reportAJAX_Error = function(respObject) {
    console.log('Error ' + respObject.status + '! "' + respObject.statusText);
};

var teamId = $('#pagetid').val();
scrapeTeamPage(teamId);
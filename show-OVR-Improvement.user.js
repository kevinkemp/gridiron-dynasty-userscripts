// ==UserScript==
// @name         show-OVR-Improvement
// @namespace    Gridiron Dynasty
// @version      0.2
// @description  shows OVR improvement scores for players on PlayerRatings page
// @author       Scott Burleigh/Kevin Kemp
// @include      https://www.whatifsports.com/gd/TeamProfile/PlayerRatings.aspx*
// @grant        none
// @require      https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/shared.js
// @updateURL    https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/show-OVR-Improvement.user.js
// @downloadURL  https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/show-OVR-Improvement.user.js
// ==/UserScript==

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
};

window.KB.actOnPlayerRows({
    root: $('table').eq(1), 
    rowSelectorBase: '#ctl00_ctl00_Main_Main_TeamPlayerRatingsCtl_Change_rptPosition_ctl',
    action: window.KB.writeOvrTd
});

var getSum = function(arr) {
    return arr.reduce(function(a, b) { return a + b; });
};

var getAverage = function(arr) {
    if(!arr) return 0;
    var sum = getSum(arr);
    var avg = sum / arr.length;
    return avg;
};

var getStatsForTable = function(tableIndex) {
    var data = [];
    $.each($('.ContentBox:eq(' + tableIndex + ') tbody:not(.thead) tr:not(.tfoot)'), function(i, node) {
        var position = $(node).find('td:eq(2)').text();
        var stat = +$(node).find('td:eq(17)').text();
        data.push({stat: stat, position: position});
    });
    return data;
};

var getOvrTotal = function() {
    return getStatsForTable(0).map(x => x.stat);
};

var getOvrImprovement = function(position) {
    if (position) {
        return getStatsForTable(1).filter(x => x.position);
    }
    return getStatsForTable(1);
};

var getOvrImprovementAverageForTeam = function() {
    var improvements = getOvrImprovement().map(x => x.stat);
    return getAverage(improvements);
};

var getOvrTotalForTeam = function() {
    var ovrTotal = getOvrTotal();
    return getAverage(ovrTotal);
};

var getOvrImprovementsByPosition = function() {
    var result = {};
    var improvements = getOvrImprovement();
    var positions = improvements.map(x => x.position).getUnique();
    $.each(positions, function(index, position) {
        result[position] = improvements.filter(x => x.position === position).map(x => x.stat);
    });
    return result;
};

var improvementsByPosition = getOvrImprovementsByPosition();
$.each($('.ContentBox:eq(1) tbody:not(.thead):not(:last)'), function(index, positionImprovementTable) {
    var position = $('tr:first td:eq(2)', positionImprovementTable).text();
    var improvementAvg = getAverage(improvementsByPosition[position]);
    $('tr:last', positionImprovementTable).append('<td><span style="color: darkred">' + improvementAvg.toFixed(2) + '</span></td>');
});

var ovrTotal = getOvrTotalForTeam();
$('.ContentBox:eq(0) tbody:last tr').append('<td><span style="color: darkred">' + ovrTotal.toFixed(2) + '</span></td>');
var improvementAvg = getOvrImprovementAverageForTeam();
$('.ContentBox:eq(1) tbody:last tr').append('<td><span style="color: darkred">' + improvementAvg.toFixed(2) + '</span></td>');
// ==UserScript==
// @name         show-OVR-Team
// @namespace    Gridiron Dynasty
// @version      0.1.3
// @description  shows OVR scores for players on PlayerRatings page
// @author       Scott Burleigh/Kevin Kemp
// @match        https://www.whatifsports.com/gd/TeamProfile/PlayerRatings.aspx*
// @grant        none
// @require      https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/shared.js
// @updateURL    https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/show-OVR-Team.user.js
// @downloadURL  https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/show-OVR-Team.user.js
// ==/UserScript==

window.KB.actOnPlayerRows({
    root: $('table').first(), 
    rowSelectorBase: '#ctl00_ctl00_Main_Main_TeamPlayerRatingsCtl_rptPosition_ctl', 
    action: window.KB.writeOvrTd
});
// ==UserScript==
// @name         show-OVR-Team
// @namespace    Gridiron Dynasty
// @version      0.1.3
// @description  shows OVR scores for players on PlayerRatings page
// @author       Scott Burleigh/Kevin Kemp
// @match        https://www.whatifsports.com/gd/TeamProfile/PlayerRatings.aspx*
// @grant        none
// @require      https://b7e3f7ecd0022dc06c066e7fe84da2c3fa944846.googledrive.com/host/0BzvzZtanqhjkfkpqNnE5YW1FNGw3YVJ6V1I2MVZZSTlNVnNWOUNFOHpRNVpLTXBpTFoxQjQ/shared.js#
// @updateURL    https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/show-OVR-Team.user.js
// @downloadURL  https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/show-OVR-Team.user.js
// ==/UserScript==

window.KB.actOnPlayerRows({
    root: $('table').first(), 
    rowSelectorBase: '#ctl00_ctl00_Main_Main_TeamPlayerRatingsCtl_rptPosition_ctl', 
    action: window.KB.writeOvrTd
});
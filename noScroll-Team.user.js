// ==UserScript==
// @name         noScroll-Team
// @namespace    Gridiron Dynasty
// @version      0.1.3
// @description  takes away forced scrolling on PlayerRatings page
// @author       Scott Burleigh/Kevin Kemp
// @match        https://www.whatifsports.com/gd/TeamProfile/PlayerRatings.aspx*
// @grant        none
// @updateURL    https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/noScroll-Team.user.js
// @downloadURL  https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/noScroll-Team.user.js
// ==/UserScript==

$('.TabBoxContent').css('height', '100%');
$('.TabBox').css('height', '100%');
$('#sectionFrame').css('height', '100%');
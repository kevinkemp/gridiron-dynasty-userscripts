// ==UserScript==
// @name         toggle-lost-players
// @namespace    Gridiron Dynasty
// @version      0.1.3
// @description  provides button to toggle players that signed elsewhere
// @author       Scott Burleigh/Kevin Kemp
// @match        https://www.whatifsports.com/gd/recruiting/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @updateURL    https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/toggle-lost-players.user.js
// @downloadURL  https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/toggle-lost-players.user.js
// ==/UserScript==

var teamName = $('.teamProfileLink span').text();

var removeNonSignedButton = $('<a class="GDButton" type="button">Toggle Lost Players</a>');
removeNonSignedButton.appendTo('.buttonBar');

removeNonSignedButton.click(function(){
    $('.signedWithOther').closest('tr').toggle();
    return false;
});
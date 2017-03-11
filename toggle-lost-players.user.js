// ==UserScript==
// @name         toggle-lost-players
// @namespace    Gridiron Dynasty
// @version      0.1.3
// @description  provides button to toggle players that signed elsewhere
// @author       Scott Burleigh/Kevin Kemp
// @match        https://www.whatifsports.com/gd/recruiting/*
// @grant        none
// @updateURL    https://3740ac2d548880cc78a30c20630c9ffeef7b5466-www.googledrive.com/host/0BzvzZtanqhjkb2hFdUtkaDZCX2s/toggle-lost-players.user.js
// @downloadURL  https://3740ac2d548880cc78a30c20630c9ffeef7b5466-www.googledrive.com/host/0BzvzZtanqhjkb2hFdUtkaDZCX2s/toggle-lost-players.user.js
// ==/UserScript==

// @require http://code.jquery.com/jquery-latest.js

var teamName = $('.teamProfileLink span').text();

var removeNonSignedButton = $('<a class="GDButton" type="button">Toggle Lost Players</a>');
removeNonSignedButton.appendTo('.buttonBar');

removeNonSignedButton.click(function(){
    $('.signedWithOther').closest('tr').toggle();
    return false;
});
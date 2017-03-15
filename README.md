# What is this?

A set of userscripts that improve the usability of the Gridiron Dynasty website.  Written by myself (Kevin Kemp) and a friend of mine, Scott Burleigh.

# What is a userscript?

Userscripts are open-source licensed plugins for web browsers that change web pages as they are loaded. They give users the power to make websites do what they want them to, rather than what was originally intended.

# Why would I want these?

* You want to view team roster with full area of the browser window rather than the pre-defined container-sized scroll bars
* You want to view GUESS OVR rating on the team roster page
* You want to view how much a player has improved in GUESS OVR on the team roster page
* You want to view GUESS OVR rating on the roster management pages
* You want a toggle to hide players who didn't sign with you on the recruiting page

![alt text](https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/images/ovr.example.PNG "PlayerRatings OVRs")
![alt text](https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/images/improvements.example.PNG "PlayerRatings improvements")
![alt text](https://github.com/kevinkemp/gridiron-dynasty-userscripts/raw/master/images/roster.example.PNG "Roster OVRs")

# What limitations does this approach have?

* Older browsers might not support them
* Mobile browsers might not support them
* If the UI of the site is updated, these will almost certainly break

# How do I use these?

Depends on your browser.  For Chrome, I would recommend Tampermonkey.  For Firefox, I would recommend Greasemonkey.  Speaking of which, these were only tested in Chrome, but theoretically should work in all modern desktop browsers.  I haven't attempted to get any plugins that support userscripts for mobile browsers.

1. Install browser plugin (Tampermonkey, Greasemonkey, etc).
2. Install userscripts that you want to use.  Any script in source that has a ".user.js" suffix is a userscript.  How you install a userscript is dependent upon your plugin, but for Tampermonkey, it's as easy as clicking the file above and then clicking the "Raw" link.  Tampermonkey will realize that it's a userscript and prompt you to install it.
3. Potentially, you will need to restart your browser.
4. Go to the webpage and enjoy.

# What about new features?

Feel free to suggest features through GitHub or on the GD forums through messages.  I have no plans to add more scripts, but if a feature has a high enough value to time required ratio, I will add it.  Additionally, this library is completely open source and free to extend how you see fit, so if you want to fork it and expand upon it yourself, feel free to.

### Donate

Absolutely not required, but here is a way you can say thank you, if you wish: 
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KCR3WKAWASXJ2)
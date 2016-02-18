
var app = app || {};

/* 浏览器检测 */
app.browser = function() {
    var nAgt = navigator.userAgent,
        name = navigator.appName,
        fullVersion = "" + parseFloat(navigator.appVersion),
        majorVersion = parseInt(navigator.appVersion, 10),
        nameOffset,
        verOffset,
        ix;

    // MSIE 11
    if ((navigator.appVersion.indexOf("Windows NT") !== -1) && (navigator.appVersion.indexOf("rv:11") !== -1)) {
        name = "IE";
        fullVersion = "11;";
    }
    // MSIE
    else if ((verOffset=nAgt.indexOf("MSIE")) !== -1) {
        name = "IE";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset=nAgt.indexOf("Chrome")) !== -1) {
        name = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset=nAgt.indexOf("Safari")) !== -1) {
        name = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset=nAgt.indexOf("Version")) !== -1) {
            fullVersion = nAgt.substring(verOffset + 8);
        }
    }
    // Firefox
    else if ((verOffset=nAgt.indexOf("Firefox")) !== -1) {
        name = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset=nAgt.lastIndexOf(" ") + 1) < (verOffset=nAgt.lastIndexOf("/"))) {
        name = nAgt.substring(nameOffset,verOffset);
        fullVersion = nAgt.substring(verOffset + 1);

        if (name.toLowerCase() == name.toUpperCase()) {
            name = navigator.appName;
        }
    }
    // Trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }
    if ((ix = fullVersion.indexOf(" ")) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }
    // Get major version
    majorVersion = parseInt("" + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = "" + parseFloat(navigator.appVersion); 
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    // Return data
    return {
        name:       name, 
        version:    majorVersion, 
        ios:        /(iPad|iPhone|iPod)/g.test(navigator.platform)
    };
}();

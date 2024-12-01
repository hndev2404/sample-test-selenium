var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');

exports.getDriverConfig = function(browser){
    if(browser in browsers){
        return browsers[browser].driverConfig();
    }
    else{
        throw new Error(`
            Browser not Supported.
            Make sure you wrote the name correctly.
        `);
    }
};

browsers = {
    chrome: {
        driverConfig: function(){
            var options = new chrome.Options();
            options.addArguments("--incognito");
            options.addArguments("--start-maximized");
            var driver = new webdriver.Builder().            
            forBrowser("chrome").setChromeOptions(options).
            build();
            
            return driver;
        }
    },
    firefox: {
        driverConfig: function(){
            var options = new firefox.Options();
            options.addArguments("--incognito");
            options.addArguments("--start-maximized");
            var driver = new webdriver.Builder()
                .forBrowser('firefox')
                .build();

            return driver;
        }
    }
};
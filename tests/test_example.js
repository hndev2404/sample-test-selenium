var {By, until} = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var {driver, base_url} = require('../index.js');
var expect = require('chai').expect;
var utils = require("../helpers/util.js");

var tasks = new utils.DriverTasks(); 

test.describe( 'Test Suite' , function(){
    this.timeout('60000');
    test.before(function(){
        return driver.get( base_url );
    });

    test.after(function(){
        driver.takeScreenshot().then(function(data) {
            utils.writeScreenshot(data, 'screenshot');
            driver.close();
        });
    });

    test.afterEach(function(){
        var title = this.currentTest.title.replace(new RegExp(' |/', 'g'), '-');
        var screenshotName = 'screenshot-' + title;
        if (this.currentTest.state === 'failed') {
            driver.takeScreenshot().then(function(data) {
                utils.writeScreenshot(data, screenshotName);
            });
        };
    });

    test.it( 'Search Selenium', async function(){
        driver.wait(function(){
            return until.elementIsVisible(By.name('q'));
        }, 20000);
        search_input = tasks.findElement('q', 'name');
        search_input.sendKeys('selenium');

        const searchButton = await driver.wait(
            until.elementLocated(By.name('btnK')), 
            5000
          );
        await driver.wait(until.elementIsVisible(searchButton), 5000);
        await searchButton.click()

        driver.getTitle().then(function(title){
            expect(title).contains('selenium');
        });
    });
});
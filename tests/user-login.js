var { By } = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var { BROWSER, BASE_URL } = require("../index.js");
var expect = require("chai").expect;
var common = require("../helpers/common.js");
var { getDriverConfig } = require("../helpers/drivers.js");
const { doLogin, doLogout } = require("../action/index.js");

dataUserLogin = common.loadJson('data/user-login.json')

const verifyTitleName = async (expectedTitleName, driver) => {
    common.logAction("verifyTitleName");
    common.logData("Expected", expectedTitleName);
    const pageHeader = await driver.findElement(By.id("page-header"));
    const titleName = await pageHeader
        .findElement(By.css("h1.h2.mb-3.mt-3"))
        .getText();
    common.logData("Actual", titleName)
    expect(titleName).contains(expectedTitleName);
};

test.describe(common.getTestCaseName(dataUserLogin['user_type'], dataUserLogin['action']), async function () {
    this.timeout("60000");
    test.before(async function () {
        csvData = await common.loadCsv("dataUserLogin/user-login.csv");
    });

    test.it(dataUserLogin['case_1']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataUserLogin, 'case_1', 1), driver)

        try {
            await doLogin(dataUserLogin['case_1']['username'], dataUserLogin['case_1']['password'], driver);
            await verifyTitleName(dataUserLogin['case_1']['expected_name'], driver);
            await common.writeScreenshot(common.getImgs(dataUserLogin, 'case_1', 2), driver)

            await doLogout(driver);
            await common.writeScreenshot(common.getImgs(dataUserLogin, 'case_1', 3), driver)

        } catch (err) {
            
            throw err
        }

        await driver.quit();
    });

    test.it(dataUserLogin['case_2']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataUserLogin, 'case_2', 1), driver)

        try {
            await doLogin(dataUserLogin['case_2']['username'], dataUserLogin['case_2']['password'], driver);
            await verifyTitleName(dataUserLogin['case_2']['expected_name'], driver);
            await common.writeScreenshot(common.getImgs(dataUserLogin, 'case_2', 2), driver)

            await doLogout(driver);
            await common.writeScreenshot(common.getImgs(dataUserLogin, 'case_2', 3), driver)

        } catch (err) {
            
            throw err
        }

        await driver.quit();
    });

    test.it(dataUserLogin['case_3']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataUserLogin, 'case_3', 1), driver)

        try {
            await doLogin(dataUserLogin['case_3']['username'], dataUserLogin['case_3']['password'], driver);
            await verifyTitleName(dataUserLogin['case_3']['expected_name'], driver);
            await common.writeScreenshot(common.getImgs(dataUserLogin, 'case_3', 2), driver)

            await doLogout(driver);
            await common.writeScreenshot(common.getImgs(dataUserLogin, 'case_3', 3), driver)

        } catch (err) {
            
            throw err
        }

        await driver.quit();
    });

    test.it(dataUserLogin['case_4']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataUserLogin, 'case_4', 1), driver)

        try {
            await doLogin(dataUserLogin['case_4']['username'], dataUserLogin['case_4']['password'], driver);
            await verifyTitleName(dataUserLogin['case_4']['expected_name'], driver);
            await common.writeScreenshot(common.getImgs(dataUserLogin, 'case_4', 2), driver)

            await doLogout(driver);
            await common.writeScreenshot(common.getImgs(dataUserLogin, 'case_4', 3), driver)

        } catch (err) {
            
            throw err
        }

        await driver.quit();
    });
});

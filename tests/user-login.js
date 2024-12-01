var { By } = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var { BROWSER, BASE_URL } = require("../index.js");
var expect = require("chai").expect;
var common = require("../helpers/common.js");
var { getDriverConfig } = require("../helpers/drivers.js");
const { doLogin, doLogout } = require("../action/index.js");

const testCase = common.getTestCaseName("User", "Login");
const verifyTitleName = async (expectedTitleName, driver) => {
    common.logAction("verifyTitleName");
    common.logData("Title Name", expectedTitleName);
    const pageHeader = await driver.findElement(By.id("page-header"));
    const titleName = await pageHeader
        .findElement(By.css("h1.h2.mb-3.mt-3"))
        .getText();
    expect(titleName).contains(expectedTitleName);
};

test.describe(testCase, async function () {
    this.timeout("60000");
    test.before(async function () {
        csvData = await common.loadCsv("data/user-login.csv");
    });

    test.it("Admin", async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);

        try {
            data = csvData[0];
            await doLogin(data["username"], data["password"], driver);
            await verifyTitleName(data["expected_title_name"], driver);
            await doLogout(driver);
        } catch (err) {
            console.log(err);
        }

        await driver.quit();
    });

    test.it("Manager", async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        try {
            data = csvData[1];
            await doLogin(data["username"], data["password"], driver);
            await verifyTitleName(data["expected_title_name"], driver);
            await doLogout(driver);
        } catch (err) {
            console.log(err);
        }
        await driver.quit();
    });

    test.it("Teacher", async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        try {
            data = csvData[2];
            await doLogin(data["username"], data["password"], driver);
            await verifyTitleName(data["expected_title_name"], driver);
            await doLogout(driver);
        } catch (err) {
            console.log(err);
        }
        await driver.quit();
    });

    test.it("Student", async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        try {
            data = csvData[3];
            await doLogin(data["username"], data["password"], driver);
            await verifyTitleName(data["expected_title_name"], driver);
            await doLogout(driver);
        } catch (err) {
            console.log(err);
        }
        await driver.quit();
    });
});

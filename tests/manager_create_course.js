var { By, until } = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var { BROWSER, BASE_URL } = require("../index.js");
var expect = require("chai").expect;
var common = require("../helpers/common.js");
var { getDriverConfig } = require("../helpers/drivers.js");
const action = require("../action/index.js");

data = common.loadJson('data/manager-create-course.json')

const goToCreateCourse = (url, driver) => {
    common.logAction("goToCreateCourse")
    driver.get(url)
}

const verifyErr = async (action, expectedErr, actualErr, driver) => {
    common.logAction(action);
    common.logData("Expected", expectedErr);
    common.logData("Actual", actualErr)
    expect(actualErr).to.be.equals(expectedErr);
};


test.describe(common.getTestCaseName(data['user_type'], data['action']), async function () {
    this.timeout("60000");
    test.before(async function () {
    });

    test.it(data['case_1']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(data, 'case_1', 1), driver)

        try {
            await action.doLogin(data.account.username, data.account.password, driver);
            await common.writeScreenshot(common.getImgs(data, 'case_1', 2), driver)

            await goToCreateCourse(data['create_course_url'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_1', 3), driver)

            common.logAction("createCourse")
            common.logData('fullname', data['case_1']['full_name'])
            common.logData('shortname', data['case_1']['short_name'])

            await action.findAndSendKeysById('id_fullname', data['case_1']['full_name'], driver)
            await action.findAndSendKeysById('id_shortname',  data['case_1']['short_name'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_1', 4), driver)

            await action.findAndClickById('id_saveanddisplay', driver);
            await common.writeScreenshot(common.getImgs(data, 'case_1', 5), driver)

            let errFullname = await driver.findElement(By.id('id_error_fullname'));
            let errFullnameText = await errFullname.getText();
            verifyErr("verifyFullnameError", data['case_1']['expected_err'], errFullnameText, driver)
        } catch (err) {
            console.log(err);
            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });

    test.it(data['case_2']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(data, 'case_2', 1), driver)

        try {
            await action.doLogin(data.account.username, data.account.password, driver);
            await common.writeScreenshot(common.getImgs(data, 'case_2', 2), driver)

            await goToCreateCourse(data['create_course_url'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_2', 3), driver)

            common.logAction("createCourse")
            common.logData('fullname', data['case_2']['full_name'])
            common.logData('shortname', data['case_2']['short_name'])

            await action.findAndSendKeysById('id_fullname', data['case_2']['full_name'], driver)
            await action.findAndSendKeysById('id_shortname',  data['case_2']['short_name'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_2', 4), driver)

            await action.findAndClickById('id_saveanddisplay', driver);
            await common.writeScreenshot(common.getImgs(data, 'case_2', 5), driver)

            let errShortname = await driver.findElement(By.id('id_error_shortname'));
            let errShortnameText = await errShortname.getText();
            verifyErr("verifyShortnameError", data['case_2']['expected_err'], errShortnameText, driver)
        } catch (err) {
            console.log(err);
            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });

    test.it(data['case_3']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(data, 'case_3', 1), driver)

        try {
            await action.doLogin(data.account.username, data.account.password, driver);
            await common.writeScreenshot(common.getImgs(data, 'case_3', 2), driver)

            await goToCreateCourse(data['create_course_url'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_3', 3), driver)

            common.logAction("createCourse")
            common.logData('fullname', data['case_3']['full_name'])
            common.logData('shortname', data['case_3']['short_name'])

            await action.findAndSendKeysById('id_fullname', data['case_3']['full_name'], driver)
            await action.findAndSendKeysById('id_shortname',  data['case_3']['short_name'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_3', 4), driver)

            await action.findAndClickById('id_saveanddisplay', driver);
            await common.writeScreenshot(common.getImgs(data, 'case_3', 5), driver)

            common.logAction("verifyCourseName");
            common.logData("Expected", data['case_3']['full_name']);
            const pageHeader = await driver.findElement(By.id("page-header"));
            const titleName = await pageHeader
                .findElement(By.css("h1.h2.mb-0"))
                .getText();
            common.logData("Actual", titleName)
            expect(titleName).contains(data['case_3']['full_name']);
        } catch (err) {
            console.log(err);
            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });
})
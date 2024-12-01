var { By, until } = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var { BROWSER, BASE_URL } = require("../index.js");
var expect = require("chai").expect;
var common = require("../helpers/common.js");
var { getDriverConfig } = require("../helpers/drivers.js");
const action = require("../action/index.js");

data = common.loadJson('data/teacher-edit-course.json')

const goToEditCourse = (url, driver) => {
    common.logAction("goToEditCourse " + url)
    driver.get(url)
}

const goToEditCourseSetting = (url, driver) => {
    common.logAction("goToEditCourseSetting " + url)
    driver.get(url)
}

const verifyErr = async (action, expectedErr, actualErr, driver) => {
    common.logAction(action);
    common.logData("Expected", expectedErr);
    common.logData("Actual", actualErr)
    expect(actualErr).contains(expectedErr);
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

            await goToEditCourse(data['edit_course_url'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_1', 3), driver)
            await goToEditCourseSetting(data['edit_course_setting_url'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_1', 4), driver)

            await action.findAndSendKeysById('id_fullname', data['case_1']['fullname'], driver)
            await action.findAndSendKeysById('id_shortname', data['case_1']['shortname'], driver)
            await action.findAndSendKeysById('id_idnumber', data['case_1']['id_idnumber'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_1', 5), driver)

            await action.findAndClickById('id_saveanddisplay', driver);
            await common.writeScreenshot(common.getImgs(data, 'case_1', 6), driver)

            let errFullname = await driver.findElement(By.id('id_error_fullname'));
            let errFullnameText = await errFullname.getText();
            verifyErr("verifyFullnameError", data['case_1']['expected_err'], errFullnameText, driver)
            await common.writeScreenshot(common.getImgs(data, 'case_1', 7), driver)

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

            await goToEditCourse(data['edit_course_url'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_2', 3), driver)

            await goToEditCourseSetting(data['edit_course_setting_url'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_2', 4), driver)

            await action.findAndSendKeysById('id_fullname', data['case_2']['fullname'], driver)
            await action.findAndSendKeysById('id_shortname', data['case_2']['shortname'], driver)
            await action.findAndSendKeysById('id_idnumber', data['case_2']['id_idnumber'], driver)

            await common.writeScreenshot(common.getImgs(data, 'case_2', 5), driver)

            await action.findAndClickById('id_saveanddisplay', driver);

            let errFullname = await driver.findElement(By.id('id_error_shortname'));
            let errFullnameText = await errFullname.getText();
            verifyErr("verifyFullnameError", data['case_1']['expected_err'], errFullnameText, driver)
            await common.writeScreenshot(common.getImgs(data, 'case_2', 6), driver)

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

            await goToEditCourse(data['edit_course_url'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_3', 3), driver)

            await goToEditCourseSetting(data['edit_course_setting_url'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_3', 4), driver)

            await action.findAndSendKeysById('id_fullname', data['case_3']['fullname'], driver)
            await action.findAndSendKeysById('id_shortname', data['case_3']['shortname'], driver)
            await action.findAndSendKeysById('id_idnumber', data['case_3']['id_idnumber'], driver)

            await common.writeScreenshot(common.getImgs(data, 'case_3', 5), driver)

            await action.findAndClickById('id_saveanddisplay', driver);
            await common.writeScreenshot(common.getImgs(data, 'case_3', 6), driver)

        } catch (err) {
            console.log(err);
            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });
})
var { By, until } = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var { BROWSER, BASE_URL } = require("../index.js");
var expect = require("chai").expect;
var common = require("../helpers/common.js");
var { getDriverConfig } = require("../helpers/drivers.js");
const action = require("../action/index.js");

dataManagerCreateCourse = common.loadJson('data/manager-create-course.json')

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


test.describe(common.getTestCaseName(dataManagerCreateCourse['user_type'], dataManagerCreateCourse['action']), async function () {
    this.timeout("60000");
    test.before(async function () {
    });

    test.it(dataManagerCreateCourse['case_1']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_1', 1), driver)

        try {
            await action.doLogin(dataManagerCreateCourse.account.username, dataManagerCreateCourse.account.password, driver);
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_1', 2), driver)

            await goToCreateCourse(dataManagerCreateCourse['create_course_url'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_1', 3), driver)

            common.logAction("createCourse")
            common.logData('fullname', dataManagerCreateCourse['case_1']['full_name'])
            common.logData('shortname', dataManagerCreateCourse['case_1']['short_name'])

            await action.findAndSendKeysById('id_fullname', dataManagerCreateCourse['case_1']['full_name'], driver)
            await action.findAndSendKeysById('id_shortname', dataManagerCreateCourse['case_1']['short_name'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_1', 4), driver)

            await action.findAndClickById('id_saveanddisplay', driver);
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_1', 5), driver)

            let errFullname = await driver.findElement(By.id('id_error_fullname'));
            let errFullnameText = await errFullname.getText();
            verifyErr("verifyFullnameError", dataManagerCreateCourse['case_1']['expected_err'], errFullnameText, driver)
        } catch (err) {

            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });

    test.it(dataManagerCreateCourse['case_2']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_2', 1), driver)

        try {
            await action.doLogin(dataManagerCreateCourse.account.username, dataManagerCreateCourse.account.password, driver);
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_2', 2), driver)

            await goToCreateCourse(dataManagerCreateCourse['create_course_url'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_2', 3), driver)

            common.logAction("createCourse")
            common.logData('fullname', dataManagerCreateCourse['case_2']['full_name'])
            common.logData('shortname', dataManagerCreateCourse['case_2']['short_name'])

            await action.findAndSendKeysById('id_fullname', dataManagerCreateCourse['case_2']['full_name'], driver)
            await action.findAndSendKeysById('id_shortname', dataManagerCreateCourse['case_2']['short_name'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_2', 4), driver)

            await action.findAndClickById('id_saveanddisplay', driver);
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_2', 5), driver)

            let errShortname = await driver.findElement(By.id('id_error_shortname'));
            let errShortnameText = await errShortname.getText();
            verifyErr("verifyShortnameError", dataManagerCreateCourse['case_2']['expected_err'], errShortnameText, driver)
        } catch (err) {

            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });

    test.it(dataManagerCreateCourse['case_3']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_3', 1), driver)

        try {
            await action.doLogin(dataManagerCreateCourse.account.username, dataManagerCreateCourse.account.password, driver);
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_3', 2), driver)

            await goToCreateCourse(dataManagerCreateCourse['create_course_url'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_3', 3), driver)

            common.logAction("createCourse")
            common.logData('fullname', dataManagerCreateCourse['case_3']['full_name'])
            common.logData('shortname', dataManagerCreateCourse['case_3']['short_name'])

            await action.findAndSendKeysById('id_fullname', dataManagerCreateCourse['case_3']['full_name'], driver)
            await action.findAndSendKeysById('id_shortname', dataManagerCreateCourse['case_3']['short_name'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_3', 4), driver)

            await action.findAndClickById('id_saveanddisplay', driver);
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourse, 'case_3', 5), driver)

            common.logAction("verifyCourseName");
            common.logData("Expected", dataManagerCreateCourse['case_3']['full_name']);
            const pageHeader = await driver.findElement(By.id("page-header"));
            const titleName = await pageHeader
                .findElement(By.css("h1.h2.mb-0"))
                .getText();
            common.logData("Actual", titleName)
            expect(titleName).contains(dataManagerCreateCourse['case_3']['full_name']);
        } catch (err) {

            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });
})
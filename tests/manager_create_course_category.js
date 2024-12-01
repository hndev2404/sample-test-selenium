var { By, until } = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var { BROWSER, BASE_URL } = require("../index.js");
var expect = require("chai").expect;
var common = require("../helpers/common.js");
var { getDriverConfig } = require("../helpers/drivers.js");
const action = require("../action/index.js");

dataManagerCreateCourseCategory = common.loadJson('data/manager-create-course-category.json')

const goToCreateCourseManagement = (url, driver) => {
    common.logAction("goToCreateCourseManagement " + url)
    driver.get(url)
}

const goToCreateCourseCategory = (url, driver) => {
    common.logAction("goToCreateCourseCategory " + url)
    driver.get(url)
}

const verifyErr = async (action, expectedErr, actualErr, driver) => {
    common.logAction(action);
    common.logData("Expected", expectedErr);
    common.logData("Actual", actualErr)
    expect(actualErr).to.be.equals(expectedErr);
};


test.describe(common.getTestCaseName(dataManagerCreateCourseCategory['user_type'], dataManagerCreateCourseCategory['action']), async function () {
    this.timeout("60000");
    test.before(async function () {
    });

    test.it(dataManagerCreateCourseCategory['case_1']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_1', 1), driver)

        try {
            await action.doLogin(dataManagerCreateCourseCategory.account.username, dataManagerCreateCourseCategory.account.password, driver);
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_1', 2), driver)

            await goToCreateCourseManagement(dataManagerCreateCourseCategory['create_course_management_url'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_1', 3), driver)

            await goToCreateCourseCategory(dataManagerCreateCourseCategory['create_course_category_url'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_1', 4), driver)

            common.logAction("createCategory")


            await action.findAndSendKeysById('id_name', dataManagerCreateCourseCategory['case_1']['category_name'], driver)
            await action.findAndSendKeysById('id_idnumber', dataManagerCreateCourseCategory['case_1']['category_id'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_1', 5), driver)

            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver);
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_1', 6), driver)

            let errValidate = await driver.findElement(By.id('id_error_name'));
            let errValidateText = await errValidate.getText();
            verifyErr("verifyCategoryName", dataManagerCreateCourseCategory['case_1']['expected_err'], errValidateText, driver)
        } catch (err) {

            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });

    test.it(dataManagerCreateCourseCategory['case_2']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_2', 1), driver)

        try {
            await action.doLogin(dataManagerCreateCourseCategory.account.username, dataManagerCreateCourseCategory.account.password, driver);
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_2', 2), driver)

            await goToCreateCourseManagement(dataManagerCreateCourseCategory['create_course_management_url'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_2', 3), driver)

            await goToCreateCourseCategory(dataManagerCreateCourseCategory['create_course_category_url'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_2', 4), driver)

            common.logAction("createCategory")


            await action.findAndSendKeysById('id_name', dataManagerCreateCourseCategory['case_2']['category_name'], driver)
            await action.findAndSendKeysById('id_idnumber', dataManagerCreateCourseCategory['case_2']['category_id'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_2', 5), driver)

            common.logAction("submit")
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_2', 6), driver)

            await action.findAndClickById('id_submitbutton', driver);
        } catch (err) {

            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });

    test.it(dataManagerCreateCourseCategory['case_3']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_3', 1), driver)

        try {
            await action.doLogin(dataManagerCreateCourseCategory.account.username, dataManagerCreateCourseCategory.account.password, driver);
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_3', 2), driver)

            await goToCreateCourseManagement(dataManagerCreateCourseCategory['create_course_management_url'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_3', 3), driver)

            await goToCreateCourseCategory(dataManagerCreateCourseCategory['create_course_category_url'], driver)
            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_3', 4), driver)

            common.logAction("createCategory")


            await action.findAndSendKeysById('id_name', dataManagerCreateCourseCategory['case_3']['category_name'], driver)
            await action.findAndSendKeysById('id_idnumber', dataManagerCreateCourseCategory['case_3']['category_id'], driver)

            await common.writeScreenshot(common.getImgs(dataManagerCreateCourseCategory, 'case_3', 5), driver)

            // TODO: Handle description
            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver);
        } catch (err) {

            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });
})
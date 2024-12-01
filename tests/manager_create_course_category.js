var { By, until } = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var { BROWSER, BASE_URL } = require("../index.js");
var expect = require("chai").expect;
var common = require("../helpers/common.js");
var { getDriverConfig } = require("../helpers/drivers.js");
const action = require("../action/index.js");

data = common.loadJson('data/manager-create-course-category.json')

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


test.describe(common.getTestCaseName(data['user_type'], data['action']), async function () {
    this.timeout("60000");
    test.before(async function () {
    });

    test.it(data['case_1']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);

        try {
            await action.doLogin(data.account.username, data.account.password, driver);
            
            await goToCreateCourseManagement(data['create_course_management_url'], driver)
            await goToCreateCourseCategory(data['create_course_category_url'], driver)

            common.logAction("createCategory")


            await action.findAndSendKeysById('id_name', data['case_1']['category_name'], driver)
            await action.findAndSendKeysById('id_idnumber', data['case_1']['category_id'], driver)

            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver);

            let errValidate = await driver.findElement(By.id('id_error_name'));
            let errValidateText = await errValidate.getText();
            verifyErr("verifyCategoryName", data['case_1']['expected_err'], errValidateText, driver)
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

        try {
            await action.doLogin(data.account.username, data.account.password, driver);
            
            await goToCreateCourseManagement(data['create_course_management_url'], driver)
            await goToCreateCourseCategory(data['create_course_category_url'], driver)

            common.logAction("createCategory")


            await action.findAndSendKeysById('id_name', data['case_2']['category_name'], driver)
            await action.findAndSendKeysById('id_idnumber', data['case_2']['category_id'], driver)

            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver);
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

        try {
            await action.doLogin(data.account.username, data.account.password, driver);
            
            await goToCreateCourseManagement(data['create_course_management_url'], driver)
            await goToCreateCourseCategory(data['create_course_category_url'], driver)

            common.logAction("createCategory")


            await action.findAndSendKeysById('id_name', data['case_3']['category_name'], driver)
            await action.findAndSendKeysById('id_idnumber', data['case_3']['category_id'], driver)
            // TODO: Handle description
            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver);
        } catch (err) {
            console.log(err);
            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });
})
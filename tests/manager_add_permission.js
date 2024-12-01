var { By, until } = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var { BROWSER, BASE_URL } = require("../index.js");
var expect = require("chai").expect;
var common = require("../helpers/common.js");
var { getDriverConfig } = require("../helpers/drivers.js");
const action = require("../action/index.js");

data = common.loadJson('data/manager-add-permission.json')

const goToAddPermission = (url, driver) => {
    common.logAction("goToAddPermission " + url)
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

            await goToAddPermission(data['add_permission'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_1', 3), driver)

            common.logAction("Continue")
            await action.findAndClickById('id_submitbutton', driver);
            await common.writeScreenshot(common.getImgs(data, 'case_1', 4), driver)

            await action.findAndSendKeysById('shortname', data['case_1']['shortname'], driver)
            await action.findAndSendKeysById('name', data['case_1']['fullname'], driver)
            await action.findAndSendKeysById('description', data['case_1']['description'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_1', 5), driver)

            common.logAction("Submit")
            await action.findAndClickByCss('input[type="submit"].btn.btn-primary', driver);
            await common.writeScreenshot(common.getImgs(data, 'case_1', 6), driver)


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

            await goToAddPermission(data['add_permission'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_2', 3), driver)

            common.logAction("Continue")
            await action.findAndClickById('id_submitbutton', driver);
            await common.writeScreenshot(common.getImgs(data, 'case_2', 4), driver)

            await action.findAndSendKeysById('shortname', data['case_2']['shortname'], driver)
            await action.findAndSendKeysById('name', data['case_2']['fullname'], driver)
            await action.findAndSendKeysById('description', data['case_2']['description'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_2', 5), driver)

            common.logAction("checkAllCheckboxes")
            const checkboxes = await driver.findElements(By.css('input.form-check-input[type="checkbox"]'));
            for (const checkbox of checkboxes) {
                const isChecked = await checkbox.isSelected();
                if (!isChecked) {
                    await checkbox.click();
                }
            }

            common.logAction("Submit")
            await action.findAndClickByCss('input[type="submit"].btn.btn-primary', driver);
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

            await goToAddPermission(data['add_permission'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_3', 3), driver)

            common.logAction("Continue")
            await action.findAndClickById('id_submitbutton', driver);
            await common.writeScreenshot(common.getImgs(data, 'case_3', 4), driver)

            await action.findAndSendKeysById('shortname', data['case_3']['shortname'], driver)
            await action.findAndSendKeysById('name', data['case_3']['fullname'], driver)
            await action.findAndSendKeysById('description', data['case_3']['description'], driver)
            await common.writeScreenshot(common.getImgs(data, 'case_3', 5), driver)

            common.logAction("checkAllCheckboxes")
            const checkboxes = await driver.findElements(By.css('input.form-check-input[type="checkbox"]'));
            for (const checkbox of checkboxes) {
                const isChecked = await checkbox.isSelected();
                if (!isChecked) {
                    await checkbox.click();
                }
            }

            common.logAction("Submit")
            await action.findAndClickByCss('input[type="submit"].btn.btn-primary', driver);
            await common.writeScreenshot(common.getImgs(data, 'case_3', 6), driver)

            const errorElement = await driver.findElement(By.css('span.error'));
            const errorMessage = await errorElement.getText();
            verifyErr("verifyError", data['case_3']['expected_err'], errorMessage, driver)
        } catch (err) {
            console.log(err);
            throw err
        }
        await common.sleep(5)
        // await driver.quit();
    });
})
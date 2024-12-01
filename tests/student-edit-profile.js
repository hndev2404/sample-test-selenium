var { By, until } = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var { BROWSER, BASE_URL } = require("../index.js");
var expect = require("chai").expect;
var common = require("../helpers/common.js");
var { getDriverConfig } = require("../helpers/drivers.js");
const action = require("../action/index.js");

dataStudentEditProfile = common.loadJson('data/student-edit-profile.json')

const goToProfile = async (driver) => {
    common.logAction("goToProfile")
    await action.findAndClickById('user-menu-toggle', driver)
    await action.findAndClickByLinkText('Profile', driver)

};

const goToEditProfile = async (driver) => {
    common.logAction("goToEditProfile")
    await action.findAndClickByLinkText('Edit profile', driver)
};

const verifyFullname = async (expectedFullname, driver) => {
    common.logAction("verifyFullname");
    common.logData("Expected", expectedFullname);
    const pageHeader = await driver.findElement(By.id("page-header"));
    const fullname = await pageHeader
        .findElement(By.css("h1.h2.mb-0"))
        .getText();
    common.logData("Actual", fullname)
    expect(fullname).contains(expectedFullname);
};


const verifyShowConfirmEmail = async (expectedConfirmEmail, driver) => {
    common.logAction("verifyShowConfirmEmail");
    common.logData("Expected", expectedConfirmEmail);
    const notice = await driver.findElement(By.id("notice")).getText();

    common.logData("Actual", notice)
    expect(notice).contains(expectedConfirmEmail);
};

const verifyValueOfEmailAddress = async (expectedValue, driver) => {
    common.logAction("verifyValueOfEmailAddress");
    common.logData("Expected", expectedValue);
    let emailPendingDiv = await driver.wait(
        until.elementLocated(By.css('div.form-control-static[data-name="emailpending"]')),
        5000 // Timeout after 5 seconds
    );

    // Get the text inside the div
    let text = await emailPendingDiv.getText();
    common.logData("Actual", text)
    expect(text).contains(expectedValue);
};

const verifyCity = async (expectedValue, driver) => {
    common.logAction("verifyDescription");
    common.logData("Expected", expectedValue);

    let allDlElements = await action.findElementsByCss('li.contentnode', driver);

    // Loop through each <dl> to find the "City/town" label and check the corresponding <dd> text
    for (let dl of allDlElements) {
        let dtElement = await dl.findElement(By.css('dt'));
        let dtText = await dtElement.getText();

        if (dtText === "City/town") {
            let ddElement = await dl.findElement(By.css('dd'));
            let cityText = await ddElement.getText();

            common.logData("Actual", cityText)
            expect(cityText, "City is correct!").contains(expectedValue);
            break; // Stop once we find the correct city
        }
    }
};

const verifyDescription = async (expectedValue, driver) => {
    common.logAction("verifyDescription");
    common.logData("Expected", expectedValue);
    let descDiv = await driver.wait(
        until.elementLocated(By.css('div[class="description"]')),
        5000
    );

    let text = await descDiv.getText();
    common.logData("Actual", text)
    expect(text).contains(expectedValue);
};
test.describe(common.getTestCaseName(
    dataStudentEditProfile["user_type"],
    dataStudentEditProfile["action"]
), async function () {
    this.timeout("60000");
    test.before(async function () {
    });

    test.it(dataStudentEditProfile['case_1']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_1', 1), driver)

        try {
            await action.doLogin(dataStudentEditProfile.account.username, dataStudentEditProfile.account.password, driver);
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_1', 2), driver)

            await goToProfile(driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_1', 3), driver)

            await goToEditProfile(driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_1', 4), driver)

            common.logAction("updateProfile")
            common.logData("first_name", dataStudentEditProfile['case_1']['first_name'])
            common.logData("last_name", dataStudentEditProfile['case_1']['last_name'])

            await action.findAndSendKeysById('id_firstname', dataStudentEditProfile['case_1']['first_name'], driver)
            await action.findAndSendKeysById('id_lastname', dataStudentEditProfile['case_1']['last_name'], driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_1', 5), driver)

            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver)

            await verifyFullname(dataStudentEditProfile['case_1']['expected_fullname'], driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_1', 6), driver)

        } catch (err) {

            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });

    test.it(dataStudentEditProfile['case_2']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_2', 1), driver)

        try {
            await action.doLogin(dataStudentEditProfile['account']['username'], dataStudentEditProfile['account']['password'], driver);
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_2', 2), driver)

            await goToProfile(driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_2', 3), driver)

            await goToEditProfile(driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_2', 4), driver)

            common.logAction("updateProfile")
            common.logData("email", dataStudentEditProfile['case_2']['email'])

            await action.findAndSendKeysById('id_email', dataStudentEditProfile['case_2']['email'], driver)

            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_2', 5), driver)

            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver)

            common.logAction("verifyAndContinue")
            await verifyShowConfirmEmail(dataStudentEditProfile['case_2']['expected_confirm_email'], driver)
            await action.findAndClickByCss('button[type="submit"].btn.btn-primary', driver);
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_2', 6), driver)

            common.sleep(3)
            await goToEditProfile(driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_2', 7), driver)

            common.logAction("cancelEmailChange")
            await verifyValueOfEmailAddress(dataStudentEditProfile['case_2']['expected_value_email'], driver)

            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_2', 8), driver)

            await action.findAndClickByLinkText('Cancel email change', driver)

            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_2', 9), driver)

            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_2', 10), driver)

        } catch (err) {

            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });

    test.it(dataStudentEditProfile['case_3']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_3', 1), driver)

        try {
            await action.doLogin(dataStudentEditProfile['account']['username'], dataStudentEditProfile['account']['password'], driver);
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_3', 2), driver)

            await goToProfile(driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_3', 3), driver)

            await goToEditProfile(driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_3', 4), driver)


            common.logAction("updateProfile")
            common.logData("city", dataStudentEditProfile['case_3']['city'])

            await action.findAndSendKeysById('id_city', dataStudentEditProfile['case_3']['city'], driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_3', 5), driver)

            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_3', 6), driver)

            await verifyCity(dataStudentEditProfile['case_3']['city'], driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_3', 7), driver)

        } catch (err) {

            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });

    test.it(dataStudentEditProfile['case_4']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);
        await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_4', 1), driver)

        try {
            await action.doLogin(dataStudentEditProfile['account']['username'], dataStudentEditProfile['account']['password'], driver);
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_4', 2), driver)

            await goToProfile(driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_4', 3), driver)

            await goToEditProfile(driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_4', 4), driver)

            common.logAction("updateProfile")
            common.logData("description", dataStudentEditProfile['case_4']['description'])

            await action.findAndSendKeysById('id_description_editor', dataStudentEditProfile['case_4']['description'], driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_4', 5), driver)

            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver)

            await verifyDescription(dataStudentEditProfile['case_4']['description'], driver)
            await common.writeScreenshot(common.getImgs(dataStudentEditProfile, 'case_4', 6), driver)

        } catch (err) {

            throw err
        }
        await common.sleep(5)
        await driver.quit();
    });

});

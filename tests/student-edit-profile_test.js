var { By, until } = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var { BROWSER, BASE_URL } = require("../index.js");
var expect = require("chai").expect;
var common = require("../helpers/common.js");
var { getDriverConfig } = require("../helpers/drivers.js");
const action = require("../action/index.js");

const TEST_CASE = common.getTestCaseName("Student", "Edit Profile");
data = common.loadJson('data/student-edit-profile.json')

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
test.describe(TEST_CASE, async function () {
    this.timeout("60000");
    test.before(async function () {
    });

    test.it(data['case_1']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);

        try {
            await action.doLogin(data.account.username, data.account.password, driver);
            await goToProfile(driver)
            await goToEditProfile(driver)

            common.logAction("updateProfile")
            common.logData("first_name", data['case_1']['first_name'])
            common.logData("last_name", data['case_1']['last_name'])

            await action.findAndSendKeysById('id_firstname', data['case_1']['first_name'], driver)
            await action.findAndSendKeysById('id_lastname', data['case_1']['last_name'], driver)

            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver)

            await verifyFullname(data['case_1']['expected_fullname'], driver)
        } catch (err) {
            console.log(err);
            throw err
        }
        common.sleep(5)
        await driver.quit();
    });

    test.it(data['case_2']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);

        try {
            await action.doLogin(data['account']['username'], data['account']['password'], driver);
            
            await goToProfile(driver)
            await goToEditProfile(driver)

            common.logAction("updateProfile")
            common.logData("email",  data['case_2']['email'])

            await action.findAndSendKeysById('id_email', data['case_2']['email'], driver)

            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver)

            common.logAction("verifyAndContinue")
            await verifyShowConfirmEmail(data['case_2']['expected_confirm_email'], driver)
            await action.findAndClickByCss('button[type="submit"].btn.btn-primary', driver);
            
            common.sleep(3)
            await goToEditProfile(driver)
 
            common.logAction("cancelEmailChange")
            await verifyValueOfEmailAddress(data['case_2']['expected_value_email'], driver)
            await action.findAndClickByLinkText('Cancel email change', driver)
            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver)

        } catch (err) {
            console.log(err);
            throw err
        }
        common.sleep(5)
        await driver.quit();
    });

    test.it(data['case_3']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);

        try {
            await action.doLogin(data['account']['username'], data['account']['password'], driver);
            
            await goToProfile(driver)
            await goToEditProfile(driver)

            common.logAction("updateProfile")
            common.logData("city",  data['case_3']['city'])

            await action.findAndSendKeysById('id_city', data['case_3']['city'], driver)

            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver)

            await verifyCity(data['case_3']['city'], driver)
        } catch (err) {
            console.log(err);
            throw err
        }
        common.sleep(5)
        await driver.quit();
    });

    test.it(data['case_4']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);

        try {
            await action.doLogin(data['account']['username'], data['account']['password'], driver);
            
            await goToProfile(driver)
            await goToEditProfile(driver)

            common.logAction("updateProfile")
            common.logData("description",  data['case_4']['description'])

            await action.findAndSendKeysById('id_description_editor', data['case_4']['description'], driver)

            common.logAction("submit")
            await action.findAndClickById('id_submitbutton', driver)

            await verifyDescription(data['case_4']['description'], driver)
        } catch (err) {
            console.log(err);
            throw err
        }
        common.sleep(5)
        await driver.quit();
    });

});

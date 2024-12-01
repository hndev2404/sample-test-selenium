var { By, until } = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var { BROWSER, BASE_URL } = require("../index.js");
var expect = require("chai").expect;
var common = require("../helpers/common.js");
var { getDriverConfig } = require("../helpers/drivers.js");
const action = require("../action/index.js");

data = common.loadJson('data/manager-edit-permission.json')

const goToDefineRole = (url, driver) => {
    common.logAction("goToDefineRole")
    driver.get(url)
}

const goToEditRole = (url, driver) => {
    common.logAction("goToEditRole: " + url)
    driver.get(url)
}

test.describe(common.getTestCaseName(data['user_type'], data['action']), async function () {
    this.timeout("60000");
    test.before(async function () {
    });

    test.it(data['case_1']['name'], async function () {
        const driver = getDriverConfig(BROWSER);
        await driver.get(BASE_URL);

        try {
            await action.doLogin(data.account.username, data.account.password, driver);
            
            await goToDefineRole(data['define_role_url'], driver)
            await goToEditRole(data['edit_define_role_url'] + data['case_1']['role_id'], driver)

            await action.findAndSendKeysById('shortname', data['case_1']['short_name'], driver)
            await action.findAndSendKeysById('name', data['case_1']['full_name'], driver)

            await action.findAndClickByCss('input[type="submit"].btn.btn-primary', driver);

            let nonMembers = await driver.findElements(By.xpath("//table[@id='roles']//tr//a[@href and contains(text(), 'Non-Member') and contains(@href, 'roleid=5')]"));

            expect(nonMembers.length).to.be.greaterThan(0, "No 'Non-Members' found with roleid=5");
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
            await action.doLogin(data.account.username, data.account.password, driver);
            
            await goToDefineRole(data['define_role_url'], driver)
            await goToEditRole(data['edit_define_role_url'] + data['case_2']['role_id'], driver)

            await action.findAndSendKeysById('description', data['case_2']['description'], driver)

            await action.findAndClickByCss('input[type="submit"].btn.btn-primary', driver);

            const descriptions = await driver.findElements(By.xpath("//tr[td[contains(text(), 'TEST - USER IS NOT MEMBER')]]"));

            expect(descriptions.length).to.be.greaterThan(0, "No 'TEST - USER IS NOT MEMBER' found with roleid=5");
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
            await action.doLogin(data.account.username, data.account.password, driver);
            
            await goToDefineRole(data['define_role_url'], driver)
            await goToEditRole(data['edit_define_role_url'] + data['case_3']['role_id'], driver)


            common.logAction("checkAllCheckboxes")
            const checkboxes = await driver.findElements(By.css('input.form-check-input[type="checkbox"]'));
            for (const checkbox of checkboxes) {
                const isChecked = await checkbox.isSelected();
                if (!isChecked) {
                    await checkbox.click();
                }
            }

            common.logAction("submit")
            await action.findAndClickByCss('input[type="submit"].btn.btn-primary', driver);

            await goToEditRole(data['edit_define_role_url'] + data['case_3']['role_id'], driver)
            common.logAction("verifyCheckboxes")
            const newCheckboxes = await driver.findElements(By.css('input.form-check-input[type="checkbox"]'));
            for (const checkbox of newCheckboxes) {
                const checkboxId = await checkbox.getAttribute('id');
                const label = await driver.findElement(By.css(`label[for="${checkboxId}"]`));
                const labelText = await label.getText();
                const isCheckedAfter = await checkbox.isSelected();
                expect(isCheckedAfter).to.equal(true);
                common.logCheckBox(labelText, isCheckedAfter)
            }
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
            await action.doLogin(data.account.username, data.account.password, driver);
            
            await goToDefineRole(data['define_role_url'], driver)
            await goToEditRole(data['edit_define_role_url'] + data['case_4']['role_id'], driver)

            common.logAction("goToAllowRoleAssignments")
            const link = await driver.findElement(By.css('a[title="Allow role assignments"]'));
            await link.click();


            common.logAction("checkAllCheckboxes")
            const checkboxes = await driver.findElements(By.css('table tbody tr:first-child input[type="checkbox"]'));
            for (const checkbox of checkboxes) {
                const isChecked = await checkbox.isSelected();
                if (!isChecked) {
                    await checkbox.click();
                }
            }

            common.logAction("submit")
            await action.findAndClickByCss('input[type="submit"].btn.btn-primary', driver);

            common.logAction("verifyCheckboxes")
            const newCheckboxes = await driver.findElements(By.css('table tbody tr:first-child input[type="checkbox"]'));
            for (const checkbox of newCheckboxes) {
                const checkboxId = await checkbox.getAttribute('id');
                const label = await driver.findElement(By.css(`label[for="${checkboxId}"]`));
                const labelText = await label.getText();
                const isCheckedAfter = await checkbox.isSelected();
                expect(isCheckedAfter).to.equal(true);
                common.logCheckBox(labelText, isCheckedAfter)
            }
        } catch (err) {
            console.log(err);
            throw err
        }
        common.sleep(5)
        await driver.quit();
    });
});

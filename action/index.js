var common = require("../helpers/common.js");
var { By, until } = require('selenium-webdriver');
var common = require("../helpers/common.js");

const TIMEOUT = 60000

const findAndSendKeysById = async (id, value, driver) => {
    driver.wait(function(){
        return until.elementIsVisible(By.id(id));
    }, TIMEOUT);

    const input = await driver.findElement(By.id(id))

    await input.clear()
    await input.sendKeys(value);
}

const findAndClickById = async (id, driver) => {
    driver.wait(function(){
        return until.elementIsVisible(By.linkText(id));
    }, TIMEOUT);
    const ele = await driver.findElement(By.id(id))
    await ele.click()
}

const findAndClickByLinkText = async (linkText, driver) => {
    driver.wait(function(){
        return until.elementIsVisible(By.linkText(linkText));
    }, TIMEOUT);
    const ele = await driver.findElement(By.linkText(linkText))
    await ele.click()
}

exports.doLogin = async (username, password, driver) => {
    common.logAction("doLogin")
    common.logData("username", username)
    common.logData("password", password)

    await findAndClickByLinkText('Log in', driver)

    await findAndSendKeysById('username', username, driver)
    await findAndSendKeysById('password', password, driver)

    await findAndClickById('loginbtn', driver)
};

exports.doLogout = async (driver) => {
    common.logAction("doLogout")

    await findAndClickById('user-menu-toggle', driver)
    await findAndClickByLinkText('Log out', driver)
};
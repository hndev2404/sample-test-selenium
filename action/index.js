var common = require("../helpers/common.js");
var { By, until } = require('selenium-webdriver');
var common = require("../helpers/common.js");

exports.doLogin = async (username, password, driver) => {
    common.logAction("doLogin")
    common.logData("username", username)
    common.logData("password", password)

    driver.wait(function(){
        return until.elementIsVisible(By.linkText('Log in'));
    }, 60000);
    const loginLink = await driver.findElement(By.linkText('Log in'))
    await loginLink.click()

    driver.wait(function(){
        return until.elementIsVisible(By.id('username'));
    }, 60000);

    await driver.findElement(By.id('username')).clear()
    await driver.findElement(By.id('username')).sendKeys(username);

    driver.wait(function(){
        return until.elementIsVisible(By.id('password'));
    }, 60000);

    const passwordInput = await driver.findElement(By.id('password'))
    passwordInput.clear()
    passwordInput.sendKeys(password);

    driver.wait(function(){
        return until.elementIsVisible(By.id('loginbtn'));
    }, 60000);
    const loginBtn = await driver.findElement(By.id('loginbtn'))
    await loginBtn.click()
};

exports.doLogout = async (driver) => {
    common.logAction("doLogout")

    const avatarIcon = await driver.findElement(By.id('user-menu-toggle'))
    await avatarIcon.click()

    const logoutLink = await driver.findElement(By.linkText('Log out'));
    await logoutLink.click();
};
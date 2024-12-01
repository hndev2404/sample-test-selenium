const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

exports.getTestCaseName = function getTestCaseName(userType, action) {
    return `Testcase: ${userType}-${action}`;
}

exports.getImgs = function getImgs(data, case_idx, step) {
    return `imgs/${data['user_type']}-${data['action']}-${case_idx}-step-${step}.png`;
}

exports.loadCsv = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const fullPath = path.resolve(filePath);

        fs.createReadStream(fullPath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => {
                console.log(err)
                reject(err)
            });
    });
}

exports.loadJson = (filePath) => {
    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);
    return data
}

exports.logAction = (mes) => {
    console.log("       🚀 Action:", mes)
}

exports.logData = (label, data) => {
    console.log("       ⚡️  ", label, ":\t\t", data)
}

exports.logCheckBox = (label, isChecked) => {
    console.log(`           ⚡️  Checkbox label: ${label.padEnd(20)} ,Is checked: ${isChecked}`);
}

exports.sleep = (seconds) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

exports.writeScreenshot = async (name, driver) => {
    driver.takeScreenshot().then(function(data) {
        name = name || 'ss.png';
        var screenshotPath = __dirname.replace("helpers","");
        var screenshotRoute = screenshotPath + name + ".png";
        fs.writeFileSync(screenshotRoute, data, 'base64');
    });
};
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

exports.getTestCaseName = function getTestCaseName(userType, action) {
    return `Testcase: ${userType}-${action}`;
}

exports.loadCsv = loadCsv = (filePath) => {
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

exports.logAction = (mes) => {
    console.log("       🚀 Action: ", mes)
}

exports.logData = (label, data) => {
    console.log("       ⚡️  ", label, ": ", data)
}

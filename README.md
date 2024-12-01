# Selenium JS Example Project


```
Learn the Selenium tool (https://www.selenium.dev) and apply it to project #2.

Three level of automation:
- Level 1: automation using data-driven testing approach
- Level 2: Automation using a data-driven testing approach, where test inputs such as site
URLs and elements like text fields and buttons are provided to the script.

Each student work individually for his/her works of project #2
```

This is a base project using the [`selenium-webdriver`](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html) for JavaScript and Mocha to handle the tests and reporting.

## Run Locally

0. [IMPORTANT]() DOWNLOAD CHROME WEB BROWSER
  ```
  => https://googlechromelabs.github.io/chrome-for-testing/#stable
  ```
1. Install [Mocha](http://mochajs.org) globally

  ```
  $ npm install -g mocha
  ```

4. Install [cross-env](https://www.npmjs.com/package/cross-env) to make sure Environment Variables are set correctly in each OS:

  ```
  $ npm install -g cross-env
  ```

3. Run all project dependencies:

  ```
  $ npm install
  ```

4. Run the following command to run the test:

  ```
  $ npm run test
  ```

5. Download Selenium we
## Configuration Overrides

All variables can be modified by changing the `.env` file with the appropiate files. The available environment variables to override are:

- MOCHA_BROWSER: specifies the webdriver to use. Options are:
    - phantomjs
    - chrome
    - headlessChrome
    - firefox
    - opera
    - safari
    - ie
    - edge

- TEST_BASE_URL: specifies which url the tests should run on. 

### CI Override

To change the variable during the CI process a special `.env` file can be found on the `helpers` folder, this has the same variables but the values are changed to keys so it can easily be replaced by any value.
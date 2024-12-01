# Software Testing Project #3

## Requirements
Learn the Selenium tool (https://www.selenium.dev) and apply it to project #2.

Three level of automation:
- Level 1: automation using data-driven testing approach
- Level 2: Automation using a data-driven testing approach, where test inputs such as site
URLs and elements like text fields and buttons are provided to the script.

Each student work individually for his/her works of project #2

## Library
- [`nodejs`](https://nodejs.org/en) Stable version
- [`selenium-webdriver`](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html) for JavaScript and Mocha to handle the tests and reporting.
- [`mocha`](https://www.npmjs.com/package/mocha) for run unit testing by JS

## Run Locally
> Notes: Followed steps-by-step

0. [IMPORTANT]() DOWNLOAD CHROME WEB BROWSER
  ```
  => https://googlechromelabs.github.io/chrome-for-testing/#stable
  Make sure with current OS
  ```
1. Install [Mocha](http://mochajs.org) globally

  ```
  npm install -g mocha
  ```

4. Install [cross-env](https://www.npmjs.com/package/cross-env) to make sure Environment Variables are set correctly in each OS:

  ```
  npm install -g cross-env
  ```

3. Run all project dependencies:

  ```
  npm install
  ```

4. Run the following command to run the test:

  ```
  # for all test case
  npm run test

  # for specific file
      > mocha test "filename"
  sample: 
      > mocha test tests/user-login.js
  ```


## Configuration Overrides

All variables can be modified by changing the `.env` file with the appropiate files. The available environment variables to override are:

- MOCHA_BROWSER: specifies the webdriver to use. Options are:
    - chrome
    - firefox

  Default: chrome


- TEST_BASE_URL: specifies which url the tests should run on. 

  Default: `https://sandbox.moodledemo.net/`

## Source code structure
```
├── action                                      # Wrap-up common function for web driver
│   └── index.js
├── config.json
├── data                                        # Input data (for level 2 of requirements)
│   ├── manager-add-permission.json
│   ├── manager-create-course-category.json
│   ├── manager-create-course.json
│   ├── manager-edit-permission.json
│   ├── student-edit-profile.json
│   ├── teacher-edit-course.json
│   └── user-login.json
├── drivers                                     # Web driver download from "https://googlechromelabs.github.io/chrome-for-testing/#stable"
├── helpers:                                    # Define common function
├── imgs: Result images
├── index.js
├── Makefile
├── package.json
├── package-lock.json
├── README.md
├── tests                                       # Define automated testing
│   ├── manager_add_permission.js
│   ├── manager_create_course_category.js
│   ├── manager_create_course.js
│   ├── manager_edit_permission.js
│   ├── student-edit-profile.js
│   ├── teacher_edit_course.js
│   └── user-login.js
└── xunit.xml                                   # Output of results
```
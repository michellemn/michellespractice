#About Project
- Name: PracticeForMichelle
-This project is for testing service forms from storefront and widget

#Tools and model:
- Webdriverio 7.14.1
- Mocha 7.14.1
- Node.js v16.11.1 (Upgrade node version to the latest one due to versions lower than v12 don't support running yarn)
- Chromedriver ^94.0.0
- IDE: Visual Studio Code
- JavaScript
- Page Object Model
- Find web elements by XPath

#Structure of this automation project:
Preparation :
- Install Node.js
- Create a new project folder locally
- Iniitialize project as Node.js project, run script in terminal under project folder: npm init
- package.json is generated
- Download @wdio/cli by running script: npm i @wdio/cli
- node_modules and package-lock,json are generated to hold dependencies 
- Run script nix wdio config to setup basic configs and select Mocha framework

Build Automation tests:
- Create abstract Class page.js (Page):
  It can load browser
  It also contains some generic methods for bases 
  Other pages can inherit this Class and use its methods directly
- Two pages:
   1. Storefront page: It extends Page Class. All elements in storefront page are loaded in this page. It also contains methods to act elements
   2. Sidebar page: It extends Page Class. All elements in sidebar page are loaded in this page. It also contains methods to act elements
- Tests:
   According to different features, 4 test suites are created:
   1. livechat.spec.js: It contains 3 end-to-end tests
   2. appointment.spec.js: It contains 4 end-to-end tests including 3 negative tests
   3. emailme.spec.js: It contains 5 end-to-end tests including 2 negative tests
   4. sidebar.spec.js: It contains 2 ene-to-end tests including 1 negative test

#Run tests
   1. Run test suite:
   - In package.json, change to 'test': 'wdio wdio.conf.js'
   - In terminal run script, e.g. npm test -- --spec=test/specs/livechat.spec.js
   
   2. Run single test: 
   - In terminal run script, e.g. npm test --'test/specs/emailme.spec.js -t "Customer should see name of service form is LIVE CHAT from storefront page"

#Current problems: (Remind myself to check with Marco)
   1. Command for running single test doesn't work
   2. After opening appointment form, email me form from storefront and widget page, let browser switch to iframe, but elements under these iframes cannot be found. It blocks my tests running   
   3. Need to double check if test 'Customer should see icon of unavailable Live Chat is red'
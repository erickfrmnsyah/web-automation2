const { Builder } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../page/loginPage");
const ScreenshotPage = require("../page/screenshotPage");
const visualRegression = require("../../utilities/visualRegression");

require("dotenv").config();

describe("Login",function(){

    let driver;
    let loginPage;
    let screenshotPage;

    beforeEach(async function(){
        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();

        loginPage = new LoginPage(driver);
        screenshotPage = new ScreenshotPage(driver);

        await loginPage.open();
    });

    afterEach(async function(){
        await screenshotPage.takeFullScreenshot(this.currentTest.title);

        const mismatch = await visualRegression.compareImages(this.currentTest.title);
        assert.strictEqual(mismatch, 0, `Visual regression failed. ${mismatch} pixels berbeda.`);

        await driver.quit();
    });

    it("Positive Login Success",async function(){
        await loginPage.login(process.env.STANDARD_USER, process.env.VALID_PASSWORD);
        let url = await loginPage.getCurrentUrl();
        assert.strictEqual(url,"https://www.saucedemo.com/inventory.html");
    });

    it("Negative Login Using Invalid Password",async function(){
        await loginPage.login(process.env.STANDARD_USER, process.env.INVALID_PASSWORD);
        let error = await loginPage.getErrorMessage();
        assert.ok(error.includes('match'))
    });

    it("Negative Login Using Locked User",async function(){
        await loginPage.login(process.env.LOCKED_USER, process.env.VALID_PASSWORD);
        let error = await loginPage.getErrorMessage();
        assert.ok(error.includes('locked'))
    });

});
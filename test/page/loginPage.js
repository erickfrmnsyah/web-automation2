const loginLocator = require("../locator/loginLocator");

class LoginPage {

    constructor(driver){
        this.driver = driver;
    }

    async open(){
        await this.driver.get("https://www.saucedemo.com");
    }

    async inputUsername(username){
        await this.driver.findElement(loginLocator.username).sendKeys(username);
    }

    async inputPassword(password){
        await this.driver.findElement(loginLocator.password).sendKeys(password);
    }

    async clickLogin(){
        await this.driver.findElement(loginLocator.loginButton).click();
    }

    async login(username,password){
        await this.inputUsername(username);
        await this.inputPassword(password);
        await this.clickLogin();
    }

    async getErrorMessage(){
        return await this.driver.findElement(loginLocator.errorMessage).getText();
    }

    async getCurrentUrl(){
        return await this.driver.getCurrentUrl();
    }

}

module.exports = LoginPage;
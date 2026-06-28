const { By } = require("selenium-webdriver");

const LoginLocator = {
    username: By.css('[data-test="username"]'),
    password: By.xpath('//*[@data-test="password"]'),
    loginButton: By.className('submit-button btn_action'),
    errorMessage: By.css('[data-test="error"]')
};

module.exports = LoginLocator;
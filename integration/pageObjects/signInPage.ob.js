// playwright-dev-page.js
const { expect } = require('@playwright/test');
const assert = require('assert');

exports.SignInPage = class SignInPage {

  /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.getUsername = page.locator('#username');
    this.getPassword = page.locator('#password');
    this.getSignInButton = page.locator('#signinButton')
  }

  async setUsername(username) { 
    await this.getUsername.clear();
    await this.getUsername.fill(username);
  }

  async setPassword(password) { 
    await this.getPassword.clear();
    await this.getPassword.fill(password);
  }

  async clickSignInButton() { 
    await this.getSignInButton.click();
  }

  async userLogin(username, password) { 
    await this.setUsername(username);
    await this.setPassword(password);
    await this.page.waitForTimeout(500);
    await this.clickSignInButton();
  }

}
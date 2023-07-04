// playwright-dev-page.js
const { expect } = require('@playwright/test');
const assert = require('assert');


exports.NewUserPage = class NewUserPage {

  /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.getPageTitle = page.locator('[translate="bsendApp.user.home.title.create"]');
    this.getFirstname = page.locator('#firstName');
    this.getLastname = page.locator('#lastName');
    this.getEmail = page.locator('#email');
    this.getMobileNumber = page.locator('#mobilePhoneNumber');
    this.getSaveButton = page.locator('[translate="bsendApp.user.save"]');
    this.getLicenseCheckbox = page.locator('[aria-label="Licensed User"]');
    this.getAutoGenPasswordCheckbox = page.locator('[aria-label="Automatically Generate Password"]');
    this.getPasswordField = page.locator('#password');
    this.getConfirmPasswordField = page.locator('#confirmPassword');
  }

  async verifyPageTitle() { 
    const titleText = await this.getPageTitle.innerText();
    assert(titleText.includes("New User"));
  }

  async setFirstName(firstname) { 
    await this.getFirstname.clear();
    await this.getFirstname.fill(firstname);
  }
  
  async setLastName(lastname) { 
    await this.getLastname.clear();
    await this.getLastname.fill(lastname);
  }

  async setEmail(email) { 
    await this.getEmail.clear();
    await this.getEmail.fill(email);
  }

  async setMobileNumber(mobile) { 
    await this.getMobileNumber.clear();
    await this.getMobileNumber.fill(mobile);
  }

  async setPassword(password) { 
    await this.getPasswordField.clear();
    await this.getPasswordField.fill(password);
  }

  async setConfirmPassword(password) { 
    await this.getConfirmPasswordField.clear();
    await this.getConfirmPasswordField.fill(password);
  }

  async clickSaveButton() { await this.getSaveButton.click(); }

  async createUserParams() {

    let params = {}; 
    
    params.firstname = null;
    params.lastname = null;
    params.email = null;
    params.mobileNumber = null;
    params.userLicense = null;
    params.customPassword = null; 
    params.setCustomPassword = null;

    return params;    

  }

  async createUser(params) {

    if(params.firstname) { await this.setFirstName(params.firstname) }
    
    if(params.lastname) { await this.setLastName(params.lastname) }

    if(params.email) { await this.setEmail(params.email) }

    if(params.mobileNumber) { await this.setMobileNumber(params.mobileNumber) }

    if(params.userLicense == "true") { 
        const defaultLicenseValue = await this.getLicenseCheckbox.getAttribute('aria-checked')
        if(defaultLicenseValue == true)  { } // DO NOTHING
        else if(defaultLicenseValue == false) { await this.getLicenseCheckbox.click() }
    }

    if(params.userLicense == "false") { 
        const defaultLicenseValue = await this.getLicenseCheckbox.getAttribute('aria-checked')
        if(defaultLicenseValue == true)  { await this.getLicenseCheckbox.click() } 
        else if(defaultLicenseValue == false) { } // DO NOTHING
    }

    if(params.customPassword == "true" && params.setCustomPassword) { 
        const defaultAutoPasswordValue = await this.getAutoGenPasswordCheckbox.getAttribute('aria-checked')
        console.log('Auto. Gen. Pass. Value (Default) : ', defaultAutoPasswordValue)
        if(defaultAutoPasswordValue == "true") { await this.getAutoGenPasswordCheckbox.click() }
        else if (defaultAutoPasswordValue == false) { } // DO NOTHING
        await this.page.waitForTimeout(1000);
        await this.setPassword(params.setCustomPassword);
        await this.setConfirmPassword(params.setCustomPassword);
    }

    await this.page.waitForTimeout(500);
    await this.clickSaveButton();

  }
  
}
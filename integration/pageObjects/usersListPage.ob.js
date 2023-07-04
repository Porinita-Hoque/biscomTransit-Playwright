// playwright-dev-page.js
const { expect } = require('@playwright/test');
const assert = require('assert');

exports.UsersListPage = class UsersListPage {

  /**
  * @param {import('@playwright/test').Page} page
  */
  

  constructor(page) {
    this.page = page;
    this.getPageTitle = page.locator('[translate="bsendApp.user.home.title.list"]');
    this.getAddUserButton = page.locator('[translate="bsendApp.user.home.button.addUser"]');
    this.getUsersList = page.locator('[class="c-contacts _md layout-row flex c-contacts--filter-closed"]').nth(0);
    this.getSearchField = page.locator('[ng-model="vm.search.searchText"]').nth(0);
    this.getDeleteButton = page.locator('[aria-label="Delete"]').nth(0);
    this.getTransferCheckbox = page.locator('[ng-model="vm.transfer"]').nth(0);
    this.getTransferToField = page.locator('[aria-labelledby="newOwnerLabel"]');
    this.getForwardMailCheckbox = page.locator('[ng-model="vm.alias"]').nth(0);
    this.getTransferWindowDeleteButton = page.locator('[ng-click="vm.confirmDelete()"]').nth(0);
  }
  
  async verifyPageTitle() { 
    const titleText = await this.getPageTitle.innerText();
    assert(titleText.includes('Users'));
  }  

  async gotoAddUser() { await this.getAddUserButton.click() } ;

  async verifyUser(searchText) { 
    const matchText = await this.getUsersList.innerText();
    assert(matchText.includes(searchText))
  }

  async searchUser(searchText) { 
    await this.getSearchField.clear();
    await this.getSearchField.fill(searchText)
    await this.getSearchField.press('Enter');
  }

  async deleteUserParams() { 
    
    let params = {}; 
    
    params.user = null;
    params.transfer = null;
    params.transferTo = null;
    params.mailForward = null;

    return params; 

  }

  async deleteUser(params) { 

    if(params.user) { 
      await this.searchUser(params.user)
      await this.page.locator('[ng-mouseover="vm.viewItem(user)"]').nth(0).click();
      await this.getDeleteButton.click();
    }

    if(params.transfer) { 
      if(params.transfer == "true") { 
        const transferValue = await this.getTransferCheckbox.getAttribute('aria-checked');
        if(transferValue == "true") { } // DO NOTHING
        else if(transferValue == "false") { await this.getTransferCheckbox.click() }
      }
      else if(params.transfer == "false") { 
        const transferValue = await this.getTransferCheckbox.getAttribute('aria-checked');
        if(transferValue == "false") { } // DO NOTHING
        else if(transferValue == "true") { await this.getTransferCheckbox.click() }
      }
    }

    if(params.transfer == "true" && params.transferTo) { 
      await this.getTransferToField.clear();
      await this.getTransferToField.fill(params.transferTo);
      await this.getTransferToField.press('Enter');
    }

    if(params.transfer == "true" && params.mailForward) { 
      if(params.mailForward == "true") { 
        const mailForwardValue = await this.getForwardMailCheckbox.getAttribute('aria-checked');
        if(mailForwardValue == "true") { } // DO NOHTING
        else if(mailForwardValue == "false") { await this.getForwardMailCheckbox.click() }
      }
      else if(params.mailForward == "false") {
        const mailForwardValue = await this.getForwardMailCheckbox.getAttribute('aria-checked');
        if(mailForwardValue == "true") { await this.getForwardMailCheckbox.click() } 
        else if(mailForwardValue == "false") {  } // DO NOHTING
      }
    }

    await this.page.waitForTimeout(1500);
    await this.getTransferWindowDeleteButton.click();

  }
  
}
// playwright-dev-page.js
const { expect } = require('@playwright/test');
const assert = require('assert');

exports.TopNavbar = class TopNavbar {

  /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.getSignOutButton = page.locator('[ng-click="vm.logout()"]').nth(0);
    this.getSearchField = page.locator('[ng-model="vm.search.searchText"]').nth(0);
  }

  async userLogout() { await this.getSignOutButton.click() }
  
  async search(searchText) { 
    await this.getSearchField.clear();
    await this.getSearchField.fill(searchText)
    await this.getSearchField.press('Enter');
  }

}
// playwright-dev-page.js
const { expect } = require('@playwright/test');
const assert = require('assert');

exports.InboxPage = class InboxPage {

  /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.getPageTitle = page.locator('.title-margin');
  }

  async verifyPageTitle() { 
    const titleText = await this.getPageTitle.innerText();
    assert(titleText.includes("Inbox"));
  }

  async verifySpecificMessage(searchText) { 
    const elements = await this.page.$$('[md-virtual-repeat="message in vm.list.items"]');
    for (const element of elements) {
      const textContent = await element.textContent();
      if (textContent === searchText) {
        console.log("Found");
        break;
      }
    }
  }

}
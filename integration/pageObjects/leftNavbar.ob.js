// playwright-dev-page.js
const { expect } = require('@playwright/test');
const assert = require('assert');

exports.LeftNavbar = class LeftNavbar {

  /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.getComposeTab = page.locator('[aria-label="compose"]');
    this.getInboxTab = page.locator('[aria-label="inbox"]');
    this.getSentTab = page.locator('[aria-label="sent"]');
    this.getDraftsTab = page.locator('[aria-label="drafts"]');
    this.getFilesTab = page.locator('[aria-label="files"]');
    this.getContactsTab = page.locator('[aria-label="contacts"]');
    this.getAdminTab = page.locator('[aria-label="admin"]');
    this.getTrashTab = page.locator('[aria-label="Trash"]');
  }

  async gotoComposeTab() { await this.getComposeTab.click(); }

  async gotoInboxTab() { await this.getInboxTab.click(); }

  async gotoSentTab() { await this.getSentTab.click(); }

  async gotoDraftsTab() { await this.getDraftsTab.click(); }

  async gotoFilesTab() { await this.getFilesTab.click(); }

  async gotoContactsTab() { await this.getContactsTab.click(); }

  async gotoAdminTab() { await this.getAdminTab.click(); }

  async gotoTrashTab() { await this.getTrashTab.click(); }

}
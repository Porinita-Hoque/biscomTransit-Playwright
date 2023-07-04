// playwright-dev-page.js
const { expect } = require('@playwright/test');
const assert = require('assert');

exports.AdminNavbar = class AdminNavbar {

  /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.getSystemDashboardTab = page.locator('[ui-sref="admin.dashboard"]').nth(0);
    this.getSystemActivitiesTab = page.locator('[ui-sref="transactions"]').nth(0);
    this.getUsersTab = page.locator('[ui-sref="tenant-user-management"]').nth(0);
    this.getEmailNotificationTab = page.locator('[ui-sref="email-notification"]').nth(0);
  }
  
  async gotoUsersTab() { await this.getUsersTab.click(); }

  
  
}
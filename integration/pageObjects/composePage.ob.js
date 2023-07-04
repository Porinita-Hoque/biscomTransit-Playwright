// playwright-dev-page.js
const { expect } = require('@playwright/test');
const assert = require('assert');

exports.ComposePage = class ComposePage {

  /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.getPageTitle = page.locator('[translate="bsendApp.message.home.title.new"]').nth(0) ;
    this.getRecipientField = page.locator('input[ng-model="$mdAutocompleteCtrl.scope.searchText"]').nth(0) ;
    this.getSubjectField = page.locator('[ng-model="vm.message.subject"]').nth(0) ;
    this.getSecureNoteField = page.locator('div.ql-editor').nth(0) ;
    this.getSendButton = page.locator('[ng-click="vm.save()"]');
  }

  async verifyPageTitle() { 
    const titleText = await this.getPageTitle.innerText();
    assert(titleText.includes("New Message"));
  }

  async setRecipient(recipient) { 
    await this.getRecipientField.fill(recipient);
    await this.getRecipientField.press('Enter');
  }

  async setSubject(subject) { 
    await this.getSubjectField.clear();
    await this.getSubjectField.fill(subject);
  }

  async setSecureNote(note) { 
    await this.getSecureNoteField.clear();
    await this.getSecureNoteField.fill(note);
  }
  
  async composeMessageParams() { 

    let params = {};

    params.recipientOne = null;
    params.recipientTwo = null;
    params.recipientThree = null;
    params.subject = null;
    params.secureNote = null;

    return params;
  }

  async composeMessage(params) { 

    if(params.recipientOne) { 
        await this.getRecipientField.clear();
        await this.setRecipient(params.recipientOne);
    }

    if(params.recipientTwo) { await this.setRecipient(params.recipientTwo) }

    if(params.recipientThree) { await this.setRecipient(params.recipientThree) }

    if(params.subject) { await this.setSubject(params.subject) }

    if(params.secureNote) { await this.setSecureNote(params.secureNote) }

    await this.page.waitForTimeout(1000);
    await this.getSendButton.click();

  }

}
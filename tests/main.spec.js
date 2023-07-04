// @ts-check
const assert = require('assert');
const { test, expect } = require('@playwright/test');
import dataFile from '../data/data.json';

const { SignInPage } = require('../integration/pageObjects/signInPage.ob.js');
const { LeftNavbar } = require('../integration/pageObjects/leftNavbar.ob.js');
const { AdminNavbar } = require('../integration/pageObjects/adminNavbar.ob.js');
const { UsersListPage } = require('../integration/pageObjects/usersListPage.ob.js');
const { NewUserPage } = require('../integration/pageObjects/newUserPage.ob.js');
const { TopNavbar } = require('../integration/pageObjects/topNavbar.ob.js');
const { ComposePage } = require('../integration/pageObjects/composePage.ob.js');
const { InboxPage } = require('../integration/pageObjects/inboxPage.ob.js');

test.describe('Biscom Transit - Playwright', () => {
  
  test("Login as Admin and Create Two Users", async ({ page, }) => {

    const signInPage = new SignInPage(page);
    const leftNavbar = new LeftNavbar(page);
    const adminNavbar = new AdminNavbar(page);
    const usersListPage = new UsersListPage(page);
    const newUserPage = new NewUserPage(page);
    const topNavbar = new TopNavbar(page);

    console.log('Go to Log in Page');
    await page.goto(dataFile.url.login);

    console.log('Log in as Admin');
    await signInPage.userLogin(dataFile.admin.username, dataFile.admin.password);
    
    await page.waitForTimeout(2000);

    console.log('Go to Admin Tab');
    await leftNavbar.gotoAdminTab();
    page.url().includes(dataFile.url.admin.systemDashboard);

    console.log('Go to Admin > Users Page');
    await adminNavbar.gotoUsersTab();
    page.url().includes(dataFile.url.admin.users);
    await usersListPage.verifyPageTitle();

    console.log('Go to Add User');
    await usersListPage.gotoAddUser();
    page.url().includes(dataFile.url.admin.users);
    page.url().includes("new");
    await newUserPage.verifyPageTitle();

    console.log('Create User : ', dataFile.userOne.email);
    var userOneInfo = dataFile.userOne
    var userOneParams = await newUserPage.createUserParams();
    userOneParams.firstname = userOneInfo.firstname
    userOneParams.lastname = userOneInfo.lastname
    userOneParams.email = userOneInfo.email
    userOneParams.userLicense = userOneInfo.license
    userOneParams.customPassword = userOneInfo.customPassword
    userOneParams.setCustomPassword = userOneInfo.setCustomPassword

    await newUserPage.createUser(userOneParams);
   
    await page.waitForTimeout(2000);
    console.log('User Created : ', dataFile.userOne.email);

    console.log('Go to Add User');
    await usersListPage.gotoAddUser();
    page.url().includes(dataFile.url.admin.users);
    page.url().includes("new");
    await newUserPage.verifyPageTitle();

    console.log('Create User : ', dataFile.userTwo.email);
    var userTwoInfo = dataFile.userTwo
    var userTwoParams = await newUserPage.createUserParams();
    userTwoParams.firstname = userTwoInfo.firstname
    userTwoParams.lastname = userTwoInfo.lastname
    userTwoParams.email = userTwoInfo.email
    userTwoParams.userLicense = userTwoInfo.license
    userTwoParams.customPassword = userTwoInfo.customPassword
    userTwoParams.setCustomPassword = userTwoInfo.setCustomPassword

    await newUserPage.createUser(userTwoParams);
    await page.waitForTimeout(2000);
    console.log('User Created : ', dataFile.userTwo.email);

    console.log('Go to Admin tab');
    await leftNavbar.gotoAdminTab();

    console.log('Go to Admin > Users tab');
    await adminNavbar.gotoUsersTab();

    console.log('Verify User : ', dataFile.userOne.email);
    await usersListPage.verifyUser(dataFile.userOne.email);
    
    await page.waitForTimeout(1000);
    
    console.log('User Created : ', dataFile.userTwo.email);
    await usersListPage.verifyUser(dataFile.userTwo.email);

    console.log('Logout from : ', dataFile.admin.username);
    await topNavbar.userLogout();

  });

  test("Login as : " + dataFile.userOne.email, async ({ page, }) => {

    const signInPage = new SignInPage(page);
    const leftNavbar = new LeftNavbar(page);
    const topNavbar = new TopNavbar(page);
    const composePage = new ComposePage(page);

    console.log('Go to Log in Page');
    await page.goto(dataFile.url.login);

    console.log('Login as : ', dataFile.userOne.email);
    await signInPage.userLogin(dataFile.userOne.email, dataFile.userOne.setCustomPassword);
    
    await page.waitForTimeout(2000);

    console.log('Go to Compose tab');
    await leftNavbar.gotoComposeTab();
    page.url().includes(dataFile.url.compose);

    console.log('Compose a Message to : ', dataFile.userTwo.email);
    var composeMsgParams = await composePage.composeMessageParams();
    composeMsgParams.recipientOne = dataFile.composeMessage.recipientOne
    composeMsgParams.subject = dataFile.composeMessage.subject
    composeMsgParams.secureNote = dataFile.composeMessage.secureNote

    await composePage.composeMessage(composeMsgParams);
    await page.waitForTimeout(2000);
    console.log('Message Sent');

    console.log('Logout from : ', dataFile.userOne.email);
    await topNavbar.userLogout();

  });

  test("Login as : " + dataFile.userTwo.email, async ({ page, }) => {

    const signInPage = new SignInPage(page);
    const leftNavbar = new LeftNavbar(page);
    const topNavbar = new TopNavbar(page);
    const inboxPage = new InboxPage(page);


    console.log('Go to Log in Page');
    await page.goto(dataFile.url.login);

    console.log('Login as : ', dataFile.userTwo.email);
    await signInPage.userLogin(dataFile.userTwo.email, dataFile.userTwo.setCustomPassword);
    
    await page.waitForTimeout(2000);

    console.log('Go to Inbox tab');
    await leftNavbar.gotoInboxTab();
    page.url().includes(dataFile.url.inbox);

    console.log('Verify Received Message')
    await inboxPage.verifySpecificMessage(dataFile.composeMessage.subject);

    console.log('Logout from : ', dataFile.userTwo.email);
    await topNavbar.userLogout();

  });

  test("Delete the Users", async ({ page, }) => {
  
    const signInPage = new SignInPage(page);
    const leftNavbar = new LeftNavbar(page);
    const adminNavbar = new AdminNavbar(page);
    const usersListPage = new UsersListPage(page);
    const topNavbar = new TopNavbar(page);

    console.log('Go to Login Page');
    await page.goto(dataFile.url.login);

    console.log('Login as Admin : ', dataFile.admin.username);
    await signInPage.userLogin(dataFile.admin.username, dataFile.admin.password);
    await page.waitForTimeout(2000);    

    console.log('Go to Admin tab');
    await leftNavbar.gotoAdminTab();
    page.url().includes(dataFile.url.admin.systemDashboard);
    
    console.log('Go to Admin > Users tab');
    await adminNavbar.gotoUsersTab();
    page.url().includes(dataFile.url.admin.users);

    console.log('Delete User : ', dataFile.userOne.email);
    var deleteParams = await usersListPage.deleteUserParams();
    deleteParams.user = dataFile.userOne.email;
    deleteParams.transfer = "false";

    await usersListPage.deleteUser(deleteParams);
    await page.waitForTimeout(2000);
    console.log('User Deleted : ', dataFile.userOne.email);

    console.log('Go to Admin tab');
    await leftNavbar.gotoAdminTab();
    page.url().includes(dataFile.url.admin.systemDashboard);

    console.log('Go to Admin > Users tab');
    await adminNavbar.gotoUsersTab();
    page.url().includes(dataFile.url.admin.users);

    console.log('Delete User : ', dataFile.userTwo.email);
    var deleteParams = await usersListPage.deleteUserParams();
    deleteParams.user = dataFile.userTwo.email;
    deleteParams.transfer = "false";

    await usersListPage.deleteUser(deleteParams);
    await page.waitForTimeout(2000);
    console.log('User Deleted : ', dataFile.userTwo.email);

    console.log('Logout from Admin : ', dataFile.admin.username);
    await topNavbar.userLogout();

  });

});

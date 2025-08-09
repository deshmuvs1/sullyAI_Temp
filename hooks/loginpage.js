import { before, beforeEach } from "node:test";

before ({tags :"@foo"},async function(){

      const browser = await playwright.chromium.launch({
        headless : false});
    const context = await browser.newContext();
   

  
});

beforeEach('loginPage',
    async function login(page) {

        const EmailTab = page.getByPlaceholder('Email');
        const passTab = page.getByPlaceholder('Password');
        const loginbutton = page.getByRole('button', { name: 'Login' });
        const visits = page.getByRole('button', { name: 'Visits' });
        await page.goto("https://app.sully.ai/");
        await EmailTab.fill(testData.validUser.username);
        await passTab.fill(testData.validUser.password);
        await loginbutton.click();
        await page.waitForTimeout(10000);
        await expect(visits).toBeVisible();

    });
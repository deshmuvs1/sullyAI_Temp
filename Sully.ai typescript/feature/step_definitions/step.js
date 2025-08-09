const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');

setDefaultTimeout(180 * 1000);

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});

Given(/^Logining to Sully application with "([^"]*)" and "([^"]*)"$/, async function (email, password) {
  const { page } = this;

  await page.goto('https://app.sully.ai/');
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('button', { name: 'Visits' })).toBeVisible();
});

When('Add new patient', async function () {
  const { page } = this;
  await page.getByRole('button', { name: 'Start New Visit' }).click();
});

Then('Verify New Patient Popup is visible', async function () {
  const { page } = this;
  const patientInput = page.locator('#patientName');
  await expect(patientInput).toBeVisible();
  // proceed so subsequent steps can continue
  await patientInput.fill('QA Automation Patient');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
});

When('Click on Record button', async function () {
  const { page } = this;
  await page.getByRole('button', { name: 'Start' }).click();
  await page.waitForTimeout(10000);
  await page.getByRole('button', { name: 'Recording (Click to Pause)' }).click();
});

Then('Verify Transcribe is Generated in scribe', async function () {
  const { page } = this;
  const generateNote = page.getByRole('button', { name: 'Generate Note' });
  await expect(generateNote).toBeVisible();
  await generateNote.click();
  await page.waitForLoadState('networkidle');
});

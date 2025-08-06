import { test, expect } from '@playwright/test'

import { testData } from '../testdata/testdata';



test('Loginpage', async ({ page }) => {

    let EmailTab = page.getByPlaceholder('Email');
    let passTab = page.getByPlaceholder('Password');
    let loginbutton = page.getByRole('button', { name: 'Login' });
    let visits = page.getByRole('button', { name: 'Visits' });


    await page.goto("https://app.sully.ai/");


    await EmailTab.fill(testData.validUser.username);
    await passTab.fill(testData.validUser.password);
    await loginbutton.click();
    await page.waitForTimeout(10000);
    await expect(visits).toBeVisible()

});

test('visit', async ({ page }) => {


    const startvisit = page.getByRole('button', { name: 'Start New Visit' });
    const PatientPopup = page.locator("#patientName");
    const continuebtn = page.getByRole('button', { name: 'Continue' });
    const startRecordingBtn = page.getByRole('button', { name: 'Start' });
    const stopRecordingBtn = page.getByRole('button', { name: 'Recording (Click to Pause)' });
    const GenerateNote = page.getByRole('button', { name: 'Generate Note' });

    const viewnoteBtn = page.getByRole('button', { name: 'View Note' });


    await startvisit.click();
    await PatientPopup.fill(testData.patient.name);
    await continuebtn.click();
    await startRecordingBtn.click();
    await page.waitForTimeout(10000);
    await stopRecordingBtn.click();
    await expect(this.GenerateNote).toBeVisible();
    await GenerateNote.click();
    await page.waitForTimeout(100000);

});

describe('Audio Recording Tests', () => {
    test('Audio Test', async () => {
        const audioFilePath = path.join(__dirname, 'testdata/harvard.wav');
        const audioData = fs.readFileSync(audioFilePath);
        const savedFilePath = path.join(__dirname, 'testdata/harvard.wav');

        fs.writeFileSync(savedFilePath, audioData);

        expect(fs.existsSync(savedFilePath)).toBe(true);

    });
})

test('exisitng patient', async ({ page }) => {

    const attachment = page.locator('#twid_scribe_upload_document');
    const Coughtext = "Hi. I am QA. I'm having cough. I'm having breathing problem. I don't have any medications. My weight is around sixty, and I am looking for appointment of a doctor who can cure me. I also want the prescription medication to cure my"


    await page.getByPlaceholder('Search or create patient...').click();
    await page.getByRole('option', { name: 'QA ' }).click();
    await page.waitForTimeout(10000);
    await page.locator('#twid_menu_item-%visit%').isVisible();
    await expect(page.getByText('Last-visit Summary')).isVisible();
    await expect(page.getByTitle("Include Patient-History in additional note")).toBeVisible();

});

test('Valid Transcribed', async ({ page }) => {

    await page.locator('[aria-label="More options]').click();
    await page.locator('#pr_id_3048_2').click();
    const transcript = await page.locator('span.py-1').nth(0).textContent();
    console.log(transcript);
    await expect(transcript).toContainText(Coughtext);

});


test('Televisit', async ({ page }) => {

    await page.locator('.tw:hover:bg-transparent').click();
    await page.getByText('Tele Visit').nth(1).click();
    await page.getByText('Tele Visit').nth(0).click();
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    const page1 = await context.newPage();
    await page1.goto('https://www.youtube.com/watch?v=oh8b0WOOZPM&t=157s');

    const page2 = await context.newPage();
    await page2.goto('https://app.sully.ai/');
    await page.waitForTimeout(1000000000);
    await stopRecordingBtn.click();
    await expect(this.GenerateNote).toBeVisible();
    await GenerateNote.click();
    await page.waitForTimeout(100000);
    const transcripttext= await page.locator('#speech-transcript').textContent();
    console.log(transcripttext);
    await page.locator('#twid_scribe_upload_document').click();
    await page.getByText('Click or drag file to this area to upload').click();
    await  fileInput.setInputFiles('testdata/assignment [Sully.ai QA Tester] Hackathon Problem Statement (1).pdf');
    await expect (page.getByText('Please upload medical related file.')).isVisible();




});
test('logout', async ({ page }) => {

    await page.getByText('siddharthdd7@gmail.com').click();
    await expect(page.getByText('siddharthdd7@gmail.com')).toContainText('siddharthdd7@gmail.com');
    await page.getByTitle('Log out').click();

}
);
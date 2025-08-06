import { Locator, Page,expect } from "@playwright/test";



export class visit{
  page: Page;
  aiScribeTab: Locator;
  startRecordingBtn: Locator;
  stopRecordingBtn: Locator;
  GenerateNote: Locator;
  viewnoteBtn: Locator;
  PatientPopup : Locator;
  continue:Locator;

  constructor(page: Page) {
    this.page = page;
    this.aiScribeTab = page.getByRole('button', { name: 'Start New Visit' });
    this.PatientPopup = page.locator("#patientName");
    this.continue = page.getByRole('button', {name : 'Continue'});
    this.startRecordingBtn = page.getByRole('button', { name: 'Start' });
    this.stopRecordingBtn = page.getByRole('button', { name: 'Recording (Click to Pause)' });
    this.GenerateNote = page.getByRole('button', {name: 'Generate Note'}); 
    
    this.viewnoteBtn = page.getByRole('button', { name: 'View Note' });
    
  }

  async navigateToAIScribe(Patientname: string) {
    await this.aiScribeTab.click();
    await this.PatientPopup.fill(Patientname);
    await this.continue.click();
    await expect(this.startRecordingBtn).toBeVisible();
  }

  async startRecording() {
    await this.startRecordingBtn.click();
    await this.page.waitForTimeout(10000);

  }

  async stopRecording() {
    await this.stopRecordingBtn.click();
  }

  async reviewTranscription() {
    
    await expect(this.GenerateNote).toBeVisible();
    await this.GenerateNote.click();
    await this.page.waitForLoadState('networkidle');
  }

  async saveTranscription() {
    await this.viewnoteBtn.click();
    await expect(this.page.getByText('Saved successfully')).toBeVisible(); // Replace with actual success message
  }
}

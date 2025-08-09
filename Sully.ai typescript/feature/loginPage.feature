Feature: Sully.ai scribe Validations


Scenario: LoginPage

Given Logining to Sully application with "siddharthdd7@gmail.com" and "Ram@9099"
When Add new patient 
Then Verify New Patient Popup is visible
When Click on Record button 
Then Verify Transcribe is Generated in scribe

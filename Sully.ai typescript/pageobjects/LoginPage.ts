import { Locator, Page,expect } from "@playwright/test";


export class LoginPage {

page : Page;
EmailTab : Locator;
passTab : Locator;
loginbutton: Locator;
visits : Locator;


    constructor (page){
         this.page = page;
         this.EmailTab = page.getByPlaceholder('Email');
         this.passTab = page.getByPlaceholder('Password');
         this.loginbutton = page.getByRole('button', {name: 'Login'});
        this.visits =  page.getByRole('button', {name: 'Visits'});

    }

    async goto(){

        await this.page.goto ("https://app.sully.ai/");

    }

    async validLogin (username:string , password:string){

        await this.EmailTab.fill(username);
        await this.passTab.fill(password);
        await this.loginbutton.click();
        await this.page.waitForLoadState('networkidle');
        await expect (this.visits).toBeVisible()
}}

import { visit } from './visit';
import {LoginPage }from './LoginPage';
import { Page } from '@playwright/test';




export class POManager {
 loginPage: LoginPage;
 visit : visit;
 page:Page


 constructor (page:Page){

    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.visit = new visit(this.page);
 }

   getLoginPage() {
        return this.loginPage;

    }

    
    getvisitpage() {
        return this.visit;
    }

}

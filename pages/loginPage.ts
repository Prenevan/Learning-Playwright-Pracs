import { Page } from "@playwright/test";
//The class
export default class LoginPage {

    //Webpage we creating this for https://ecommerce-playground.lambdatest.io/index.php?route=account/login
    //The constructor which allows us to use page. in the functions. Page is like driver in selenium
    constructor(public page: Page ) { }

    //Creating a function here so that whenever I need to login 
    async login(email: string, password: string) {
        await this.enterEmail(email)
        await this.enterLoginPassword(password)
        await this.clickLoginBtn()
    }


    //The Functions that we going to need with locations and a variable for the input fields
    async enterEmail(emailaddress: string){
        await this.page.locator("input[name='email']")
            .type(emailaddress)
    }

    async enterLoginPassword(password: string){
        await this.page.locator("input[name='password']")
            .type(password)
    }

    async clickLoginBtn(){
        // await Promise.all([
        //     this.page.waitForNavigation
        // ])
        await this.page.click("input[value='Login']")
    }

    async emptyPassword(){
        await this.page.locator("input[name='password']")
            .type('')
    }

}
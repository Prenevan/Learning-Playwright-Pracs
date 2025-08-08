import { Page } from "@playwright/test";
//The class
export default class RegisterPage {
    //Webpage we creating this for https://ecommerce-playground.lambdatest.io/index.php?route=account/register
    //The constructor which allows us to use page. in the functions
    constructor(public page: Page ) {

    }
    //The Functions that we going to need with locations and a variable for the input fields
    async enterFirstName(firstname: string){
        await this.page.locator("#input-firstname")
            .type(firstname)
    }

    async enterlasttName(lastname: string){
        await this.page.locator("input[name='lastname']")
            .type(lastname)
    }

    async enterEmail(email: string){
        await this.page.locator("input[type='email']")
            .type(email)
    }

    async enterTelephone(phone: string){
        await this.page.locator("input[name='telephone']")
            .type(phone)
    }

    async enterPassword(password: string){
        await this.page.locator("input[name='password']")
            .type(password)
    }

    async enterConfirmPassword(password: string){
        await this.page.locator("input[name='confirm']")
            .type(password)
    }
    //This is the radio button and checks if it is checked/selected and the return, returns the vale if its checked or not
    //this was the original but he updated it to the below isSubscribedChecked
    // async isSubscribedChecked(){
    //     return await this.page.locator("#input-newsletter-no").isChecked()
    //}

    //Now we just returning the locator
    isSubscribedChecked() {
        return this.page.locator("#input-newsletter-no")
    }
    
    //This is clicking on the agreement checkbox to say that we agree to the terms and conditions
    async clickTermAndCondition(){
        await this.page.click("//label[@for='input-agree']")
    }

    async clickContinueToRegister(){
        //creating a promise that the page will be completely loaded before selecting continue 
        // await Promise.all([
        //     this.page.waitForNavigation({waitUntil:"networkidle"})
        // ])
        this.page.click("input[value='Continue']")
    }

}
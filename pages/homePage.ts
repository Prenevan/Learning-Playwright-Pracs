import { Page } from "@playwright/test";
//The class
export default class HomePage {

    //Webpage we creating this for https://ecommerce-playground.lambdatest.io/index.php?route=common/home
    //The constructor which allows us to use page. in the functions. Page is like driver in selenium
    constructor(public page: Page ) {

    }
    //The Functions that we going to need with locations and a variable for the input fields
    async clickOnSpecialHotMenu(){
        this.page.click("//span[contains(text(), 'Special')}/../..)[2]")//xPath
    }

    async clickOnSMegaMenu(){
        this.page.hover("//span[normalize-space(text())='Mega Menu']")//xPath
    }

    async clickOnHeadphones(){
        this.page.click("//a[@title='Headphones']")//xPath
    }

}
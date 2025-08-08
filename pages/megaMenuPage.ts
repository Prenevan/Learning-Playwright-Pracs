import { Page } from "@playwright/test";
import { promiseHooks } from 'v8';
//The class
export default class MegaMenuPage{
    //Webpage we creating this for https://ecommerce-playground.lambdatest.io/index.php?route=product/special
    //The constructor which allows us to use page. in the functions. Page is like driver in selenium
    constructor(public page: Page ) { }

    //The Functions that we going to need with locations and a variable for the input fields
    async addFirstProductToTheCart(){
        //strict is if there are multiple issues found it will throw an error
        await this.page.hover("(//img[@title='HTC Touch HD'])[2]", {strict: false})
        await this.page.locator("(//button[@title='Add to Cart']//i)[1]")//This is to click on the add to cart after the hover
        .nth(0).click()
    }


    //isToastVisible is the pop up that appears on the right hand side that states view cart or Checkout 4:00 in video
    async isToastVisible(){

        const toast = this.page.locator("//a[normalize-space(text())='View Cart']");//Finding the button on the pop up
        await toast.waitFor({state: "visible"}) //Waiting for the locator on the pop up to be visible
        return toast; //we return that locator once visible
        
    }
    
}
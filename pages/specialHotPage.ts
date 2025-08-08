import { Page } from "@playwright/test";
//The class
export default class SpecialHotPage{
    //Webpage we creating this for https://ecommerce-playground.lambdatest.io/index.php?route=product/special
    //The constructor which allows us to use page. in the functions. Page is like driver in selenium
    constructor(public page: Page ) { }

    //The Functions that we going to need with locations and a variable for the input fields
    async addFirstProductToTheCart(){
        //strict is if there are multiple issues found it will throw an error
        await this.page.hover("//div[@class='image']/a", {strict: false})
        await this.page.locator("(//button[@title='Add to Cart']")//This is to click on the add to cart after the hover
        .nth(0).click()
    }

    //isToastVisible is the pop up that appears on the right habd side that states view cart or Checkout 4:00 in video
    async isToastVisible(){

        const toast = this.page.locator("//a[.='View Cart ']");//Finding the button on the pop up
        await toast.waitFor({state: "visible"}) //Waiting for the locator on the pop up to be visible
        return toast; //we return that locator once visible
    }
}
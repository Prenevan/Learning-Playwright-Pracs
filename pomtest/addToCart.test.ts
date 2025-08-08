import { expect, test } from "@playwright/test"
import RegisterPage from "../pages/registerPage"
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';
import SpecialHotPage from "../pages/specialHotPage"
import MegaMenuPage from "../pages/megaMenuPage";
import { assert } from "console";

//Below was added, read comment on line 21/23. This info is saved in a test level so we can use it for other tests
const email = "preno.test@test.com"
const password = "test123"
//Had to import the files above so we can access the information in them

//Below is when using testfixture and use to override the base url in the below tests
// test.use({
//     baseURL:"www.test.com"
// })


//Added baseURL to the playwright.config.ts file and the added it below so now we just need to add the route for each test 
test('Register test_01', async ({ page , baseURL }, testInfo) => {
    console.log(testInfo.title);//TestInfo gives you the test name on the 

    //Creating a new reg page to be used by the test
    const register = new RegisterPage(page);
    //this adds the route to the base url
    await page.goto(`${baseURL}route=account/register`)
    await register.enterFirstName("Prenos")
    await register.enterlasttName("Pillay")
    await register.enterEmail(email)//Highlight the email address and hit CTRL . then select Extract to constant in module scope, this allows us to save it as a variable
    await register.enterTelephone("1234567890")
    await register.enterPassword(password)//Highlight the email address and hit CTRL + . then select Extract to constant in module scope, this allows us to save it as a variable
    await register.enterConfirmPassword(password)//just using password from above

    //Checking if the radio button is checked
    expect(register.isSubscribedChecked()).toBeChecked()

    //Clicking on the T&Cs box, code for the click is already saved in the registerPage.ts
    await register.clickTermAndCondition()

    //Clicking on the continue button, code for the click is already saved in the registerPage.ts
    await register.clickContinueToRegister()
    console.log(status)//says if test passed or failed

})

test('Login test_02 Original', async ({ page , baseURL }) => {

    //Creating a new Login page to be used by the test
    const login = new LoginPage(page);
    //this adds the route to the base url
    await page.goto(`${baseURL}route=account/login`)
    await login.enterEmail(email)//email from variable at the top of the page
    await login.enterLoginPassword(password)//password from variable at the top of the page

    //Clicking on the Login button, code for the click is already saved in the LoginPage.ts
    await login.clickLoginBtn()
    
    //Assert that the page title/Tab name to be My Account
    expect(await page.title()).toBe("My Account")

})

test('GivenLogin_WhenNoPasswordSupplied_ThenLoginFail', async ({ page , baseURL }) => {

    //Creating a new Login page to be used by the test
    const login = new LoginPage(page);
    //this adds the route to the base url
    await page.goto(`${baseURL}route=account/login`)
    await login.enterEmail(email)//email from variable at the top of the page
    await login.emptyPassword()
    //await login.enterLoginPassword(password)//password from variable at the top of the page

    //Clicking on the Login button, code for the click is already saved in the LoginPage.ts
    await login.clickLoginBtn()
    
    //Assert that the page title/Tab name to be My Account
    //expect(await page.title()).toBe("My Account")
    expect(page.locator("//div[contains(@class,'alert alert-danger')]")).toContainText("Warning")

})

//I dont need to do the login again here for this testn as I created a function at the top of the LoginPage.ts file that i can just call
test('add To Cart test_03', async ({ page , baseURL }) => {

    ///***This does the login now for the below test so that we dont need to do the whole login code again */
    const login = new LoginPage(page);
    await page.goto(`${baseURL}route=account/login`)
    await login.login(email, password)

    //Creating a constructor so the test has access both the homePage and the MegaMenu Page
    const homePage = new HomePage(page)
    const megaMenuPage = new MegaMenuPage(page)

    //Clicking the buutons on the home page to direct me to the mega menu page
    await homePage.clickOnSMegaMenu();
    await homePage.clickOnHeadphones();

    await megaMenuPage.addFirstProductToTheCart()


    //Checking if the cart is visible in top right corner
    const isCartVisible = await megaMenuPage.isToastVisible()
    expect(isCartVisible).toBeVisible()

  })



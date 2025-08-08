import { expect, test } from "../baseforPOMFixtureExample/pomFixture"
import * as data from "../test-data/addTocart-test-data.json"
import { assert } from "console";

//Below was added, read comment on line 21/23. This info is saved in a test level so we can use it for other tests
//const email = "preno.test@test.com"
//const password = "test123"
//Had to import the files above so we can access the information in them

//Added baseURL to the playwright.config.ts file and the added it below so now we just need to add the route for each test 


//How to run the test on a different browser , couldnt add it below the describe as it fails
// test.use({
//     browserName: "firefox"
// })

test.describe("Page object demo", async () => {


    test('Register test_01', async ({ page, baseURL , registerPage }) => {

        //Creating a new reg page to be used by the test
        //const register = new RegisterPage(page);
        //this adds the route to the base url
        await page.goto(`${baseURL}route=account/register`);
        await registerPage.enterFirstName(data.firstname);
        await registerPage.enterlasttName(data.lastname);
        await registerPage.enterEmail(data.email); //Highlight the email address and hit CTRL . then select Extract to constant in module scope, this allows us to save it as a variable
        await registerPage.enterTelephone(data.phonenumber);
        await registerPage.enterPassword(data.password); //Highlight the email address and hit CTRL + . then select Extract to constant in module scope, this allows us to save it as a variable
        await registerPage.enterConfirmPassword(data.password); //just using password from above


        //Checking if the radio button is checked
        expect(registerPage.isSubscribedChecked()).toBeChecked();

        //Clicking on the T&Cs box, code for the click is already saved in the registerPage.ts
        await registerPage.clickTermAndCondition();

        //Clicking on the continue button, code for the click is already saved in the registerPage.ts
        await registerPage.clickContinueToRegister();

    });

    test('Login test_02 Original', async ({ page, baseURL , loginPage}) => {

        //Creating a new Login page to be used by the test
        //const login = new LoginPage(page);
        //this adds the route to the base url
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.enterEmail(data.email); //email from variable at the top of the page
        await loginPage.enterLoginPassword(data.password); //password from variable at the top of the page


        //Clicking on the Login button, code for the click is already saved in the LoginPage.ts
        await loginPage.clickLoginBtn();

        //Assert that the page title/Tab name to be My Account
        expect(await page.title()).toBe("My Account");

    });

    test('GivenLogin_WhenNoPasswordSupplied_ThenLoginFail', async ({ page, baseURL ,loginPage }) => {

        //Creating a new Login page to be used by the test
        //const login = new LoginPage(page);
        //this adds the route to the base url
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.enterEmail(data.email); //email from variable at the top of the page
        await loginPage.emptyPassword();
        //await login.enterLoginPassword(password)//password from variable at the top of the page
        //Clicking on the Login button, code for the click is already saved in the LoginPage.ts
        await loginPage.clickLoginBtn();

        //Assert that the page title/Tab name to be My Account
        //expect(await page.title()).toBe("My Account")
        expect(page.locator("//div[contains(@class,'alert alert-danger')]")).toContainText("Warning");

    });

    //I dont need to do the login again here for this testn as I created a function at the top of the LoginPage.ts file that i can just call
    test('add To Cart test_03', async ({ page, baseURL ,loginPage , homePage, megaMenuPage}) => {

        ///***This does the login now for the below test so that we dont need to do the whole login code again */
        //const login = new LoginPage(page);
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.login(data.email, data.password);

        //Creating a constructor so the test has access both the homePage and the MegaMenu Page
        //const homePage = new HomePage(page);
        //const megaMenuPage = new MegaMenuPage(page);

        //Clicking the buutons on the home page to direct me to the mega menu page
        await homePage.clickOnSMegaMenu();
        await homePage.clickOnHeadphones();

        await megaMenuPage.addFirstProductToTheCart();


        //Checking if the cart is visible in top right corner
        const isCartVisible = await megaMenuPage.isToastVisible();
        expect(isCartVisible).toBeVisible();

    });
})


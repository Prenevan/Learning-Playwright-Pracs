import { expect, test } from "@playwright/test"
//JavaScript Alerts
test('handling alerts', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo")



    //****Step 2: With Alerts, you need to handle the alerts here before the clicking of the button that triggeres the alert.

    page.on("dialog", async (alert) => {
        //Saving the default text on the Alert dialog and printing it
        const text = alert.message();
        console.log(text);
        //Accepting the alert dialog with a single ok or accept button
        await alert.accept();

    })

    //**Step 1: Cicking on the click me button to bring up the alert
    //You can use the below if we have multiple buttons with the same name and letXpath cant find a css or xpath , we use the nth(0) to show which button we want eg. 0, 1 ,2
    await page.locator("button:has-text('Click Me')").nth(0).click();
    // await page.click("(//button[@type='button'])[1]")

})

test('Test 1 of 2 :handling alerts with 2 buttons and selecting the Dismiss or cancel button', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo")

    page.on("dialog", async (alert) => {
        //Saving the default text on the Alert dialog and printing it
        const text = alert.message();
        console.log(text);
        //Accepting the alert dialog with a single ok or accept button
        await alert.dismiss();

    })

    //**Step 1: Cicking on the click me button to bring up the alert
    await page.locator("button:has-text('Click Me')").nth(1).click();
    //Assert
    expect(page.locator("#confirm-demo")).toContainText("Cancel")

})

test('Test 2 of 2: handling alerts with 2 buttons and selecting the Ok button', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo")

    page.on("dialog", async (alert) => {
        //Saving the default text on the Alert dialog and printing it
        const text = alert.message();
        console.log(text);

        //Accepting the alert dialog with a single ok or accept button
        await alert.accept();

    })

    //**Step 1: Cicking on the click me button to bring up the alert
    await page.locator("button:has-text('Click Me')").nth(1).click();
    //Assert
    expect(page.locator("#confirm-demo")).toContainText("OK!")

})

test('handling alerts where you need to input text in the alert dialog', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo")



    //****Step 2: With Alerts, you need to handle the alerts here before the clicking of the button that triggeres the alert.

    page.on("dialog", async (alert) => {
        //Saving the default text on the Alert dialog and printing it
        const text = alert.defaultValue(); //Changed this to defaultValue from .message and it displays the text in the input field befor typing
        console.log(text);

        //Accepting the alert dialog with a single ok or accept button
        await alert.accept("Preno");//Entered the text thats needed in the input box on the dialog

    })

    //**Step 1: Cicking on the click me button to bring up the alert
    //You can use the below if we have multiple buttons with the same name and letXpath cant find a css or xpath , we use the nth(0) to show which button we want eg. 0, 1 ,2
    await page.locator("button:has-text('Click Me')").nth(2).click();
    // await page.click("(//button[@type='button'])[1]")

    //Assert
    expect(page.locator("#prompt-demo")).toContainText("'Preno'")


    //Testing Bootsrap modal dialogs which allows you to interact with the page unlike Javascript Alerts
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo")
    await page.click("(//button[@type='button'])[1]")

    await page.click("(//button[@class='btn']/following-sibling::button)[1]")

    await page.waitForTimeout(4000);

})

test('handling Testing Bootsrap modal dialogs', async ({ page }) => {

    //Testing Bootsrap modal dialogs which allows you to interact with the page unlike Javascript Alerts
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo")
    //Clicking on the button to launch the bootstrap modal
    await page.click("(//button[@type='button'])[1]")
    //Clicking on the Save changes button on the bootstrap modal
    await page.click("(//button[@class='btn']/following-sibling::button)[1]")


})
import { chromium, expect, test, type Page } from '@playwright/test';
import { log } from 'console';

//This is to test a Single input field.

//Testblock
test("Interaction with Inputs", async ( {page} ) => {
    //Launching the link
    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");
    //Finding the location for the input box
    const messageInput = page.locator("input#user-message");
    await messageInput.scrollIntoViewIfNeeded()
    //Getting and logging the placeholder text before typing anything in it.
    console.log(await messageInput.getAttribute("placeholder"));

    //Asserting the above input box to make sure that the text in the placeholder matches the expected below and then logs the placeholder value.
    await expect(messageInput).toHaveAttribute("placeholder", "Please enter your Message")
    console.log('Before entering the data: ' +await messageInput.inputValue());


    //await page.fill("input#user-message", "hello")
    //Entering text into the input box and then logging it to the console
    await messageInput.type("Hi Preno");
    console.log('After entering the data above: ' +await messageInput.inputValue());

    await page.waitForTimeout(4000);
    })


test("Sum", async ({ page }) => {
    //Launching the link
    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");

    //Name of the inputs
    const Sum1input = page.locator("#sum1");
    const Sum2input = page.locator("#sum2");

    //Button to do the calculation
    const getValuesBtn = page.locator("(//button[@type='button'])[2]")

    //Numbers to add into the 2 inputs
    let num1 = 121;
    let num2 = 546;
    //Actually adding the numbers into the input boxes , "type" wanted a string but the below allowed me to add numbers
    await Sum1input.fill("" + num1);
    await Sum2input.fill("" + num2);

    //Clicking on the GetSum button
    await getValuesBtn.click()

    //To save the value in a result so we can use it or print it in console.log result.textContent()
    const result = page.locator("#addmessage")
    console.log(await result.textContent())

    //To create the expected result to compare to the actual result after clicking the GetSum button
    let expectedResult = num1 + num2;
    expect(result).toHaveText("" + expectedResult)

    await page.waitForTimeout(4000);

})


test("Checkbox", async ({ page }) => {

    //To click on a checkbox

    //Launching the link
    await page.goto("https://www.lambdatest.com/selenium-playground/checkbox-demo");

    //Saving the checkbox locator to use to be checked
    const singleCheckbox =  page.locator("(//input[@type='checkbox'])[1]")

    //Confirming checkbox is not checked 
    expect(singleCheckbox).not.toBeChecked()

    //Cehcking the box
    await singleCheckbox.check()
    //await page.check("(//input[@type='checkbox'])[1]")

    //Confirming that the checkbox had been checked/Clicked on
    expect(singleCheckbox).toBeChecked()

    await page.waitForTimeout(4000);

})
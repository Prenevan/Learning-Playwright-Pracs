import { expect, test } from "@playwright/test"
import moment from "moment"; //had to install moment package and add to package.json. npm install moment --save

test('Calendar demo using fill function', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo")
    //saving the date as as a variable and then using it in the .fill
    let date = "1990-06-11"
    await page.fill("id=birthday", date);
    await page.waitForTimeout(3000)

    //If it fails due to date being malformed or in a incorrect format , you can run this on the Console in chrome: document.getElementById("birthday").value
})

//Original test
test('Calendar demo using moment for start and end date', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo")
    //saving the date as as a variable and then using it in the .fill

    //Start Date
    await page.click("//input[@placeholder='Start date']")
    //Saving the month and the year in a const - this is the element from the dropdown eg. July 2022
    const mmYY = page.locator("(//th[@class='datepicker-switch'])[1]")
    const prev = page.locator("(//th[@class='prev'])[1]")
    const next = page.locator("(//th[@class='next'])[1]")

    //**New: Need to use this instead of the below as the dates always change so the test could only be correct for that month
    let dateToSelect: string = "December 2025"

    //moment is used as it takes the current date and the MMMM and YYYY is the format you can use
    const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore(); //isBefore returns the boolean for if its the current month or not eg. its currently july so is March before july then its True
    console.log("This month?" + thisMonth)

    //Below is just checking the month
    //This if else is for , if the Month given is a previous month then click prev button, else click next button
    while (await mmYY.textContent() != dateToSelect) {
        if (thisMonth) {
            await prev.click();
        } else {
            await next.click();
        }
    }

    //Below is for selecting the day and above for the month and year 25 Dec 2025, Had to create the locator for the date of 25th
    await page.click("//td[@class='day'][text()='25']")
    
    //Selecting the date but this wont always work as the date changes constantly 
    // await prev.click() //Cloicking the previuos arrow button
    // await page.click("(//td[@class='day'])[3]") //This is the xPath for the actual day like the 4th

    await page.waitForTimeout(3000)

})

//Original test which I changed to a reusable function, this is done by highlighting the code and seleting the globe. 3:07 in the video
test('Calendar demo using moment for start and end date reusable function', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo")


    
    //Updated for function
    // future
    await selectDate(12, "December 2025");

    await page.reload()
    //Present
    await selectDate(29, "July 2025")

    // await page.reload()
    //Past
    await selectDate(12, "March 2025")

    await page.waitForTimeout(3000)

    //Updated for function, added in the date number and the month/year
    async function selectDate(date: number, dateToSelect: string) {
        //Updated - moved this here so when the page reloads it reads the below : Start Date input box
        await page.click("//input[@placeholder='Start date']")

        const mmYY = page.locator("(//th[@class='datepicker-switch'])[1]");
        const prev = page.locator("(//th[@class='prev'])[1]");
        const next = page.locator("(//th[@class='next'])[1]");

        //moment is used as it takes the current date and the MMMM and YYYY is the format you can use
        const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore(); //isBefore returns the boolean for if its the current month or not eg. its currently july so is March before july then its True
        console.log("This month?" + thisMonth);

        //Below is just checking the month
        //This if else is for , if the Month given is a previous month then click prev button, else click next button
        while (await mmYY.textContent() != dateToSelect) {
            if (thisMonth) {
                await prev.click();
            } else {
                await next.click();
            }
        }

        //Below is for selecting the day and above for the month and year 25 Dec 2025, Had to create the locator for the date of 25th
        //Updated for function
        await page.click(`//td[@class='day'][text()='${date}']`);
    }
})

//Testing the Start and End date
test.only('Calendar demo using moment for start and end date reusable function1', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo")
    
    // future start date
    await selectStartDate(12, "December 2025");

    await page.waitForTimeout(3000)

    //Updated for function, added in the date number and the month/year
    async function selectStartDate(date: number, dateToSelect: string) {
        //Updated - moved this here so when the page reloads it reads the below : Start Date input box
        await page.click("//input[@placeholder='Start date']")

        const mmYY = page.locator("(//th[@class='datepicker-switch'])[1]");
        const prev = page.locator("(//th[@class='prev'])[1]");
        const next = page.locator("(//th[@class='next'])[1]");

        //moment is used as it takes the current date and the MMMM and YYYY is the format you can use
        const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore(); //isBefore returns the boolean for if its the current month or not eg. its currently july so is March before july then its True
        console.log("This month?" + thisMonth);

        //Below is just checking the month
        //This if else is for , if the Month given is a previous month then click prev button, else click next button
        while (await mmYY.textContent() != dateToSelect) {
            if (thisMonth) {
                await prev.click();
            } else {
                await next.click();
            }
        }

        //Below is for selecting the day and above for the month and year 25 Dec 2025, Had to create the locator for the date of 25th
        //Updated for function
        await page.click(`//td[@class='day'][text()='${date}']`);
    }
    ///////////////////////////////////////////End Date///////////////////////////////////////////////
    await selectEndDate(13, "December 2025");

    await page.waitForTimeout(3000)

    //Updated for function, added in the date number and the month/year
    async function selectEndDate(date: number, dateToSelect: string) {
        //Updated - moved this here so when the page reloads it reads the below : Start Date input box
        await page.click("//input[@placeholder='End date']")

        const mmYY = page.locator("(//th[@class='datepicker-switch'])[1]");
        const prev = page.locator("(//th[@class='prev'])[1]");
        const next = page.locator("(//th[@class='next'])[1]");

        //moment is used as it takes the current date and the MMMM and YYYY is the format you can use
        const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore(); //isBefore returns the boolean for if its the current month or not eg. its currently july so is March before july then its True
        console.log("This month?" + thisMonth);

        //Below is just checking the month
        //This if else is for , if the Month given is a previous month then click prev button, else click next button
        while (await mmYY.textContent() != dateToSelect) {
            if (thisMonth) {
                await prev.click();
            } else {
                await next.click();
            }
        }

        //Below is for selecting the day and above for the month and year 25 Dec 2025, Had to create the locator for the date of 25th
        //Updated for function
        await page.click(`//td[@class='day'][text()='${date}']`);
    }
})


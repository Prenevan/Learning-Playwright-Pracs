import { chromium, expect, test } from "@playwright/test"

//Had to use a different website to test the below
//To test a single dropdown, this test wont work as the website link below has been removed, so this will just be used as an example.
test("Single dropdown", async ({ page }) => {

    await page.goto("https://letcode.in/dropdowns")
    //To select the option on the dropdown, first you need to add the locator for the dropdown eg.#select-demo and then you add the label(Which is the visible text in the options list)
    await page.selectOption("#fruits", {

        //label: "Apple",
        //Other options you can use instead of label
        //value: "1"
        index: 4

    })

    //Assert
    //expect(page.locator("#subtitle")).toContainText("'Banana'")
    await page.waitForTimeout(4000);

})

//Flakey Test

test("Selecting multiple options in a dropdown", async ({ page }) => {

    await page.goto("https://letcode.in/dropdowns" , { timeout: 60000 })
    //To select the options on the dropdown, first you need to add the locator for the dropdown eg.#select-demo and then you use an array and then select multiple options
    await page.selectOption("#superheros", [{

        label: "The Avengers"
    },
    //selecting multiple you need to add another bracket like this {The avengers},{Batman}
    {
        index: 3
    },
    {
        value: "Ant-Man"
    }

    ])

    await page.waitForTimeout(10000);

})

//jQuery bootstrp ddropdown with search function
test("jquery bootstrap dropdown", async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo")
    //Added country + span as we want to access the info in the Span
    await page.click("#country+span")
    //The Patent list
    //Find this by clicking on select a element button on devtools and then pointing at the text in the dropdown
    await page.locator("ul#select2-country-results")
        //The li sits in the ul and is the actual list that the options sit in 
        .locator("li", {
            hasText: "India"
    }).click()
    await page.waitForTimeout(5000)
})

//Same as the test above however we highligted country+span line to the click then right clicked on the globe that appeares and then create inner function
// then we added selectCountry and countryName.
test("jquery bootstrap dropdown inner function", async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo")
    //Added country + span as we want to access the info in the Span
    await selectCountry("India");
    await selectCountry("Denmark");
    await selectCountry("South Africa");
    //await page.waitForTimeout(5000)

    async function selectCountry(countryName) {
        await page.click("#country+span");
        //The Patent list
        //Find this by clicking on select a element button on devtools and then pointing at the text in the dropdown
        await page.locator("ul#select2-country-results")
            //The li sits in the ul and is the actual list that the options sit in 
            .locator("li", {
                hasText: countryName
            }).click();
    }
})
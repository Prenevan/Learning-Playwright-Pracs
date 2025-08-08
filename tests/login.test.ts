import { chromium, test } from "@playwright/test"


//Login and logout test
test("Login test demo", async () => {

    const browser = await chromium.launch({
        headless: false
    })
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home")
    await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]")
    //await page.click("text=Login")
    await page.click("'Login'")

    await page.fill("input[name='email']", "prenevan13@gmail.com")
    await page.fill("input[name='password']", "Preno0043")
    await page.click("input[value='Login']");

    await page.waitForTimeout(5000);

    //Below loads a new browser window with no cache so session should be logged out
    const newContext = await browser.newContext()

    const newPage = await newContext.newPage();
    await newPage.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/account")

    await newPage.waitForTimeout(5000);

    await page.close()
    await context.close()
    await browser.close()

})
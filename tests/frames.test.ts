import { expect, test } from "@playwright/test"
//The first 2 tests are the same however the second test is easier
test('Interact with frames', async ({ page }) => {

    await page.goto("https://letcode.in/frame")
    //This is to get all the iFrames in the webpage and saves them
    const allframes = page.frames();
    //Printing the number of frames
    console.log("No. of frames: "+ allframes.length)

    //Click on the input box using the select element button and then scroll up till you see html and above that you will find the iFrame and its name
    //Save the frame in a const
    const myFrame = page.frame("firstFr")

    //We have to use the frame object and not the page object
    //The below // is another way to find the iFrame and if it doesnt, it displays a null
    // if (myFrame != null) {
    //     await myFrame.fill("", "")
    // }
    await myFrame?.fill("input[name='fname']", "Preno")
    await myFrame?.fill("input[name='lname']", "Pillay")

    //Assert
    expect(await myFrame?.locator("p.title.has-text-info").textContent()).toContain("Preno Pillay")

    await page.waitForTimeout(3000)

})

test('another way to Interact with frames similar to the above test', async ({ page }) => {

    await page.goto("https://letcode.in/frame")
    //This is to get all the iFrames in the webpage and saves them
    const allframes = page.frames();
    //Printing the number of frames
    console.log("No. of frames: "+ allframes.length)

    const frame = page.frameLocator("#firstFr")
    await frame.locator("input[name='fname']").fill("Preno")
    await frame.locator("input[name='lname']").fill("Pillay")

    //Assert
    expect(await frame.locator("p.title.has-text-info").textContent()).toContain("Preno Pillay")

    await page.waitForTimeout(3000)

})

test('Nested Frame, frame in a frame', async ({ page }) => {

    await page.goto("https://letcode.in/frame")
    //This is to get all the iFrames in the webpage and saves them
    const allframes = page.frames();
    //Printing the number of frames
    console.log("No. of frames: "+ allframes.length)

    const frame = page.frameLocator("#firstFr")
    await frame.locator("input[name='fname']").fill("Preno")
    await frame.locator("input[name='lname']").fill("Pillay")

    //Accessing the InnerFrame or Nested Frame -- note that the css locater had to be built
    const innerFrame = frame.frameLocator("iframe[src='innerframe']")
    await innerFrame.locator("input[name='email']").fill("preno@gmail.com")

    //to interact with any frame, you just need to call it, example below which takes you back to the first frame
    //await frame.locator("input[name='fname']").fill("test")

    //Assert
    expect(await frame.locator("p.title.has-text-info").textContent()).toContain("Preno Pillay")
    // doesnt work expect(await innerFrame.locator("input[name='email']").textContent()).toMatch("preno@gmail.com")
    
    expect(await innerFrame.locator("input[name='email']").inputValue()).toBe("preno@gmail.com");


    await page.waitForTimeout(3000)

})
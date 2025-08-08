import { expect, test, type Page } from '@playwright/test';
import { promiseHooks } from "v8"

test('Interact with multiple tabs like twitter pop up', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo")

    console.log(page.url())

        //This is similar to alert where you need to the wait for event first and then the clicking of the button
        //You also need to use the Promise so once 1 event is done the next occurs as its a promise
    const [newWindow] = await Promise.all([
        page.waitForEvent("popup"),
        page.click("//a[@title='Follow @Lambdatesting on Twitter']")

        
    ])
    console.log(newWindow.url())

    //to Edit the new window you can just do below
    //newWindow.fill("locator", "whatever you want to type")
})

test.only('Interact with multiple tabs like twitter and facebook pop up', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo")

    //console.log(page.url())

   const [multiePage] = await Promise.all([

        page.waitForEvent("popup"),
        page.click("#followboth")
    ])

    //waits for pages to load
    await page.waitForLoadState()

    //Context grabs all the pages and length tells us how many pages/tabs are open
    const pages = multiePage.context().pages()
    console.log('No. of tabs:' + pages.length)

    

    //because its an array, i can use forEach and then im trying to print all the urls that are open
    pages.forEach(tab => {
        console.log(tab.url());
    })

    //Extra notes
    //How to interact with the pages
    //await pages[1].fill("//Locator", "Preno"):

    //how to find out which tab is what number in the array , you need to create a forloop like below and assign the page to a variable *let facebookPage 
    //Added Page to the below so we can assign the facebookPage to a type(Website)
    //You can move the let facebookPage: Page; to below the imports on line 3 and the red from line 64 will go away
    let facebookPage: Page;
    for (let index = 0; index < pages.length; index++) {
        const url   = pages[index].url()
        if (url == "https://www.facebook.com/lambdatest/"){}
        facebookPage = pages[index];
    }
    //Getting the text content from the facebook tab and printing it, going to just comment out the below, it does work though but you need to read line 56 first
    // const text = await facebookPage.textContent("//h1")
    // console.log(text);
})
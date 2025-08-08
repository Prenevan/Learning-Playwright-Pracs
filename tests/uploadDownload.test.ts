import { expect, test } from "@playwright/test"

test.only('Download files', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo")

    await page.type("#textbox", "like, share, comment & subscribe")
    await page.click("id=create")

    // you can use the below however you dont see the ownload file or where it is stored so use the promise method below
   // await page.click("id=link-to-download")

   //saving the below in donwload variable as we are going to use it to find the path
   //This is similar to alerts where you need to do the wait first and then the click
   const download = await Promise.all([
        page.waitForEvent("download"),
        page.click("id=link-to-download")
   ])


   //This downloads the file into the temp folder but playwright deletes it as soon as the browser is closed
   //const path = await download[0].path()
   //console.log(path);

   //This saves the file in fileName property and uses the suggested file name that the website gives the file and saves the download
   const fileName = download[0].suggestedFilename()
   await download[0].saveAs(fileName)
   console.log(fileName)

   //page.on('download', fileName => fileName.path().then(console.log))
   //Saves in playwright folder structure
})

test('upload files', async ({ page }) => {

    await page.goto("https://blueimp.github.io/jQuery-File-Upload/")

    //SetInputFiles is used to add files to the pag, you need to then add locator and file path which is an array for multiple files, also you need to change the slash from the releative path which should be in your folder structure(just right click on the file and select relative path) to "/" from \
    //await page.setInputFiles("input[type='file']", 
        //["uploadItemsTest/upload1.png", "uploadItemsTest/upload2.png"])


    //You could also use the fileChooser option where from the file pop up , you can choose which files you want
    
    const [uploadFiles] = await Promise.all([
        page.waitForEvent("filechooser"),
        page.click("input[type='file']")
    ])

    //Checking if it takes multiple files and using a boolean to log it
    const isMultiple = uploadFiles.isMultiple()
    console.log(isMultiple)
    //uploading the files
    uploadFiles.setFiles(["uploadItemsTest/upload1.png", "uploadItemsTest/upload2.png"])


        await page.waitForTimeout(3000)
})


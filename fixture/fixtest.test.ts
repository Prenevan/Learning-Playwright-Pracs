import {test} from "./myFixture" //Importing the myFixture.ts info in here

//Using the info created in the fixture and manipulating it by adding to the age or making the string all caps
test("fixture demo", async ({ age, email }) => {
    console.log(age+2, email.toUpperCase)
})
import { test as myTest} from "@playwright/test" //myTest is just what we naming the fixture

//Creating a type that contains age and email
type Preno = {
    age: number,
    email: string
}

//Setting the info for age and email
const myFixtureTest = myTest.extend<Preno>({
    age: 35,
    email: "prenevan13@gmail.com"
})

//exporting So i can use this file in other tests
export const test = myFixtureTest;


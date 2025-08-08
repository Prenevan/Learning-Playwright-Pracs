import { test as baseTest } from '@playwright/test';//baseTest is just what we are naming it
//Importing all the classes we going to edit or use
import RegisterPage from "../pages/registerPage"
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';
import MegaMenuPage from "../pages/megaMenuPage";

//Creating a type that contains pages that we are going to use. first is the object name we giving it registerPage and then the actual class RegisterPage from pages/RegisterPage
type pages = {
    registerPage: RegisterPage;
    loginPage: LoginPage;
    homePage: HomePage;
    megaMenuPage: MegaMenuPage;
}

//Setting the info for age and email
const testPages = baseTest.extend<pages>({//pages from type above

// registerPage is coming from type above
    registerPage: async ({page}, use) =>{ //***use is used for over riding information
        await use(new RegisterPage(page))
    },

    loginPage: async ({page}, use) =>{ //used from type above
        await use(new LoginPage(page))
    },

    homePage: async ({page}, use) =>{ //used from type above
        await use(new HomePage(page))
    },

    megaMenuPage: async ({page}, use) =>{ //used from type above
        await use(new MegaMenuPage(page))
    }
})

//exporting So i can use this file in other tests
export const test = testPages

//This export is used so we can use the expect in the first new import in addToCartUsingFixture.test.ts
export const expect = testPages.expect;
import { test, expect } from '@playwright/test';

//To use the Record function, enter the following in the terminal "npx playwright codegen"

test('test', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');

  //Had to add in the below Hover as it was not picked up in the recording
  await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]")
  await page.getByRole('link', { name: 'Login' }).click();


  await page.getByRole('textbox', { name: 'E-Mail Address' }).click();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('prenevan13@gmail.com');
  await page.getByRole('textbox', { name: 'E-Mail Address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Preno0043');
  await page.getByRole('button', { name: 'Login' }).click();


  await page.getByRole('link', { name: ' Edit your account' }).click();
  await page.getByRole('textbox', { name: 'First Name *' }).click();
  await page.getByRole('textbox', { name: 'First Name *' }).fill('Prenevan');
  await page.getByRole('button', { name: 'Continue' }).click();

  //Assert
  await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/account')

  //Had to add in the below Hover as it was not picked up in the recording
  await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]")
  await page.getByRole('link', { name: 'Logout', exact: true }).click();

  //Assert
  await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/logout')

  await page.waitForTimeout(5000);
});
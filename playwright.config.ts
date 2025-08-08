//import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';
//import { dot } from 'node:test/reporters';

//const config: PlaywrightTestConfig = {
  //testMatch: ["tests/recorded.test.ts"],
  //testDir: './tests',
  // use: {
  //   headless: false
  // },
//   reporter: [["dot"], ["json", {
//     outputFile: "jsonReports/jsonReport.json"
//   }], ["html", {
//     open: "never"
//   }]]
// };

export default defineConfig({
  //testDir: config.testDir,
  testMatch:["addToCartUsingFixture.test.ts"],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["dot"], ["json", {
    outputFile: "jsonReports/jsonReport.json"
  }], ["html", {
    open: "always"
  }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    // launchOptions: {
    //   slowMo: 1000
    // },
    /* Base URL to use in actions like `await page.goto('/')`. */

    //Added in the baseURL for the POM tests
    baseURL: 'https://ecommerce-playground.lambdatest.io/index.php?',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  // projects: [
  //    {
  //      name: 'chromium',
  //      use: { ...devices['Desktop Chrome'] },
  //    },

  //    {
  //      name: 'firefox',
  //      use: { ...devices['Desktop Firefox'] },
  //    ,]
  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  //],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

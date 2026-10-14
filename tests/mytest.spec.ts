import { test, expect } from '@playwright/test';

// syntax for test case
// test("title",() => {
//     // step1
//     // step2
//     // step3
// }

// predefined fixtures : global variables : page, browser, context, request, response, baseURL
// page fixture : represents the current page object in the test
test("Verify the title of the page", async ({ page }) => {

    // step1 : navigate to the page
    await page.goto("https://testautomationpractice.blogspot.com/");

    await expect(page).toHaveTitle("Automation Testing Practice");

    // Also can use title predefined function for verification:
    let title: string = await page.title();
    console.log("title of the page : " + title);
});

// to run :
// npx playwright test tests/mytest.spec.ts --ui
// npx playwright test
// npx playwright test --headed
// npx playwright test --project=chromium --headed

// to get the report on browser:
// npx playwright show-report
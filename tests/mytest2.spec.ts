import { test, expect } from '@playwright/test';


test("Verify the title of the page", async ({ page }) => {

    // step1 : navigate to the page
    await page.goto("https://testautomationpractice.blogspot.com/");

    //checking URL
    let url: string = await page.url();
    console.log("url of the page : " + url);
    await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/");

});

import { test, expect } from '@playwright/test';
//02112026 Assignment 1
test('Automate New Tab and New Window on DemoQA', async ({ page }) => {
    await page.goto('https://demoqa.com/browser-windows');
    const tabPromise = page.waitForEvent('popup');
    await page.locator('#tabButton').click();
    const newTab = await tabPromise;
    await expect(newTab).toHaveURL('https://demoqa.com/sample');
    await expect(newTab.locator('#sampleHeading')).toHaveText('This is a sample page');
    await newTab.close();
    const windowPromise = page.waitForEvent('popup');
    await page.locator('#windowButton').click();
    const newWindow = await windowPromise;
    await expect(newWindow).toHaveURL('https://demoqa.com/sample');
    await expect(newWindow.locator('#sampleHeading')).toHaveText('This is a sample page');
    await newWindow.close();
});

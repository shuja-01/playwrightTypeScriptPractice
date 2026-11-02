import { test, expect } from '@playwright/test';

test('Automate New Tab and New Window on DemoQA', async ({ page }) => {
    // Open website
    await page.goto('https://demoqa.com/browser-windows');

    // 1. Click "New Tab" button
    const tabPromise = page.waitForEvent('popup');
    await page.locator('#tabButton').click();
    const newTab = await tabPromise;

    // Validate new tab URL and Heading
    await expect(newTab).toHaveURL('https://demoqa.com/sample');
    await expect(newTab.locator('#sampleHeading')).toHaveText('This is a sample page');
    await newTab.close();

    // 2. Click "New Window" button
    const windowPromise = page.waitForEvent('popup');
    await page.locator('#windowButton').click();
    const newWindow = await windowPromise;

    // Validate new window URL and Heading
    await expect(newWindow).toHaveURL('https://demoqa.com/sample');
    await expect(newWindow.locator('#sampleHeading')).toHaveText('This is a sample page');
    await newWindow.close();
});

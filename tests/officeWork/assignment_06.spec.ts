import { test, expect } from '@playwright/test';
// 02112026 : Assignment 2
test('Automate Date and Time Field on DemoQA', async ({ page }) => {
    await page.goto('https://demoqa.com/date-picker', { waitUntil: 'domcontentloaded' });
    const dateTimeInput = page.locator('#dateAndTimePickerInput');
    await dateTimeInput.click();
    await page.locator('.react-datepicker__day').getByText('25', { exact: true }).first().click();
    await page.locator('.react-datepicker__time-list-item').getByText('12:00').click();
    const selectedValue = await dateTimeInput.inputValue();
    expect(selectedValue).toContain('25');
    expect(selectedValue).toContain('12:00 PM');
});

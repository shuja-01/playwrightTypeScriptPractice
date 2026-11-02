import { test, expect } from '@playwright/test';

test('Automate Date and Time Field on DemoQA', async ({ page }) => {
    // 1. Open Date Picker page
    await page.goto('https://demoqa.com/date-picker', { waitUntil: 'domcontentloaded' });

    // 2. Click Date and Time input field
    const dateTimeInput = page.locator('#dateAndTimePickerInput');
    await dateTimeInput.click();

    // 3. Select a Day (e.g., 25)
    await page.locator('.react-datepicker__day').getByText('25', { exact: true }).first().click();

    // 4. Select a Time (e.g., 12:00)
    await page.locator('.react-datepicker__time-list-item').getByText('12:00').click();

    // 5. Validate selected date and time
    const selectedValue = await dateTimeInput.inputValue();
    expect(selectedValue).toContain('25');
    expect(selectedValue).toContain('12:00 PM');
});

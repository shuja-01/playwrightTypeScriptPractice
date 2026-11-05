import { test, expect } from '@playwright/test';

test('Flight Search on MakeMyTrip with Logs and Screenshots', async ({ page }) => {
    try {
        await page.goto('https://www.makemytrip.com/');
    } catch {
        await page.waitForTimeout(1000);
        await page.goto('https://www.makemytrip.com/');
    }
    await page.waitForTimeout(2000);
    console.log('Before closing popup');
    const closeBtn = page.locator('.commonModal__close, span[data-cy="closeModal"]');
    if (await closeBtn.isVisible().catch(() => false)) {
        await closeBtn.click();
    }
    const countryModalBtn = page.getByText('Continue with MakeMyTrip India');
    if (await countryModalBtn.isVisible().catch(() => false)) {
        await countryModalBtn.click();
    }
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/after_popup_closed.png' });
    await page.locator('label[for="fromCity"]').click();
    const fromInput = page.locator('input[placeholder="From"]');
    await fromInput.fill('Chennai');
    await page.waitForTimeout(1000);
    await page.locator('ul[role="listbox"] li').first().click();
    const toInput = page.locator('input[placeholder="To"]');
    if (!(await toInput.isVisible().catch(() => false))) {
        await page.locator('label[for="toCity"]').click();
    }
    await toInput.fill('Delhi');
    await page.waitForTimeout(1000);
    await page.locator('ul[role="listbox"] li').first().click();
    console.log('After selecting cities');
    await page.waitForTimeout(1000);
    const futureDay = page.locator('.DayPicker-Day[aria-disabled="false"]').nth(7);
    await futureDay.click();
    console.log('Before clicking search');
    const searchButton = page.locator('.widgetSearchBtn, a:has-text("Search")').first();
    await searchButton.click();
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'screenshots/after_search_results.png' });
});

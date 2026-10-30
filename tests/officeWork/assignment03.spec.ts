import { test, expect } from '@playwright/test';

test('Verify MakeMyTrip URL with manual browser context', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.makemytrip.com');
    await expect(page).toHaveURL(/.*trip.*/);
    expect(page.url()).toContain('trip');

    await context.close();
});

// running on both browser : 
// npx playwright test tests/officeWork/assignment03.spec.ts --headed --workers=1

// Chromium only: npx playwright test tests/officeWork/assignment03.spec.ts --project=chromium --headed
// Firefox only: npx playwright test tests/officeWork/assignment03.spec.ts --project=firefox --headed
import { test, expect } from '@playwright/test';

test('Verify MakeMyTrip URL with manual browser context', async ({ browser }) => {
    // Launch a new browser context manually
    const context = await browser.newContext();

    // Open a new page inside that context
    const page = await context.newPage();

    // Navigate to https://www.makemytrip.com
    await page.goto('https://www.makemytrip.com', { waitUntil: 'domcontentloaded' });

    // Simple assertion to check the URL contains "trip"
    await expect(page).toHaveURL(/.*trip.*/);
    // Or assert using string check:
    expect(page.url()).toContain('trip');

    // Close context
    await context.close();
});

// running on both browser : 
// npx playwright test tests/officeWork/assignment03.spec.ts --headed --workers=1

// Chromium only: npx playwright test tests/officeWork/assignment03.spec.ts --project=chromium --headed
// Firefox only: npx playwright test tests/officeWork/assignment03.spec.ts --project=firefox --headed
import { test, expect } from '@playwright/test';

// Hooks
test.beforeEach(async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
        await page.screenshot({ path: 'screenshots/failure.png', fullPage: true });
    }
});

test('Demo Web Shop Complete User Journey', async ({ page, context }) => {
    // Event Listeners
    page.on('console', msg => console.log('Console message:', msg.text()));
    page.on('pageerror', err => console.log('Page error:', err.message));
    page.on('requestfailed', req => console.log('Failed request:', req.url()));

    // Locators & Web Elements
    await page.locator('.ico-register').click();
    await page.locator('#gender-male').check();
    await page.locator('#FirstName').fill('John');
    await page.locator('#LastName').fill('Doe');

    const email = 'john' + Date.now() + '@test.com';
    await page.locator('#Email').fill(email);
    await page.locator('#Password').fill('Password123');
    await page.locator('#ConfirmPassword').fill('Password123');
    await page.locator('#register-button').click();

    // Assertions
    await expect(page.locator('.result')).toHaveText('Your registration completed');
    await expect(page.locator('.header-links .account')).toHaveText(email);

    // Mouse Actions / Mouse Hover Actions
    await page.locator('.top-menu a[href="/computers"]').hover();
    await page.locator('.top-menu a[href="/desktops"]').click();

    // Dropdowns / Dropdown Handling
    await page.locator('#products-orderby').selectOption('Price: Low to High');

    await page.getByText('Build your own cheap computer').click();
    await page.locator('#add-to-cart-button-72').click();

    await expect(page.locator('#bar-notification')).toBeVisible();
    await expect(page.locator('.cart-qty')).toHaveText('(1)');

    // Screenshots
    await page.screenshot({ path: 'screenshots/full_page.png', fullPage: true });
    await page.locator('#topcartlink').screenshot({ path: 'screenshots/cart_section.png' });

    // Cart Validation
    await page.locator('#topcartlink').click();
    await expect(page.locator('.product-name')).toHaveText('Build your own cheap computer');
    await expect(page.locator('.qty-input')).toHaveValue('1');

    // Multi-Tab Handling
    const newTab = await context.newPage();
    await newTab.goto('https://www.w3schools.com/html/tryit.asp?filename=tryhtml_iframe');

    // Frames / Frame Handling
    const innerFrame = newTab.frameLocator('#iframeResult').frameLocator('iframe');
    const heading = innerFrame.locator('h1');

    console.log('Iframe Heading:', await heading.textContent());
    await expect(heading).toBeVisible();
    await newTab.screenshot({ path: 'screenshots/iframe_screenshot.png' });

    await newTab.close();

    // Logout Validation
    await page.bringToFront();
    await page.locator('.ico-logout').click();
    await expect(page.locator('.ico-login')).toBeVisible();
});




import { test, expect } from '@playwright/test';
// Assignment 0611
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
    await page.locator('#FirstName').fill('Shuja');
    await page.locator('#LastName').fill('Rizvi');

    const email = 'shuja' + Date.now() + '@test.com';
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





//result ::

//Line1 :  Running 1 test using 1 worker
//Line2 :  [chromium] › tests\officeWork\assignment_08.spec.ts:14:5 › Demo Web Shop Complete User Journey
//Why it's printed: Playwright tells you it found 1 test in your file and is running it on 1 parallel worker process. The second line shows the browser ([chromium]), the file path and line/column number where the test(...) block starts (14:5), and the title of the test (Demo Web Shop Complete User Journey).

//Line3 :  Console message: [DOM] Input elements should have autocomplete attributes (suggested: "new-password"): (More info: https://goo.gl/9p2vKq) %o
//Line4 :  Console message: [DOM] Input elements should have autocomplete attributes (suggested: "new-password"): (More info: https://goo.gl/9p2vKq) %o
// Why it's printed: On line 16, you wrote:
    // page.on('console', msg => console.log('Console message:', msg.text()));
    // When your test clicked .ico-register (line 21) to open the registration page on demowebshop.tricentis.com, Chromium inspected the page's HTML and saw two password fields (#Password and #ConfirmPassword) that don't have an autocomplete="new-password" attribute in the website's source code. Chromium logged two best-practice warnings into the browser's DevTools console (one for each field), and your page.on('console') listener caught them and printed them to your terminal.

//Line5 :  Failed request: https://s7.addthis.com/js/250/addthis_widget.js
//Line6 :  Console message: Failed to load resource: net::ERR_NAME_NOT_RESOLVED
// Why it's printed:
    // 1. Failed request: ... comes from your listener on line 18: page.on('requestfailed', req => console.log('Failed request:', req.url()));
    // 2. Console message: Failed to load resource... comes from your page.on('console') listener on line 16.
    //What happened: When your test navigated to the product details page (Build your own cheap computer on line 43), the Demo Web Shop website tried to load an old social-sharing script from s7.addthis.com. Because Oracle permanently shut down the AddThis service in 2023, that domain no longer resolves (ERR_NAME_NOT_RESOLVED). It is a broken third-party script on the demo site itself—not a bug in your test—and your listeners simply reported that the network request failed.
    
//Line7 :  Iframe Heading: This page is displayed in an iframe
//Why it's printed: On line 66, you explicitly logged the text content of the <h1> element inside the nested iframe on the W3Schools tab: console.log('Iframe Heading:', await heading.textContent());

//Line8 :    1 passed (16.1s)
//Line9 : To open last HTML report run:
//Line10 : npx playwright show-report
//Why it's printed: Playwright's final summary confirming that all assertions in your test succeeded (1 passed) in 16.1 seconds, along with the command you can run if you want to view the visual HTML report in your browser.

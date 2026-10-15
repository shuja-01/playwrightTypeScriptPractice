import { test, expect, Locator, selectors } from '@playwright/test';

/**
 * ============================================================================
 * PLAYWRIGHT LOCATORS MASTER GUIDE
 * ============================================================================
 * Playwright recommends user-facing locators because they are resilient to
 * implementation changes (like CSS refactoring).
 * 
 * Recommended Locator Hierarchy:
 * 1. page.getByRole()        -> Buttons, headings, links, checkboxes (ARIA)
 * 2. page.getByLabel()       -> Form inputs linked to <label> or aria-label
 * 3. page.getByPlaceholder() -> Form inputs with placeholder text
 * 4. page.getByText()        -> Non-interactive text (spans, divs, paragraphs)
 * 5. page.getByAltText()     -> Images with alt text
 * 6. page.getByTitle()       -> Elements with title attribute (tooltips)
 * 7. page.getByTestId()      -> Explicit test attributes (data-testid / data-test)
 * 8. page.locator()          -> Generic CSS or XPath (fallback)
 * ============================================================================
 */

test.describe("Playwright Locators Comprehensive Demo", () => {

    // Test 1: Real-World E-Commerce Flow on SauceDemo
    test("Demo 1: Real-world E-Commerce flow (Role, Placeholder, Text, Alt, Label, TestId, CSS, XPath)", async ({ page }) => {

        // Tell Playwright to recognize 'data-test' as testId (SauceDemo uses data-test instead of data-testid)
        selectors.setTestIdAttribute('data-test');

        // Step 1: Navigate to the target web application
        await page.goto("https://www.saucedemo.com/");

        // --------------------------------------------------------------------
        // 1. page.getByPlaceholder(text, options)
        // Used to locate input fields by their placeholder attribute.
        // Best for search inputs, login inputs, etc.
        // --------------------------------------------------------------------
        const usernameInput: Locator = page.getByPlaceholder("Username");
        const passwordInput: Locator = page.getByPlaceholder("Password");

        await usernameInput.fill("standard_user");
        await passwordInput.fill("secret_sauce");

        // --------------------------------------------------------------------
        // 2. page.getByRole(role, options)
        // Playwright's MOST RECOMMENDED locator.
        // Locates elements by their ARIA accessible role (button, link, heading, checkbox, combobox, etc.).
        // Option 'name' matches the accessible name (button text, aria-label, etc.).
        // --------------------------------------------------------------------
        const loginButton: Locator = page.getByRole("button", { name: "Login" });
        await loginButton.click();

        // --------------------------------------------------------------------
        // 3. page.getByText(text, options)
        // Locates elements by visible text content.
        // Recommended for non-interactive elements like headings, paragraphs, spans, divs.
        // exact: false (default) matches substring; exact: true matches exact string.
        // --------------------------------------------------------------------
        const pageHeader: Locator = page.getByText("Products");
        await expect(pageHeader).toBeVisible();

        const backpackTitle: Locator = page.getByText("Sauce Labs Backpack", { exact: true });
        await expect(backpackTitle).toBeVisible();

        // --------------------------------------------------------------------
        // 4. page.getByAltText(text, options)
        // Locates elements (usually <img> or <area>) by their 'alt' attribute.
        // Excellent for verifying logos, product photos, icons.
        // --------------------------------------------------------------------
        const backpackImage: Locator = page.getByAltText("Sauce Labs Backpack");
        await expect(backpackImage).toBeVisible();

        // --------------------------------------------------------------------
        // 5. page.getByLabel(text, options)
        // Locates form controls (input, select, textarea) by:
        // - Associated <label for="id"> text
        // - Or direct 'aria-label' attribute
        // Here, SauceDemo's sort dropdown has aria-label="Sort products"
        // --------------------------------------------------------------------
        const sortDropdown: Locator = page.getByLabel("Sort products");
        await expect(sortDropdown).toBeVisible();
        await sortDropdown.selectOption("lohi"); // Sort Price: Low to High

        // --------------------------------------------------------------------
        // 6. page.getByTestId(testId)
        // Locates elements by dedicated test attribute (default: data-testid).
        // Resilient to redesigns because developers explicitly add this for QA.
        // --------------------------------------------------------------------
        const addToCartBtn: Locator = page.getByTestId("add-to-cart-sauce-labs-backpack");
        await addToCartBtn.click();

        // Verify shopping cart badge reflects the added item
        const cartBadge: Locator = page.getByTestId("shopping-cart-badge");
        await expect(cartBadge).toHaveText("1");

        // --------------------------------------------------------------------
        // 7. page.locator(selector) - CSS Selector
        // Generic locator used when built-in locators are not feasible.
        // Supports all standard CSS selectors: id (#id), class (.class), attributes ([attr=val]).
        // --------------------------------------------------------------------
        const cartContainer: Locator = page.locator("#shopping_cart_container");
        await expect(cartContainer).toBeVisible();
        await cartContainer.click();

        // --------------------------------------------------------------------
        // 8. page.locator(selector) - XPath Selector
        // Generic locator using XPath queries (starts with // or xpath=).
        // Useful for complex ancestor/descendant traversal when CSS is insufficient.
        // --------------------------------------------------------------------
        const checkoutButtonXPath: Locator = page.locator("//button[@id='checkout']");
        await expect(checkoutButtonXPath).toBeVisible();
    });

    // Test 2: Dedicated Demonstration of getByTitle, getByLabel (<label for>), and getByTestId
    test("Demo 2: Form controls and Tooltip locators (getByLabel with <label>, getByTitle, getByTestId)", async ({ page }) => {

        // page.setContent lets us render clean HTML directly in browser without relying on external network
        await page.setContent(`
            <!DOCTYPE html>
            <html>
            <head><title>Locators Demo Form</title></head>
            <body>
                <h2>User Registration</h2>
                <form>
                    <!-- 1. Standard HTML <label> linked via 'for' attribute -->
                    <label for="fullName">Full Name:</label>
                    <input id="fullName" type="text" placeholder="e.g. John Doe" />

                    <!-- Radio button with associated label -->
                    <label for="newsletter">Subscribe to Newsletter</label>
                    <input id="newsletter" type="checkbox" />

                    <!-- 2. Element with a 'title' attribute (hover tooltip) -->
                    <button id="help-btn" type="button" title="Click for help instructions">Help</button>

                    <!-- 3. Element with default 'data-testid' -->
                    <div data-testid="status-banner">Ready for submission</div>
                </form>
            </body>
            </html>
        `);

        // --------------------------------------------------------------------
        // getByLabel() with traditional <label for="id">
        // --------------------------------------------------------------------
        const nameField: Locator = page.getByLabel("Full Name:");
        await nameField.fill("Mohd Shuja");
        await expect(nameField).toHaveValue("Mohd Shuja");

        const checkbox: Locator = page.getByLabel("Subscribe to Newsletter");
        await checkbox.check();
        await expect(checkbox).toBeChecked();

        // --------------------------------------------------------------------
        // getByTitle(text, options)
        // Locates elements by their 'title' attribute (commonly used for tooltips / icon buttons).
        // --------------------------------------------------------------------
        const helpButton: Locator = page.getByTitle("Click for help instructions");
        await expect(helpButton).toBeVisible();

        // --------------------------------------------------------------------
        // getByTestId(testId) with standard 'data-testid'
        // Resetting back to standard data-testid attribute
        // --------------------------------------------------------------------
        selectors.setTestIdAttribute('data-testid');
        const banner: Locator = page.getByTestId("status-banner");
        await expect(banner).toHaveText("Ready for submission");
    });
});



// # Run headless
// npx playwright test pwlocators2.spec.ts

// # Run with browser window visible
// npx playwright test pwlocators2.spec.ts --headed

// # Open the HTML report
// npx playwright show-report

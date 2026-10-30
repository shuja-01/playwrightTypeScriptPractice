import { test, expect } from '@playwright/test';

test('Demo Web Shop task', async ({ page }) => {
    // Open website
    await page.goto('https://demowebshop.tricentis.com/');

    // Locate the searchbox
    const searchBox = page.locator('#small-searchterms');

    // Type "book" -> press down arrow to select the product name
    await searchBox.fill('book');
    await page.waitForTimeout(10000);
    await searchBox.press('ArrowDown');

    // Click Search button
    await page.locator('input[value="Search"]').click();

    // Validate the product name "Health Book" (assertion)
    const product = page.locator('.product-title a');
    await expect(product).toHaveText('Health Book');
    await product.click();

    // Locate Qty text box and fill 3 as quantity
    const qtyBox = page.locator('#addtocart_22_EnteredQuantity');
    await qtyBox.fill('3');

    // Click on Add to Cart button
    await page.locator('#add-to-cart-button-22').click();

    // Validate the visible text (assertion)
    const notification = page.locator('#bar-notification .content');
    await expect(notification).toBeVisible({ timeout: 10000 });
    await expect(notification).toContainText('The product has been added to your shopping cart');
});

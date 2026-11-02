import { test, expect } from '@playwright/test';

test('Demo Web Shop task', async ({ page }) => {
    // Open website
    await page.goto('https://demowebshop.tricentis.com/');
    const searchBox = page.locator('#small-searchterms');
    await searchBox.fill('book');
    await page.waitForTimeout(10000);
    await searchBox.press('ArrowDown');
    await page.locator('input[value="Search"]').click();
    const product = page.locator('.product-title a');
    await expect(product).toHaveText('Health Book');
    await product.click();
    const qtyBox = page.locator('#addtocart_22_EnteredQuantity');
    await qtyBox.fill('3');
    await page.locator('#add-to-cart-button-22').click();
    const notification = page.locator('#bar-notification .content');
    await expect(notification).toBeVisible({ timeout: 10000 });
    await expect(notification).toContainText('The product has been added to your shopping cart');
});

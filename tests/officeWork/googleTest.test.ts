import { test, expect } from '@playwright/test';

test("validate google title", async ({ page }) => {
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle("Google");

    await page.getByText(" AI Mode").click();
    const searchAI = page.getByPlaceholder("Ask Google")
    await expect(searchAI).toBeEnabled()
    searchAI.fill("How to book a flight in makemytrip?")

    await expect(searchAI).toHaveValue("How to book a flight in makemytrip?")
});

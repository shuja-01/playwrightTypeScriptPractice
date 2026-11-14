import { Locator, Page, expect } from "@playwright/test";

export class DemoWebShop {
    page: Page;
    loginLink: Locator;
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    booksCategory: Locator;
    booksList: Locator;
    notificationBar: Locator;
    cartQty: Locator;
    logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator(".ico-login");
        this.emailInput = page.locator("#Email");
        this.passwordInput = page.locator("#Password");
        this.loginButton = page.locator('input[value="Log in"]');
        this.booksCategory = page.locator('.top-menu a[href="/books"]');
        this.booksList = page.locator(".item-box");
        this.notificationBar = page.locator("#bar-notification");
        this.cartQty = page.locator(".cart-qty");
        this.logoutLink = page.locator(".ico-logout");
    }

    async loadPage(url: string) {
        await this.page.goto(url);
    }

    async login(email: string, password: string) {
        await this.loginLink.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async navigateToBooks() {
        await this.booksCategory.click();
    }

    async addBooksToCart(books: string) {
        const bookList = books.split(",");
        const count = await this.booksList.count();

        for (const book of bookList) {
            const beforeQty = await this.cartQty.textContent();

            for (let i = 0; i < count; i++) {
                const item = this.booksList.nth(i);
                const bookName = await item.locator(".product-title a").textContent();
                if (book === bookName) {
                    await item.locator('input[value="Add to cart"]').click();
                    break;
                }
            }

            await expect(this.notificationBar).toBeVisible();
            await expect(this.notificationBar).toContainText("The product has been added to your shopping cart");

            await expect(this.cartQty).not.toHaveText(beforeQty!);
        }
    }

    async logout() {
        await this.logoutLink.click();
        await expect(this.loginLink).toBeVisible();
    }
}


import { Page, Locator, expect } from '@playwright/test';

export class Login {
    // assighment_1111
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly productsTitle: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button');
        this.productsTitle = page.locator('.title');
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.getByRole('button', { name: 'Logout' });
    }

    async launchApp(url: string) {
        await this.page.goto(url);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(this.productsTitle).toHaveText('Products');
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
        await expect(this.loginButton).toBeVisible();
    }
}

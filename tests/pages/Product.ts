import { Locator, Page } from "@playwright/test";

export class Product {
    page: Page;
    products: Locator;
    carLink: Locator;
    cartItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".inventory_item_description"); // 6 elements
        // console.log("this.products : ", page.locator(".inventory_item_description"));
        this.carLink = page.locator(".shopping_cart_link");
        this.cartItem = page.locator(".cart_item");
    }

    async findProducts(product: string) {
        const productList = product.split(",");
        // console.log("Product List : ", productList);
        const count = await this.products.count();
        // console.log("Product Count : ", count);
        for (const prod of productList) {
            for (let i = 0; i < count; i++) {
                const item = this.products.nth(i);
                const productName = await item.locator(".inventory_item_name").textContent();
                if (prod === productName) {
                    console.log(`adding ${i} Product Name : ${productName}`);
                    await item.locator("button").click();
                    break;
                }
            }
        }
    }
}

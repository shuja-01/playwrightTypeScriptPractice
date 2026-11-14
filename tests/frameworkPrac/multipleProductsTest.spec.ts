import { test, expect } from "@playwright/test";
import { Login } from "../pages/Login";
import { readExcel } from "../util/ExcelUtil";
import { Product } from "../pages/Product";

type input = {
    url: string;
    username: string;
    password: string;
    product: string;
};

// test.describe.configure({ mode: "parallel" });
test.only("Adding Product into the cart using Excel data", async ({ page }) => {
    const dataSet: input[] = await readExcel("./testData/data.xlsx");
    const login: Login = new Login(page);
    const product: Product = new Product(page);
    for (const data of dataSet) {
        await login.loadPage(data.url);
        await login.fillCredentials(data.username, data.password);
        await expect(page).toHaveURL(/inventory/);
        await product.findProducts(data.product);
        await product.carLink.click();
        await expect(product.cartItem).toContainText(data.product.split(","));
    }
});

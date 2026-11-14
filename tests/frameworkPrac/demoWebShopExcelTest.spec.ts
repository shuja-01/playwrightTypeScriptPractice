import { test } from "@playwright/test";
import { DemoWebShop } from "../pages/DemoWebShop";
import { readExcel } from "../util/ExcelUtil";

type input = {
    url: string;
    username: string;
    password: string;
    product: string;
};

test.only("Demo Web Shop Books Cart Flow using Excel data", async ({ page }) => {
    const dataSet: input[] = await readExcel("./testData/demoShopData.xlsx");
    const demoShop: DemoWebShop = new DemoWebShop(page);

    for (const data of dataSet) {
        await demoShop.loadPage(data.url);
        await demoShop.login(data.username, data.password);
        await demoShop.navigateToBooks();
        await demoShop.addBooksToCart(data.product);
        await demoShop.logout();
    }
});


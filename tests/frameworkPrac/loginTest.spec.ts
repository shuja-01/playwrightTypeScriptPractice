import { test } from '@playwright/test';
import { Login } from '../pages/Login';
import testData from './testData.json' with { type: 'json' };
// assighment_1111
type data = {
    appUrl: string;
    customerType: string;
    username: string;
    password: string;
};

test.describe.configure({ mode: 'parallel' });
const dataSet: data[] = testData;
for (const data of dataSet) {
    test(`Login and Logout flow for ${data.customerType} (${data.username})`, async ({ page }) => {
        const loginPage: Login = new Login(page);
        await loginPage.launchApp(data.appUrl);
        await loginPage.login(data.username, data.password);
        await loginPage.logout();
    });
}

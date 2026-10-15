// DOM: Document Object Model
// it is basically an API interface, whenever page is get loded DOM will be created by browser at runtime
// that DOM is basically HTML + XML
//https://demo.nopcommerce.com/

import { test, expect, Locator } from '@playwright/test';

test("Demo PW locators", async ({ page }) => {

    await page.goto("https://demo.nopcommerce.com/");

    //Locator is also a fixture in playwright, we will get locator objects when we get any element in the page using any method.
    //locator method will return locator object

    //page.getByAltText("")
    const logo: Locator = page.getByAltText("nopCommerce demo store"); //no need to put awain here, because the method will not do any action, it will just return the locator object and which will be done in very fast manner.
    console.log("logo locator object : " + logo);

    //adding assertion:
    await expect(logo).toBeVisible();


    //=====================
    //page.getByText("") : find an element by the text it contains, We can match by sbstring, exact string.
    //We use this locator to find non-interactable elements lik div, span, p etc.
    //For interactable elements we can use page.getByRole, it is recommended to use page.getByRole

    // const test: Locator = page.getByText("Welcome to our store");
    // await expect(test).toBeVisible();
    // or
    await expect(page.getByText("Welcome to our store")).toBeVisible(); //full string/full text

    //we can also use partial string :
    await expect(page.getByText("Welcome to")).toBeVisible(); //partial string/substring

    //using regex:
    await expect(page.getByText("/Welcome\s+To\s+Our\s+Store/")).toBeVisible(); //regex with whitespace
    //============================

    //getByRole() : very useful to find interactive elements, button, links, select, option, textarea, textInput
    await page.getByRole("link", { name: 'Register' }).click();
    await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();

    //===============
    //getByLabel(): locate from control by label's text
    //when to use : Ideal for form fields with visible labels.

    await page.getByLabel("First name").fill("Shuja");
    await page.getByLabel("Last name").fill("Rizv");
    await page.getByLabel("Email").fill("shuja.rizzz@110.com");

    //=================
    //getByPlaceholder()
    await page.getByPlaceholder("Search store").fill("Computers");
    await page.getByPlaceholder("Search store").press("Enter");
    //=================


    //=================
    //getByTitle():  to locate an element by its title attribute
    //when to use : when element has a meaningful attribute title
    await expect(page.getByTitle("nopCommerce demo store")).toBeVisible();
    //=================

    //getByTestId():  to locate an element by its title attribute
    //when to use : when element has a meaningful data-testId attribute, it should be added by developers, for testing purpose.
    //if they use different attribute for testing purpose, then we have to configure in "playwright.config.ts" file  like this:
    //testIdAttribute: "data-test", in config file.
    //then in test files we can use getByTestId for the element which has data-test attribute.
    await expect(page.getByTestId("profile-email")).toHaveValue("[EMAIL_ADDRESS]");
    await expect(page.getByTestId("profile-name")).toHaveValue("Naaaaaam hai");
    //=================

    //General purpose locators
    //locator() : generic locator for css and xpath
    await page.locator("#NewsletterEmail").fill("shuja.rizzz@110.com");

    //css 
    await page.locator("input[name='NewsletterEmail']").fill("shuja.rizzz@110.com");
    //=================

})

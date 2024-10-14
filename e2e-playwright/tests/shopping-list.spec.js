const { test, expect } = require("@playwright/test");

test("Main page has expected title and headings.", async ({ page }) => {
  await page.goto("/shoppinglists");
  await expect(page).toHaveTitle("Shopping Lists");
});

test("Adding a new list", async ({ page }) => {
  await page.goto("https://shoppinglist-rc.deno.dev/shoppinglists");
  const words = [
    "Butter",
    "Eggs",
    "Rock",
    "Paper",
    "Scissors",
    "Next week",
    "Tomorrow",
    "Gifts",
    "Christmas",
  ];
  const word = words[Math.floor(Math.random() * words.length)] +
    Math.floor(Math.random() * 1000);

  await page.locator("input[type=text]").type(word);
  await page.locator("button[id=add]").click();
  await expect(page.getByText(word)).toBeVisible();
});

test("Trying to add a new list with empty name", async ({ page }) => {
  await page.goto("/shoppinglists");
  const word = "";
  await page.locator("input[type=text]").type(word);
  await page.locator("button[id=add]").click();
  await expect(page.locator("#error")).toHaveText("Name cannot be empty");
});

test("Trying to open a existing list and add an item", async ({ page }) => {
  await page.goto("/shoppinglists");
  console.log(await page.getByRole("tr").count());
  const numberOfLists = await page.locator("tr").count();
  const rnum = Math.floor(Math.random() * (numberOfLists - 1));
  await page.getByRole("link").nth(rnum).click();
  const words = [
    "Butter",
    "Eggs",
    "Rock",
    "Paper",
    "Scissors",
    "Next week",
    "Tomorrow",
    "Gifts",
    "Christmas",
  ];
  const word = words[Math.floor(Math.random() * words.length)] +
    Math.floor(Math.random() * 1000);

  await page.locator("input[type=text]").type(word);
  await page.locator("button[id=add]").click();
  await expect(page.getByText(word)).toBeVisible();
});

test("Add an empty item", async ({ page }) => {
  await page.goto("/shoppinglists");
  console.log(await page.getByRole("tr").count());
  const numberOfLists = await page.locator("tr").count();
  const rnum = Math.floor(Math.random() * (numberOfLists - 1));
  await page.getByRole("link").nth(rnum).click();

  const word = "";
  await page.locator("input[type=text]").type(word);
  await page.locator("button[id=add]").click();
  await expect(page.locator("#error")).toHaveText("Name cannot be empty");
});

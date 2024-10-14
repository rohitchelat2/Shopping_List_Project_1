module.exports = {
  timeout: 10000,
  retries: 0,
  reporter: "list",
  workers: 5,
  use: {
    baseURL: "https://shoppinglist-rc.deno.dev/",
    headless: true,
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "e2e-headless-chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
};

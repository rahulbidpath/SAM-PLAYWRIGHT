import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 300000,
  testDir: './samtests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
    reporter: [['html'],
            ['monocart-reporter', {name: 'SAM Auction Results', outputFile: './reportMonocart/TestExecution.html'}],
            [
              "allure-playwright",
              {
                outputFolder: "allure-results",
                suiteTitle: true,
                detail: true,
              },
            ],
        ],
  use: {
    
    baseURL: 'https://qa-dev-auto.auctionserver.net/                                                                                                                    ',
    httpCredentials: { username: 'bid', password: 'path'},
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: false,
    actionTimeout: 30000,
    navigationTimeout: 30000,
    channel: 'chrome',
  },
  globalSetup: require.resolve('./global-setup'),
  projects: [
    {
      name: 'smokeTests',
      testDir: './samTests/smokeTests'
    },
    {
      name: 'regressionTests',
      testDir: './samTests/regressionTests'
    },
  ],
});

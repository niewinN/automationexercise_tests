import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  retries: process.env.CI ? 3 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI
    ? [['html'], ['github']]
    : [['html']],

  timeout: 60000,

  expect: {
    timeout: 10000,
  },

  use: {
    baseURL: 'https://automationexercise.com/',

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 15000,
    navigationTimeout: 30000,

    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',

    serviceWorkers: 'block',

    viewport: {
      width: 1920,
      height: 1080,
    },

    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
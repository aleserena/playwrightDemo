// @ts-check
import { defineConfig, devices } from "@playwright/test";

import dotenv from "dotenv";

dotenv.config({
  quiet: true,
});

// Get credentials from environment variables
const password = process.env.PASSWORD;

// Validate credentials are available
if (!password) {
  console.warn("Warning: password environment variable not set");
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["blob"], ["github"], ["html", { open: "never" }]],
  timeout: 180000,
  use: {
    trace: "retain-on-first-failure",
    video: "retain-on-failure",
    viewport: { width: 1920, height: 1080 },
    slowMo: process.env.DEBUG === "true" ? 1500 : 0,
    baseURL: "https://www.saucedemo.com",
  },
  expect: {
    timeout: 5000,
  },
  projects: [
    // Setup project
    {
      name: "setup",
      grep: /@Setup/,
      use: { ...devices["Desktop Chrome"], trace: "off" },
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      grep: /@Desktop/,
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Galaxy S9+"] },
      grep: /@Mobile/,
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 14"] },
      grep: /@Mobile/,
    },
  ],
});

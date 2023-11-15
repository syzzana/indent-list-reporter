import { expect, test } from "@playwright/test";

test.describe("API", async () => {
  test("authentication", async () => {
    const status = 200;
    expect(status).toBe(201);
  });

  test("unauthorized", async () => {
    const status = 200;
    expect(status).toBe(200);
  });
});

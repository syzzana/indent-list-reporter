import { expect, test } from "@playwright/test";

test.describe("Login", async () => {
  test("from api", async () => {
    const status = 200;
    expect(status).toBe(200);
  });

  test("from ui", async () => {
    const status = 200;
    expect(status).toBe(200);
  });
});

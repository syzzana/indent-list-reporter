import { expect, test } from "@playwright/test";

test.describe("Demo", async () => {
  test("show ui", async () => {
    const status = 200;
    expect(status).toBe(200);
  });

  test("show api", async () => {
    const status = 200;
    expect(status).toBe(200);
  });
});

test.describe("Showcase demo", async () => {
  test("fail me demo", () => {
    const status = 200;
    expect(status).toBe(202);
  });

  test.skip("skip me", () => {
    const status = 200;
    expect(status).toBe(200);
  });
});

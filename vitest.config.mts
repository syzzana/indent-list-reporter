import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        include: ["tests/*.test.ts"],
        exclude: ["playwright-tests/**.*", "myconfig.config.ts"]
    },
})
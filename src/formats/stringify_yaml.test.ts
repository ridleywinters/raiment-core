import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";

import { parseYAML } from "./parse_yaml.ts";
import { stringifyYAML } from "./stringify_yaml.ts";

describe("stringifyYAML", () => {
    it("should round-trip special characters correctly", () => {
        const original = "@options ✓,×";
        const yaml = stringifyYAML(original);
        const parsed = parseYAML<string>(yaml);
        expect(parsed).toBe(original);
    });
});

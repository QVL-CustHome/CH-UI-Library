import { describe, expect, it } from "vitest";
import { palette, radius, shadows, spacing, tokens, typography } from "./index";

describe("tokens", () => {
  it("regroupe les cinq familles de tokens", () => {
    expect(tokens).toEqual({ palette, typography, spacing, radius, shadows });
  });

  it("expose la palette CustHome", () => {
    expect(palette.primary.main).toBe("#2456a6");
    expect(palette.background.default).toBe("#f4f5f7");
    expect(palette.text.primary).toBe("#1c1e21");
    expect(palette.error.main).toBe("#b3261e");
  });

  it("expose des couleurs hexadécimales valides", () => {
    const flat = [
      ...Object.values(palette.primary),
      ...Object.values(palette.secondary),
      ...Object.values(palette.error),
      ...Object.values(palette.warning),
      ...Object.values(palette.info),
      ...Object.values(palette.success),
      ...Object.values(palette.background),
      ...Object.values(palette.text),
      palette.divider,
    ];
    for (const color of flat) {
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("expose typo, espacements, radius et ombres", () => {
    expect(typography.fontFamily).toContain("system-ui");
    expect(spacing.unit).toBe(8);
    expect(radius.md).toBe("8px");
    expect(shadows.md).toContain("rgba");
  });
});

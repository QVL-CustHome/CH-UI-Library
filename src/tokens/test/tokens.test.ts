import { describe, expect, it } from "vitest";
import { palette, paletteDark, radius, shadows, spacing, tokens, typography } from "../index";

describe("tokens", () => {
  it("regroupe les six familles de tokens", () => {
    expect(tokens).toEqual({ palette, paletteDark, typography, spacing, radius, shadows });
  });

  it("expose la palette de marque CustHome (clair)", () => {
    expect(palette.primary.main).toBe("#1e6244");
    expect(palette.secondary.main).toBe("#bcc2a8");
    expect(palette.accent.main).toBe("#f4ad15");
    expect(palette.background.default).toBe("#fbfaf9");
    expect(palette.text.primary).toBe("#060504");
    expect(palette.error.main).toBe("#b3261e");
  });

  it("expose la palette de marque CustHome (sombre)", () => {
    expect(paletteDark.primary.main).toBe("#9de1c4");
    expect(paletteDark.secondary.main).toBe("#51573d");
    expect(paletteDark.accent.main).toBe("#eaa30b");
    expect(paletteDark.background.default).toBe("#060504");
    expect(paletteDark.text.primary).toBe("#fbfaf9");
  });

  it("expose des couleurs hexadécimales valides dans les deux déclinaisons", () => {
    for (const p of [palette, paletteDark]) {
      const flat = [
        ...Object.values(p.primary),
        ...Object.values(p.secondary),
        ...Object.values(p.accent),
        ...Object.values(p.error),
        ...Object.values(p.warning),
        ...Object.values(p.info),
        ...Object.values(p.success),
        ...Object.values(p.background),
        ...Object.values(p.text),
        p.divider,
      ];
      for (const color of flat) {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });

  it("expose la typo Chivo et l'échelle de titres 1.333", () => {
    expect(typography.fontFamily).toContain("Chivo");
    expect(typography.heading.h1).toBe("4.21rem");
    expect(typography.heading.h2).toBe("3.158rem");
    expect(typography.heading.h3).toBe("2.369rem");
    expect(typography.heading.h4).toBe("1.777rem");
    expect(typography.heading.h5).toBe("1.333rem");
  });

  it("expose espacements, radius et ombres", () => {
    expect(spacing.unit).toBe(8);
    expect(radius.sm).toBe("0.25rem");
    expect(radius.md).toBe("0.5rem");
    expect(radius.lg).toBe("0.75rem");
    expect(radius.pill).toBe("62.4375rem");
    expect(shadows.md).toContain("rgba");
  });
});

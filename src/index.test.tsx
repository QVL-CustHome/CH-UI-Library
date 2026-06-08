import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CH_UI_VERSION } from "./index";

describe("@custhome/ui", () => {
  it("expose la version de la librairie", () => {
    expect(CH_UI_VERSION).toBe("0.2.0");
  });

  it("le harnais Testing Library + jsdom fonctionne", () => {
    render(<p>CustHome</p>);
    expect(screen.getByText("CustHome")).toBeInTheDocument();
  });
});

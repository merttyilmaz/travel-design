import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("returns a single class unchanged", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("merges multiple classes", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("drops falsy values", () => {
    expect(cn("a", undefined, null, false, "b")).toBe("a b");
  });

  it("deduplicates conflicting Tailwind utilities (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles conditional class objects", () => {
    expect(cn({ "font-bold": true, italic: false })).toBe("font-bold");
  });

  it("handles arrays of classes", () => {
    expect(cn(["px-2", "py-1"], "rounded")).toBe("px-2 py-1 rounded");
  });

  it("returns an empty string when called with no args", () => {
    expect(cn()).toBe("");
  });
});

// src/lib/detect.ts

export type Scheme = {
  id: string;
  name: string;
  hindiName: string;
  keywords: string[];
};

export function detectSchemeFromText(
  text: string,
  schemes: Scheme[]
): Scheme | null {
  const lower = text.toLowerCase();

  for (const scheme of schemes) {
    // 1️⃣ Check ID
    if (lower.includes(scheme.id.toLowerCase())) {
      return scheme;
    }

    // 2️⃣ Check English name
    if (lower.includes(scheme.name.toLowerCase())) {
      return scheme;
    }

    // 3️⃣ Check Hindi name
    if (scheme.hindiName && lower.includes(scheme.hindiName.toLowerCase())) {
      return scheme;
    }

    // 4️⃣ Check keywords
    for (const keyword of scheme.keywords || []) {
      if (lower.includes(keyword.toLowerCase())) {
        return scheme;
      }
    }
  }

  return null;
}
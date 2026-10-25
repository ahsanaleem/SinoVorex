/**
 * ISO 2859-1 (ANSI/ASQ Z1.4) single sampling, normal inspection.
 * Table 1 (sample size code letters) and Table 2-A (master table), checked cell by cell against the published tables.
 */

export const LOT_RANGES: [number, number][] = [
  [2, 8], [9, 15], [16, 25], [26, 50], [51, 90], [91, 150], [151, 280], [281, 500], [501, 1200],
  [1201, 3200], [3201, 10000], [10001, 35000], [35001, 150000], [150001, 500000], [500001, Infinity],
];

export const LEVELS = ["I", "II", "III", "S1", "S2", "S3", "S4"] as const;
export type Level = (typeof LEVELS)[number];

/** Code letter per lot range (rows of LOT_RANGES), per inspection level. */
const CODE: Record<Level, string> = {
  I: "AABCCDEFGHJKLMN",
  II: "ABCDEFGHJKLMNPQ",
  III: "BCDEFGHJKLMNPQR",
  S1: "AAAABBBBCCCCDDD",
  S2: "AAABBBCCCDDDEEE",
  S3: "AABBCCDDEEFFGGH",
  S4: "AABCCDEEFGGHJJK",
};

export const LETTERS = "ABCDEFGHJKLMNPQR";
export const SAMPLE_SIZE = [2, 3, 5, 8, 13, 20, 32, 50, 80, 125, 200, 315, 500, 800, 1250, 2000];

export const AQLS = ["0.065", "0.10", "0.15", "0.25", "0.40", "0.65", "1.0", "1.5", "2.5", "4.0", "6.5"] as const;
export type Aql = (typeof AQLS)[number];

/** Acceptance numbers along each AQL column after the 0/1 plan; Re = Ac + 1. */
const AC_SERIES = [1, 2, 3, 5, 7, 10, 14, 21];

/**
 * In Table 2-A every AQL column has the same shape: arrows down to a 0/1 plan, an up arrow, a down arrow,
 * then Ac 1, 2, 3, 5, 7, 10, 14, 21 one letter at a time, then arrows up. The 0/1 plan sits at letter
 * index 10 for AQL 0.065 and one letter earlier for each larger AQL (index 0, letter A, for AQL 6.5).
 */
function plan(letterIndex: number, aql: Aql): { letterIndex: number; ac: number } {
  const z = 10 - AQLS.indexOf(aql); // index of the 0/1 plan
  if (letterIndex <= z) return { letterIndex: z, ac: 0 };           // arrow down (or the 0/1 plan itself)
  if (letterIndex === z + 1) return { letterIndex: z, ac: 0 };      // arrow up: use 0/1 above
  if (letterIndex === z + 2) return { letterIndex: z + 3, ac: 1 };  // arrow down: use 1/2 below
  const step = letterIndex - (z + 3);
  if (step < AC_SERIES.length) return { letterIndex, ac: AC_SERIES[step] };
  return { letterIndex: z + 3 + AC_SERIES.length - 1, ac: 21 };    // arrow up: use 21/22 above
}

export type AqlResult = {
  codeLetter: string;      // from the lot size and level
  planLetter: string;      // letter actually used after following arrows
  sampleSize: number;
  accept: number;
  reject: number;
  fullInspection: boolean; // sample size ≥ lot size: inspect every unit
};

export function lotRow(lotSize: number) {
  return LOT_RANGES.findIndex(([lo, hi]) => lotSize >= lo && lotSize <= hi);
}

export function aqlPlan(lotSize: number, level: Level, aql: Aql): AqlResult | null {
  const row = lotRow(Math.floor(lotSize));
  if (row < 0) return null;
  const codeLetter = CODE[level][row];
  const p = plan(LETTERS.indexOf(codeLetter), aql);
  const sampleSize = SAMPLE_SIZE[p.letterIndex];
  return {
    codeLetter,
    planLetter: LETTERS[p.letterIndex],
    sampleSize: Math.min(sampleSize, lotSize),
    accept: p.ac,
    reject: p.ac + 1,
    fullInspection: sampleSize >= lotSize,
  };
}

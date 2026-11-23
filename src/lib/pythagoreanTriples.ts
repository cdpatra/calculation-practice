export type Triplet = readonly [number, number, number]

export type PythagoreanGroup = {
  /** Smallest primitive triplet in the family (a ≤ b < c). */
  base: Triplet
  triplets: readonly Triplet[]
}

export const PYTHAGOREAN_GROUPS: readonly PythagoreanGroup[] = [
  {
    base: [3, 4, 5],
    triplets: [
      [3, 4, 5],
      [6, 8, 10],
      [9, 12, 15],
      [12, 16, 20],
      [15, 20, 25],
      [18, 24, 30],
      [21, 28, 35],
      [24, 32, 40],
      [27, 36, 45],
    ],
  },
  {
    base: [5, 12, 13],
    triplets: [
      [5, 12, 13],
      [10, 24, 26],
      [15, 36, 39],
    ],
  },
  {
    base: [7, 24, 25],
    triplets: [[7, 24, 25]],
  },
  {
    base: [8, 15, 17],
    triplets: [[8, 15, 17]],
  },
  {
    base: [9, 40, 41],
    triplets: [[9, 40, 41]],
  },
  {
    base: [12, 35, 37],
    triplets: [[12, 35, 37]],
  },
  {
    base: [20, 21, 29],
    triplets: [[20, 21, 29]],
  },
] as const

/** Flat list for practice (every row in read mode). */
export const PYTHAGOREAN_TRIPLETS: readonly Triplet[] = PYTHAGOREAN_GROUPS.flatMap((group) => group.triplets)

export function formatTriplet([a, b, c]: Triplet): string {
  return `${a} , ${b} , ${c}`
}
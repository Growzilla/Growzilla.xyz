/**
 * Mosaic tile order — duplicates deliberately spaced across the 10+9 grid.
 *
 * Groups (source index):
 * - Anmol website: 01, 03, 17
 * - Gokul access: 02, 04
 * - Aryan access: 06, 18, 19
 * - North community: 07, 08, 09
 */
const TILE = (n: number) => `/larpdms/processed/mosaic/inbound-${String(n).padStart(2, '0')}.webp`

/** Row 1 (10) then row 2 (9) — dupes maximally separated */
export const INBOUND_MOSAIC_TILES: string[] = [
  TILE(1),
  TILE(16),
  TILE(2),
  TILE(11),
  TILE(7),
  TILE(5),
  TILE(6),
  TILE(13),
  TILE(15),
  TILE(17),
  TILE(18),
  TILE(8),
  TILE(12),
  TILE(10),
  TILE(3),
  TILE(19),
  TILE(4),
  TILE(9),
  TILE(14),
]

export const INBOUND_STAT = {
  value: '20+',
  label: 'inbound DMs',
  suffix: 'per day · typical client volume',
} as const

export const INBOUND_COPY = {
  eyebrow: 'Inbound',
  headline: 'A regular Tuesday for our clients',
  sub: 'This is what a normal day looks like when the engine is running — 20+ inbound DMs, not a one-off spike.',
  body: 'Website requests, access asks, partnership DMs — the kind of messages you expect when people actually see your content.',
  footnote: 'From accounts we manage · typical daily volume · not a spike',
  bridge: 'The engine is built to produce this consistently.',
} as const

/** What the mosaic represents — decoded for the reader */
export const INBOUND_REQUEST_TYPES = [
  'App access',
  'Access codes',
  'Login details',
  'Community invites',
  'Link requests',
] as const
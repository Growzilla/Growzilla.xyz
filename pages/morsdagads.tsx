import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ComparisonAd, { AdData, AdAngle } from '../components/morsdagads/ComparisonAd';

/* ═══════════════════════════════════════════════════════════════
   /morsdagads — Operator review canvas for 20 Mors dag ads.
   Same ComparisonAd template, only copy varies. Mors dag = 31 maj 2026.
   Ranked 1-20. Filters: angle, treatment. Keep/kill scorecard in localStorage.
   ═══════════════════════════════════════════════════════════════ */

const ADS: AdData[] = [
  // ── Tier 1 ──────────────────────────────────────────────────
  { id: 'B4', angle: 'B', rank: 1,
    hook: 'Mors dag säljer. Med eller utan er.',
    before: 'utan er', after: 'med er',
    note: 'Maximum restraint. Binary forces decision.' },
  { id: 'A1', angle: 'A', rank: 2,
    hook: 'Har ni ens en Mors dag-kampanj live?',
    before: 'tyst feed', after: 'kampanj live',
    note: 'Operator Swedish "ens" — reads as peer callout, not pitch.' },
  { id: 'B1', angle: 'B', rank: 3,
    hook: 'Era kunder köper Mors dag-presenter. Frågan är från vem.',
    before: 'från konkurrenten', after: 'från er',
    note: 'Cleanest loss expression.' },
  { id: 'A2', angle: 'A', rank: 4,
    hook: '31 maj.',
    before: 'ingen kampanj', after: 'klart inom 72h',
    note: 'Date-as-hook. Highest ceiling, highest risk.' },
  { id: 'A7', angle: 'A', rank: 5,
    hook: 'Mors dag säljer i hela Sverige. Utom hos er.',
    before: 'tyst kassa', after: 'rullande order',
    note: 'PIG framework — national fact + personal exclusion.' },
  { id: 'B3', angle: 'B', rank: 6,
    hook: 'Ni byggde kundlistan. Konkurrenten skickar mailet.',
    before: 'tyst inbox', after: 'ert mail först',
    note: 'Betrayal framing — sharper than generic loss.' },

  // ── Tier 2 ──────────────────────────────────────────────────
  { id: 'B2', angle: 'B', rank: 7,
    hook: 'Pengarna kommer spenderas. Bara inte hos er.',
    before: '0 kr in', after: 'kassan rullar' },
  { id: 'A6', angle: 'A', rank: 8,
    hook: 'Era kunder scrollar Mors dag-ads. Inga är era.',
    before: 'ni syns inte', after: 'ni syns överallt' },
  { id: 'B7', angle: 'B', rank: 9,
    hook: 'Ni byggde varumärket. Konkurrenten tar Mors dag.',
    before: 'ni byggde gratis', after: 'ni skördar nu' },
  { id: 'A10', angle: 'A', rank: 10,
    hook: 'Allt annat hinner ni. Men inte Mors dag?',
    before: 'uppskjuten igen', after: 'klart denna vecka' },
  { id: 'B9', angle: 'B', rank: 11,
    hook: 'Mamma får present på Mors dag. Frågan är från vilken butik.',
    before: 'inte er butik', after: 'er butik' },
  { id: 'B8', angle: 'B', rank: 12,
    hook: 'Mors dag-pengarna ligger på bordet. Någon kommer plocka upp dem.',
    before: 'ni tittar på', after: 'ni tar dem' },
  { id: 'A8', angle: 'A', rank: 13,
    hook: 'Tyst feed. Mors dag närmar sig.',
    before: 'tyst på söndag', after: 'live på söndag' },

  // ── Tier 3 ──────────────────────────────────────────────────
  { id: 'A5', angle: 'A', rank: 14,
    hook: 'Inga ads. Inga emails. Och Mors dag närmar sig.',
    before: 'ingen kampanj', after: 'hela paketet live' },
  { id: 'B5', angle: 'B', rank: 15,
    hook: 'Folk söker Mors dag-present just nu. Hittar de er?',
    before: 'ni syns inte', after: 'ni syns först' },
  { id: 'A3', angle: 'A', rank: 16,
    hook: 'Era konkurrenter har redan börjat.',
    before: 'konkurrenten kör', after: 'ni också' },
  { id: 'A9', angle: 'A', rank: 17,
    hook: 'Söndag 31 maj. Era kunder handlar någonstans.',
    before: 'någon annans butik', after: 'er butik' },
  { id: 'B10', angle: 'B', rank: 18,
    hook: 'Era kunder är i Mors dag-läge. Är ni i deras flöde?',
    before: 'scrollar förbi', after: 'stoppar scrollen' },
  { id: 'B6', angle: 'B', rank: 19,
    hook: 'Era kunder kommer handla. Från er eller någon annan.',
    before: 'någon annan', after: 'er' },
  { id: 'A4', angle: 'A', rank: 20,
    hook: 'Mors dag är snart. Vad gör ni?',
    before: 'tänker på det', after: 'klart inom 72h' },
];

type Vote = 'keep' | 'kill' | 'ship' | null;
type Votes = Record<string, Vote>;

const SCORECARD_KEY = 'morsdagads-scorecard-v1';

function useScorecard() {
  const [votes, setVotes] = useState<Votes>({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SCORECARD_KEY);
      if (raw) setVotes(JSON.parse(raw));
    } catch {}
  }, []);
  const setVote = (id: string, v: Vote) => {
    setVotes((prev) => {
      const next = { ...prev, [id]: v };
      try { localStorage.setItem(SCORECARD_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  const reset = () => {
    setVotes({});
    try { localStorage.removeItem(SCORECARD_KEY); } catch {}
  };
  return { votes, setVote, reset };
}

type AngleFilter = 'all' | 'A' | 'B';
type TierFilter = 'all' | '1' | '2' | '3';

function tierOf(rank: number): '1' | '2' | '3' {
  if (rank <= 6) return '1';
  if (rank <= 13) return '2';
  return '3';
}

export default function MorsdagAdsPage() {
  const [angleFilter, setAngleFilter] = useState<AngleFilter>('all');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [scale, setScale] = useState<number>(0.42); // fits 2 cards per row at ~1200px viewport
  const [open, setOpen] = useState<string | null>(null);
  const { votes, setVote, reset } = useScorecard();

  const filtered = useMemo(() => {
    return ADS
      .filter((a) => angleFilter === 'all' || a.angle === angleFilter)
      .filter((a) => tierFilter === 'all' || tierOf(a.rank) === tierFilter)
      .sort((a, b) => a.rank - b.rank);
  }, [angleFilter, tierFilter]);

  const counts = useMemo(() => {
    const c = { keep: 0, kill: 0, ship: 0, untouched: 0 };
    for (const ad of ADS) {
      const v = votes[ad.id];
      if (v === 'keep') c.keep++;
      else if (v === 'kill') c.kill++;
      else if (v === 'ship') c.ship++;
      else c.untouched++;
    }
    return c;
  }, [votes]);

  const openAd = open ? ADS.find((a) => a.id === open) : null;

  return (
    <>
      <Head>
        <title>Mors dag Ads — Operator Review · Growzilla</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main style={{
        minHeight: '100vh',
        background: '#0A0A0B',
        color: '#F5F5F5',
        fontFamily: 'Satoshi, system-ui, sans-serif',
        padding: '32px 40px 200px',
      }}>
        {/* Header */}
        <header style={{ marginBottom: 40 }}>
          <div style={{
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            fontSize: 12,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#FF2D87',
          }}>
            Growzilla · Mors dag · 31 maj 2026 · Phase 1 review
          </div>
          <h1 style={{
            marginTop: 12,
            fontFamily: 'Clash Display, Satoshi, system-ui, sans-serif',
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.02,
          }}>
            20 ads. 2 angler. En mall. Välj 4–6.
          </h1>
          <p style={{ marginTop: 12, maxWidth: 720, color: 'rgba(245,245,245,0.72)', fontSize: 15, lineHeight: 1.5 }}>
            Alla annonser använder samma <code style={{ color: '#FF2D87' }}>ComparisonAd</code>-mall — endast copyn varierar.
            Det isolerar hooken som testvariabel (Mark §1.2 post-Andromeda). Markera <strong style={{ color: '#F5F5F5' }}>ship</strong> för
            de annonser som ska gå live på Meta, <strong style={{ color: '#F5F5F5' }}>keep</strong> för reserv,
            <strong style={{ color: '#F5F5F5' }}> kill</strong> för uteslutna. Dina röster sparas i webbläsaren.
          </p>
        </header>

        {/* Sticky filter + scorecard bar */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(10,10,11,0.92)',
          backdropFilter: 'blur(12px)',
          margin: '0 -40px 32px',
          padding: '16px 40px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          alignItems: 'center',
        }}>
          <Group label="Vinkel">
            <Pill active={angleFilter === 'all'} onClick={() => setAngleFilter('all')}>Alla ({ADS.length})</Pill>
            <Pill active={angleFilter === 'A'} onClick={() => setAngleFilter('A')}>A · Ångest ({ADS.filter(a => a.angle === 'A').length})</Pill>
            <Pill active={angleFilter === 'B'} onClick={() => setAngleFilter('B')}>B · Förlust ({ADS.filter(a => a.angle === 'B').length})</Pill>
          </Group>

          <Group label="Tier">
            <Pill active={tierFilter === 'all'} onClick={() => setTierFilter('all')}>Alla</Pill>
            <Pill active={tierFilter === '1'} onClick={() => setTierFilter('1')}>1 (#1–6)</Pill>
            <Pill active={tierFilter === '2'} onClick={() => setTierFilter('2')}>2 (#7–13)</Pill>
            <Pill active={tierFilter === '3'} onClick={() => setTierFilter('3')}>3 (#14–20)</Pill>
          </Group>

          <Group label="Skala">
            <input
              type="range"
              min={0.25}
              max={0.7}
              step={0.01}
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              style={{ width: 120 }}
            />
            <span style={{ fontSize: 12, color: 'rgba(245,245,245,0.48)', fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace' }}>{Math.round(scale * 100)}%</span>
          </Group>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
            <Stat label="ship" value={counts.ship} color="#FF2D87" />
            <Stat label="keep" value={counts.keep} color="#F5F5F5" />
            <Stat label="kill" value={counts.kill} color="rgba(245,245,245,0.48)" />
            <Stat label="kvar" value={counts.untouched} color="rgba(245,245,245,0.48)" />
            <button
              onClick={() => { if (confirm('Nollställ alla röster?')) reset(); }}
              style={{
                marginLeft: 8,
                padding: '6px 12px',
                fontSize: 12,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                color: 'rgba(245,245,245,0.48)',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              reset
            </button>
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${Math.ceil(1080 * scale + 32)}px, 1fr))`,
          gap: 32,
          justifyItems: 'start',
        }}>
          {filtered.map((ad) => (
            <AdCell
              key={ad.id}
              ad={ad}
              scale={scale}
              vote={votes[ad.id] ?? null}
              onVote={(v) => setVote(ad.id, v)}
              onOpen={() => setOpen(ad.id)}
            />
          ))}
        </div>

        {/* Modal */}
        {openAd && (
          <div
            onClick={() => setOpen(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
              overflow: 'auto',
            }}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: -36,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                fontSize: 12,
                color: 'rgba(245,245,245,0.72)',
              }}>
                <div>#{openAd.rank} · {openAd.angle === 'A' ? 'Ångest' : 'Förlust'} · 1080×1350</div>
                <button
                  onClick={() => setOpen(null)}
                  style={{
                    background: 'transparent', border: 'none',
                    color: 'rgba(245,245,245,0.72)', cursor: 'pointer',
                    fontSize: 14,
                  }}
                >stäng ✕</button>
              </div>
              <ComparisonAd ad={openAd} />
              {openAd.note && (
                <div style={{
                  marginTop: 16,
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  fontSize: 12,
                  color: 'rgba(245,245,245,0.48)',
                  maxWidth: 1080,
                }}>
                  Operator-not: {openAd.note}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

/* ───────── helpers ───────── */

function AdCell({
  ad, scale, vote, onVote, onOpen,
}: {
  ad: AdData;
  scale: number;
  vote: Vote;
  onVote: (v: Vote) => void;
  onOpen: () => void;
}) {
  return (
    <div style={{ width: 1080 * scale }}>
      <div
        onClick={onOpen}
        style={{
          width: 1080 * scale,
          height: 1350 * scale,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'zoom-in',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <ComparisonAd ad={ad} />
        </div>
      </div>

      {/* meta + vote row */}
      <div style={{
        marginTop: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 12,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        color: 'rgba(245,245,245,0.72)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#FF2D87' }}>#{ad.rank}</span>
          <span>{ad.id}</span>
          <span style={{ color: 'rgba(245,245,245,0.48)' }}>{ad.angle === 'A' ? 'ångest' : 'förlust'}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <VoteBtn label="ship" active={vote === 'ship'} color="#FF2D87" onClick={() => onVote(vote === 'ship' ? null : 'ship')} />
          <VoteBtn label="keep" active={vote === 'keep'} color="#F5F5F5" onClick={() => onVote(vote === 'keep' ? null : 'keep')} />
          <VoteBtn label="kill" active={vote === 'kill'} color="rgba(245,245,245,0.48)" onClick={() => onVote(vote === 'kill' ? null : 'kill')} />
        </div>
      </div>
    </div>
  );
}

function VoteBtn({ label, active, color, onClick }: { label: string; active: boolean; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 10px',
        fontSize: 11,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        background: active ? color : 'transparent',
        color: active ? '#0A0A0B' : color,
        border: `1px solid ${active ? color : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 4,
        cursor: 'pointer',
        textTransform: 'lowercase',
        letterSpacing: '0.08em',
      }}
    >
      {label}
    </button>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontSize: 11,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        color: 'rgba(245,245,245,0.48)',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
      }}>{label}</span>
      <div style={{ display: 'flex', gap: 6 }}>{children}</div>
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 12px',
        fontSize: 12,
        fontFamily: 'Satoshi, system-ui, sans-serif',
        fontWeight: 500,
        background: active ? '#F5F5F5' : 'transparent',
        color: active ? '#0A0A0B' : 'rgba(245,245,245,0.72)',
        border: `1px solid ${active ? '#F5F5F5' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 6,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
    }}>
      <span style={{ fontSize: 16, fontWeight: 600, color }}>{value}</span>
      <span style={{ fontSize: 11, color: 'rgba(245,245,245,0.48)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

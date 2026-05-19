import React from 'react';

export type AdAngle = 'A' | 'B';

export type AdData = {
  id: string;          // e.g. "A1", "B4"
  angle: AdAngle;      // A = anxiety, B = loss
  rank: number;        // 1–20 predicted strength
  hook: string;        // 1–2 sentences max
  before: string;      // 3-word "utan oss"
  after: string;       // 3-word "med oss"
  note?: string;       // operator note, optional
};

type Props = {
  ad: AdData;
};

const BG = '#0A0A0B';
const PINK = '#FF2D87';
const TEXT_100 = '#F5F5F5';
const TEXT_72 = 'rgba(245,245,245,0.72)';
const TEXT_48 = 'rgba(245,245,245,0.48)';
const HAIRLINE = 'rgba(255,255,255,0.08)';

export default function ComparisonAd({ ad }: Props) {
  return (
    <div
      data-ad-id={ad.id}
      data-angle={ad.angle}
      style={{
        width: 1080,
        height: 1350,
        background: BG,
        position: 'relative',
        fontFamily: 'Satoshi, system-ui, sans-serif',
        color: TEXT_100,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '96px 88px',
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: PINK,
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        }}
      >
        Mors dag · 31 maj
      </div>

      {/* Hook — the only thing that really varies */}
      <div
        style={{
          marginTop: 'auto',
          marginBottom: 96,
          fontFamily: 'Clash Display, Satoshi, system-ui, sans-serif',
          fontSize: ad.hook.length > 60 ? 76 : ad.hook.length > 40 ? 92 : 116,
          fontWeight: 900,
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          color: TEXT_100,
        }}
      >
        {ad.hook}
      </div>

      {/* Comparison row — 3 words each side, pink hairline between */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: 32,
          paddingTop: 32,
          borderTop: `1px solid ${HAIRLINE}`,
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: TEXT_48,
            }}
          >
            utan oss
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 30,
              fontWeight: 500,
              color: TEXT_72,
              letterSpacing: '-0.01em',
            }}
          >
            {ad.before}
          </div>
        </div>

        <div
          style={{
            width: 1,
            height: 72,
            background: PINK,
          }}
        />

        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: PINK,
            }}
          >
            med oss
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 30,
              fontWeight: 600,
              color: TEXT_100,
              letterSpacing: '-0.01em',
            }}
          >
            {ad.after}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: PINK,
            letterSpacing: '-0.01em',
          }}
        >
          Boka 15 min  →
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: TEXT_48,
            letterSpacing: '0.08em',
          }}
        >
          growzilla.xyz / morsdag
        </div>
      </div>
    </div>
  );
}

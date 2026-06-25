// MRAS · JrissiGauge — doctor-only circular mental-health risk dial (0–100).

export function JrissiGauge({ score, size = 160 }) {
  const tone = score < 34 ? 'low' : score < 67 ? 'moderate' : 'high';
  const colorMap = { low: 'var(--risk-low)', moderate: 'var(--risk-moderate)', high: 'var(--risk-high)' };
  const labelMap = { low: 'Low', moderate: 'Moderate', high: 'High' };
  const r = size / 2 - 14;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - score / 100);
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--border-1)" strokeWidth="12" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={colorMap[tone]} strokeWidth="12" fill="none" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={off} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ font: '600 34px var(--font-mono)', color: 'var(--fg-1)', lineHeight: 1 }}>{score}</div>
        <div style={{ font: '500 10px var(--font-sans)', color: colorMap[tone], textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{labelMap[tone]}</div>
      </div>
    </div>
  );
}

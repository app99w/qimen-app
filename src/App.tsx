import { useState } from 'react';
import { paipan } from './qimen';
import ChartGrid from './ChartGrid';

export default function App() {
  const [dt, setDt] = useState('2026-09-18 14:00');
  const [chart, setChart] = useState<any>(null);

  const handlePaipan = () => {
    const [d, t] = dt.split(' ');
    const [y, m, day] = d.split('-').map(Number);
    const [h, min] = t.split(':').map(Number);
    setChart(paipan(y, m, day, h, min));
  };

  const handleCopy = () => {
    if (!chart) return;
    const text = chart.palaces.map((p: any) =>
      `[${p.name}] 天盘:${p.heavenStem} 地盘:${p.earthStem} ${p.star} ${p.door} ${p.god} ${p.marks.join('')}`
    ).join('\n');
    navigator.clipboard.writeText(text);
    alert('已复制');
  };

  return (
    <div style={{ padding: 12, fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>奇门</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={dt} onChange={e => setDt(e.target.value)}
          style={{ flex: 1, padding: 8, fontSize: 16 }} />
        <button onClick={handlePaipan} style={{ padding: '8px 16px' }}>排盘</button>
      </div>
      {chart && (
        <>
          <button onClick={handleCopy} style={{ marginBottom: 8 }}>复制盘面</button>
          <div style={{ fontSize: 13, marginBottom: 8 }}>
            四柱：{chart.bazi}　{chart.ju}
          </div>
          <ChartGrid chart={chart} />
        </>
      )}
    </div>
  );
}

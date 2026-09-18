import { useState } from 'react';
import { paipan } from './qimen';
import ChartGrid from './ChartGrid';

export default function App() {
  // 使用 datetime-local 需要的初始格式（T 连接）
  const [dt, setDt] = useState('2026-09-18T14:00');
  const [chart, setChart] = useState<any>(null);

  const handlePaipan = () => {
    try {
      // 将 T 替换为空格，兼容原本的解析逻辑
      const cleanDt = dt.replace('T', ' ');
      const [d, t] = cleanDt.split(' ');
      const [y, m, day] = d.split('-').map(Number);
      const [h, min] = t.split(':').map(Number);
      
      if ([y, m, day, h, min].some(isNaN)) throw new Error('时间格式异常');
      
      const result = paipan(y, m, day, h, min);
      setChart(result);
    } catch (err: any) {
      alert('排盘失败：' + err.message);
    }
  };

  const handleCopy = () => {
    if (!chart) return;
    const text = chart.palaces.map((p: any) =>
      `[${p.name}] 天盘:${p.heavenStem} 地盘:${p.earthStem} ${p.star} ${p.door} ${p.god} ${p.marks.join('')}`
    ).join('\n');
    navigator.clipboard.writeText(text);
    alert('已复制盘面');
  };

  return (
    <div style={{ padding: 12, fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>奇门</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {/* 这里改成了原生时间选择器 */}
        <input 
          type="datetime-local" 
          value={dt} 
          onChange={e => setDt(e.target.value)}
          style={{ flex: 1, padding: 8, fontSize: 16 }} 
        />
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

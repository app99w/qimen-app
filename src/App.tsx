import { useState } from 'react';
import { paipan } from './qimen';
import ChartGrid from './ChartGrid';

export default function App() {
  const [dt, setDt] = useState('2026-09-18T14:00');
  const [chart, setChart] = useState<any>(null);

  const handlePaipan = () => {
    try {
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
    
    // 按九宫格布局顺序生成纯文本
    const order = [4, 9, 2, 3, 5, 7, 8, 1, 6];
    const lines: string[] = [];
    
    // 标题信息
    lines.push(`奇门遁甲 · ${chart.ju}`);
    lines.push(`四柱: ${chart.bazi}`);
    lines.push('');
    
    // 逐宫输出
    order.forEach(i => {
      const p = chart.palaces.find((x: any) => x.index === i);
      if (p) {
        const marks = p.marks.length > 0 ? `【${p.marks.join(' ')}】` : '';
        lines.push(`[${p.name}] 天盘:${p.heavenStem} 地盘:${p.earthStem} ${p.star} ${p.door} ${p.god} ${p.changsheng} ${marks}`);
      } else if (i === 5) {
        lines.push('[中5宫] 寄坤二宫');
      }
    });
    
    navigator.clipboard.writeText(lines.join('\n'));
    alert('已复制盘面到剪贴板');
  };

  return (
    <div style={{ padding: 12, fontFamily: 'sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>奇门</h2>
      
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
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
          <button 
            onClick={handleCopy} 
            style={{ marginBottom: 8, padding: '6px 12px' }}
          >
            复制盘面
          </button>
          
          <div style={{ fontSize: 13, marginBottom: 8 }}>
            四柱：{chart.bazi}
          </div>
          <div style={{ fontSize: 13, marginBottom: 12, fontWeight: 'bold' }}>
            {chart.ju}
          </div>
          
          <ChartGrid chart={chart} />
        </>
      )}
    </div>
  );
}

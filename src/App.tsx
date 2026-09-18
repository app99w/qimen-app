import { useState }从……起'react';
import { 排攀 }从…… 起‘./祁门’；
import ChartGrid从……起'./ChartGrid';

出口 default function 应用程序() {
  const [dt, setDt] = useState('2026-09-18 14:00');
  const [chart, setChart]=useState<any>(null);

  const handlePaipan = () => {
    const [d, t]=dt.分离(' ');
    const [y, m, day]=d.分离('-').map(Number);
    const [h, min]=t.分离(':').map(Number);
    setChart(排攀(y，m，day，h，min));
  };

  const handleCopy = () => {
    if (!chart) return;
    const text=图表。宫殿。map((p：任意) =>
      `[${p.name}] 天盘:${p.heavenStem} 地盘:${p.地杆} ${p.star} ${p.门} ${p.上帝} ${p.marks.参与('')}`
    ).参与('\n');
    navigator.clipboard.writeText(text);
    alert('已复制');
  };

  return (
    <div风格={{ padding: 12, fontFamily: 'sans-serif' }}>
      <h2 风格={{ textAlign: '中心' }}>奇门</h2>
      <div风格={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={dt} onChange={e => setDt(e.target.value)}
          风格={{ flex: 1, padding: 8, fontSize: 16 }} />
        <button onClick={handlePaipan} 风格={{ padding: '8px 16px' }}>排盘</button>
      </div>
      {chart && (
        <>
          <button onClick={handleCopy} 风格={{ marginBottom: 8 }}>复制盘面</button>
          <div风格={{ fontSize: 13, marginBottom: 8 }}>
            四柱：{图表。bazi}　{图表。ju}
          </div>
<ChartGrid图表={chart} />
        </>
      )}
    </div>
  );
      }

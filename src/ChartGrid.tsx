export default function ChartGrid({ chart }: { chart: any }) {
  // 洛书九宫布局顺序：巽4、离9、坤2 / 震3、中5、兑7 / 艮8、坎1、乾6
  const order = [4, 9, 2, 3, 5, 7, 8, 1, 6];
  
  const cellStyle: React.CSSProperties = {
    border: '1px solid #999',
    padding: 6,
    fontSize: 12,
    minHeight: 100,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    backgroundColor: '#fff',
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 4,
      maxWidth: 600,
      margin: '0 auto',
    }}>
      {order.map(i => {
        const p = chart.palaces.find((x: any) => x.index === i);
        if (!p) {
          return (
            <div key={i} style={cellStyle}>
              <div style={{ fontWeight: 'bold' }}>中5宫</div>
              <div>寄坤二宫</div>
            </div>
          );
        }

        return (
          <div key={i} style={cellStyle}>
            {/* 宫位名称 */}
            <div style={{ fontWeight: 'bold', fontSize: 13 }}>{p.name}</div>

            {/* 八神 */}
            <div style={{ color: '#8B4513' }}>{p.god}</div>

            {/* 九星 */}
            <div style={{ color: '#0066CC' }}>{p.star}</div>

            {/* 八门 */}
            <div style={{ color: '#CC0000' }}>{p.door}</div>

            {/* 天盘干 / 地盘干 */}
            <div>
              <span style={{ color: '#006600' }}>天盘:{p.heavenStem}</span>
              {' '}
              <span style={{ color: '#8B0000' }}>地盘:{p.earthStem}</span>
            </div>

            {/* 十二长生 */}
            <div style={{ color: '#666', fontSize: 11 }}>{p.changsheng}</div>

            {/* 四害标记 */}
            {p.marks.length > 0 && (
              <div style={{ color: 'red', fontWeight: 'bold', fontSize: 11 }}>
                {p.marks.join(' ')}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

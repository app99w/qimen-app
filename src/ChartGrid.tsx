export default function ChartGrid({ chart }: { chart: any }) {
  const order = [4, 9, 2, 3, 5, 7, 8, 1, 6];
  const cellStyle: React.CSSProperties = {
    border: '1px solid #999', padding: 6, fontSize: 12,
    minHeight: 110, display: 'flex', flexDirection: 'column',
    gap: 2, backgroundColor: '#fff', position: 'relative'
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
      {order.map(i => {
        const p = chart.palaces.find((x: any) => x.index === i);
        if (!p) return <div key={i} style={cellStyle}>中5宫<br />寄坤二宫</div>;

        return (
          <div key={i} style={cellStyle}>
            <div style={{ fontWeight: 'bold', fontSize: 13, borderBottom: '1px solid #eee' }}>{p.name}</div>
            <div style={{ color: '#8B4513' }}>{p.god}</div>
            <div style={{ color: '#0066CC' }}>{p.star}</div>
            <div style={{ color: '#CC0000' }}>{p.door}</div>
            <div>
              <span style={{ color: '#006600' }}>天盘:{p.heavenStem}</span>
              {' '}
              <span style={{ color: '#8B0000' }}>地盘:{p.earthStem}</span>
            </div>
            <div style={{ color: '#666', fontSize: 11 }}>{p.changsheng}</div>
            {p.marks.length > 0 && (
              <div style={{ color: 'red', fontWeight: 'bold', fontSize: 11, position: 'absolute', top: 4, right: 4 }}>
                {p.marks.join(' ')}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

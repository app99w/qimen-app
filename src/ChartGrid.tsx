export default function ChartGrid({ chart }: { chart: any }) {
  const order = [4, 9, 2, 3, 5, 7, 8, 1, 6];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
      {order.map(i => {
        const p = chart.palaces.find((x: any) => x.index === i);
        if (!p) return <div key={i} style={{ border: '1px solid #999', padding: 6, minHeight: 90 }}>中5宫<br />寄坤二宫</div>;
        return (
          <div key={i} style={{ border: '1px solid #999', padding: 6, fontSize: 12, minHeight: 90 }}>
            <div style={{ fontWeight: 'bold' }}>{p.name}</div>
            <div>天盘:{p.heavenStem} 地盘:{p.earthStem}</div>
            <div>{p.star} {p.door} {p.god}</div>
            <div style={{ color: 'red' }}>{p.marks.join(' ')}</div>
          </div>
        );
      })}
    </div>
  );
}

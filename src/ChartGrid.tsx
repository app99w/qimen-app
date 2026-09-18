出口 default 功能 ChartGrid({ 图表 }: { 图表：任意}) {
Const顺序=[4, 9, 2, 3, 5, 7, 8, 1, 6];
  返回 (
    <div风格={{ 显示: '网格', gridTemplateColumns: 'repeat(3，1fr)', 差距: 4 }}>
      {顺序。地图(我=>{
常数p=图表.宫殿.找到((x：任意)=>x.指数===i);
        如果 (！P)返回<div钥匙={我} 风格={{ 边境: '1px实体#999', 填充: 6, minHeight: 90 }}>中5宫<溴/>寄坤二宫</div>；
        返回 (
          <div钥匙={我} 风格={{ 边境: '1px实体#999', 填充: 6, fontsize: 12, minHeight: 90 }}>
            <div风格={{ fontWeight: '粗体' }}>{p。姓名}</div>
<div>天盘：{p.heavenStem} 地盘:{p。地杆}</div>
<div>{p。星} {p。门} {p。上帝}</div>
<div风格={{ 颜色: '红色' }}>{p。标记.参与(' ')}</div>
</div>
        );
      })}
    </div>
);
      }

import { shiJiaGenerate } from 'bigfishmarquis-qimen';
import { chaiBuJuByGanZhi } from 'bigfishmarquis-qimen';
import { zhiRunJu } from 'bigfishmarquis-qimen';

export interface PalaceData {
  index: number;
  name: string;
  heavenStem: string;
  earthStem: string;
  star: string;
  door: string;
  god: string;
  changsheng: string;
  marks: string[];
}

export interface QimenChart {
  bazi: string;
  ju: string;
  palaces: PalaceData[];
}

export function paipan(y: number, m: number, d: number, h: number, min: number): QimenChart {
  // 1. 获取四柱干支
  const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')} ${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}:00`;
  const fourPillars = getFourPillars(dateStr);

  // 2. 使用置闰法计算局数
  const juResult = zhiRunJu(fourPillars.year, fourPillars.month, fourPillars.day, fourPillars.hour);
  // juResult 包含: { isYangDun, juNumber, yuan }

  // 3. 生成完整盘面
  const chart = shiJiaGenerate(
    fourPillars.hourGan,      // 时干
    fourPillars.hourZhi,      // 时支
    juResult.juNumber,        // 局数
    juResult.isYangDun ? 'yang' : 'yin',  // 阴阳遁
    fourPillars,              // 四柱
    juResult.solarTerm        // 节气
  );

  // 4. 转换为前端需要的格式
  const palaces: PalaceData[] = chart.palaces.map((p: any) => ({
    index: p.position,
    name: getPalaceName(p.position),
    heavenStem: p.heavenStem,
    earthStem: p.earthStem,
    star: p.star,
    door: p.door,
    god: p.god,
    changsheng: p.changsheng || '',
    marks: [
      p.isEmpty ? '空' : '',
      p.isPunishment ? '刑' : '',
      p.isTomb ? '墓' : '',
      p.isPressure ? '迫' : '',
    ].filter(Boolean),
  }));

  return {
    bazi: `${fourPillars.year}年 ${fourPillars.month}月 ${fourPillars.day}日 ${fourPillars.hour}时`,
    ju: `${juResult.isYangDun ? '阳遁' : '阴遁'}${juResult.juNumber}局(${juResult.solarTerm}·${juResult.yuan}元)`,
    palaces,
  };
}

function getPalaceName(pos: number): string {
  const names: Record<number, string> = {
    1: '坎1', 2: '坤2', 3: '震3', 4: '巽4',
    5: '中5', 6: '乾6', 7: '兑7', 8: '艮8', 9: '离9'
  };
  return names[pos] || `宫${pos}`;
}

function getFourPillars(dateStr: string) {
  // 使用简化的四柱计算，或调用鲲侯引擎的内部方法
  // 这里返回占位结构，实际使用时需要根据鲲侯引擎的API调整
  return {
    year: '甲辰', month: '丙寅', day: '戊申', hour: '庚申',
    yearGan: '甲', yearZhi: '辰',
    monthGan: '丙', monthZhi: '寅',
    dayGan: '戊', dayZhi: '申',
    hourGan: '庚', hourZhi: '申',
  };
}

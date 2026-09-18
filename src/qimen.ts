import { Solar } from 'lunar-javascript';

const JU_TABLE: any = {
  '冬至': [1,7,4], '小寒': [2,8,5], '大寒': [3,9,6],
  '立春': [8,5,2], '雨水': [9,6,3], '惊蛰': [1,7,4],
  '春分': [3,9,6], '清明': [4,1,7], '谷雨': [5,2,8],
  '立夏': [4,1,7], '小满': [5,2,8], '芒种': [6,3,9],
  '夏至': [9,3,6], '小暑': [8,2,5], '大暑': [7,1,4],
  '立秋': [2,5,8], '处暑': [1,4,7], '白露': [9,3,6],
  '秋分': [7,1,4], '寒露': [8,2,5], '霜降': [5,8,2],
  '立冬': [6,9,3], '小雪': [5,8,2], '大雪': [4,7,1]
};
const YANG = ['冬至','小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种'];
const GAN = ['戊','己','庚','辛','壬','癸','丁','丙','乙'];

export function paipan(y: number, m: number, d: number, h: number, min: number) {
  const solar = Solar.fromYmdHms(y, m, d, h, min, 0);
  const lunar = solar.getLunar();
  const bazi = lunar.getEightChar();
  const baziStr = `${bazi.getYear()}年 ${bazi.getMonth()}月 ${bazi.getDay()}日 ${bazi.getTime()}时`;
  
  // 【兼容性修复】使用更安全的方式获取当前节气，避免 getSolar 报错
  const jq = lunar.getJieQiTable();
  let currentJq = '冬至';
  let jqDateStr = '';
  for (const k in jq) {
    const jd = jq[k];
    let solarStr = '';
    try {
      if (typeof jd.getSolar === 'function') solarStr = jd.getSolar().toYmdHms();
      else if (jd.toYmdHms) solarStr = jd.toYmdHms();
      else solarStr = jd.toString();
    } catch (e) {
      solarStr = jd.toString();
    }
    
    if (solarStr && solarStr <= solar.toYmdHms()) {
      if (!jqDateStr || solarStr > jqDateStr) {
        jqDateStr = solarStr; currentJq = k;
      }
    }
  }
  
  const isYang = YANG.includes(currentJq);
  const juList = JU_TABLE[currentJq] || [1,7,4];
  const dayGan = bazi.getDayGan();
  const dayZhi = bazi.getDayZhi();
  const xun = getXun(dayGan, dayZhi);
  let yuanIdx = 0;
  if (['甲子','己卯','甲午','己酉'].includes(xun)) yuanIdx = 0;
  else if (['甲寅','己巳','甲申','己亥'].includes(xun)) yuanIdx = 1;
  else yuanIdx = 2;
  const ju = juList[yuanIdx];
  const dun = isYang ? '阳遁' : '阴遁';
  const juStr = `${dun}${ju}局(${currentJq}·${['上','中','下'][yuanIdx]}元)`;
  const dipan: any = {};
  for (let i = 0; i < 9; i++) {
    const gan = GAN[i];
    const gong = isYang ? ((ju - 1 + i) % 9) + 1 : ((ju - 1 - i + 18) % 9) + 1;
    dipan[gong] = gan;
  }
  const shiGan = bazi.getTimeGan();
  let zhifuGong = 1;
  for (let g = 1; g <= 9; g++) if (dipan[g] === shiGan) zhifuGong = g;
  const XING = ['天蓬','天芮','天冲','天辅','天禽','天心','天柱','天任','天英'];
  const MEN = ['休门','死门','伤门','杜门','','开门','惊门','生门','景门'];
  const SHEN = ['值符','螣蛇','太阴','六合','白虎','玄武','九地','九天'];
  const shenMap: any = {};
  for (let i = 0; i < 8; i++) {
    const g = isYang ? ((zhifuGong - 1 + i) % 9) + 1 : ((zhifuGong - 1 - i + 18) % 9) + 1;
    if (g === 5) continue;
    shenMap[g] = SHEN[i];
  }
  const palaces: any[] = [];
  const GONG_NAME = ['坎1','坤2','震3','巽4','中5','乾6','兑7','艮8','离9'];
  for (let g = 1; g <= 9; g++) {
    palaces.push({
      index: g, name: GONG_NAME[g-1],
      heavenStem: dipan[g], earthStem: dipan[g],
      star: g === 5 ? '天禽' : XING[(g-1) % 9],
      door: g === 5 ? '' : MEN[(g-1) % 9],
      god: shenMap[g] || '',
      changsheng: '', marks: []
    });
  }
  return { bazi: baziStr, ju: juStr, palaces };
}

function getXun(gan: string, zhi: string) {
  const GAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
  const ZHI = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
  const gi = GAN.indexOf(gan), zi = ZHI.indexOf(zhi);
  if (gi < 0 || zi < 0) return '';
  const jiazi = (zi - gi + 12) % 12;
  return ['甲子','甲戌','甲申','甲午','甲辰','甲寅'][Math.floor(jiazi / 2) % 6];
}

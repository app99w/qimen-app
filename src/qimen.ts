import { Solar } from 'lunar-javascript';

// 十二长生对照表
const CHANG_SHENG: Record<string, string[]> = {
  '甲': ['亥','子','丑','寅','卯','辰','巳','午','未','申','酉','戌'],
  '乙': ['午','巳','辰','卯','寅','丑','子','亥','戌','酉','申','未'],
  '丙': ['寅','卯','辰','巳','午','未','申','酉','戌','亥','子','丑'],
  '丁': ['酉','申','未','午','巳','辰','卯','寅','丑','子','亥','戌'],
  '戊': ['寅','卯','辰','巳','午','未','申','酉','戌','亥','子','丑'],
  '己': ['酉','申','未','午','巳','辰','卯','寅','丑','子','亥','戌'],
  '庚': ['巳','午','未','申','酉','戌','亥','子','丑','寅','卯','辰'],
  '辛': ['子','亥','戌','酉','申','未','午','巳','辰','卯','寅','丑'],
  '壬': ['申','酉','戌','亥','子','丑','寅','卯','辰','巳','午','未'],
  '癸': ['卯','寅','丑','子','亥','戌','酉','申','未','午','巳','辰'],
};
const ZHI = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const JIA_ZI = ['甲子','乙丑','丙寅','丁卯','戊辰','己巳','庚午','辛未','壬申','癸酉','甲戌','乙亥','丙子','丁丑','戊寅','己卯','庚辰','辛巳','壬午','癸未','甲申','乙酉','丙戌','丁亥','戊子','己丑','庚寅','辛卯','壬辰','癸巳','甲午','乙未','丙申','丁酉','戊戌','己亥','庚子','辛丑','壬寅','癸卯','甲辰','乙巳','丙午','丁未','戊申','己酉','庚戌','辛亥','壬子','癸丑','甲寅','乙卯','丙辰','丁巳','戊午','己未','庚申','辛酉','壬戌','癸亥'];

// 地支六冲
const CHONG: Record<string, string> = { '子':'午','丑':'未','寅':'申','卯':'酉','辰':'戌','巳':'亥','午':'子','未':'丑','申':'寅','酉':'卯','戌':'辰','亥':'巳' };

export function paipan(y: number, m: number, d: number, h: number, min: number) {
  const solar = Solar.fromYmdHms(y, m, d, h, min, 0);
  const lunar = solar.getLunar();
  const bazi = lunar.getEightChar();
  const baziStr = `${bazi.getYear()}年 ${bazi.getMonth()}月 ${bazi.getDay()}日 ${bazi.getTime()}时`;
  const dayGan = bazi.getDayGan();
  const dayZhi = bazi.getDayZhi();
  const timeGan = bazi.getTimeGan();
  const timeZhi = bazi.getTimeZhi();

  // 1. 定局（精确置闰法简化版：通过计算当前时间的节气）
  let jq = lunar.getPrevJieQi().getName();
  const jqDate = lunar.getPrevJieQi().getSolar();
  
  // 阴阳遁判定
  const YANG_JQ = ['冬至','小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种'];
  const isYang = YANG_JQ.includes(jq);
  
  // 局数基准表（冬至、小寒、大寒各领三元）
  const JU_MAP: Record<string, number[]> = {
    '冬至':[1,7,4],'小寒':[2,8,5],'大寒':[3,9,6],
    '立春':[8,5,2],'雨水':[9,6,3],'惊蛰':[1,7,4],
    '春分':[3,9,6],'清明':[4,1,7],'谷雨':[5,2,8],
    '立夏':[4,1,7],'小满':[5,2,8],'芒种':[6,3,9],
    '夏至':[9,3,6],'小暑':[8,2,5],'大暑':[7,1,4],
    '立秋':[2,5,8],'处暑':[1,4,7],'白露':[9,3,6],
    '秋分':[7,1,4],'寒露':[8,2,5],'霜降':[5,8,2],
    '立冬':[6,9,3],'小雪':[5,8,2],'大雪':[4,7,1]
  };
  const juBase = JU_MAP[jq] || [1,7,4];
  
  // 根据日干支查上中下元（符头法）
  const xunIdx = JIA_ZI.indexOf(dayGan+dayZhi);
  let yuanIdx = 0;
  if (xunIdx !== -1) {
     // 简化的上中下元判定（五天一元）
     const dayOffset = xunIdx % 5;
     yuanIdx = dayOffset < 1 ? 0 : dayOffset < 2 ? 1 : 2;
  }
  let ju = juBase[yuanIdx];
  
  // 2. 地盘排布
  const DIPAN_ORDER = ['戊','己','庚','辛','壬','癸','丁','丙','乙'];
  const dipanMap: Record<number, string> = {};
  for (let i = 0; i < 9; i++) {
    const gong = isYang ? ((ju - 1 + i) % 9) + 1 : ((ju - 1 - i + 18) % 9) + 1;
    dipanMap[gong] = DIPAN_ORDER[i];
  }

  // 3. 值符值使寻宫（找时干所在地盘宫）
  const shiGan = timeGan;
  let zhifuGong = 1;
  for (let g = 1; g <= 9; g++) {
    if (dipanMap[g] === shiGan) { zhifuGong = g; break; }
  }
  
  // 4. 天盘转动与九星八门八神
  const XING_ORDER = ['天蓬','天芮','天冲','天辅','天禽','天心','天柱','天任','天英'];
  const MEN_ORDER = ['休门','死门','伤门','杜门','','开门','惊门','生门','景门'];
  const SHEN_YANG = ['值符','螣蛇','太阴','六合','白虎','玄武','九地','九天'];
  const SHEN_YIN = ['值符','螣蛇','太阴','六合','白虎','玄武','九地','九天'];
  const shenList = isYang ? SHEN_YANG : SHEN_YIN;
  
  const palaces: any[] = [];
  const GONG_NAME = ['坎1','坤2','震3','巽4','中5','乾6','兑7','艮8','离9'];

  for (let g = 1; g <= 9; g++) {
    // 九星，根据值符宫移动
    const starIdx = (g - zhifuGong + 9) % 9;
    const star = g === 5 ? '天禽' : XING_ORDER[starIdx];
    
    // 八门，值使门随时干移动
    const menIdx = (g - zhifuGong + 9) % 9;
    const door = g === 5 ? '' : MEN_ORDER[menIdx];
    
    // 八神，阳顺阴逆
    let shen = '';
    if (g !== 5) {
       const shenOffset = isYang ? (g - zhifuGong + 9) % 8 : (zhifuGong - g + 8) % 8;
       shen = shenList[shenOffset];
    }

    const heavenStem = dipanMap[g]; // 简化版天盘干，实际应随值符转动
    const earthStem = dipanMap[g];

    // 计算十二长生
    let changsheng = '';
    const ganList = CHANG_SHENG[heavenStem];
    if (ganList) {
       const startZhiIdx = ZHI.indexOf(ganList[0]);
       let move = (g - 1) % 12;
       const actualZhiIdx = (startZhiIdx + move) % 12;
       changsheng = ['长生','沐浴','冠带','临官','帝旺','衰','病','死','墓','绝','胎','养'][move];
    }

    // 四害判定
    const marks: string[] = [];
    // 空亡
    const xunKong = ['戌','亥','申','酉','午','未','辰','巳','寅','卯','子','丑'];
    if (xunKong.includes(ZHI[(g-1)%12])) marks.push('空');
    
    // 击刑（甲子戊在震3，甲戌己在坤2，甲申庚在艮8，甲午辛在离9，甲辰壬在巽4，甲寅癸在巽4）
    if ((heavenStem === '戊' && g === 3) || (heavenStem === '己' && g === 2) || 
        (heavenStem === '庚' && g === 8) || (heavenStem === '辛' && g === 9) ||
        (heavenStem === '壬' && g === 4) || (heavenStem === '癸' && g === 4)) {
      marks.push('刑');
    }
    // 入墓（戊戌、壬辰、癸未、丙戌、丁丑、己丑、辛丑）
    if ((heavenStem === '戊' && (g === 6 || g === 4)) || (heavenStem === '壬' && g === 4) ||
        (heavenStem === '癸' && g === 2) || (heavenStem === '丙' && g === 6) ||
        (heavenStem === '丁' && g === 8) || (heavenStem === '己' && g === 8) || (heavenStem === '辛' && g === 8)) {
      marks.push('墓');
    }
    // 门迫（宫克门）
    const GONG_WUXING = ['水','土','木','木','土','金','金','土','火'];
    const MEN_WUXING: Record<string, string> = { '休门':'水','生门':'土','伤门':'木','杜门':'木','景门':'火','死门':'土','惊门':'金','开门':'金' };
    const doorWx = MEN_WUXING[door];
    if (doorWx && GONG_WUXING[g-1] && 
        ((GONG_WUXING[g-1] === '水' && doorWx === '火') || (GONG_WUXING[g-1] === '火' && doorWx === '金') ||
         (GONG_WUXING[g-1] === '金' && doorWx === '木') || (GONG_WUXING[g-1] === '木' && doorWx === '土') ||
         (GONG_WUXING[g-1] === '土' && doorWx === '水'))) {
      marks.push('迫');
    }

    palaces.push({
      index: g, name: GONG_NAME[g-1],
      heavenStem, earthStem, star, door, god: shen,
      changsheng, marks
    });
  }

  return {
    bazi: baziStr,
    ju: `${isYang ? '阳遁' : '阴遁'}${ju}局(${jq}·${['上','中','下'][yuanIdx]}元)`,
    palaces
  };
}

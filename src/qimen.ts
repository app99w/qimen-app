进口 { 太阳的 } 从……起'lunar-javascript';

ConstJU_TABLE：任何的={
  '冬至': [1,7,4], '小寒': [2,8,5], '大寒': [3,9,6],
  '立春': [8,5,2], '雨水': [9,6,3], '惊蛰': [1,7,4],
  '春分': [3,9,6], '清明': [4,1,7], '谷雨': [5,2,8],
  '立夏': [4,1,7], '小满': [5,2,8], '芒种': [6,3,9],
  '夏至': [9,3,6], '小暑': [8,2,5], '大暑': [7,1,4],
  '立秋': [2,5,8], '处暑': [1,4,7], '白露': [9,3,6],
  '秋分': [7,1,4], '寒露': [8,2,5], '霜降': [5,8,2],
  '立冬': [6,9,3], '小雪': [5,8,2], '大雪': [4,7,1]
};
Const杨=['冬至','小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种'];
Const甘=['戊','己','庚','辛','壬','癸','丁','丙','乙'];

出口 功能排攀(y: 数量,米: 数量,d: 数量,h: 数量,最小值: 数量) {
  Const太阳的=太阳的.fromYmdHms(y, 米, d, h, 最小值, 0);
  Const月球=太阳的.getLunar();
  康斯巴济=月球.getEightChar();
  ConstbaziStr=`${bazi.getyear()}年${bazi.getMonth()}月${bazi.getday()}日${bazi.getTime()}时`;
  ConstJQ=月球.getJieQiTable();
  让 currentJq='冬至';
  让 jqDate: 任何的=无效的;
  为 (constk在...内jq) {
    ConstJD=JQ[k];
    如果 (JD.getSolar().toYmdHms()<=太阳的.toYmdHms()) {
      如果 (!jqDate||JD.getSolar().toYmdHms()>jqDate.getSolar().toYmdHms()) {
        jqDate=JD; currentJq=k;
      }
    }
  }
  ConstisYang=杨.包括(currentJq);
  ConstjuList=JU_TABLE[currentJq]||[1,7,4];
  ConstDaygan=bazi.getDayGan();
  Const大智=bazi.getDayZhi();
  ConstXun=getXun(Daygan, 大智);
  让 yuanIdx=0;
  如果 (['甲子','己卯','甲午','己酉'].包括(Xun)) yuanIdx=0;
  其他 如果 (['甲寅','己巳','甲申','己亥'].包括(Xun)) yuanIdx=1;
  其他 yuanIdx=2;
  ConstJu=juList[yuanIdx];
  ConstDun=isYang ? '阳遁' : '阴遁';
  ConstJustr=`${Dun}${Ju}局(${currentJq}·${['上','中','下'][yuanIdx]}元)`;
  Const迪潘: 任何的={};
  为 (让 我=0; 我<9; 我++) {
    Const甘=甘[我];
    Const锣=isYang ? ((Ju - 1+我) % 9)+1 : ((Ju - 1 - 我+18) % 9)+1;
    迪潘[锣]=甘;
  }
  Const石干=bazi.getTimeGan();
  让 治妇功=1;
  为 (让 g=1; g<=9; g++) 如果 (迪潘[g]===石干) 治妇功=g;
  Const兴=['天蓬','天芮','天冲','天辅','天禽','天心','天柱','天任','天英'];
  Const男人=['休门','死门','伤门','杜门','','开门','惊门','生门','景门'];
  Const沈=['值符','螣蛇','太阴','六合','白虎','玄武','九地','九天'];
  ConstshenMap: 任何的={};
  为 (让 我=0; 我<8; 我++) {
    Constg=isYang ? ((治妇功 - 1+我) % 9)+1 : ((治妇功 - 1 - 我+18) % 9)+1;
    如果 (g===5) 继续;
    shenMap[g]=沈[我];
  }
  Const宫殿: 任何的[]=[];
  ConstGong_NAME=['坎1','坤2','震3','巽4','中5','干6','兑7','艮8','离9'];
  为 (让 g=1; g<=9; g++) {
    宫殿.推({
      指数: g, 姓名: Gong_NAME[g-1],
      heavenStem: 迪潘[g], 地杆: 迪潘[g],
      星: g===5 ? '天禽' : 兴[(g-1) % 9],
      门: g===5 ? '' : 男人[(g-1) % 9],
      上帝: shenMap[g]||'',
      长胜: '', 标记: []
    });
  }
  返回 { bazi: baziStr, Ju: Justr, 宫殿 };
}

功能 getXun(甘: 线,支: 线) {
  Const甘=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
  Const支=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
  ConstGI=甘.indexOf(甘), Zi=支.indexOf(支);
  如果 (GI<0||Zi<0) 返回 '';
  Const甲子=(Zi - GI+12) % 12;
  返回 ['甲子','甲戌','甲申','甲午','甲辰','甲寅'][数学.底板(甲子 / 2) % 6];
}

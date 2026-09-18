const jq = lunar.getJieQiTable();
let currentJq = '冬至';
let jqDate: any = null;
for (const k in jq) {
  const jd = jq[k];
  if (jd.getSolar().toYmdHms() <= solar.toYmdHms()) {
    if (!jqDate || jd.getSolar().toYmdHms() > jqDate.getSolar().toYmdHms()) {
      jqDate = jd; currentJq = k;
    }
  }
}

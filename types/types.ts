export type ImmigrationRecordKeyEn = {
  Date: string;
  'Control Point': string;
  'Arrival / Departure': 'Arrival' | 'Departure';
  'Hong Kong Residents': string;
  'Mainland Visitors': string;
  'Other Visitors': string;
  Total: string;
  field8: string;
};

export type ImmigrationRecordKeyZh = {
  '日期': string;
  '管制站': string;
  '入境 / 出境': '入境' | '出境';
  '香港居民': string;
  '內地訪客': string;
  '其他訪客': string;
  '總計': string;
};
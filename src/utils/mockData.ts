import { RegionData } from '../store/useMapStore';

// 模拟省份数据
export const mockProvinces: RegionData[] = [
  { code: '110000', name: '北京市', value: 123456, color: '#00d4ff' },
  { code: '310000', name: '上海市', value: 112233, color: '#00bcd4' },
  { code: '440000', name: '广东省', value: 98765, color: '#a855f7' },
  { code: '330000', name: '浙江省', value: 87654, color: '#06b6d4' },
  { code: '320000', name: '江苏省', value: 76543, color: '#0ea5e9' },
  { code: '370000', name: '山东省', value: 65432, color: '#3b82f6' },
  { code: '510000', name: '四川省', value: 54321, color: '#6366f1' },
  { code: '420000', name: '湖北省', value: 43210, color: '#8b5cf6' },
  { code: '430000', name: '湖南省', value: 32109, color: '#a855f7' },
  { code: '350000', name: '福建省', value: 21098, color: '#d946ef' },
  { code: '410000', name: '河南省', value: 67890, color: '#ec4899' },
  { code: '130000', name: '河北省', value: 56789, color: '#f43f5e' },
  { code: '610000', name: '陕西省', value: 45678, color: '#ef4444' },
  { code: '500000', name: '重庆市', value: 34567, color: '#f97316' },
  { code: '120000', name: '天津市', value: 23456, color: '#f59e0b' },
  { code: '530000', name: '云南省', value: 78901, color: '#eab308' },
  { code: '450000', name: '广西壮族自治区', value: 89012, color: '#84cc16' },
  { code: '360000', name: '江西省', value: 90123, color: '#22c55e' },
  { code: '340000', name: '安徽省', value: 12345, color: '#10b981' },
  { code: '210000', name: '辽宁省', value: 23456, color: '#14b8a6' },
  { code: '230000', name: '黑龙江省', value: 34567, color: '#06b6d4' },
  { code: '220000', name: '吉林省', value: 45678, color: '#0891b2' },
  { code: '140000', name: '山西省', value: 56789, color: '#0e7490' },
  { code: '520000', name: '贵州省', value: 67890, color: '#1e40af' },
  { code: '620000', name: '甘肃省', value: 78901, color: '#3730a3' },
  { code: '150000', name: '内蒙古自治区', value: 89012, color: '#4c1d95' },
  { code: '650000', name: '新疆维吾尔自治区', value: 90123, color: '#581c87' },
  { code: '460000', name: '海南省', value: 1234, color: '#701a75' },
  { code: '640000', name: '宁夏回族自治区', value: 2345, color: '#831843' },
  { code: '630000', name: '青海省', value: 3456, color: '#9f1239' },
  { code: '540000', name: '西藏自治区', value: 4567, color: '#b91c1c' },
  { code: '710000', name: '台湾省', value: 5678, color: '#c2410c' },
  { code: '810000', name: '香港特别行政区', value: 6789, color: '#a16207' },
  { code: '820000', name: '澳门特别行政区', value: 7890, color: '#713f12' },
];

// 模拟市级数据
export const mockCities: Record<string, RegionData[]> = {
  '440000': [
    { code: '440100', name: '广州市', value: 56789, color: '#00d4ff' },
    { code: '440300', name: '深圳市', value: 67890, color: '#a855f7' },
    { code: '440600', name: '佛山市', value: 45678, color: '#06b6d4' },
    { code: '441900', name: '东莞市', value: 34567, color: '#0ea5e9' },
    { code: '442000', name: '中山市', value: 23456, color: '#3b82f6' },
    { code: '440400', name: '珠海市', value: 12345, color: '#6366f1' },
    { code: '440700', name: '江门市', value: 21098, color: '#8b5cf6' },
    { code: '441300', name: '惠州市', value: 32109, color: '#a855f7' },
  ],
  '330000': [
    { code: '330100', name: '杭州市', value: 56789, color: '#00d4ff' },
    { code: '330200', name: '宁波市', value: 45678, color: '#a855f7' },
    { code: '330300', name: '温州市', value: 34567, color: '#06b6d4' },
    { code: '330600', name: '绍兴市', value: 23456, color: '#0ea5e9' },
  ],
  '320000': [
    { code: '320100', name: '南京市', value: 56789, color: '#00d4ff' },
    { code: '320500', name: '苏州市', value: 67890, color: '#a855f7' },
    { code: '320200', name: '无锡市', value: 45678, color: '#06b6d4' },
    { code: '320400', name: '常州市', value: 34567, color: '#0ea5e9' },
  ],
  '110000': [
    { code: '110101', name: '东城区', value: 12345, color: '#00d4ff' },
    { code: '110102', name: '西城区', value: 23456, color: '#a855f7' },
    { code: '110105', name: '朝阳区', value: 34567, color: '#06b6d4' },
    { code: '110106', name: '丰台区', value: 45678, color: '#0ea5e9' },
    { code: '110108', name: '海淀区', value: 56789, color: '#3b82f6' },
  ],
  '310000': [
    { code: '310101', name: '黄浦区', value: 12345, color: '#00d4ff' },
    { code: '310104', name: '徐汇区', value: 23456, color: '#a855f7' },
    { code: '310105', name: '长宁区', value: 34567, color: '#06b6d4' },
    { code: '310106', name: '静安区', value: 45678, color: '#0ea5e9' },
    { code: '310115', name: '浦东新区', value: 67890, color: '#3b82f6' },
  ],
};

// 模拟区县级数据
export const mockCounties: Record<string, RegionData[]> = {
  '440100': [
    { code: '440103', name: '荔湾区', value: 1234, color: '#00d4ff' },
    { code: '440104', name: '越秀区', value: 2345, color: '#a855f7' },
    { code: '440105', name: '海珠区', value: 3456, color: '#06b6d4' },
    { code: '440106', name: '天河区', value: 4567, color: '#0ea5e9' },
    { code: '440111', name: '白云区', value: 5678, color: '#3b82f6' },
  ],
  '440300': [
    { code: '440303', name: '罗湖区', value: 1234, color: '#00d4ff' },
    { code: '440304', name: '福田区', value: 2345, color: '#a855f7' },
    { code: '440305', name: '南山区', value: 3456, color: '#06b6d4' },
    { code: '440306', name: '宝安区', value: 4567, color: '#0ea5e9' },
    { code: '440307', name: '龙岗区', value: 5678, color: '#3b82f6' },
  ],
};

// 获取区域数据
export function getRegionsByLevel(level: string, parentCode?: string): RegionData[] {
  switch (level) {
    case 'country':
      return mockProvinces;
    case 'province':
      return mockCities[parentCode || ''] || [
        { code: `${parentCode || '000000'}1`, name: '示例市1', value: 12345, color: '#00d4ff' },
        { code: `${parentCode || '000000'}2`, name: '示例市2', value: 23456, color: '#a855f7' },
        { code: `${parentCode || '000000'}3`, name: '示例市3', value: 34567, color: '#06b6d4' },
      ];
    case 'city':
      return mockCounties[parentCode || ''] || [
        { code: `${parentCode || '000000'}1`, name: '示例区县1', value: 1234, color: '#00d4ff' },
        { code: `${parentCode || '000000'}2`, name: '示例区县2', value: 2345, color: '#a855f7' },
        { code: `${parentCode || '000000'}3`, name: '示例区县3', value: 3456, color: '#06b6d4' },
      ];
    default:
      return [];
  }
}

// 生成统计数据
export function generateStats(regions: RegionData[]) {
  const total = regions.reduce((sum, r) => sum + r.value, 0);
  const maxRegion = regions.reduce((max, r) => r.value > max.value ? r : max, regions[0]);
  return {
    total,
    regions: regions.length,
    avgValue: Math.round(total / regions.length),
    maxValue: { name: maxRegion?.name || '-', value: maxRegion?.value || 0 },
  };
}

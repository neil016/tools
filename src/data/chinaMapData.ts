// 简化版中国地图GeoJSON数据（示意性边界）
export const chinaGeoJSON = {
  type: "FeatureCollection",
  features: [
    // 北京市
    {
      type: "Feature",
      properties: { name: "北京市", adcode: "110000", value: 123456 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [116.0, 39.5], [116.7, 39.5], [116.7, 40.3], [116.0, 40.3], [116.0, 39.5]
        ]]
      }
    },
    // 天津市
    {
      type: "Feature",
      properties: { name: "天津市", adcode: "120000", value: 45678 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [116.7, 38.8], [117.8, 38.8], [117.8, 39.5], [116.7, 39.5], [116.7, 38.8]
        ]]
      }
    },
    // 河北省
    {
      type: "Feature",
      properties: { name: "河北省", adcode: "130000", value: 78901 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [114.0, 36.0], [119.8, 36.0], [119.8, 42.6], [114.0, 42.6], [114.0, 36.0]
        ]]
      }
    },
    // 山西省
    {
      type: "Feature",
      properties: { name: "山西省", adcode: "140000", value: 23456 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [110.5, 34.5], [114.8, 34.5], [114.8, 40.8], [110.5, 40.8], [110.5, 34.5]
        ]]
      }
    },
    // 内蒙古自治区
    {
      type: "Feature",
      properties: { name: "内蒙古自治区", adcode: "150000", value: 34567 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [97.0, 37.5], [126.0, 37.5], [126.0, 53.0], [97.0, 53.0], [97.0, 37.5]
        ]]
      }
    },
    // 辽宁省
    {
      type: "Feature",
      properties: { name: "辽宁省", adcode: "210000", value: 45678 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [118.5, 38.5], [125.0, 38.5], [125.0, 43.5], [118.5, 43.5], [118.5, 38.5]
        ]]
      }
    },
    // 吉林省
    {
      type: "Feature",
      properties: { name: "吉林省", adcode: "220000", value: 56789 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [121.0, 41.0], [131.5, 41.0], [131.5, 46.5], [121.0, 46.5], [121.0, 41.0]
        ]]
      }
    },
    // 黑龙江省
    {
      type: "Feature",
      properties: { name: "黑龙江省", adcode: "230000", value: 67890 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [121.0, 43.5], [135.0, 43.5], [135.0, 53.5], [121.0, 53.5], [121.0, 43.5]
        ]]
      }
    },
    // 上海市
    {
      type: "Feature",
      properties: { name: "上海市", adcode: "310000", value: 112233 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [121.0, 30.8], [121.9, 30.8], [121.9, 31.6], [121.0, 31.6], [121.0, 30.8]
        ]]
      }
    },
    // 江苏省
    {
      type: "Feature",
      properties: { name: "江苏省", adcode: "320000", value: 76543 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [116.5, 30.8], [121.8, 30.8], [121.8, 35.2], [116.5, 35.2], [116.5, 30.8]
        ]]
      }
    },
    // 浙江省
    {
      type: "Feature",
      properties: { name: "浙江省", adcode: "330000", value: 87654 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [118.0, 27.0], [122.5, 27.0], [122.5, 31.2], [118.0, 31.2], [118.0, 27.0]
        ]]
      }
    },
    // 安徽省
    {
      type: "Feature",
      properties: { name: "安徽省", adcode: "340000", value: 12345 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [114.8, 29.4], [119.7, 29.4], [119.7, 34.7], [114.8, 34.7], [114.8, 29.4]
        ]]
      }
    },
    // 福建省
    {
      type: "Feature",
      properties: { name: "福建省", adcode: "350000", value: 21098 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [115.8, 23.5], [120.8, 23.5], [120.8, 28.2], [115.8, 28.2], [115.8, 23.5]
        ]]
      }
    },
    // 江西省
    {
      type: "Feature",
      properties: { name: "江西省", adcode: "360000", value: 90123 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [113.5, 24.5], [118.8, 24.5], [118.8, 30.2], [113.5, 30.2], [113.5, 24.5]
        ]]
      }
    },
    // 山东省
    {
      type: "Feature",
      properties: { name: "山东省", adcode: "370000", value: 65432 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [114.5, 34.3], [122.5, 34.3], [122.5, 38.5], [114.5, 38.5], [114.5, 34.3]
        ]]
      }
    },
    // 河南省
    {
      type: "Feature",
      properties: { name: "河南省", adcode: "410000", value: 67890 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [110.4, 31.4], [116.6, 31.4], [116.6, 36.4], [110.4, 36.4], [110.4, 31.4]
        ]]
      }
    },
    // 湖北省
    {
      type: "Feature",
      properties: { name: "湖北省", adcode: "420000", value: 43210 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [108.3, 29.0], [116.5, 29.0], [116.5, 33.5], [108.3, 33.5], [108.3, 29.0]
        ]]
      }
    },
    // 湖南省
    {
      type: "Feature",
      properties: { name: "湖南省", adcode: "430000", value: 32109 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [109.0, 24.6], [114.5, 24.6], [114.5, 30.0], [109.0, 30.0], [109.0, 24.6]
        ]]
      }
    },
    // 广东省
    {
      type: "Feature",
      properties: { name: "广东省", adcode: "440000", value: 98765 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [109.5, 20.0], [117.5, 20.0], [117.5, 25.5], [109.5, 25.5], [109.5, 20.0]
        ]]
      }
    },
    // 广西壮族自治区
    {
      type: "Feature",
      properties: { name: "广西壮族自治区", adcode: "450000", value: 89012 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [104.5, 20.7], [112.0, 20.7], [112.0, 26.5], [104.5, 26.5], [104.5, 20.7]
        ]]
      }
    },
    // 海南省
    {
      type: "Feature",
      properties: { name: "海南省", adcode: "460000", value: 1234 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [108.5, 18.0], [111.2, 18.0], [111.2, 20.6], [108.5, 20.6], [108.5, 18.0]
        ]]
      }
    },
    // 重庆市
    {
      type: "Feature",
      properties: { name: "重庆市", adcode: "500000", value: 34567 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [105.8, 28.0], [110.5, 28.0], [110.5, 32.5], [105.8, 32.5], [105.8, 28.0]
        ]]
      }
    },
    // 四川省
    {
      type: "Feature",
      properties: { name: "四川省", adcode: "510000", value: 54321 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [97.5, 26.0], [108.5, 26.0], [108.5, 34.5], [97.5, 34.5], [97.5, 26.0]
        ]]
      }
    },
    // 贵州省
    {
      type: "Feature",
      properties: { name: "贵州省", adcode: "520000", value: 67890 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [103.5, 24.0], [109.5, 24.0], [109.5, 29.2], [103.5, 29.2], [103.5, 24.0]
        ]]
      }
    },
    // 云南省
    {
      type: "Feature",
      properties: { name: "云南省", adcode: "530000", value: 78901 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [97.5, 21.0], [106.0, 21.0], [106.0, 29.2], [97.5, 29.2], [97.5, 21.0]
        ]]
      }
    },
    // 西藏自治区
    {
      type: "Feature",
      properties: { name: "西藏自治区", adcode: "540000", value: 4567 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [78.0, 26.5], [99.0, 26.5], [99.0, 36.5], [78.0, 36.5], [78.0, 26.5]
        ]]
      }
    },
    // 陕西省
    {
      type: "Feature",
      properties: { name: "陕西省", adcode: "610000", value: 45678 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [105.5, 31.0], [111.5, 31.0], [111.5, 39.5], [105.5, 39.5], [105.5, 31.0]
        ]]
      }
    },
    // 甘肃省
    {
      type: "Feature",
      properties: { name: "甘肃省", adcode: "620000", value: 78901 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [92.5, 32.5], [108.8, 32.5], [108.8, 42.8], [92.5, 42.8], [92.5, 32.5]
        ]]
      }
    },
    // 青海省
    {
      type: "Feature",
      properties: { name: "青海省", adcode: "630000", value: 3456 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [89.5, 31.5], [103.0, 31.5], [103.0, 39.8], [89.5, 39.8], [89.5, 31.5]
        ]]
      }
    },
    // 宁夏回族自治区
    {
      type: "Feature",
      properties: { name: "宁夏回族自治区", adcode: "640000", value: 2345 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [104.2, 35.2], [107.0, 35.2], [107.0, 39.5], [104.2, 39.5], [104.2, 35.2]
        ]]
      }
    },
    // 新疆维吾尔自治区
    {
      type: "Feature",
      properties: { name: "新疆维吾尔自治区", adcode: "650000", value: 90123 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [73.0, 34.0], [96.5, 34.0], [96.5, 49.0], [73.0, 49.0], [73.0, 34.0]
        ]]
      }
    },
    // 台湾省
    {
      type: "Feature",
      properties: { name: "台湾省", adcode: "710000", value: 5678 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [119.5, 21.8], [122.2, 21.8], [122.2, 25.4], [119.5, 25.4], [119.5, 21.8]
        ]]
      }
    },
    // 香港特别行政区
    {
      type: "Feature",
      properties: { name: "香港特别行政区", adcode: "810000", value: 6789 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [113.8, 22.1], [114.4, 22.1], [114.4, 22.6], [113.8, 22.6], [113.8, 22.1]
        ]]
      }
    },
    // 澳门特别行政区
    {
      type: "Feature",
      properties: { name: "澳门特别行政区", adcode: "820000", value: 7890 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [113.5, 22.1], [113.7, 22.1], [113.7, 22.3], [113.5, 22.3], [113.5, 22.1]
        ]]
      }
    }
  ]
};

// 颜色配置
export const provinceColors = [
  '#00d4ff', '#00bcd4', '#a855f7', '#06b6d4', '#0ea5e9', 
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#f59e0b',
  '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#0891b2', '#0e7490', '#1e40af', '#3730a3', '#4c1d95',
  '#581c87', '#701a75', '#831843', '#9f1239', '#b91c1c',
  '#c2410c', '#a16207', '#713f12', '#451a03'
];

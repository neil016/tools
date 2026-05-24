import React from 'react';
import { useMapStore } from '../store/useMapStore';
import { TrendingUp, Map, Users, Award } from 'lucide-react';

export function StatsPanel() {
  const { stats, currentLevel } = useMapStore();

  const formatNumber = (num: number): string => {
    if (num >= 100000000) {
      return (num / 100000000).toFixed(2) + '亿';
    } else if (num >= 10000) {
      return (num / 10000).toFixed(2) + '万';
    }
    return num.toLocaleString();
  };

  return (
    <div className="absolute top-4 left-4 glass-panel glow-border rounded-lg p-6 min-w-[300px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-cyber-blue rounded-full pulse-animation" />
        <h2 className="text-cyber-blue text-lg font-bold glow-text">
          {currentLevel.name} - 数据概览
        </h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-cyber-gray/50 rounded border border-cyber-blue/20">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyber-purple" />
            <span className="text-gray-300 text-sm">总数值</span>
          </div>
          <span className="text-cyber-blue font-bold text-xl glow-text">
            {formatNumber(stats.total)}
          </span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-cyber-gray/50 rounded border border-cyber-blue/20">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-cyber-purple" />
            <span className="text-gray-300 text-sm">区域数量</span>
          </div>
          <span className="text-cyber-blue font-bold text-xl glow-text">
            {stats.regions}
          </span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-cyber-gray/50 rounded border border-cyber-blue/20">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyber-purple" />
            <span className="text-gray-300 text-sm">平均值</span>
          </div>
          <span className="text-cyber-blue font-bold text-xl glow-text">
            {formatNumber(stats.avgValue)}
          </span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-cyber-gray/50 rounded border border-cyber-purple/30">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyber-purple" />
            <span className="text-gray-300 text-sm">最高区域</span>
          </div>
          <div className="text-right">
            <div className="text-cyber-purple font-bold">{stats.maxValue.name}</div>
            <div className="text-cyber-blue text-sm">{formatNumber(stats.maxValue.value)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

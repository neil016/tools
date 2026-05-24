import React from 'react';
import { useMapStore } from '../store/useMapStore';
import { ArrowLeft, Home, Info } from 'lucide-react';

export function ControlPanel() {
  const { currentLevel, history, goBack, reset } = useMapStore();
  const canGoBack = history.length > 1;

  const getLevelLabel = (level: string): string => {
    const labels: Record<string, string> = {
      country: '国家级',
      province: '省级',
      city: '市级',
      county: '区县级',
    };
    return labels[level] || level;
  };

  return (
    <div className="absolute top-4 right-4 glass-panel glow-border rounded-lg p-4 min-w-[280px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-cyber-purple rounded-full pulse-animation" />
        <h2 className="text-cyber-purple text-lg font-bold glow-text">控制面板</h2>
      </div>
      
      {/* 面包屑导航 */}
      <div className="mb-4 p-3 bg-cyber-gray/50 rounded border border-cyber-blue/20">
        <div className="text-xs text-gray-400 mb-1">当前层级</div>
        <div className="text-cyber-blue font-bold text-lg">{getLevelLabel(currentLevel.level)}</div>
        <div className="text-white text-sm mt-1">{currentLevel.name}</div>
      </div>
      
      {/* 导航路径 */}
      <div className="mb-4 p-3 bg-cyber-gray/50 rounded border border-cyber-blue/20">
        <div className="text-xs text-gray-400 mb-2">导航路径</div>
        <div className="flex flex-wrap gap-1">
          {history.map((level, index) => (
            <React.Fragment key={`${level.code}-${index}`}>
              <span className="text-cyber-blue text-xs">{level.name}</span>
              {index < history.length - 1 && (
                <span className="text-gray-500 text-xs">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* 控制按钮 */}
      <div className="flex gap-2">
        <button
          onClick={goBack}
          disabled={!canGoBack}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded border transition-all ${
            canGoBack
              ? 'border-cyber-blue bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20'
              : 'border-gray-600 bg-gray-800/50 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          返回
        </button>
        
        <button
          onClick={reset}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded border border-cyber-purple bg-cyber-purple/10 text-cyber-purple hover:bg-cyber-purple/20 transition-all"
        >
          <Home className="w-4 h-4" />
          重置
        </button>
      </div>
      
      {/* 操作提示 */}
      <div className="mt-4 p-3 bg-cyber-gray/30 rounded border border-cyber-blue/10">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-cyber-blue mt-0.5" />
          <div className="text-xs text-gray-400">
            <p className="mb-1">• 点击区域进入下一层级</p>
            <p className="mb-1">• 拖拽旋转视角，滚轮缩放</p>
            <p>• 支持下钻至区县级</p>
          </div>
        </div>
      </div>
    </div>
  );
}

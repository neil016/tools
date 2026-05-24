import React, { useState, useEffect } from 'react';
import { RealChinaMap3D } from './components/RealChinaMap3D';
import { StatsPanel } from './components/StatsPanel';
import { ControlPanel } from './components/ControlPanel';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载时间
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen bg-cyber-dark overflow-hidden relative">
      {/* 扫描线效果 */}
      <div className="absolute inset-0 pointer-events-none z-10 scan-line" />
      
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-cyber-dark">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyber-blue border-t-transparent mb-4"></div>
            <h2 className="text-2xl text-cyber-blue glow-text font-orbitron">
              加载地图数据中...
            </h2>
            <p className="text-gray-400 mt-2">数据来源: 阿里云DataV</p>
          </div>
        </div>
      )}
      
      {/* 标题栏 */}
      <div className="absolute top-0 left-0 right-0 z-20 py-4 px-6 flex justify-center items-center">
        <h1 className="text-3xl font-bold text-cyber-blue glow-text font-orbitron tracking-wider">
          中国3D地图数据可视化大屏
        </h1>
      </div>
      
      {/* 3D地图 */}
      <div className="absolute inset-0">
        <RealChinaMap3D />
      </div>
      
      {/* 数据面板 */}
      <div className="absolute z-20">
        <StatsPanel />
      </div>
      
      {/* 控制面板 */}
      <div className="absolute z-20">
        <ControlPanel />
      </div>
      
      {/* 底部信息 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="glass-panel glow-border rounded px-6 py-2">
          <p className="text-cyber-blue text-sm">
            数据来源: 阿里云DataV | 支持省市区县多级下钻
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

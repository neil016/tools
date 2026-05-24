import React from 'react';
import { ChinaMap3D } from './components/ChinaMap3D';
import { StatsPanel } from './components/StatsPanel';
import { ControlPanel } from './components/ControlPanel';

function App() {
  return (
    <div className="w-screen h-screen bg-cyber-dark overflow-hidden relative">
      {/* 扫描线效果 */}
      <div className="absolute inset-0 pointer-events-none z-10 scan-line" />
      
      {/* 标题栏 */}
      <div className="absolute top-0 left-0 right-0 z-20 py-4 px-6 flex justify-center items-center">
        <h1 className="text-3xl font-bold text-cyber-blue glow-text font-orbitron tracking-wider">
          中国3D地图数据可视化大屏
        </h1>
      </div>
      
      {/* 3D地图 */}
      <div className="absolute inset-0">
        <ChinaMap3D />
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
            支持拖拽、缩放 | 点击区域下钻 | 数据实时更新
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

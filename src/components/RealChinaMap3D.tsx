import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useMapStore, MapLevel } from '../store/useMapStore';
import { getRegionsByLevel, generateStats } from '../utils/mockData';
import { chinaProvincesGeoJSON } from '../data/chinaProvinces';

const provinceColors = [
  '#00d4ff', '#00bcd4', '#a855f7', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#f59e0b',
  '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#0891b2', '#0e7490', '#1e40af', '#3730a3', '#4c1d95',
  '#581c87', '#701a75', '#831843', '#9f1239', '#b91c1c',
  '#c2410c', '#a16207', '#713f12', '#451a03'
];

const ProvinceBox = ({
  feature,
  index,
  onClick
}: {
  feature: any;
  index: number;
  onClick: (feature: any) => void;
}) => {
  const color = provinceColors[index % provinceColors.length];
  const name = feature.properties?.name || `区域${index + 1}`;
  
  return (
    <group position={[0, 0, 0]}>
      <mesh onClick={(e) => { e.stopPropagation(); onClick(feature); }}>
        <boxGeometry args={[1.2, 0.8, 0.3]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

const SimpleMap = () => {
  const { currentLevel, setCurrentLevel, setStats, setRegions } = useMapStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Initializing');
    const regions = getRegionsByLevel(currentLevel.level, currentLevel.currentCode);
    setRegions(regions);
    setStats(generateStats(regions));
    setLoading(false);
  }, [currentLevel, setRegions, setStats]);

  const handleClick = (feature: any) => {
    const nextLevelMap: Record<string, MapLevel['level']> = {
      country: 'province',
      province: 'city',
      city: 'county'
    };
    
    const adcode = feature.properties?.adcode;
    const name = feature.properties?.name;
    const nextLevel = nextLevelMap[currentLevel.level];
    
    if (nextLevel && adcode) {
      setCurrentLevel({
        level: nextLevel,
        currentCode: adcode,
        name: name,
        parentCode: currentLevel.currentCode
      });
    }
  };

  if (loading) {
    return (
      <>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Text position={[0, 0, 0]} fontSize={1} color="#00d4ff" anchorX="center" anchorY="middle">
          加载中...
        </Text>
      </>
    );
  }

  const features = chinaProvincesGeoJSON.features || [];
  const cols = 6;
  const rows = Math.ceil(features.length / cols);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1.5} />
      <pointLight position={[-10, -10, 10]} color="#a855f7" intensity={1.5} />
      <pointLight position={[0, 10, -10]} color="#06b6d4" intensity={1} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <gridHelper args={[30, 30, 0x00d4ff, 0x1e3a5f]} position={[0, 0, -0.1]} />
      
      {features.map((feature: any, index: number) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = (col - cols / 2) * 1.5;
        const y = (row - rows / 2) * -1.2;
        
        return (
          <group key={feature.properties?.adcode || index} position={[x, y, 0.15]}>
            <ProvinceBox
              feature={feature}
              index={index}
              onClick={handleClick}
            />
          </group>
        );
      })}
      
      <Text position={[0, 8, 0]} fontSize={0.4} color="#00d4ff" anchorX="center" anchorY="middle">
        当前: {currentLevel.name}
      </Text>
    </>
  );
};

export const RealChinaMap3D = () => {
  return (
    <div className="w-full h-full bg-black">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        dpr={1}
      >
        <Suspense fallback={
          <>
            <ambientLight intensity={0.5} />
            <Text position={[0, 0, 0]} fontSize={1} color="#00d4ff" anchorX="center" anchorY="middle">
              初始化...
            </Text>
          </>
        }>
          <SimpleMap />
        </Suspense>
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={60}
          enablePan={true}
        />
      </Canvas>
    </div>
  );
};

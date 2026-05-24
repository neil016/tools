import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useMapStore, MapLevel } from '../store/useMapStore';
import { getRegionsByLevel, generateStats } from '../utils/mockData';

const provinceColors = [
  '#00d4ff', '#00bcd4', '#a855f7', '#06b6d4', '#0ea5e9', 
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#f59e0b',
  '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#0891b2', '#0e7490', '#1e40af', '#3730a3', '#4c1d95',
  '#581c87', '#701a75', '#831843', '#9f1239', '#b91c1c',
  '#c2410c', '#a16207', '#713f12', '#451a03'
];

const SimpleRegion = ({
  region,
  index,
  onClick,
  onHover
}: {
  region: any;
  index: number;
  onClick: (region: any) => void;
  onHover: (region: any) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0.3);

  const total = 34;
  const cols = 6;
  const rows = Math.ceil(total / cols);
  const col = index % cols;
  const row = Math.floor(index / cols);
  const x = (col - cols / 2) * 1.5;
  const y = (row - rows / 2) * -1.2;

  useFrame((_, delta) => {
    if (meshRef.current) {
      const targetScale = isHovered ? 1.1 : 1;
      const targetHeight = isHovered ? 0.5 : 0.3;
      setScale(prev => THREE.MathUtils.lerp(prev, targetScale, delta * 5));
      setHeight(prev => THREE.MathUtils.lerp(prev, targetHeight, delta * 5));
      meshRef.current.scale.set(scale, scale, 1);
    }
  });

  const color = provinceColors[index % provinceColors.length];

  return (
    <group position={[x, y, height / 2]}>
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          setIsHovered(true);
          onHover(region);
        }}
        onPointerOut={() => {
          setIsHovered(false);
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(region);
        }}
      >
        <boxGeometry args={[1.2, 0.8, 0.3]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 0.6 : 0.2}
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      <Text
        position={[0, 0, 0.4]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {region.name}
      </Text>
    </group>
  );
};

const MapScene = () => {
  const { currentLevel, setCurrentLevel, setStats, setRegions } = useMapStore();
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);
  const [loadingState, setLoadingState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    console.log('Initializing map data for level:', currentLevel.level);
    const regions = getRegionsByLevel(currentLevel.level, currentLevel.currentCode);
    console.log('Regions loaded:', regions);
    setRegions(regions);
    setStats(generateStats(regions));
    setLoadingState('ready');
  }, [currentLevel, setRegions, setStats]);

  const handleRegionClick = (region: any) => {
    console.log('Region clicked:', region);
    const nextLevelMap: Record<string, MapLevel['level']> = {
      country: 'province',
      province: 'city',
      city: 'county'
    };
    
    const adcode = region.adcode || String(110000 + Math.floor(Math.random() * 1000));
    const name = region.name;
    
    const nextLevel = nextLevelMap[currentLevel.level];
    if (nextLevel) {
      console.log('Drilling down to:', nextLevel, name, adcode);
      setCurrentLevel({
        level: nextLevel,
        currentCode: adcode,
        name: name,
        parentCode: currentLevel.currentCode
      });
    }
  };

  const regions = getRegionsByLevel(currentLevel.level, currentLevel.currentCode);

  if (loadingState === 'loading') {
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

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1.5} />
      <pointLight position={[-10, -10, 10]} color="#a855f7" intensity={1.5} />
      <pointLight position={[0, 10, -10]} color="#06b6d4" intensity={1} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <gridHelper args={[30, 30, 0x00d4ff, 0x1e3a5f]} position={[0, 0, -0.1]} />
      
      {regions.map((region: any, index: number) => (
        <SimpleRegion
          key={region.adcode || index}
          region={region}
          index={index}
          onClick={handleRegionClick}
          onHover={setHoveredFeature}
        />
      ))}
      
      {hoveredFeature && (
        <mesh position={[0, -8, 0]}>
          <planeGeometry args={[6, 1]} />
          <meshBasicMaterial color="#0a0f1c" transparent opacity={0.8} />
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.4}
            color="#00d4ff"
            anchorX="center"
            anchorY="middle"
          >
            {hoveredFeature.name}
          </Text>
        </mesh>
      )}
      
      <Text position={[0, 8, 0]} fontSize={0.4} color="#00d4ff" anchorX="center" anchorY="middle">
        当前级别：{currentLevel.name}
      </Text>
    </>
  );
};

export const RealChinaMap3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={
          <>
            <ambientLight intensity={0.5} />
            <Text position={[0, 0, 0]} fontSize={1} color="#00d4ff" anchorX="center" anchorY="middle">
              初始化中...
            </Text>
          </>
        }>
          <MapScene />
        </Suspense>
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={40}
          enablePan={true}
        />
      </Canvas>
    </div>
  );
};

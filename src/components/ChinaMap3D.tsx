import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useMapStore, RegionData } from '../store/useMapStore';
import { getRegionsByLevel, generateStats } from '../utils/mockData';

// 地图区域组件
function MapRegion({ 
  position, 
  color, 
  name, 
  region, 
  onDrillDown,
  isHighlighted 
}: { 
  position: [number, number, number]; 
  color: string; 
  name: string;
  region: RegionData;
  onDrillDown: (region: RegionData) => void;
  isHighlighted?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      const targetScale = hovered || isHighlighted ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
      
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = hovered || isHighlighted ? 0.8 : 0.3;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onDrillDown(region)}
    >
      <boxGeometry args={[0.8, 0.5, 0.8]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.5}
      />
    </mesh>
  );
}

// 地图场景组件
function MapScene() {
  const { currentLevel, setCurrentLevel, setStats, setRegions } = useMapStore();
  const [regions, setLocalRegions] = useState<RegionData[]>([]);
  
  useEffect(() => {
    const newRegions = getRegionsByLevel(currentLevel.level, currentLevel.currentCode);
    setLocalRegions(newRegions);
    setRegions(newRegions);
    setStats(generateStats(newRegions));
  }, [currentLevel, setStats, setRegions]);

  const handleDrillDown = (region: RegionData) => {
    const nextLevelMap: Record<string, 'province' | 'city' | 'county'> = {
      country: 'province',
      province: 'city',
      city: 'county',
    };
    
    const nextLevel = nextLevelMap[currentLevel.level];
    if (nextLevel) {
      setCurrentLevel({
        level: nextLevel,
        currentCode: region.code,
        name: region.name,
        parentCode: currentLevel.currentCode,
      });
    }
  };

  // 生成网格布局
  const getGridPosition = (index: number, total: number): [number, number, number] => {
    const cols = Math.ceil(Math.sqrt(total));
    const row = Math.floor(index / cols);
    const col = index % cols;
    const offsetX = (cols - 1) / 2;
    const offsetY = (Math.ceil(total / cols) - 1) / 2;
    return [(col - offsetX) * 1.2, (row - offsetY) * -1.2, 0];
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={2} />
      
      {/* 星星背景 */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* 地图区域 */}
      <group>
        {regions.map((region, index) => (
          <MapRegion
            key={region.code}
            region={region}
            position={getGridPosition(index, regions.length)}
            color={region.color}
            name={region.name}
            onDrillDown={handleDrillDown}
          />
        ))}
      </group>
    </>
  );
}

// 主地图组件
export function ChinaMap3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <MapScene />
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={30}
        />
      </Canvas>
    </div>
  );
}

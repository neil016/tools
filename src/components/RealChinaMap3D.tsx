import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useMapStore, MapLevel } from '../store/useMapStore';
import { chinaGeoJSON, provinceColors } from '../data/chinaMapData';
import { getRegionsByLevel, generateStats } from '../utils/mockData';

// 经纬度到3D坐标的转换函数
const geoTo3D = (lng: number, lat: number, scale: number = 0.15): [number, number, number] => {
  // 以中国中心为原点
  const centerLng = 105.0;
  const centerLat = 36.0;
  
  const x = (lng - centerLng) * scale;
  const y = (lat - centerLat) * scale;
  return [x, y, 0];
};

// 单个省份组件
const Province3D = ({ 
  feature, 
  index, 
  onClick, 
  onHover 
}: { 
  feature: any; 
  index: number;
  onClick: (feature: any) => void;
  onHover: (feature: any | null) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0.3);

  const { geometry, center } = useMemo(() => {
    const coords = feature.geometry.coordinates[0];
    const shape = new THREE.Shape();
    
    // 计算中心点
    let sumLng = 0, sumLat = 0;
    coords.forEach((coord: [number, number]) => {
      sumLng += coord[0];
      sumLat += coord[1];
    });
    const centerLng = sumLng / coords.length;
    const centerLat = sumLat / coords.length;
    
    coords.forEach((coord: [number, number], i: number) => {
      const [x, y] = geoTo3D(coord[0], coord[1]);
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    });

    const extrudeSettings = {
      steps: 1,
      depth: 0.3,
      bevelEnabled: false
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    
    const [cx, cy] = geoTo3D(centerLng, centerLat);
    
    return { geometry, center: [cx, cy] };
  }, [feature]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const targetScale = isHovered ? 1.05 : 1;
      const targetHeight = isHovered ? 0.5 : 0.3;
      
      setScale(prev => THREE.MathUtils.lerp(prev, targetScale, delta * 5));
      setHeight(prev => THREE.MathUtils.lerp(prev, targetHeight, delta * 5));
      
      meshRef.current.scale.set(scale, scale, 1);
      meshRef.current.position.z = height / 2;
    }
  });

  const color = provinceColors[index % provinceColors.length];

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[center[0], center[1], height / 2]}
        onPointerOver={() => {
          setIsHovered(true);
          onHover(feature);
        }}
        onPointerOut={() => {
          setIsHovered(false);
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(feature);
        }}
        geometry={geometry}
      >
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
      
      {/* 省份名称 */}
      <Text
        position={[center[0], center[1], 0.6]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {feature.properties.name}
      </Text>
    </group>
  );
};

// 地图场景组件
const MapScene = () => {
  const { currentLevel, setCurrentLevel, setStats, setRegions } = useMapStore();
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);

  // 处理点击下钻
  const handleProvinceClick = (feature: any) => {
    const nextLevelMap: Record<string, MapLevel['level']> = {
      country: 'province',
      province: 'city',
      city: 'county'
    };
    
    const nextLevel = nextLevelMap[currentLevel.level];
    if (nextLevel) {
      setCurrentLevel({
        level: nextLevel,
        currentCode: feature.properties.adcode,
        name: feature.properties.name,
        parentCode: currentLevel.currentCode
      });
      
      // 更新区域数据
      const regions = getRegionsByLevel(nextLevel, feature.properties.adcode);
      setRegions(regions);
      setStats(generateStats(regions));
    }
  };

  return (
    <>
      {/* 背景光效 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1.5} />
      <pointLight position={[-10, -10, 10]} color="#a855f7" intensity={1.5} />
      <pointLight position={[0, 10, -10]} color="#06b6d4" intensity={1} />
      
      {/* 星星背景 */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* 网格地面 */}
      <gridHelper args={[30, 30, 0x00d4ff, 0x1e3a5f]} position={[0, 0, -0.1]} />
      
      {/* 渲染所有省份 */}
      {chinaGeoJSON.features.map((feature, index) => (
        <Province3D
          key={feature.properties.adcode}
          feature={feature}
          index={index}
          onClick={handleProvinceClick}
          onHover={setHoveredFeature}
        />
      ))}
      
      {/* 悬浮提示 */}
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
            {hoveredFeature.properties.name} - 数值: {hoveredFeature.properties.value}
          </Text>
        </mesh>
      )}
    </>
  );
};

// 主地图组件
export const RealChinaMap3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={[1, 2]}
      >
        <MapScene />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={8}
          maxDistance={40}
          enablePan={true}
        />
      </Canvas>
    </div>
  );
};

import React, { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useMapStore, MapLevel } from '../store/useMapStore';
import { getRegionsByLevel, generateStats } from '../utils/mockData';

// 阿里云DataV地图API地址
const getMapDataUrl = (adcode: string) => 
  `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`;

// 颜色配置
const provinceColors = [
  '#00d4ff', '#00bcd4', '#a855f7', '#06b6d4', '#0ea5e9', 
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#f59e0b',
  '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#0891b2', '#0e7490', '#1e40af', '#3730a3', '#4c1d95',
  '#581c87', '#701a75', '#831843', '#9f1239', '#b91c1c',
  '#c2410c', '#a16207', '#713f12', '#451a03'
];

// 经纬度到3D坐标的转换函数 - 根据地图级别调整缩放
const geoTo3D = (lng: number, lat: number, level: string = 'country'): [number, number, number] => {
  // 以中国中心为原点
  const centerLng = 105.0;
  const centerLat = 36.0;
  
  // 根据级别调整缩放
  const scales: Record<string, number> = {
    country: 0.18,
    province: 0.5,
    city: 1.5,
    county: 4
  };
  const scale = scales[level] || 0.18;
  
  const x = (lng - centerLng) * scale;
  const y = (lat - centerLat) * scale;
  return [x, y, 0];
};

// 从坐标数组计算中心点
const calculateCenter = (coordinates: any, level: string): [number, number] => {
  let allCoords: [number, number][] = [];
  
  // 处理MultiPolygon或Polygon
  const processCoords = (coords: any) => {
    if (Array.isArray(coords[0][0])) {
      // MultiPolygon
      coords.forEach((poly: any) => processCoords(poly));
    } else if (Array.isArray(coords[0])) {
      // Polygon
      coords[0].forEach((coord: [number, number]) => {
        allCoords.push(coord);
      });
    }
  };
  
  processCoords(coordinates);
  
  if (allCoords.length === 0) return [0, 0];
  
  let sumLng = 0, sumLat = 0;
  allCoords.forEach(([lng, lat]) => {
    sumLng += lng;
    sumLat += lat;
  });
  
  return geoTo3D(sumLng / allCoords.length, sumLat / allCoords.length, level);
};

// 单个区域组件
const Region3D = ({ 
  feature, 
  index, 
  onClick, 
  onHover,
  level
}: { 
  feature: any; 
  index: number;
  onClick: (feature: any) => void;
  onHover: (feature: any | null) => void;
  level: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0.3);

  const { geometries, center } = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];
    const { coordinates } = feature.geometry;
    
    // 处理Polygon或MultiPolygon
    const processPolygon = (polyCoords: any) => {
      const shape = new THREE.Shape();
      
      // 只处理外环（第一个环）
      const ringCoords = Array.isArray(polyCoords[0][0]) ? polyCoords[0] : polyCoords;
      
      if (ringCoords && ringCoords.length > 0) {
        ringCoords.forEach((coord: [number, number], i: number) => {
          const [x, y] = geoTo3D(coord[0], coord[1], level);
          if (i === 0) {
            shape.moveTo(x, y);
          } else {
            shape.lineTo(x, y);
          }
        });
      }
      
      const extrudeSettings = {
        steps: 1,
        depth: 0.3,
        bevelEnabled: false
      };
      
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();
      geometries.push(geometry);
    };
    
    if (feature.geometry.type === 'MultiPolygon') {
      coordinates.forEach((poly: any) => processPolygon(poly));
    } else if (feature.geometry.type === 'Polygon') {
      processPolygon(coordinates);
    }
    
    const center = calculateCenter(coordinates, level);
    
    return { geometries, center };
  }, [feature, level]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const targetScale = isHovered ? 1.02 : 1;
      const targetHeight = isHovered ? 0.5 : 0.3;
      
      setScale(prev => THREE.MathUtils.lerp(prev, targetScale, delta * 5));
      setHeight(prev => THREE.MathUtils.lerp(prev, targetHeight, delta * 5));
      
      meshRef.current.scale.set(scale, scale, 1);
      meshRef.current.position.z = height / 2;
    }
  });

  const color = provinceColors[index % provinceColors.length];

  return (
    <group position={[center[0], center[1], height / 2]}>
      {geometries.map((geometry, i) => (
        <mesh
          key={i}
          ref={i === 0 ? meshRef : undefined}
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
            emissiveIntensity={isHovered ? 0.6 : 0.15}
            roughness={0.4}
            metalness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      
      {/* 区域名称 - 根据级别调整大小 */}
      <Text
        position={[0, 0, 0.6]}
        fontSize={level === 'country' ? 0.3 : level === 'province' ? 0.2 : 0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {feature.properties.name}
      </Text>
    </group>
  );
};

// 地图数据加载组件
const MapLoader = ({ 
  adcode, 
  onDataLoaded 
}: { 
  adcode: string;
  onDataLoaded: (data: any) => void;
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getMapDataUrl(adcode));
        if (response.ok) {
          const data = await response.json();
          onDataLoaded(data);
        }
      } catch (error) {
        console.error('Error loading map data:', error);
      }
    };
    
    fetchData();
  }, [adcode, onDataLoaded]);
  
  return null;
};

// 地图场景组件
const MapScene = () => {
  const { currentLevel, setCurrentLevel, setStats, setRegions } = useMapStore();
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);
  const [mapData, setMapData] = useState<any>(null);

  const handleDataLoaded = (data: any) => {
    setMapData(data);
  };

  // 处理点击下钻
  const handleRegionClick = (feature: any) => {
    const nextLevelMap: Record<string, MapLevel['level']> = {
      country: 'province',
      province: 'city',
      city: 'county'
    };
    
    const nextLevel = nextLevelMap[currentLevel.level];
    if (nextLevel && feature.properties.adcode) {
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
      {/* 加载当前级别的地图数据 */}
      <MapLoader adcode={currentLevel.currentCode} onDataLoaded={handleDataLoaded} />
      
      {/* 背景光效 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1.5} />
      <pointLight position={[-10, -10, 10]} color="#a855f7" intensity={1.5} />
      <pointLight position={[0, 10, -10]} color="#06b6d4" intensity={1} />
      
      {/* 星星背景 */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* 网格地面 */}
      <gridHelper args={[30, 30, 0x00d4ff, 0x1e3a5f]} position={[0, 0, -0.1]} />
      
      {/* 渲染地图区域 */}
      {mapData && mapData.features && (
        mapData.features.map((feature: any, index: number) => (
          <Region3D
            key={feature.properties.adcode || index}
            feature={feature}
            index={index}
            onClick={handleRegionClick}
            onHover={setHoveredFeature}
            level={currentLevel.level}
          />
        ))
      )}
      
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
            {hoveredFeature.properties.name}
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
        camera={{ position: [0, 0, 25], fov: 60 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <MapScene />
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

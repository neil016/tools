import React, { useMemo, useRef, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useMapStore, MapLevel } from '../store/useMapStore';
import { getRegionsByLevel, generateStats } from '../utils/mockData';
import { chinaGeoJSON } from '../data/chinaMapData';

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
  onHover: (feature: any) => void;
  level: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0.3);

  const { geometries, center } = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];
    
    try {
      const { coordinates } = feature.geometry;
      
      // 处理Polygon或MultiPolygon
      const processPolygon = (polyCoords: any) => {
        const shape = new THREE.Shape();
        
        // 只处理外环（第一个环）
        let ringCoords = polyCoords;
        if (Array.isArray(polyCoords[0][0])) {
          ringCoords = polyCoords[0];
        } else if (Array.isArray(polyCoords[0])) {
          ringCoords = polyCoords[0];
        }
        
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
    } catch (error) {
      console.error('Error processing geometry:', error);
      return { geometries: [], center: [0, 0] };
    }
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

  if (geometries.length === 0) return null;

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

// Fallback区域组件 - 简单的方块
const FallbackRegion = ({
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

  // 计算网格布局位置
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
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {region.name}
      </Text>
    </group>
  );
};

// 地图场景组件
const MapScene = () => {
  const { currentLevel, setCurrentLevel, setStats, setRegions } = useMapStore();
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);
  const [mapData, setMapData] = useState<any>(null);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDataLoaded = useCallback((data: any) => {
    console.log('Map data loaded:', data);
    setMapData(data);
    setIsLoading(false);
    setLoadingError(false);
  }, []);

  const handleError = useCallback(() => {
    console.log('Using fallback data');
    setLoadingError(true);
    setIsLoading(false);
    setMapData(chinaGeoJSON);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setLoadingError(false);
    
    const fetchData = async () => {
      try {
        console.log('Fetching map data for:', currentLevel.currentCode);
        const response = await fetch(getMapDataUrl(currentLevel.currentCode));
        if (response.ok) {
          const data = await response.json();
          console.log('Data received:', data);
          handleDataLoaded(data);
        } else {
          console.error('Response not ok:', response.status);
          handleError();
        }
      } catch (error) {
        console.error('Error loading map data:', error);
        handleError();
      }
    };
    
    fetchData();
  }, [currentLevel.currentCode, handleDataLoaded, handleError]);

  // 处理点击下钻
  const handleRegionClick = (feature: any) => {
    const nextLevelMap: Record<string, MapLevel['level']> = {
      country: 'province',
      province: 'city',
      city: 'county'
    };
    
    const adcode = feature.properties?.adcode || feature.adcode;
    const name = feature.properties?.name || feature.name;
    
    const nextLevel = nextLevelMap[currentLevel.level];
    if (nextLevel && adcode) {
      setCurrentLevel({
        level: nextLevel,
        currentCode: adcode,
        name: name,
        parentCode: currentLevel.currentCode
      });
      
      // 更新区域数据
      const regions = getRegionsByLevel(nextLevel, adcode);
      setRegions(regions);
      setStats(generateStats(regions));
    }
  };

  // 渲染loading状态
  if (isLoading) {
    return (
      <>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Text position={[0, 0, 0]} fontSize={1} color="#00d4ff" anchorX="center" anchorY="middle">
          加载地图数据中...
        </Text>
      </>
    );
  }

  // 获取要渲染的数据
  const featuresToRender = mapData?.features || [];
  const regionsFallback = getRegionsByLevel(currentLevel.level, currentLevel.currentCode);

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
      
      {/* 渲染地图区域 - 优先真实数据，否则fallback */}
      {featuresToRender.length > 0 ? (
        featuresToRender.map((feature: any, index: number) => (
          <Region3D
            key={feature.properties?.adcode || index}
            feature={feature}
            index={index}
            onClick={handleRegionClick}
            onHover={setHoveredFeature}
            level={currentLevel.level}
          />
        ))
      ) : (
        regionsFallback.map((region: any, index: number) => (
          <FallbackRegion
            key={region.adcode || index}
            region={region}
            index={index}
            onClick={handleRegionClick}
            onHover={setHoveredFeature}
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
            {hoveredFeature.properties?.name || hoveredFeature.name}
          </Text>
        </mesh>
      )}
      
      {/* 错误提示 */}
      {loadingError && (
        <Text position={[0, 8, 0]} fontSize={0.3} color="#f97316" anchorX="center" anchorY="middle">
          使用本地数据演示
        </Text>
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
          maxDistance={60}
          enablePan={true}
        />
      </Canvas>
    </div>
  );
};

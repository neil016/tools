import React, { useRef, useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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

const geoTo3D = (lng: number, lat: number, level: string = 'country'): [number, number, number] => {
  const centerLng = 105.0;
  const centerLat = 36.0;
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

const calculateCenter = (coordinates: any, level: string): [number, number] => {
  let sumLng = 0;
  let sumLat = 0;
  let count = 0;
  const flattenCoords = (coords: any) => {
    if (Array.isArray(coords[0][0])) {
      coords.forEach((c: any) => flattenCoords(c));
    } else if (Array.isArray(coords[0])) {
      coords[0].forEach(([lng, lat]: [number, number]) => {
        sumLng += lng;
        sumLat += lat;
        count++;
      });
    }
  };
  flattenCoords(coordinates);
  return count > 0 ? geoTo3D(sumLng / count, sumLat / count, level) : [0, 0];
};

const GeoJSONRegion = ({
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
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [height, setHeight] = useState(0.3);
  
  const geometries = useMemo(() => {
    const result: THREE.BufferGeometry[] = [];
    const { coordinates, type } = feature.geometry;

    const processRing = (ring: any) => {
      const shape = new THREE.Shape();
      ring.forEach((coord: [number, number], i: number) => {
        const [x, y] = geoTo3D(coord[0], coord[1], level);
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
      result.push(geometry);
    };

    if (type === 'Polygon') {
      processRing(coordinates[0]);
    } else if (type === 'MultiPolygon') {
      coordinates.forEach((poly: any) => {
        if (Array.isArray(poly[0][0])) {
          processRing(poly[0]);
        } else if (Array.isArray(poly[0])) {
          processRing(poly);
        }
      });
    }

    return result;
  }, [feature, level]);

  const center = useMemo(() => {
    return calculateCenter(feature.geometry.coordinates, level);
  }, [feature, level]);

  useFrame((_, delta) => {
    const targetHeight = isHovered ? 0.5 : 0.3;
    setHeight(prev => THREE.MathUtils.lerp(prev, targetHeight, delta * 5));
  });

  const color = provinceColors[index % provinceColors.length];

  return (
    <group ref={groupRef} position={[center[0], center[1], height / 2]}>
      {geometries.map((geometry, i) => (
        <mesh
          key={i}
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
      
      <Text
        position={[0, 0, 0.6]}
        fontSize={level === 'country' ? 0.3 : level === 'province' ? 0.2 : 0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {feature.properties?.name || ''}
      </Text>
    </group>
  );
};

const MapScene = () => {
  const { currentLevel, setCurrentLevel, setStats, setRegions } = useMapStore();
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Initializing map data for level:', currentLevel.level);
    const regions = getRegionsByLevel(currentLevel.level, currentLevel.currentCode);
    setRegions(regions);
    setStats(generateStats(regions));
    setLoading(false);
  }, [currentLevel, setRegions, setStats]);

  const handleRegionClick = useCallback((feature: any) => {
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
  }, [currentLevel, setCurrentLevel]);

  if (loading) {
    return (
      <>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Text position={[0, 0, 0]} fontSize={1} color="#00d4ff" anchorX="center" anchorY="middle">
          正在加载地图数据...
        </Text>
      </>
    );
  }

  const mapData = chinaProvincesGeoJSON;

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1.5} />
      <pointLight position={[-10, -10, 10]} color="#a855f7" intensity={1.5} />
      <pointLight position={[0, 10, -10]} color="#06b6d4" intensity={1} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <gridHelper args={[30, 30, 0x00d4ff, 0x1e3a5f]} position={[0, 0, -0.1]} />
      
      {mapData.features && mapData.features.map((feature: any, index: number) => (
        <GeoJSONRegion
          key={feature.properties?.adcode || index}
          feature={feature}
          index={index}
          onClick={handleRegionClick}
          onHover={setHoveredFeature}
          level={currentLevel.level}
        />
      ))}
      
      {hoveredFeature && (
        <Text position={[0, -8, 0]} fontSize={0.4} color="#00d4ff" anchorX="center" anchorY="middle">
          {hoveredFeature.properties?.name || ''}
        </Text>
      )}
      
      <Text position={[0, 8, 0]} fontSize={0.4} color="#00d4ff" anchorX="center" anchorY="middle">
        当前级别: {currentLevel.name}
      </Text>
    </>
  );
};

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

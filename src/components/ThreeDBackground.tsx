
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Dimension } from '@/types';

interface ThreeDBackgroundProps {
  dimension: Dimension;
}

const ThreeDBackground = ({ dimension }: ThreeDBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number>(0);

  // Create scene on mount
  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    cameraRef.current = camera;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0003;
        particlesRef.current.rotation.y += 0.0005;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (particlesRef.current && sceneRef.current) {
        sceneRef.current.remove(particlesRef.current);
      }
    };
  }, []);

  // Update particles when dimension changes
  useEffect(() => {
    if (!sceneRef.current) return;

    // Remove existing particles
    if (particlesRef.current) {
      sceneRef.current.remove(particlesRef.current);
    }

    // Create new particles based on current dimension
    const particleCount = dimension === 'cyber' ? 2000 : dimension === 'magic' ? 1500 : 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    // Different patterns for different dimensions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      if (dimension === 'cyber') {
        // Grid-like pattern for cyber dimension
        const spread = 100;
        particlePositions[i3] = (Math.random() - 0.5) * spread;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * spread;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * spread;
      } else if (dimension === 'magic') {
        // Spiral pattern for magic dimension
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 50;
        particlePositions[i3] = Math.cos(angle) * radius;
        particlePositions[i3 + 1] = Math.sin(angle) * radius;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 50;
      } else {
        // Void dimension - more random, sparser
        const spread = 150;
        particlePositions[i3] = (Math.random() - 0.5) * spread;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * spread;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * spread;
      }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Different materials for different dimensions
    const particleMaterial = new THREE.PointsMaterial({
      size: dimension === 'cyber' ? 0.4 : dimension === 'magic' ? 0.6 : 0.8,
      color: dimension === 'cyber' ? 0x0EA5E9 : 
             dimension === 'magic' ? 0x8B5CF6 : 0xFFFFFF,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    sceneRef.current.add(particles);
    particlesRef.current = particles;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(
      dimension === 'cyber' ? 0x0C4A6E : 
      dimension === 'magic' ? 0x5B21B6 : 0x1E293B,
      0.5
    );
    sceneRef.current.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(
      dimension === 'cyber' ? 0x0EA5E9 : 
      dimension === 'magic' ? 0x8B5CF6 : 0xF8FAFC,
      0.8
    );
    directionalLight.position.set(5, 5, 5);
    sceneRef.current.add(directionalLight);

  }, [dimension]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ThreeDBackground;

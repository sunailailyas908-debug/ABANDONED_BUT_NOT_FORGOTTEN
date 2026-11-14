import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The demo page lives in app/. Models and fallback pictures in public/ are served as
// /models/*.glb and /fallback/*.svg. Vercel runs `npm run build` and serves `dist`.
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei'],
  },
  server: { port: 5173 },
});

// Vite config: React plugin, relative base so the build works on any static host.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()], base: './' });

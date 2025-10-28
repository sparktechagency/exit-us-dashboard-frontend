import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    preview: {
        allowedHosts: ['localhost', '127.0.0.1', 'admin.exoduxz.app'],
    },
});

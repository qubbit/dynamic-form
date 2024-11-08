import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SchemaFormBuilder',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-datepicker', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-datepicker': 'DatePicker',
          'lucide-react': 'LucideReact'
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});
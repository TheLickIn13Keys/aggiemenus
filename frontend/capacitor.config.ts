import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aggiemenus.app',
  appName: 'Aggie Menus',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    hostname: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', ''),
  },
  plugins: {
    // Add any required Capacitor plugins configuration here
  }
};

export default config;
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    window.frameworkReady?.();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="driver-login" />
        <Stack.Screen name="license-login" />
        <Stack.Screen name="overview" />
        <Stack.Screen name="overview-usage" />
        <Stack.Screen name="overview-performance" />
        <Stack.Screen name="overview-earnings" />
        <Stack.Screen name="driver-performance" />
        <Stack.Screen name="driver-performance-detail" />
        <Stack.Screen name="driver-monitoring" />
        <Stack.Screen name="car-performance-detail" />
        <Stack.Screen name="analysis" />
        <Stack.Screen name="money-manager" />
        <Stack.Screen name="route-tracker" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
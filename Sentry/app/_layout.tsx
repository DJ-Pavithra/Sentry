import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import VoiceActivation from '../components/VoiceActivation';
import ShakeDetector from '../components/ShakeDetector';
import DisguiseMode from '../components/DisguiseMode';
import LockScreenWidget from '../components/LockScreenWidget';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  const [voiceActivationEnabled, setVoiceActivationEnabled] = useState(true);
  const [shakeDetectionEnabled, setShakeDetectionEnabled] = useState(true);
  const [disguiseModeActive, setDisguiseModeActive] = useState(false);
  const [showLockScreenWidget, setShowLockScreenWidget] = useState(Platform.OS === 'web');

  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  const handleSOSTrigger = () => {
    // In a real app, this would trigger the SOS alert
    console.log('SOS triggered');
    alert('SOS Alert Triggered');
  };

  const handleShakeDetected = () => {
    // In a real app, this would trigger the SOS alert
    console.log('Shake detected, triggering SOS');
    handleSOSTrigger();
  };

  const handleVoiceCommand = () => {
    // In a real app, this would trigger the SOS alert
    console.log('Voice command detected, triggering SOS');
    handleSOSTrigger();
  };

  const handleFakeCallTrigger = () => {
    // In a real app, this would trigger a fake call
    console.log('Fake call triggered');
    alert('Fake Call Triggered');
  };

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      
      {/* Voice Activation Component */}
      <VoiceActivation 
        onTrigger={handleVoiceCommand} 
        isEnabled={voiceActivationEnabled} 
      />
      
      {/* Shake Detection Component */}
      <ShakeDetector 
        onShake={handleShakeDetected} 
        isEnabled={shakeDetectionEnabled} 
      />
      
      {/* Disguise Mode Component */}
      <DisguiseMode 
        isActive={disguiseModeActive} 
        onExit={() => setDisguiseModeActive(false)} 
      />
      
      {/* Lock Screen Widget Simulation (for web only) */}
      {showLockScreenWidget && (
        <View style={styles.widgetContainer}>
          <LockScreenWidget 
            onSOSTrigger={handleSOSTrigger}
            onFakeCallTrigger={handleFakeCallTrigger}
          />
        </View>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  widgetContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1000,
  },
});
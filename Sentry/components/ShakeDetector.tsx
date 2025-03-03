import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';

// This is a mock component since actual shake detection would require native modules
export default function ShakeDetector({ onShake, isEnabled = true }) {
  const [shakeDetected, setShakeDetected] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Mock shake detection
  useEffect(() => {
    if (!isEnabled) return;

    // Simulate random shake detection (for demo purposes)
    const shakeInterval = setInterval(() => {
      // 5% chance of detecting a shake
      if (Math.random() < 0.05) {
        handleShakeDetected();
      }
    }, 10000);
    
    return () => clearInterval(shakeInterval);
  }, [isEnabled]);

  // Handle countdown after shake is detected
  useEffect(() => {
    let timer;
    if (shakeDetected && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (shakeDetected && countdown === 0) {
      setShakeDetected(false);
      onShake();
    }
    
    return () => clearTimeout(timer);
  }, [shakeDetected, countdown, onShake]);

  const handleShakeDetected = () => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Shake Detected',
        'Shake detection is simulated in web mode. In a real mobile app, this would use the device accelerometer.'
      );
    }
    
    setShakeDetected(true);
    setCountdown(3); // 3 second countdown
  };

  const cancelShake = () => {
    setShakeDetected(false);
    setCountdown(0);
  };

  if (!isEnabled || !shakeDetected) return null;

  return (
    <View style={styles.container}>
      <View style={styles.shakeAlert}>
        <AlertTriangle size={24} color="#FFFFFF" />
        <Text style={styles.shakeText}>
          Shake detected! SOS will trigger in {countdown}s
        </Text>
        <TouchableOpacity style={styles.cancelButton} onPress={cancelShake}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
    zIndex: 1000,
  },
  shakeAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shakeText: {
    color: '#FFFFFF',
    flex: 1,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  cancelText: {
    color: '#E53935',
    fontWeight: 'bold',
  },
});
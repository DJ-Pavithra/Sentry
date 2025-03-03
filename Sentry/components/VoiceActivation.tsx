import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Mic, MicOff } from 'lucide-react-native';

// This is a mock component since actual voice recognition would require native modules
export default function VoiceActivation({ onTrigger, isEnabled = true }) {
  const [listening, setListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const triggerPhrase = 'help me';

  // Mock voice recognition
  useEffect(() => {
    if (!isEnabled) return;

    let interval;
    if (listening) {
      // Simulate voice recognition with random phrases
      interval = setInterval(() => {
        const phrases = [
          'what time is it',
          'help me',
          'call mom',
          'where am I',
          'I need help'
        ];
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setRecognizedText(randomPhrase);
        
        // Check if the recognized phrase matches the trigger phrase
        if (randomPhrase.toLowerCase().includes(triggerPhrase)) {
          onTrigger();
          setListening(false);
          Alert.alert('SOS Triggered', 'Voice command "help me" detected');
        }
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [listening, isEnabled, onTrigger]);

  const toggleListening = () => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Voice Recognition',
        'Voice recognition is simulated in web mode. In a real mobile app, this would use the device microphone.'
      );
    }
    
    setListening(!listening);
    if (!listening) {
      setRecognizedText('');
    }
  };

  if (!isEnabled) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.micButton, listening && styles.micButtonActive]} 
        onPress={toggleListening}
      >
        {listening ? (
          <Mic size={24} color="#FFFFFF" />
        ) : (
          <MicOff size={24} color="#FFFFFF" />
        )}
      </TouchableOpacity>
      
      {listening && (
        <View style={styles.listeningIndicator}>
          <Text style={styles.listeningText}>Listening...</Text>
          {recognizedText ? (
            <Text style={styles.recognizedText}>"{recognizedText}"</Text>
          ) : (
            <Text style={styles.recognizedText}>Say "help me" to trigger SOS</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  micButton: {
    backgroundColor: '#9E9E9E',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  micButtonActive: {
    backgroundColor: '#E53935',
  },
  listeningIndicator: {
    position: 'absolute',
    bottom: 60,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 8,
    width: 200,
  },
  listeningText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recognizedText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
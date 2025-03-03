import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, X, Mic, MicOff } from 'lucide-react-native';

export default function FakeCallScreen() {
  const [callActive, setCallActive] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const [muted, setMuted] = useState(false);
  const [callerName, setCallerName] = useState('Mom');
  
  useEffect(() => {
    let interval;
    if (callActive) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    } else {
      setCallTimer(0);
    }
    
    return () => clearInterval(interval);
  }, [callActive]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const triggerFakeCall = () => {
    if (!callActive) {
      setCallActive(true);
      // In a real app, this would play a ringtone sound
    }
  };
  
  const endCall = () => {
    setCallActive(false);
    setMuted(false);
  };
  
  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fake Call</Text>
      </View>

      <View style={styles.content}>
        {callActive ? (
          <View style={styles.activeCallContainer}>
            <View style={styles.callerInfoContainer}>
              <View style={styles.callerAvatar}>
                <Text style={styles.callerInitial}>{callerName[0]}</Text>
              </View>
              <Text style={styles.callerName}>{callerName}</Text>
              <Text style={styles.callStatus}>Call in progress</Text>
              <Text style={styles.callTimer}>{formatTime(callTimer)}</Text>
            </View>
            
            <View style={styles.callActionsContainer}>
              <TouchableOpacity 
                style={[styles.callActionButton, muted ? styles.callActionButtonActive : null]} 
                onPress={toggleMute}
              >
                {muted ? (
                  <MicOff size={24} color="#FFFFFF" />
                ) : (
                  <Mic size={24} color="#FFFFFF" />
                )}
                <Text style={styles.callActionText}>{muted ? 'Unmute' : 'Mute'}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.endCallButton} 
                onPress={endCall}
              >
                <X size={24} color="#FFFFFF" />
                <Text style={styles.callActionText}>End</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.setupContainer}>
              <Text style={styles.setupTitle}>Fake Call Setup</Text>
              
              <View style={styles.callerOption}>
                <Text style={styles.optionLabel}>Caller Name</Text>
                <View style={styles.callerSelection}>
                  <TouchableOpacity 
                    style={[styles.callerButton, callerName === 'Mom' && styles.callerButtonSelected]} 
                    onPress={() => setCallerName('Mom')}
                  >
                    <Text style={[styles.callerButtonText, callerName === 'Mom' && styles.callerButtonTextSelected]}>
                      Mom
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.callerButton, callerName === 'Dad' && styles.callerButtonSelected]} 
                    onPress={() => setCallerName('Dad')}
                  >
                    <Text style={[styles.callerButtonText, callerName === 'Dad' && styles.callerButtonTextSelected]}>
                      Dad
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.callerButton, callerName === 'Friend' && styles.callerButtonSelected]} 
                    onPress={() => setCallerName('Friend')}
                  >
                    <Text style={[styles.callerButtonText, callerName === 'Friend' && styles.callerButtonTextSelected]}>
                      Friend
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.triggerCallButton} 
              onPress={triggerFakeCall}
            >
              <Phone size={28} color="#FFFFFF" />
              <Text style={styles.triggerCallText}>Start Fake Call</Text>
            </TouchableOpacity>
            
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>How to use Fake Call</Text>
              <Text style={styles.infoText}>
                • Set up who you want to appear to be calling you
              </Text>
              <Text style={styles.infoText}>
                • Press "Start Fake Call" to trigger an incoming call
              </Text>
              <Text style={styles.infoText}>
                • Your phone will ring as if receiving a real call
              </Text>
              <Text style={styles.infoText}>
                • Answer the call to show an active call screen
              </Text>
              <Text style={styles.infoText}>
                • Use this feature to excuse yourself from uncomfortable situations
              </Text>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  setupContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  setupTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  callerOption: {
    marginBottom: 16,
  },
  optionLabel: {
    fontSize: 16,
    color: '#616161',
    marginBottom: 8,
  },
  callerSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  callerButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  callerButtonSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  callerButtonText: {
    color: '#616161',
    fontWeight: '500',
  },
  callerButtonTextSelected: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  triggerCallButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  triggerCallText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  infoText: {
    color: '#616161',
    marginBottom: 8,
    lineHeight: 20,
  },
  activeCallContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  callerInfoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  callerAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  callerInitial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#757575',
  },
  callerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  callStatus: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 8,
  },
  callTimer: {
    fontSize: 18,
    color: '#212121',
    fontWeight: '500',
  },
  callActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  callActionButton: {
    backgroundColor: '#757575',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callActionButtonActive: {
    backgroundColor: '#E53935',
  },
  endCallButton: {
    backgroundColor: '#E53935',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callActionText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 12,
  },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, Video, Mic, MapPin, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useNotifications } from '../../contexts/NotificationContext';
import EmergencyService from '../../services/EmergencyService';
import * as Location from 'expo-location';
import { DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EmergencyScreen() {
  const [recording, setRecording] = useState(false);
  const [sosActivated, setSosActivated] = useState(false);
  const { addNotification } = useNotifications();
  
  const triggerSOS = async () => {
    if (sosActivated) {
      Alert.alert(
        "Cancel SOS",
        "Are you sure you want to cancel the SOS alert?",
        [
          {
            text: "No",
            style: "cancel"
          },
          { 
            text: "Yes", 
            onPress: () => {
              setSosActivated(false);
              setRecording(false);
            }
          }
        ]
      );
    } else {
      setSosActivated(true);
      setRecording(true);
      
      addNotification({
        type: 'emergency',
        title: 'Emergency Alert',
        description: 'SOS signal activated',
        read: false,
      });
      
      // Simulate auto audio recording for 30 seconds
      setTimeout(() => {
        setRecording(false);
      }, 30000);

      try {
        // Send emergency alerts to all contacts
        await EmergencyService.sendEmergencyAlerts();
        
        // Get current location
        const location = await Location.getCurrentPositionAsync({});
        
        // Store emergency in database
        AsyncStorage.getItem('emergency_contacts').then(async (contacts) => {
          if (contacts) {
            const contactsArray = JSON.parse(contacts);
            const googleMapsUrl = `https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;
            const message = `EMERGENCY SOS ALERT! I need help! My current location: ${googleMapsUrl}`;
            const phoneNumbers = contactsArray.map(contact => contact.phone);
            await EmergencyService.sendSMS(phoneNumbers, message);
          }
        });

        addNotification({
          id: Date.now().toString(),
          title: 'Emergency Alert Sent',
          message: 'Your emergency contacts have been notified.',
          read: false
        });
      } catch (error) {
        Alert.alert(
          'Error',
          'Failed to send emergency alerts. Please try calling emergency services directly.',
        );
        console.error('Emergency alert error:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency SOS</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.sosContainer}>
          <TouchableOpacity 
            style={[styles.sosButton, sosActivated ? styles.sosButtonActive : null]} 
            onPress={triggerSOS}
            activeOpacity={0.7}
          >
            <Shield size={48} color="#FFFFFF" />
            <Text style={styles.sosText}>{sosActivated ? "CANCEL SOS" : "SOS"}</Text>
          </TouchableOpacity>
          
          <Text style={styles.sosDescription}>
            {sosActivated 
              ? "SOS alert activated. Emergency contacts notified." 
              : "Tap the button to send an emergency alert to your contacts"}
          </Text>
        </View>

        {sosActivated && (
          <View style={styles.alertActiveContainer}>
            <View style={styles.alertStatusRow}>
              <AlertTriangle size={20} color="#E53935" />
              <Text style={styles.alertStatusText}>Emergency Alert Active</Text>
            </View>
            
            <View style={styles.actionsContainer}>
              <View style={styles.actionItem}>
                <MapPin size={24} color="#E53935" />
                <Text style={styles.actionText}>Location Shared</Text>
              </View>
              
              <View style={styles.actionItem}>
                <Video size={24} color={sosActivated ? "#E53935" : "#9E9E9E"} />
                <Text style={[styles.actionText, !sosActivated && styles.actionTextDisabled]}>
                  Video Ready
                </Text>
              </View>
              
              <View style={styles.actionItem}>
                <Mic size={24} color={recording ? "#E53935" : "#9E9E9E"} />
                <Text style={[styles.actionText, !recording && styles.actionTextDisabled]}>
                  {recording ? "Recording Audio" : "Audio Recorded"}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What happens when you press SOS?</Text>
          <Text style={styles.infoText}>
            • Your emergency contacts will receive an alert with your location
          </Text>
          <Text style={styles.infoText}>
            • 30 seconds of audio will be recorded automatically
          </Text>
          <Text style={styles.infoText}>
            • Your live location will be shared until you cancel the alert
          </Text>
          <Text style={styles.infoText}>
            • You can optionally share live video with your contacts
          </Text>
        </View>
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
  sosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  sosButton: {
    backgroundColor: '#E53935',
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sosButtonActive: {
    backgroundColor: '#D32F2F',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  sosText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 8,
  },
  sosDescription: {
    textAlign: 'center',
    color: '#616161',
    marginTop: 16,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  alertActiveContainer: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  alertStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertStatusText: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  actionsContainer: {
    marginTop: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#212121',
  },
  actionTextDisabled: {
    color: '#9E9E9E',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
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
});
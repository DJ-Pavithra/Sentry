import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Shield, TriangleAlert as AlertTriangle, Activity } from 'lucide-react-native';

export default function HomeScreen() {
  const [safetyStatus, setSafetyStatus] = useState('Safe');
  const [locationSharing, setLocationSharing] = useState(false);
  const [dangerDetected, setDangerDetected] = useState(false);

  // Simulate danger detection (in a real app, this would use sensors and AI)
  useEffect(() => {
    const interval = setInterval(() => {
      // Random chance of detecting danger for demo purposes
      if (Math.random() < 0.1) {
        setDangerDetected(true);
        setSafetyStatus('Caution');
      } else {
        setDangerDetected(false);
        setSafetyStatus('Safe');
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const toggleLocationSharing = () => {
    setLocationSharing(!locationSharing);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Guardian</Text>
        <View style={[
          styles.statusIndicator, 
          { backgroundColor: safetyStatus === 'Safe' ? '#4CAF50' : '#FFC107' }
        ]} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Current Status</Text>
          <View style={styles.statusRow}>
            <Activity size={24} color={safetyStatus === 'Safe' ? '#4CAF50' : '#FFC107'} />
            <Text style={[
              styles.statusText, 
              { color: safetyStatus === 'Safe' ? '#4CAF50' : '#FFC107' }
            ]}>
              {safetyStatus}
            </Text>
          </View>
          {dangerDetected && (
            <View style={styles.warningBox}>
              <AlertTriangle size={20} color="#FFC107" />
              <Text style={styles.warningText}>
                Unusual movement detected. Are you safe?
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, locationSharing ? styles.actionButtonActive : null]} 
            onPress={toggleLocationSharing}
          >
            <MapPin size={24} color={locationSharing ? '#FFFFFF' : '#E53935'} />
            <Text style={[styles.actionText, locationSharing ? styles.actionTextActive : null]}>
              {locationSharing ? 'Sharing Location' : 'Share Location'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sosButton}>
            <Shield size={28} color="#FFFFFF" />
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Safety Tips</Text>
          <Text style={styles.infoText}>
            • Share your location with trusted contacts when traveling alone
          </Text>
          <Text style={styles.infoText}>
            • Use the fake call feature to deter unwanted attention
          </Text>
          <Text style={styles.infoText}>
            • Shake your phone to trigger a silent SOS alert
          </Text>
          <Text style={styles.infoText}>
            • Set up voice activation for hands-free emergency alerts
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statusCard: {
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
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  warningText: {
    color: '#F57C00',
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E53935',
  },
  actionButtonActive: {
    backgroundColor: '#E53935',
    borderColor: '#E53935',
  },
  actionText: {
    color: '#E53935',
    fontWeight: '600',
    marginTop: 8,
  },
  actionTextActive: {
    color: '#FFFFFF',
  },
  sosButton: {
    backgroundColor: '#E53935',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sosText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 8,
  },
  infoCard: {
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
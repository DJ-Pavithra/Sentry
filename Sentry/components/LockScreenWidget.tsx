import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Shield, Phone, MapPin } from 'lucide-react-native';

// This is a mock component for a lock screen widget
// In a real app, this would require platform-specific implementation
export default function LockScreenWidget({ onSOSTrigger, onFakeCallTrigger }) {
  // On web, we'll just show a simulation of what the widget would look like
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.widgetContainer}>
          <View style={styles.widgetHeader}>
            <Text style={styles.widgetTitle}>Guardian</Text>
            <View style={styles.statusIndicator} />
          </View>
          
          <View style={styles.widgetContent}>
            <TouchableOpacity 
              style={styles.widgetButton} 
              onPress={onSOSTrigger}
            >
              <Shield size={20} color="#FFFFFF" />
              <Text style={styles.widgetButtonText}>SOS</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.widgetButton, styles.fakeCallButton]} 
              onPress={onFakeCallTrigger}
            >
              <Phone size={20} color="#FFFFFF" />
              <Text style={styles.widgetButtonText}>Fake Call</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.widgetFooter}>
            <MapPin size={14} color="#E53935" />
            <Text style={styles.widgetFooterText}>Location sharing active</Text>
          </View>
        </View>
        
        <Text style={styles.simulationNote}>
          This is a simulation of how the lock screen widget would appear on a mobile device.
          On an actual device, this would be accessible from the lock screen.
        </Text>
      </View>
    );
  }
  
  // On mobile, this would be implemented using platform-specific APIs
  // For iOS, this would use WidgetKit
  // For Android, this would use App Widgets
  return null;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  widgetContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  widgetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  widgetContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  widgetButton: {
    backgroundColor: '#E53935',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
  },
  fakeCallButton: {
    backgroundColor: '#4CAF50',
    marginRight: 0,
    marginLeft: 8,
  },
  widgetButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  widgetFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  widgetFooterText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  simulationNote: {
    marginTop: 16,
    textAlign: 'center',
    color: '#757575',
    fontSize: 12,
    paddingHorizontal: 20,
  },
});
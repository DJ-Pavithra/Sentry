import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Bell, Shield, Mic, Smartphone, Lock, TriangleAlert as AlertTriangle, CircleHelp as HelpCircle } from 'lucide-react-native';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    locationSharing: true,
    voiceActivation: true,
    shakeToActivate: true,
    autoRecording: true,
    disguiseMode: false,
    biometricLock: true,
    dangerZoneAlerts: true,
    silentSOS: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDisguiseMode = () => {
    if (!settings.disguiseMode) {
      Alert.alert(
        "Enable Disguise Mode",
        "When enabled, the app will appear as a calculator app on your home screen. You'll need to enter a specific code to access the real app.",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Enable", 
            onPress: () => toggleSetting('disguiseMode')
          }
        ]
      );
    } else {
      toggleSetting('disguiseMode');
    }
  };

  const handleVoiceActivationSettings = () => {
    Alert.alert(
      "Voice Activation",
      "Set a custom phrase that will trigger the SOS alert when spoken.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Configure", 
          onPress: () => console.log("Configure voice activation")
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Features</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Shield size={22} color="#E53935" style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Location Sharing</Text>
                <Text style={styles.settingDescription}>
                  Share your location with emergency contacts
                </Text>
              </View>
            </View>
            <Switch
              value={settings.locationSharing}
              onValueChange={() => toggleSetting('locationSharing')}
              trackColor={{ false: '#E0E0E0', true: '#FFCDD2' }}
              thumbColor={settings.locationSharing ? '#E53935' : '#BDBDBD'}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={handleVoiceActivationSettings}
          >
            <View style={styles.settingInfo}>
              <Mic size={22} color="#E53935" style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Voice Activation</Text>
                <Text style={styles.settingDescription}>
                  Trigger SOS with voice command
                </Text>
              </View>
            </View>
            <View style={styles.settingAction}>
              <Switch
                value={settings.voiceActivation}
                onValueChange={() => toggleSetting('voiceActivation')}
                trackColor={{ false: '#E0E0E0', true: '#FFCDD2' }}
                thumbColor={settings.voiceActivation ? '#E53935' : '#BDBDBD'}
              />
              <Text style={styles.configureText}>Configure</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Smartphone size={22} color="#E53935" style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Shake to Activate</Text>
                <Text style={styles.settingDescription}>
                  Shake your phone to trigger SOS
                </Text>
              </View>
            </View>
            <Switch
              value={settings.shakeToActivate}
              onValueChange={() => toggleSetting('shakeToActivate')}
              trackColor={{ false: '#E0E0E0', true: '#FFCDD2' }}
              thumbColor={settings.shakeToActivate ? '#E53935' : '#BDBDBD'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Mic size={22} color="#E53935" style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Auto Audio Recording</Text>
                <Text style={styles.settingDescription}>
                  Record audio when SOS is triggered
                </Text>
              </View>
            </View>
            <Switch
              value={settings.autoRecording}
              onValueChange={() => toggleSetting('autoRecording')}
              trackColor={{ false: '#E0E0E0', true: '#FFCDD2' }}
              thumbColor={settings.autoRecording ? '#E53935' : '#BDBDBD'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <AlertTriangle size={22} color="#E53935" style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Silent SOS</Text>
                <Text style={styles.settingDescription}>
                  Trigger SOS without visible indicators
                </Text>
              </View>
            </View>
            <Switch
              value={settings.silentSOS}
              onValueChange={() => toggleSetting('silentSOS')}
              trackColor={{ false: '#E0E0E0', true: '#FFCDD2' }}
              thumbColor={settings.silentSOS ? '#E53935' : '#BDBDBD'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={handleDisguiseMode}
          >
            <View style={styles.settingInfo}>
              <Lock size={22} color="#673AB7" style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Disguise Mode</Text>
                <Text style={styles.settingDescription}>
                  Make app appear as a calculator
                </Text>
              </View>
            </View>
            <Switch
              value={settings.disguiseMode}
              onValueChange={handleDisguiseMode}
              trackColor={{ false: '#E0E0E0', true: '#D1C4E9' }}
              thumbColor={settings.disguiseMode ? '#673AB7' : '#BDBDBD'}
            />
          </TouchableOpacity>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Lock size={22} color="#673AB7" style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Biometric Lock</Text>
                <Text style={styles.settingDescription}>
                  Secure app with fingerprint/face
                </Text>
              </View>
            </View>
            <Switch
              value={settings.biometricLock}
              onValueChange={() => toggleSetting('biometricLock')}
              trackColor={{ false: '#E0E0E0', true: '#D1C4E9' }}
              thumbColor={settings.biometricLock ? '#673AB7' : '#BDBDBD'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={22} color="#673AB7" style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Danger Zone Alerts</Text>
                <Text style={styles.settingDescription}>
                  Get notified in high-risk areas
                </Text>
              </View>
            </View>
            <Switch
              value={settings.dangerZoneAlerts}
              onValueChange={() => toggleSetting('dangerZoneAlerts')}
              trackColor={{ false: '#E0E0E0', true: '#D1C4E9' }}
              thumbColor={settings.dangerZoneAlerts ? '#673AB7' : '#BDBDBD'}
            />
          </View>
        </View>
        
        <TouchableOpacity style={styles.helpButton}>
          <HelpCircle size={20} color="#FFFFFF" />
          <Text style={styles.helpButtonText}>Get Help</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.versionText}>Guardian v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 Guardian Safety App</Text>
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
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
  },
  settingAction: {
    alignItems: 'center',
  },
  configureText: {
    fontSize: 12,
    color: '#2196F3',
    marginTop: 4,
  },
  helpButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  helpButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#BDBDBD',
  },
});
import * as SMS from 'expo-sms';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export default class EmergencyService {
  // Save contacts
  static async saveContacts(contacts: EmergencyContact[]) {
    try {
      await AsyncStorage.setItem('emergency_contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error saving contacts:', error);
      throw error;
    }
  }

  // Load contacts
  static async loadContacts(): Promise<EmergencyContact[]> {
    try {
      const contacts = await AsyncStorage.getItem('emergency_contacts');
      return contacts ? JSON.parse(contacts) : [];
    } catch (error) {
      console.error('Error loading contacts:', error);
      return [];
    }
  }

  // Send emergency SMS
  static async sendEmergencyAlerts(customMessage?: string) {
    try {
      // Check if SMS is available
      const isAvailable = await SMS.isAvailableAsync();
      if (!isAvailable) {
        throw new Error('SMS is not available on this device');
      }

      // Get location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Location permission denied');
      }

      const location = await Location.getCurrentPositionAsync({});
      const googleMapsUrl = `https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;

      // Get contacts
      const contacts = await this.loadContacts();
      if (contacts.length === 0) {
        throw new Error('No emergency contacts found');
      }

      // Default message
      const message = customMessage || 
        `EMERGENCY SOS ALERT! I need help! My current location: ${googleMapsUrl}`;

      // Send to each contact individually to ensure delivery
      for (const contact of contacts) {
        await SMS.sendSMSAsync(
          [contact.phone],
          message
        );
      }

      return true;
    } catch (error) {
      console.error('Error sending emergency alerts:', error);
      throw error;
    }
  }
} 
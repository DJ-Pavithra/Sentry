import { DeviceEventEmitter } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as SMS from 'expo-sms';
import * as SQLite from 'expo-sqlite';

export const EMERGENCY_TRIGGER_EVENT = 'EMERGENCY_TRIGGER';

interface EmergencyContact {
  id: number;
  name: string;
  phone: string;
  relation: string;
}

interface EmergencyData {
  type: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

// Open the database
const db = SQLite.openDatabaseSync('emergency.db');

// Function to get emergency contacts from database
const getEmergencyContacts = (): Promise<EmergencyContact[]> => {
  return new Promise((resolve, reject) => {
    db.getAllAsync('SELECT * FROM emergency_contacts', [])
      .then((result: any) => resolve(result))
      .catch((error: any) => reject(error));
  });
};

// Function to send emergency message to a contact
const sendEmergencyMessage = async (contact: EmergencyContact, data: EmergencyData) => {
  try {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const message = `EMERGENCY ALERT: ${contact.name}, I need help! My location: https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude}`;
      
      await SMS.sendSMSAsync(
        [contact.phone],
        message
      );
    } else {
      console.error('SMS is not available on this device');
    }
  } catch (error) {
    console.error('Error sending emergency message:', error);
  }
};

export const setupEmergencyReceiver = () => {
  DeviceEventEmitter.addListener(EMERGENCY_TRIGGER_EVENT, handleEmergency);
};

const handleEmergency = async (data: EmergencyData) => {
  try {
    // Get emergency contacts
    const contacts = await getEmergencyContacts();
    
    // Send messages to all emergency contacts
    for (const contact of contacts) {
      await sendEmergencyMessage(contact, data);
    }

    // Trigger local notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Emergency Alert Activated",
        body: "Emergency contacts have been notified of your situation.",
        data: { type: data.type },
      },
      trigger: null,
    });
  } catch (error) {
    console.error('Error handling emergency:', error);
    
    // Show fallback notification if something goes wrong
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Emergency Alert Error",
        body: "There was an error notifying your emergency contacts. Please try again or call emergency services directly.",
        data: { type: 'error' },
      },
      trigger: null,
    });
  }
};

// Clean up listener when component unmounts
export const cleanupEmergencyReceiver = () => {
  DeviceEventEmitter.removeAllListeners(EMERGENCY_TRIGGER_EVENT);
};
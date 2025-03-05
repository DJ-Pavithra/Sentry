import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import db from '@/utils/database';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    // Store location updates in the database
    storeLocationUpdate(locations[0]);
  }
});

// Service Component: Background Location Service
export class LocationService {
  static async startLocationTracking() {
    try {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      if (status === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 10,
        });
      }
    } catch (error) {
      console.error('Error starting location service:', error);
    }
  }

  // Intent Component: Launch Maps with Current Location
  static async openMapsWithLocation(latitude: number, longitude: number) {
    try {
      await startActivityAsync(ActivityAction.VIEW, {
        data: `geo:${latitude},${longitude}?q=${latitude},${longitude}`,
        flags: 0x10000000, // FLAG_ACTIVITY_NEW_TASK
      });
    } catch (error) {
      console.error('Error launching maps:', error);
    }
  }
}

const storeLocationUpdate = async (location: Location.LocationObject) => {
  const { latitude, longitude } = location.coords;
  // Store in database
  db.transaction(tx => {   
    tx.executeSql(
      'INSERT INTO location_history (latitude, longitude, timestamp) VALUES (?, ?, ?)',
      [latitude, longitude, Date.now()]
    );
  });
}; 
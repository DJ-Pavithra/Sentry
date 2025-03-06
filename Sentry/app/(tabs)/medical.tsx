import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Edit2 } from 'lucide-react-native';
import db, { initDatabase } from '../../utils/database';

interface MedicalProfile {
  id: number;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  weight: number;
  height: number;
  allergies: string[];
}

export default function MedicalScreen() {
  const [profile, setProfile] = useState<MedicalProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<MedicalProfile | null>(null);

  useEffect(() => {
    const initializeAndLoad = async () => {
      try {
        await initDatabase(); // Ensure database is initialized
        await loadMedicalProfile(); // Load profile after DB setup
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    initializeAndLoad();
  }, []);

  const loadMedicalProfile = async () => {
    try {
      const result: any[] = await db.getAllAsync('SELECT * FROM users LIMIT 1');
      if (result.length > 0) {
        const user = result[0] as MedicalProfile;
        setProfile({
          ...user,
          allergies: typeof user.allergies === 'string' ? JSON.parse(user.allergies) : [],
        });
      }
    } catch (error) {
      console.error('Error loading medical profile:', error);
    }
  };

  const handleSave = async () => {
    if (!editedProfile) return;

    try {
      const allergiesString = JSON.stringify(editedProfile.allergies);
      await db.runAsync(
        `UPDATE users SET 
          name = ?, 
          age = ?, 
          gender = ?, 
          bloodType = ?, 
          weight = ?, 
          height = ?, 
          allergies = ?
        WHERE id = ?`,
        [
          editedProfile.name,
          editedProfile.age,
          editedProfile.gender,
          editedProfile.bloodType,
          editedProfile.weight,
          editedProfile.height,
          allergiesString,
          editedProfile.id
        ]
      );

      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving medical profile:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical Profile</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => {
            if (isEditing) {
              handleSave();
            } else {
              setEditedProfile(profile);
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? (
            <Text style={styles.saveButtonText}>Save</Text>
          ) : (
            <Edit2 size={20} color="#E53935" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Heart size={24} color="#E53935" />
            <Text style={styles.cardTitle}>Basic Information</Text>
          </View>
          <View style={styles.infoGrid}>
            {isEditing ? (
              // Edit form
              <>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Name</Text>
                  <TextInput
                    style={styles.input}
                    value={editedProfile?.name}
                    onChangeText={(text) => setEditedProfile(prev => prev ? {...prev, name: text} : null)}
                  />
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Age</Text>
                  <TextInput
                    style={styles.input}
                    value={editedProfile?.age.toString()}
                    onChangeText={(text) => setEditedProfile(prev => prev ? {...prev, age: parseInt(text) || 0} : null)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Gender</Text>
                  <TextInput
                    style={styles.input}
                    value={editedProfile?.gender}
                    onChangeText={(text) => setEditedProfile(prev => prev ? {...prev, gender: text} : null)}
                  />
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Blood Type</Text>
                  <TextInput
                    style={styles.input}
                    value={editedProfile?.bloodType}
                    onChangeText={(text) => setEditedProfile(prev => prev ? {...prev, bloodType: text} : null)}
                  />
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Weight (kg)</Text>
                  <TextInput
                    style={styles.input}
                    value={editedProfile?.weight.toString()}
                    onChangeText={(text) => setEditedProfile(prev => prev ? {...prev, weight: parseFloat(text) || 0} : null)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Height (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={editedProfile?.height.toString()}
                    onChangeText={(text) => setEditedProfile(prev => prev ? {...prev, height: parseFloat(text) || 0} : null)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Allergies</Text>
                  <TextInput
                    style={styles.input}
                    value={editedProfile?.allergies.join(', ')}
                    onChangeText={(text) => setEditedProfile(prev => prev ? {...prev, allergies: text.split(',').map(item => item.trim())} : null)}
                  />
                </View>
              </>
            ) : (
              // Display mode (existing code)
              <>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Name</Text>
                  <Text style={styles.infoValue}>{profile?.name || '--'}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Age</Text>
                  <Text style={styles.infoValue}>{profile?.age || '--'}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Gender</Text>
                  <Text style={styles.infoValue}>{profile?.gender || '--'}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Blood Type</Text>
                  <Text style={styles.infoValue}>{profile?.bloodType || '--'}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Weight</Text>
                  <Text style={styles.infoValue}>{profile?.weight || '--'} kg</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Height</Text>
                  <Text style={styles.infoValue}>{profile?.height || '--'} cm</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Allergies</Text>
                  <Text style={styles.infoValue}>
                    {profile?.allergies.length ? profile.allergies.join(', ') : '--'}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#212121' },
  editButton: { padding: 8 },
  content: { flex: 1, padding: 16 },
  card: {
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
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#212121', marginLeft: 12 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 },
  infoItem: { width: '50%', padding: 8 },
  infoLabel: { fontSize: 12, color: '#757575', marginBottom: 4 },
  infoValue: { fontSize: 16, color: '#212121', fontWeight: '500' },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    color: '#212121',
  },
  saveButtonText: {
    color: '#E53935',
    fontSize: 16,
    fontWeight: '600',
  },
});

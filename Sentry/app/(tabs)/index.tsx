import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Eye, MapPin, Search, Plus, MessageSquare, User, Shield, AlertTriangle, Phone, Home } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(15);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Welcome Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome to SafeGuard!</Text>
        </View>

        {/* App Icon and Get Started Section */}
        <View style={styles.startSection}>
          <Image 
            source={require('../../assets/images/Homepage-Icon.png')} 
            style={styles.appIcon}
          />
          <Text style={styles.secureText}>Secure your safety now!</Text>
          <View style={styles.getStartedRow}>
            <Text style={styles.getStartedText}>
              Get started{'\n'}
              <Text style={styles.secondsText}>in {secondsLeft} seconds</Text>
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Safety Coverage Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety coverage</Text>
          <View style={styles.coverageGrid}>
            <View style={styles.coverageItem}>
              <View style={[styles.coverageIcon, { backgroundColor: '#E3F2FD' }]}>
                <Heart size={20} color="#2196F3" />
              </View>
              <Text style={styles.coverageText}>Medical assistance</Text>
            </View>
            <View style={styles.coverageItem}>
              <View style={[styles.coverageIcon, { backgroundColor: '#E8F5E9' }]}>
                <Shield size={20} color="#4CAF50" />
              </View>
              <Text style={styles.coverageText}>Personal safety</Text>
            </View>
            <View style={styles.coverageItem}>
              <View style={[styles.coverageIcon, { backgroundColor: '#FFF3E0' }]}>
                <AlertTriangle size={20} color="#FF9800" />
              </View>
              <Text style={styles.coverageText}>Emergency CV</Text>
            </View>
            <View style={styles.coverageItem}>
              <View style={[styles.coverageIcon, { backgroundColor: '#F3E5F5' }]}>
                <Phone size={20} color="#9C27B0" />
              </View>
              <Text style={styles.coverageText}>SOS function</Text>
            </View>
          </View>
        </View>

        {/* Latest Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest features</Text>
          <View style={styles.featuresGrid}>
            <TouchableOpacity style={styles.featureItem}>
              <Heart size={24} color="#E91E63" />
              <Text style={styles.featureText}>Profile management</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureItem}>
              <Eye size={24} color="#2196F3" />
              <Text style={styles.featureText}>Activate SOS mode</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Assistance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assistance</Text>
          <View style={styles.assistanceContainer}>
            <View style={styles.assistanceTextContainer}>
              <Text style={styles.assistanceTitle}>Always here for</Text>
              <TouchableOpacity style={styles.helpButton}>
                <Text style={styles.helpButtonText}>Help</Text>
              </TouchableOpacity>
            </View>
            <Image 
              source={require('../../assets/images/maps.png')} 
              style={styles.mapImage}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Home size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Search size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.addButton]}>
          <Plus size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MessageSquare size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <User size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
  },
  startSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  secureText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    color: '#212121',
  },
  getStartedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
  getStartedText: {
    fontSize: 16,
    color: '#212121',
  },
  secondsText: {
    color: '#757575',
    fontSize: 14,
  },
  exploreButton: {
    backgroundColor: '#00BCD4',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  coverageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  coverageItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverageIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  coverageText: {
    fontSize: 14,
    color: '#212121',
    flex: 1,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  featureText: {
    marginTop: 8,
    color: '#212121',
    fontSize: 14,
  },
  assistanceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assistanceTextContainer: {
    flex: 1,
  },
  assistanceTitle: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 8,
  },
  helpButton: {
    backgroundColor: '#00BCD4',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  helpButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  mapImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    padding: 8,
  },
  addButton: {
    backgroundColor: '#00BCD4',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -24,
  },
});
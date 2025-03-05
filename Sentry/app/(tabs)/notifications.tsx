import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, AlertTriangle, Clock, User } from 'lucide-react-native';

interface NotificationItem {
  id: string;
  type: 'safety' | 'emergency' | 'review';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export default function NotificationsScreen() {
  const notifications: NotificationItem[] = [
    {
      id: '1',
      type: 'safety',
      title: 'Safety tips',
      description: 'New safety feature added',
      time: '2m ago',
      read: false
    },
    {
      id: '2',
      type: 'emergency',
      title: 'Emergency history',
      description: 'Medical assistance requested',
      time: '1h ago',
      read: false
    },
    {
      id: '3',
      type: 'emergency',
      title: 'Emergency history',
      description: 'Document safety feature',
      time: '2h ago',
      read: true
    },
    {
      id: '4',
      type: 'review',
      title: 'Review logs',
      description: 'Add or edit contacts',
      time: '3h ago',
      read: false
    },
    {
      id: '5',
      type: 'review',
      title: 'Emergency',
      description: 'View response times',
      time: '4h ago',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'safety':
        return <Heart size={24} color="#E53935" />;
      case 'emergency':
        return <AlertTriangle size={24} color="#FF9800" />;
      case 'review':
        return <Clock size={24} color="#2196F3" />;
      default:
        return <User size={24} color="#757575" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.headerAction}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety tips</Text>
          {notifications
            .filter(item => item.type === 'safety')
            .map(notification => (
              <TouchableOpacity 
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.unreadItem
                ]}
              >
                <View style={styles.iconContainer}>
                  {getIcon(notification.type)}
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationDescription}>
                    {notification.description}
                  </Text>
                </View>
                <Text style={styles.timeText}>{notification.time}</Text>
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency history</Text>
          {notifications
            .filter(item => item.type === 'emergency')
            .map(notification => (
              <TouchableOpacity 
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.unreadItem
                ]}
              >
                <View style={styles.iconContainer}>
                  {getIcon(notification.type)}
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationDescription}>
                    {notification.description}
                  </Text>
                </View>
                <Text style={styles.timeText}>{notification.time}</Text>
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Review logs</Text>
          {notifications
            .filter(item => item.type === 'review')
            .map(notification => (
              <TouchableOpacity 
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.unreadItem
                ]}
              >
                <View style={styles.iconContainer}>
                  {getIcon(notification.type)}
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationDescription}>
                    {notification.description}
                  </Text>
                </View>
                <Text style={styles.timeText}>{notification.time}</Text>
              </TouchableOpacity>
            ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  headerAction: {
    color: '#2196F3',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#757575',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  unreadItem: {
    backgroundColor: '#F5F5F5',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#757575',
  },
  timeText: {
    fontSize: 12,
    color: '#9E9E9E',
    marginLeft: 8,
  },
}); 
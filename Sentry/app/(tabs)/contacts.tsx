import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Plus, X, CreditCard as Edit, Phone, MapPin } from 'lucide-react-native';

// Mock data for emergency contacts
const initialContacts = [
  { id: '1', name: 'Sarah Johnson', phone: '(555) 123-4567', relation: 'Sister' },
  { id: '2', name: 'Michael Chen', phone: '(555) 987-6543', relation: 'Friend' },
];

export default function ContactsScreen() {
  const [contacts, setContacts] = useState(initialContacts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' });
  const [editingId, setEditingId] = useState(null);

  const addContact = () => {
    if (!newContact.name || !newContact.phone) {
      Alert.alert('Missing Information', 'Please enter a name and phone number.');
      return;
    }

    if (editingId) {
      // Update existing contact
      setContacts(contacts.map(contact => 
        contact.id === editingId ? { ...newContact, id: editingId } : contact
      ));
      setEditingId(null);
    } else {
      // Add new contact
      const id = Date.now().toString();
      setContacts([...contacts, { ...newContact, id }]);
    }
    
    setNewContact({ name: '', phone: '', relation: '' });
    setShowAddForm(false);
  };

  const editContact = (id) => {
    const contactToEdit = contacts.find(contact => contact.id === id);
    if (contactToEdit) {
      setNewContact({ ...contactToEdit });
      setEditingId(id);
      setShowAddForm(true);
    }
  };

  const deleteContact = (id) => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to remove this emergency contact?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => setContacts(contacts.filter(contact => contact.id !== id)),
          style: "destructive"
        }
      ]
    );
  };

  const renderContact = ({ item }) => (
    <View style={styles.contactCard}>
      <View style={styles.contactInfo}>
        <View style={styles.contactAvatar}>
          <Text style={styles.contactInitial}>{item.name[0]}</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>{item.phone}</Text>
          <Text style={styles.contactRelation}>{item.relation}</Text>
        </View>
      </View>
      
      <View style={styles.contactActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={() => editContact(item.id)}
        >
          <Edit size={16} color="#757575" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => deleteContact(item.id)}
        >
          <X size={16} color="#E53935" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
      </View>

      <View style={styles.content}>
        {showAddForm ? (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
              {editingId ? 'Edit Contact' : 'Add Emergency Contact'}
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={newContact.name}
                onChangeText={(text) => setNewContact({...newContact, name: text})}
                placeholder="Full Name"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={newContact.phone}
                onChangeText={(text) => setNewContact({...newContact, phone: text})}
                placeholder="(555) 123-4567"
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Relationship</Text>
              <TextInput
                style={styles.input}
                value={newContact.relation}
                onChangeText={(text) => setNewContact({...newContact, relation: text})}
                placeholder="Friend, Family, etc."
              />
            </View>
            
            <View style={styles.formActions}>
              <TouchableOpacity 
                style={[styles.formButton, styles.cancelButton]} 
                onPress={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  setNewContact({ name: '', phone: '', relation: '' });
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.formButton, styles.saveButton]} 
                onPress={addContact}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.contactsHeader}>
              <Text style={styles.contactsTitle}>Your Trusted Contacts</Text>
              <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => setShowAddForm(true)}
              >
                <Plus size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            {contacts.length > 0 ? (
              <FlatList
                data={contacts}
                renderItem={renderContact}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.contactsList}
              />
            ) : (
              <View style={styles.emptyState}>
                <User size={48} color="#BDBDBD" />
                <Text style={styles.emptyStateText}>No emergency contacts added yet</Text>
                <Text style={styles.emptyStateSubtext}>
                  Add trusted contacts who will receive alerts when you need help
                </Text>
              </View>
            )}
            
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>What Your Contacts Will Receive</Text>
              <View style={styles.infoItem}>
                <MapPin size={18} color="#E53935" style={styles.infoIcon} />
                <Text style={styles.infoText}>Your real-time location</Text>
              </View>
              <View style={styles.infoItem}>
                <Phone size={18} color="#E53935" style={styles.infoIcon} />
                <Text style={styles.infoText}>A direct call option to reach you</Text>
              </View>
              <View style={styles.infoItem}>
                <AlertTriangle size={18} color="#E53935" style={styles.infoIcon} />
                <Text style={styles.infoText}>Emergency message with situation details</Text>
              </View>
            </View>
          </>
        )}
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
  contactsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  contactsList: {
    paddingBottom: 16,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 2,
  },
  contactRelation: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  contactActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#F5F5F5',
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#757575',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  formContainer: {
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
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  formButton: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#616161',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    color: '#616161',
    fontSize: 14,
  },
});
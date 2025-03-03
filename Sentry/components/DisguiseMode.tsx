import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

// This component simulates a calculator app for disguise mode
export default function DisguiseMode({ isActive, onExit }) {
  const [display, setDisplay] = useState('0');
  const [secretCode, setSecretCode] = useState('');
  const [waitingForCode, setWaitingForCode] = useState(false);
  
  const UNLOCK_CODE = '1379'; // Secret code to exit disguise mode
  
  if (!isActive) return null;
  
  const handleNumberPress = (num) => {
    if (waitingForCode) {
      const newCode = secretCode + num;
      setSecretCode(newCode);
      
      if (newCode.length === UNLOCK_CODE.length) {
        if (newCode === UNLOCK_CODE) {
          onExit();
          Alert.alert('Disguise Mode Disabled', 'Returning to Guardian app');
        } else {
          setSecretCode('');
          setWaitingForCode(false);
          Alert.alert('Invalid Code', 'Incorrect security code');
        }
      }
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };
  
  const handleOperationPress = (op) => {
    if (op === 'C') {
      setDisplay('0');
    } else if (op === '=') {
      try {
        // This is just for the disguise - in a real app you'd want to be more careful
        // eslint-disable-next-line no-eval
        const result = eval(display);
        setDisplay(result.toString());
      } catch (e) {
        setDisplay('Error');
      }
    } else if (op === '.') {
      if (!display.includes('.')) {
        setDisplay(display + '.');
      }
    } else {
      setDisplay(display + op);
    }
  };
  
  const activateSecretMode = () => {
    setWaitingForCode(true);
    setSecretCode('');
    Alert.alert('Enter Security Code', 'Enter your 4-digit code to exit disguise mode');
  };
  
  const renderButton = (text, onPress, style) => (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{waitingForCode ? '****'.substring(0, secretCode.length) : display}</Text>
      </View>
      
      <View style={styles.buttonRow}>
        {renderButton('C', () => handleOperationPress('C'), styles.operationButton)}
        {renderButton('(', () => handleOperationPress('('), styles.operationButton)}
        {renderButton(')', () => handleOperationPress(')'), styles.operationButton)}
        {renderButton('÷', () => handleOperationPress('/'), styles.operationButton)}
      </View>
      
      <View style={styles.buttonRow}>
        {renderButton('7', () => handleNumberPress('7'))}
        {renderButton('8', () => handleNumberPress('8'))}
        {renderButton('9', () => handleNumberPress('9'))}
        {renderButton('×', () => handleOperationPress('*'), styles.operationButton)}
      </View>
      
      <View style={styles.buttonRow}>
        {renderButton('4', () => handleNumberPress('4'))}
        {renderButton('5', () => handleNumberPress('5'))}
        {renderButton('6', () => handleNumberPress('6'))}
        {renderButton('-', () => handleOperationPress('-'), styles.operationButton)}
      </View>
      
      <View style={styles.buttonRow}>
        {renderButton('1', () => handleNumberPress('1'))}
        {renderButton('2', () => handleNumberPress('2'))}
        {renderButton('3', () => handleNumberPress('3'))}
        {renderButton('+', () => handleOperationPress('+'), styles.operationButton)}
      </View>
      
      <View style={styles.buttonRow}>
        {renderButton('0', () => handleNumberPress('0'), styles.zeroButton)}
        {renderButton('.', () => handleOperationPress('.'), styles.operationButton)}
        {renderButton('=', () => handleOperationPress('='), styles.equalsButton)}
      </View>
      
      <TouchableOpacity 
        style={styles.secretButton} 
        onPress={activateSecretMode}
        onLongPress={activateSecretMode}
      >
        {/* This is an invisible button that activates the secret mode */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F5F5F5',
    padding: 16,
    zIndex: 1000,
  },
  displayContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  display: {
    fontSize: 36,
    fontWeight: '300',
    color: '#212121',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#FFFFFF',
    width: '22%',
    aspectRatio: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  zeroButton: {
    backgroundColor: '#FFFFFF',
    width: '47%',
    aspectRatio: 2.2,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  operationButton: {
    backgroundColor: '#F5F5F5',
  },
  equalsButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 24,
    color: '#212121',
  },
  secretButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    zIndex: 1001,
  },
});
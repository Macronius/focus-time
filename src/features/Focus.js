// this will be the building block for the focus feature
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../utils/colors';
import { RoundedButton } from '../components/RoundedButton';
import {fontSizes, spacing} from '../utils/sizes';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => setSubject(value)}
          label="What would you like to focus on?"
        />
        <View style={styles.button}>
          <RoundedButton title="+" size={50} onPress={() => {
            console.log("button pressed");
            console.log(subject);
            addSubject(subject);
          }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  inputContainer: {
    // flex: 0.5,
    flexDirection: 'row',
    padding: spacing.lg,
    justifyContent: 'top',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.md,
  },
  button: {
    justifyContent: 'center',
  },
});

// absolute imports
import React, { useState } from 'react';
import { StyleSheet, View, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import {useKeepAwake} from 'expo-keep-awake';
// relative imports
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
import {Timing} from './Timing';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1*ONE_SECOND_IN_MS,
  1*ONE_SECOND_IN_MS,
  1*ONE_SECOND_IN_MS,
  1*ONE_SECOND_IN_MS,
  1*ONE_SECOND_IN_MS,
]

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  // keep awake as long as the Timer is running
  useKeepAwake();
  
  // local state
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.05);

  // the onEnd function should be quite complex
  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          // onProgress={(progress) => {setProgress(progress)}}  // QUESTION: how exactly does this have value?
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on: </Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View>
        <ProgressBar 
          progress={progress} 
          color={colors.progressBar} 
          style={{height: spacing.sm}} 
        />
      </View>

      {/* timer times */}
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
        {/* I'm not quite sure how value is passed here */}
      </View>

      {/* start / pause button */}
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton size={125} title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton size={125} title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>

      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject} style={{backgroundColor: 'red'}} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
});

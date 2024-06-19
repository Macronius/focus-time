// libraries and frameworks
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
// utilities
import {fontSizes, spacing} from '../utils/sizes';
import {colors} from '../utils/colors';

// local utility functions
// convert minutes to milliseconds
const minutesToMillis = (min) => min * 60 * 1000;
// format the time into human readable
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({minutes = 0.1, isPaused, onProgress, onEnd}) => {

  // react hooks
  // useRef does not cause a re-render
  // (a ref returns only one object, in which you can set to whatever variable you want. if something happens to that variable, if it changes, it will not cause re-renders on the screen)
  const interval = React.useRef(null);
  // useState does cause a re-render
  const [millis, setMillis] = useState(null);

  const reset = () => setMillis(minutesToMillis(minutes));

  const countDown = () => {
    setMillis( (time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd(reset);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  }

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
  }, [millis, minutes, onProgress]);

  // 
  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    // JavaScript function: setInterval()
    // allows to call a function within a certain period of time frequency
    interval.current = setInterval(countDown, 1000);
    // useRef is used to track the value of setInterval so that it can be cleared in case you want to pause the timer or if the component is removed from the screen
    return () => clearInterval(interval.current);
    // dependency: isPaused is a property of the Countdown timer component
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  )
}

// styles
const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226, 0.3)',
  }
})
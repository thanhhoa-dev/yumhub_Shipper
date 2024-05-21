import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  const bottomSheetRef = useRef(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // Define snap points
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // Show Bottom Sheet
  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current?.expand();
    setIsBottomSheetVisible(true);
  }, []);

  // Hide Bottom Sheet
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsBottomSheetVisible(false);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button title="Open Bottom Sheet" onPress={handlePresentPress} />
        <BottomSheet
          ref={bottomSheetRef}
          index={0} // Initialize as closed
          snapPoints={snapPoints}
          onClose={() => setIsBottomSheetVisible(false)}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
            <Button title="Close Bottom Sheet" onPress={handleClosePress} />
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

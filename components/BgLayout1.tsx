import { View, StyleSheet } from 'react-native';

export default function BgLayout1() {
  return (
    <View style={styles.container}>
    <View style={styles.upperHalf}></View>
    <View style={styles.lowerHalf}></View>
  </View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    upperHalf: {
      flex: 1,
      width: '100%',
      backgroundColor: 'blue', // First tone color
      borderBottomLeftRadius: 50, // Adjust the border radius as needed
      borderBottomRightRadius: 50,
    },
    lowerHalf: {
      flex: 1,
      width: '100%',
      backgroundColor: 'green', // Second tone color
      borderTopLeftRadius: 50, // Adjust the border radius as needed
      borderTopRightRadius: 50,
    },
  });

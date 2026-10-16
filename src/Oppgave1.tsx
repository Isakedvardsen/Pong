import { View, Text, Button, StyleSheet } from "react-native";

export default function Oppgave1() {
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>En app</Text>
    </View>

    <View style={styles.boxRow}>
      <View style={[styles.box, { backgroundColor: "green"}]} />
      <View style={[styles.box, { backgroundColor: "yellow"}]} />
      <View style={[styles.box, { backgroundColor: "black"}]} />
    </View>

    <Text style={styles.middleText}>Tekst som er uten mening!</Text>

    <View style={styles.buttonContainer}>
      <Button title="OK" onPress={() => {}} color="#007BFF" />
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  
},
header: {
  backgroundColor: "red",
  padding: 20,
},
headerText: {
  color: "white",
  fontSize: 24,
  textAlign: "center",
},
boxRow: {
  flexDirection: "row",
  justifyContent: "space-around",
  marginTop: 40,
},
box: {
  width: 60,
  height: 60,
},
middleText: {
  textAlign: "center",
  marginTop: 40,
  fontSize: 18,
},
buttonContainer: {
  marginTop: 60,
  alignItems: "center",
}
});

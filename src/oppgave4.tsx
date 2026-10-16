import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Oppgave4() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>

<Pressable style={styles.button} onPress={() => setCount((value) => value + 1)}>
  <Text style={styles.buttonText}> Øk teller</Text>
</Pressable>

<Pressable style={styles.button} onPress={() => setCount((value) => value - 1)}>
  <Text style={styles.buttonText}>Reduser teller</Text>
</Pressable>

<Text style={styles.label}>Teller er:</Text>

<View style={styles.counterBox}>
  <Text style={styles.countText}>{count}</Text>
</View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#487281",
    padding: 15,
    width: 100,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  counterBox: {
    backgroundColor: "#D8DBE2",
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems:"center",
  },
  countText: {
    fontSize:30,
    fontWeight: "bold",
  },
})

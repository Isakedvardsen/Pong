import {Text, StyleSheet, View, TextInput,} from "react-native";
import { useState } from "react";


export default function Oppgave3() {
  const [password, setPassword] = useState("");
  const isTooShort = password.length < 8;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Passord</Text>
      </View>

      <View style={styles.content}>
      <Text style={styles.label}>
        Skriv inn passordet ditt:
      </Text>
      
      </View>

      <TextInput
      style={styles.input}
      placeholder="Skriv passord her"
      value={password}
      onChangeText={setPassword}
      />
      <Text style={styles.passwordText}>
        Passordet ditt er: {password}
      </Text>

      {isTooShort && password.length > 0 && (
        <Text style={styles.errorText}>
          Passord må ha minst 8 tegn!!!!!
        </Text>
      )}
       </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    backgroundColor: '#373F51',
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    marginTop: 45,
    paddingHorizontal: 20,
  },
  label: {
    fontSize:16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    height: 40,
    paddingHorizontal: 10,
  },
  passwordText: {
    marginTop: 35,
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
  
})

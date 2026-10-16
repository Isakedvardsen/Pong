import { View, Image, StyleSheet } from "react-native";

export default function Oppgave2() {
  return (
    <View style={styles.container}>
     <Image
     style={styles.localimage}
     source={require("../assets/images.jpg")} />

     <Image
     style={styles.webImage}
     source={{ uri: "https://picsum.photos/300" }} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  localimage: {
    width: 250,
    height:250,
    alignSelf: "center",
    marginTop:40,
    borderRadius:10
  },
  webImage: {
    width: 250,
    height:250,
    alignSelf:"center",
    marginTop: 20,
    borderRadius: 10,
  }
});

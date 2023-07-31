import { Platform, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function CreateOrJoinScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Screen Create or Join!</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Join")}>
          <Text>Rejoindre ma communauté</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <Text>Créer ma communauté</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});

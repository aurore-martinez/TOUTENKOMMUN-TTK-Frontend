import { Platform, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function CreateScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Screen Create!</Text>

        <Text>Toutenkommun</Text>
        <Text>Créer ma communauté</Text>
        <TouchableOpacity
          activeOpacity={0.8}
        >
          <View style={styles.icontext}>
            <FontAwesome name="user" size='20' color='black' />
            <TextInput
              placeholder="Nom de la communauté"
              autoCapitalize="none"
            />
          </View>
        </TouchableOpacity> 
        <Text>Nom de communauté libre</Text>
        <View style={styles.directionrow}>
          <TouchableOpacity
            activeOpacity={0.8}
          >
            <View style={styles.icontext}>
              <FontAwesome name="lock" size='20' color='black' />
              <Text>Privé</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
          >
            <View style={styles.icontext}>
              <FontAwesome5 name="door-open" size='15' color='black' />
              <Text>Public</Text>
            </View>
          </TouchableOpacity> 
        </View>      
        <TouchableOpacity onPress={() => navigation.navigate("Prêt")}>
          <Text>Créer</Text>
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
  icontext: {
    flexDirection: 'row',
  },
  directionrow: {
    flexDirection: 'row',
  },
});

import { Platform, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function JoinScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>TOUTENKOMMUN</Text>
          <FontAwesome style={styles.userIcon} name='user' size={20} color='#353639'/>
        </View>
        <Text>Screen Join!</Text>
        <Text>Rejoindre ma communauté</Text>
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
        <TouchableOpacity
          activeOpacity={0.8}
        >
          <View style={styles.icontext}>
            <FontAwesome name="lock" size='20' color='black' />
            <TextInput
              placeholder="Code d'accès"
              autoCapitalize="none"
            />
          </View>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => navigation.navigate("Prêt")}>
          <Text>Valider</Text>
        </TouchableOpacity>
        <Text>Communauté(s) suggérée(s)</Text>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    width: 400,
    backgroundColor: '#198EA5',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  userIcon: {
    color: '#198EA5',
    fontSize: '20',
    fontWeight: 'bold',
    marginRight: 10
  },
});

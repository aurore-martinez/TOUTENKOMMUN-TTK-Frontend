import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function SignInScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Screen Login SignIn!</Text>
        <Text style={styles.h1}>Toutenkommun</Text>
        <Text style={styles.h5}>Connectes-toi et partage</Text>
        <View>
          <TouchableOpacity
            style={styles.btnFB}
            activeOpacity={0.8}
          >
            <Text style={styles.textBtnFB}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")}>
          <Text>Valider</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text>Créer un compte</Text>
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
  h1: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
  },
  h5: {
    fontSize: 22,
  },

});

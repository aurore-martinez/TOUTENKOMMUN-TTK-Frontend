import { Platform, SafeAreaView, StatusBar, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, View, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SignUpScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} >

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
        <View style={styles.titleContainer}>
        <Text>SCREEN : Login SignUp!</Text>
        <Text style={styles.titleh1}>Toutenkommun</Text>
        <Text style={styles.titleh2}>Créer un compte</Text>
        </View>

        <View style={styles.connect}>
        <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} style={styles.buttonFB} >
          <FontAwesome name='facebook' size={20} color='#ffffff' />
          <Text style={styles.textButtonFB}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} style={styles.buttonG} >
          <FontAwesome name='google' size={20} color='#ffffff' />
          <Text style={styles.textButtonG}>Google</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.bar}></View>

        <View style={styles.title3Container}>
        <Text style={styles.titleh3}>ou</Text>
        </View>

        <View  style={styles.inputContainer}>
        <View style={styles.input}>
        <FontAwesome name='user' size={20} color='#353639' style={styles.icon} />
          <TextInput
            placeholder="Prénom"
            autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
            // keyboardType="email-address" //https://reactnative.dev/docs/textinput#keyboardtype pour les emails/numbers
            textContentType="name" // https://reactnative.dev/docs/textinput#textcontenttype-ios
            autoComplete="name" // https://reactnative.dev/docs/textinput#autocomplete-android
            // onChangeText={(value) => setEmail(value)}
            // value={email}
            // style={styles.input}
            placeholderTextColor='#353639'
            />
          </View>
          <View style={styles.input}>
            <FontAwesome name='user' size={20} color='#353639' style={styles.icon} />
            <TextInput
              placeholder="Nom"
              autoCapitalize="none" 
              textContentType="name" 
              autoComplete="family-name" 
              // onChangeText={(value) => setEmail(value)}
              // value={email}
              placeholderTextColor='#353639'
            />
            </View>
            <View style={styles.input}>
            <FontAwesome name='user' size={20} color='#353639' style={styles.icon} />
            <TextInput
              placeholder="Pseudo"
              autoCapitalize="none" 
              textContentType="name" 
              autoComplete="family-name" 
              // onChangeText={(value) => setEmail(value)}
              // value={email}
              placeholderTextColor='#353639'
            />
            </View>
            <View style={styles.input}>
              <FontAwesome name='at' size={20} color='#353639' style={styles.icon} />
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                // onChangeText={(value) => setEmail(value)}
                // value={email}
                placeholderTextColor='#353639'
              />
            </View>
          {/* {emailError && <Text style={styles.error}>Invalid email address</Text>} */}
          <View style={styles.input}>
              <FontAwesome name='lock' size={20} color='#353639' style={styles.icon} />
              <TextInput
                  placeholder="Mot de passe"
                  autoCapitalize="none"
                  textContentType="password" 
                  autoComplete="new-password" 
                  // onChangeText={(value) => setEmail(value)}
                  // value={email}
                  placeholderTextColor='#353639'
                />
          </View>
          <View style={styles.input}>
              <FontAwesome name='phone' size={20} color='#353639' style={styles.icon} />
              <TextInput
                placeholder="Téléphone"
                autoCapitalize="none" 
                textContentType="telephoneNumber" 
                autoComplete="tel" 
                // onChangeText={(value) => setEmail(value)}
                // value={email}
                placeholderTextColor='#353639'
              />
          </View>
          </View>

          <View  style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} style={styles.button} >
          <FontAwesome name='hand-o-right' size={20} color='#ffffff' style={styles.icon} />
          <Text style={styles.textButton}>Valider</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FCFB',
    // alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: '10%',
    // backgroundColor: 'red',
  },
  titleh1: {
    fontSize: 40,
    fontWeight: '600',
    fontFamily: 'Futura',
    marginBottom: 20
  },
  titleh2: {
    fontSize: 25,
    fontWeight: '600',
    fontFamily: 'Futura',
  },
  titleh3: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Futura',
    // marginBottom: 40
  },
  connect: {
    height: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: 'red',
    marginBottom: '10%'
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    marginTop: 30,
    backgroundColor: '#198EA5',
    borderRadius: 1,
    fontFamily: 'Futura',
    width: '80%',
    height: '25%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'cyan'
  },
  textButton: {
    fontFamily: 'Futura',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  input: {
    borderColor: '#198EA5',
    borderWidth: 2,
    fontSize: 16,
    // fontFamily: 'Futura',
    width: '94%',
    height: '16%',
    borderRadius: 10,
    marginBottom: '5%',
    paddingLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '15%'
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '5%',
    // backgroundColor: "grey",
    padding: 30,
    height: '45%'
  },
  bar: {
    borderBottomColor : '#198EA5',
    borderBottomWidth: 2,
    width : '60%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textButtonFB : {
    fontFamily: 'Futura',
    height: 35,
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  textButtonG: {
    fontFamily: 'Futura',
    height: 35,
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
  },
  buttonFB: {
    paddingTop: 8,
    marginTop: 30,
    backgroundColor: '#3B5998',
    borderRadius: 1,
    fontFamily: 'Futura',
    width: '35%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttonG: {
    backgroundColor: '#DE4B39',
    paddingTop: 8,
    marginTop: 30,
    borderRadius: 1,
    fontFamily: 'Futura',
    width: '35%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  icon : {
    marginRight: '3%',
    marginBottom: '3%'
  },
  title3Container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '5%'
  }
});

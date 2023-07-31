import { Platform, SafeAreaView, StatusBar, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, View, TextInput } from 'react-native';

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
        <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} style={styles.buttonHalfGreen} >
          <Text style={styles.textButtonHalfPlain}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} style={styles.buttonHalfWhite} >
          <Text style={styles.textButtonHalfWhite}>Google</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.bar}></View>

        <View  style={styles.inputContainer}>
        <Text style={styles.titleh3}>ou</Text>

        <TextInput
            placeholder="Firstname"
            autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
            // keyboardType="email-address" //https://reactnative.dev/docs/textinput#keyboardtype pour les emails/numbers
            textContentType="name" // https://reactnative.dev/docs/textinput#textcontenttype-ios
            autoComplete="name" // https://reactnative.dev/docs/textinput#autocomplete-android
            // onChangeText={(value) => setEmail(value)}
            // value={email}
            style={styles.input}
            placeholderTextColor='#198EA5'
          />
        <TextInput
            placeholder="Lastname"
            autoCapitalize="none" 
            textContentType="name" 
            autoComplete="family-name" 
            // onChangeText={(value) => setEmail(value)}
            // value={email}
            style={styles.input}
            placeholderTextColor='#198EA5'
          />
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            // onChangeText={(value) => setEmail(value)}
            // value={email}
            style={styles.input}
            placeholderTextColor='#198EA5'
          />

          {/* {emailError && <Text style={styles.error}>Invalid email address</Text>} */}
        <TextInput
            placeholder="Password"
            autoCapitalize="none"
            textContentType="password" 
            autoComplete="new-password" 
            // onChangeText={(value) => setEmail(value)}
            // value={email}
            style={styles.input}
            placeholderTextColor='#198EA5'
          />
          <TextInput
            placeholder="Phone"
            autoCapitalize="none" 
            textContentType="telephoneNumber" 
            autoComplete="tel" 
            // onChangeText={(value) => setEmail(value)}
            // value={email}
            style={styles.input}
            placeholderTextColor='#198EA5'
          />
          </View>

          <View  style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} style={styles.button} >
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
    marginBottom: 10
  },
  titleh3: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Futura',
    marginBottom: 10
  },
  connect: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: '5%'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    marginTop: 30,
    backgroundColor: '#198EA5',
    borderRadius: 1,
    fontFamily: 'Futura',
    width: '70%',
    borderRadius: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10%',
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
    borderWidth: 1,
    fontSize: 20,
    fontFamily: 'Futura',
    width: '80%',
    height: '12%',
    borderRadius: 10,
    marginBottom: '5%',
    paddingLeft: '5%'
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: "grey",
    padding: 30,
    height: '50%'
  },
  bar: {
    borderBottomColor : '#198EA5',
    borderBottomWidth: 2,
    width : '60%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textButtonHalfPlain : {
    fontFamily: 'Futura',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  textButtonHalfWhite : {
    fontFamily: 'Futura',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
  },
  buttonHalfGreen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    marginTop: 30,
    backgroundColor: '#3B5998',
    borderRadius: 1,
    fontFamily: 'Futura',
    width: '30%',
    borderRadius: 10,
  },
  buttonHalfWhite: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DE4B39',
    paddingTop: 8,
    marginTop: 30,
    borderRadius: 1,
    fontFamily: 'Futura',
    width: '30%',
    borderRadius: 10,
  },
});

import { StyleSheet, Text, View, TouchableOpacity, Platform, SafeAreaView, StatusBar, KeyboardAvoidingView, TextInput } from 'react-native';

export default function SignInScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.textContent}>
          <Text style={styles.h1}>Toutenkommun</Text>
          <Text style={styles.h5}>Connectes-toi et partage !</Text>
        </View>
        <View style={styles.btnConnect}>
          <TouchableOpacity style={styles.btnFB} activeOpacity={0.8}>
           <Text style={styles.textBtnFB}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnGG} activeOpacity={0.8}>
            <Text style={styles.textBtnGG}>Google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContent}>
          <TextInput placeholder="Username" style={styles.input} placeholderTextColor='#198EA5'/>
          <TextInput placeholder="Password" style={styles.input} placeholderTextColor='#198EA5'/>
        </View>
        <View style={styles.btnValidateContent}>
          <TouchableOpacity style={styles.btnValidate} onPress={() => navigation.navigate("TabNavigator")}>
            <Text style={styles.btnTextValidate}>Valider</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bar}></View>
        <View style={styles.createContent}>
          <Text style={styles.h5}>Pas encore sur Toutenkommun ?</Text>
          <Text style={styles.h5}>Crée un compte et rejoins-nous !</Text>
          </View>
        <View style={styles.btnCreateContent}>  
          <TouchableOpacity style={styles.btnCreate} onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.btnTextCreate}>Créer un compte</Text>
          </TouchableOpacity> 
        </View>       
        <StatusBar style="auto" />
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  textContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  h1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#198EA5',
  },
  h5: {
    fontSize: 20,
    color: '#198EA5',
  },
  btnConnect: {
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btnFB: {
    height: '40%',
    width: '35%',
    backgroundColor: '#3B5998',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGG: {
    height: '40%',
    width: '35%',
    backgroundColor: '#DE4B39',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtnFB: {
    color: 'white',
    fontSize: '20',
    fontWeight: 'bold'
  },
  textBtnGG: {
    color: 'white',
    fontSize: '20',
    fontWeight: 'bold'
  },
  inputContent: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    height: '30%',
    width: '87%',
    borderWidth: 2,
    borderColor: '#198EA5',
    borderRadius: 5,
    paddingLeft: '5%',
  },
  btnValidateContent: {
    height: '15%',
    alignItems: 'center',
  },
  btnValidate: {
    height: '50%',
    width: '87%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#198EA5',
    borderRadius: 5,
  },
  btnTextValidate: {
    color: 'white',
    fontSize: '20',
    fontWeight: 'bold'
  },
  bar: {
    borderBottomColor: '#198EA5',
    borderBottomWidth: 2,
    width: '87%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5%'
  },
  createContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCreateContent: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCreate: {
    height: '50%',
    width: '87%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#198EA5',
    borderRadius: 5,
  },
  btnTextCreate: {
    color: 'white',
    fontSize: '20',
    fontWeight: 'bold'
  },
});

import { Platform, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function JoinScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>TOUTENKOMMUN</Text>
          <FontAwesome style={styles.userIcon} name='user' size={20} color='white'/>
        </View>

        <View style={styles.contentTop}>
        
        <View style={styles.titleContent}>
        <Text>Screen Join!</Text>
        <Text style={styles.h5}>Rejoindre ma communauté</Text>
        </View>

        <View style={styles.inputContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
        >
          <View style={styles.input}>
            <FontAwesome style={styles.icon} name="users" size='20' color='black' />
            <TextInput
              placeholder="Nom de la communauté"
              autoCapitalize="none"
            />
          </View>
        </TouchableOpacity> 
        <TouchableOpacity
          activeOpacity={0.8}
        >
          <View style={styles.input}>
            <FontAwesome style={styles.icon} name="lock" size='20' color='black' />
            <TextInput
              placeholder="Code d'accès"
              autoCapitalize="none"
            />
          </View>
        </TouchableOpacity> 
        </View>

        <View style={styles.btnValidateContent}>
          <TouchableOpacity style={styles.btnValidate} onPress={() => navigation.navigate("Prêt")}>
            <FontAwesome style={styles.handIcon} name='hand-o-right' size={20} color='#353639'/>
            <Text style={styles.btnTextValidate}>Valider</Text>
          </TouchableOpacity>
        </View>
        </View>
      
      <View style={styles.bar}></View>

      <View style={styles.contentBottom}>
        <View style={styles.titleContent}>
        <Text>Communauté(s) suggérée(s)</Text>
      </View>

      <View style={styles.comuContainer}>
        <View style={styles.row}>
          <TouchableOpacity>
            <View style={styles.iconCom}>
            <FontAwesome  name='home' size={20} color='#353639'/>
            </View>
            <View style={styles.textContainer}>
              <Text>La familia</Text>
              <Text>Membres :XX</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity>
            <FontAwesome  name='home' size={20} color='#353639'/>
            <Text>Poto Compoto</Text>
            <Text>Membres :XX</Text>
          </TouchableOpacity>
        </View>
      </View>
    
    </View>

      <StatusBar style="auto" />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    width: '100%',
    height:'10%',
    backgroundColor: '#198EA5',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  userIcon: {
    padding: 10,
  },
  btnValidateContent: {
    height: '15%',
    alignItems: 'center',
  },
  btnValidate: {
    flexDirection: 'row',
    height: '100%',
    width: '87%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#198EA5',
    borderRadius: 10,
    backgroundColor: '#198EA5',
  },
  handIcon: {
    color: 'white',
    fontSize: '20',
    fontWeight: 'bold',
    marginRight: 10
  },
  btnTextValidate: {
    color: 'white',
    fontSize: '20',
    fontWeight: 'bold',
    marginRight: 16
  },
  contentTop: {
    height: '45%',
    // backgroundColor : 'green',
    width: '100%',
  },
  contentBottom : {
    // backgroundColor : 'blue',
    height: '45%',
    width: '100%',
  },
  h5: {
    fontSize: 20,
    color: '#353639',
  },
  bar: {
    borderBottomColor : '#198EA5',
    borderBottomWidth: 2,
    width : '60%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputContainer: {
    justifyContent: 'space-evenly',
    marginTop: '5%',
    // backgroundColor: "grey",
    padding: 30,
  },
  input: {
    borderColor: '#198EA5',
    borderWidth: 2,
    fontSize: 16,
    // fontFamily: 'Futura',
    borderRadius: 10,
    marginBottom: '5%',
    paddingLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 50,
    alignItems: 'center',
  },
  icon : {
    marginRight: '3%',
  },
  titleContent:  {
    alignItems : 'center'
  },
  comuContainer: {
    backgroundColor : 'grey',
    height: '100%',
    padding: 10,
  },
  row : {
    flexDirection :'row',
    backgroundColor : 'yellow',
    borderColor : 'black',
    borderWidth: 1,
    borderRadius: 50,
    height: '30%',
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    
  },
  iconCom: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: '50%',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  } 
});

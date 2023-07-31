import React from 'react';
import { Platform, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CreateOrJoinScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TOUTENKOMMUN</Text>
        <FontAwesome style={styles.userIcon} name='user' size={20} color='#353639'/>
      </View>
      
      <Text style={styles.h5}>Choisir ma communauté</Text>
      

      <View style={styles.contentContainer}>        
        <Text style={styles.h5}>Tu connais le nom de la communauté et tu as un code d'accès ?</Text>

        <TouchableOpacity style={styles.buttonJoin} onPress={() => navigation.navigate("Join")}>
          <View style={styles.iconTextContainer}>
          <FontAwesome style={styles.joinIcon} name='sign-out' size={20} color='#353639'/>
            <Text style={styles.btnTextJoinCommu}>Rejoindre ma communauté</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.separatorBar} />

        <View style={styles.createContent}>
          <Text style={styles.h5}>Prêt(e) à lancer ta propre communauté et inviter les proches?</Text>
          <TouchableOpacity style={styles.buttoncreate} onPress={() => navigation.navigate("Create")}>
            <View style={styles.iconTextContainer}>
            <FontAwesome style={styles.createxIcon} name='users' size={20} color='#353639'/>
              <Text style={styles.createButtonText}>Créer ma communauté</Text>
            </View>
          </TouchableOpacity>
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
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
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
  tabtitle: {
    fontSize: 20,
    fontWeight: '600',
  
  },
  btnTextJoinCommu: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 16,
    marginBottom: 10,


  },
  createButtonText: {
    textAlign: 'center',
    color: '#198EA5',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 16,
    marginBottom: 10,
  },
  buttonJoin: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    width: '87%',
    marginTop: 30,
    backgroundColor: '#198EA5',
    borderRadius: 10,
    marginBottom: 65,
    justifyContent: 'center',
    
    

  },
  buttoncreate: {
    alignItems: 'center',
    paddingTop: 15,
    width: '80%', 
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 65,
    justifyContent: 'center',
    borderColor: '#198EA5',
    borderWidth: 2,
    flexDirection: 'row'
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separatorBar: {
    borderBottomColor: '#126171',
    borderBottomWidth: 2,
    width: 300,
    textAlign: 'center',
    marginBottom: '5%',
  },
  createContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  h5: {
    fontSize: 20,
    color: '#353639',
  },
  userIcon: {
    padding: 10,
  },
  joinIcon: {
    color: 'white',
    fontSize: '20',
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: '5%',
  },
  createxIcon: {
    color: '#198EA5', 
    fontSize: '20',
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: '5%',

  },

});

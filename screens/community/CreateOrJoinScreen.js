import React from 'react';
import { Platform, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CreateOrJoinScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TOUTENKOMMUN</Text>
        <Icon name="user" size={24} color="white" style={styles.icon} />
      </View>
      <Text style={styles.tabtitle}>Choisir ma communauté</Text>

      <View style={styles.contentContainer}>        
        <Text>Tu connais le nom de la communauté et tu as un code d'accès ?</Text>

        <TouchableOpacity style={styles.buttonJoin} onPress={() => navigation.navigate("Join")}>
          <View style={styles.iconTextContainer}>
            <Icon name="arrow-circle-o-right" size={20} color="white" />
            <Text style={styles.btnTextJoinCommu}>Rejoindre ma communauté</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.separatorBar} />

        <View style={styles.createContent}>
          <Text>Prêt(e) à lancer ta propre communauté et inviter les proches?</Text>
          <TouchableOpacity style={styles.buttoncreate} onPress={() => navigation.navigate("Create")}>
            <View style={styles.iconTextContainer}>
              <Icon name="users" size={20} color="white" />
              <Text style={styles.createButton}>Créer ma communauté</Text>
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
    marginBottom: 0,
  },
  btnTextJoinCommu: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  createButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  buttonJoin: {
    alignItems: 'center',
    paddingTop: 15,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#198EA5',
    borderRadius: 0,
    marginBottom: 65,
    justifyContent: 'center',
  },
  buttoncreate: {
    alignItems: 'center',
    paddingTop: 15,
    width: '80%', 
    marginTop: 30,
    backgroundColor: '#198EA5',
    borderRadius: 0,
    marginBottom: 65,
    justifyContent: 'center',
    borderColor: '#198EA5',
    borderWidth: 2,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separatorBar: {
    borderBottomColor: '#126171',
    borderBottomWidth: 2,
    width: '80%',
    textAlign: 'center',
    marginBottom: '5%',
  },
  createContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

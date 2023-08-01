import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, SafeAreaView, StatusBar, KeyboardAvoidingView, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function CreateScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text style={styles.title}>TOUTENKOMMUN</Text>
          <FontAwesome style={styles.userIcon} name='user' size={20} color='#353639'/>
        </View>
          <Text style={styles.h5}>Créer ma communauté</Text>
        <View style={styles.inputContent}>
          <View style={styles.userContent}>
            <FontAwesome style={styles.userIcon} name="user" size={20} color="#353639" />
            <TextInput placeholder="Nom de la communauté" placeholderTextColor="#353639" />
          </View>
        </View>
        <Text style={styles.h5}>Nom de communauté libre</Text>
        <View style={styles.directionrow}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.icontext}>
              <FontAwesome name="lock" size={20} color="black" />
              <Text>Privé</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.icontext}>
              <FontAwesome5 name="door-open" size={15} color="black" />
              <Text>Public</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.btnCreateContent}>  
          <TouchableOpacity style={styles.btnCreate} onPress={() => navigation.navigate("Prêt")}>
            <FontAwesome style={styles.userIcon} name='users' size={20} color='#353639'/>
            <Text style={styles.btnTextCreate}>Créer ma communauté</Text>
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
    backgroundColor: '#F8FCFB',
    alignItems: 'center',
  },
  textContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
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
  h1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#353639',
  },
  h5: {
    fontSize: 20,
    color: '#353639',
  },
  inputContent: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  userContent: {
    flexDirection: 'row',
    height: '30%',
    width: '87%',
    borderWidth: 2,
    borderColor: '#198EA5',
    borderRadius: 10,
    paddingLeft: '5%',
    alignItems: 'center'
  },
  userIcon: {
    color: '#198EA5',
    fontSize: '20',
    fontWeight: 'bold',
    marginRight: 10
  },
  directionrow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  icontext: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnCreateContent: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCreate: {
    flexDirection: 'row',
    height: '50%',
    width: '87%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FCFB',
    borderBottomColor: '#198EA5',
    borderBottomWidth: 2,
    borderLeftColor: '#198EA5',
    borderLeftWidth: 2,
    borderTopColor: '#198EA5',
    borderTopWidth: 2,
    borderRightColor: '#198EA5',
    borderRightWidth: 2,
    borderRadius: 10,
  },
  btnTextCreate: {
    color: '#198EA5',
    fontSize: '20',
    fontWeight: 'bold'
  },
});

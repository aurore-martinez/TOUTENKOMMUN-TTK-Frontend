import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, SafeAreaView, StatusBar, KeyboardAvoidingView, TextInput, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function CreateScreen({ navigation }) {

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text style={styles.title}>TOUTENKOMMUN</Text>
          <FontAwesome style={styles.userIcon} name='user'/>
        </View>
        <View style={styles.upperText}>
          <Text style={styles.h5}>Créer ma communauté</Text>
        </View>
        <View style={styles.inputContent}>
          <View style={styles.inputCommuContent}>
            <FontAwesome style={styles.commuIcon} name='users' size={20} color='#353639'/>
            <TextInput placeholder="Nom communauté" placeholderTextColor='#353639'/>
          </View>
          <View style={styles.nameCommuText}>
            <Text style={styles.commuText}>Nom de communauté libre</Text>
          </View>
        </View>
        <View style={styles.btnConnect}>
          <TouchableOpacity style={styles.btnPrive} activeOpacity={0.8}>
           <FontAwesome style={styles.ppIcon} name='lock' size={20} color='#198EA5'/>
           <Text style={styles.textBtnPrive}>Privé</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnPublic} activeOpacity={0.8}>
          <FontAwesome5 style={styles.ppIcon} name='door-open' size={20} color='#198EA5'/>
            <Text style={styles.textBtnPublic}>Public</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnCreateContent}>  
          <TouchableOpacity style={styles.btnCreate} onPress={openModal}>
            <FontAwesome style={styles.ppIcon} name='user-plus' size={20} color='#F8FCFB'/>
            <Text style={styles.btnTextCreate}>Créer</Text>
          </TouchableOpacity>
        </View>

          {Modal}
  <Modal visible={isModalVisible} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text>Bravo, votre communauté <Text style={{fontWeight: "bold"}}>"Carré comme un Kiri, ma moula"</Text> est prête ! Maintenant, invitez vos amis à vous rejoindre avec ce code : <Text style={{fontWeight: "bold"}}>KIRI</Text></Text>
        <View style={styles.modalBtnContent}>
        {/* Bouton pour l'e-mail */}
        <TouchableOpacity style={styles.emailButton} onPress={() => {
          // Ajoutez ici le code pour gérer l'ouverture de l'application d'e-mail avec les détails de votre communauté
          closeModal(); // Fermez la modal après avoir choisi l'option e-mail
        }}>
          <FontAwesome style={styles.ppIcon} name='envelope-o' size={20} color='#F8FCFB'/>
          <Text style={styles.emailButtonText}>E-mail</Text>
        </TouchableOpacity>

        {/* Bouton pour le SMS */}
        <TouchableOpacity style={styles.smsButton} onPress={() => {
          // Ajoutez ici le code pour gérer l'ouverture de l'application de SMS avec les détails de votre communauté
          closeModal(); // Fermez la modal après avoir choisi l'option SMS
        }}>
          <FontAwesome style={styles.ppIcon} name='commenting' size={20} color='#F8FCFB'/>
          <Text style={styles.smsButtonText}>SMS</Text>
        </TouchableOpacity>
        </View>
        {/* Bouton pour fermer la modal */}
        <TouchableOpacity onPress={closeModal}>
          <Text style={styles.closeText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#198EA5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userIcon: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  upperText: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h5: {
    fontSize: 20,
    color: '#353639',
  },
  inputContent: {
    height: '20%',
    alignItems: 'center',
  },
  inputCommuContent: {
    flexDirection: 'row',
    height: '45%',
    width: '87%',
    borderWidth: 2,
    borderColor: '#198EA5',
    borderRadius: 10,
    paddingLeft: '5%',
    alignItems: 'center',
  },
  commuIcon: {
    padding: 10,
  },
  nameCommuText:{
    marginTop: '2%',
    marginRight: '43%'
  },
  btnConnect: {
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btnPrive: {
    flexDirection: 'row',
    height: '40%',
    width: '40%',
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
  btnPublic: {
    flexDirection: 'row',
    height: '40%',
    width: '40%',
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
  textBtnPrive: {
    color: '#198EA5',
    fontSize: '20',
    fontWeight: 'bold'
  },
  textBtnPublic: {
    color: '#198EA5',
    fontSize: '20',
    fontWeight: 'bold'
  },
  ppIcon: {
    fontSize: '20',
    fontWeight: 'bold',
    marginRight: 10
  },
  btnCreateContent: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnCreate: {
    flexDirection: 'row',
    height: '40%',
    width: '87%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#198EA5',
    borderRadius: 10,
  },
  btnTextCreate: {
    color: '#F8FCFB',
    fontSize: '20',
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F8FCFB',
    padding: 20,
    borderRadius: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  closeText: {
    color: '#198EA5',
    marginTop: 10,
    textAlign: 'center',
  },
  modalBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
 emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    backgroundColor: '#198EA5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  emailButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  smsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    backgroundColor: '#198EA5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  smsButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

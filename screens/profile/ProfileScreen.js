import React, { useState } from 'react';
import { Platform, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet, Text, View, TextInput, Modal, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ProfileScreen({ navigation }) {
  const [showPrets, setShowPrets] = useState(false);
  const [showEmprunts, setShowEmprunts] = useState(false);
  const [showObjets, setShowObjets] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const togglePrets = () => setShowPrets(!showPrets);
  const toggleEmprunts = () => setShowEmprunts(!showEmprunts);
  const toggleObjets = () => setShowObjets(!showObjets);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TOUTENKOMMUN</Text>
        <FontAwesome style={styles.userIcon} name='user' />
      </View>
      <View style={styles.pageContent}>
        <View style={styles.avatarContent}>
          <FontAwesome5 style={styles.commuIcon} name='user-circle' size={150} color='#198EA5' />
          <Text style={styles.infoUser}>Laurent Lima</Text>
          <Text style={styles.infoUser}>lolo@ttk.com</Text>
        </View>
        <View style={styles.menuContent}>
          <TouchableOpacity onPress={togglePrets} style={styles.menuItem}>
            <Text style={styles.menuText}>Mes prêts</Text>
            <FontAwesome name={showPrets ? 'angle-up' : 'angle-down'} size={20} />
          </TouchableOpacity>
          {showPrets && (
            <View style={styles.subMenuContent}>
              {/* Contenu de l'historique des prêts */}
            </View>
          )}

          <TouchableOpacity onPress={toggleEmprunts} style={styles.menuItem}>
            <Text style={styles.menuText}>Mes emprunts</Text>
            <FontAwesome name={showEmprunts ? 'angle-up' : 'angle-down'} size={20} />
          </TouchableOpacity>
          {showEmprunts && (
            <View style={styles.subMenuContent}>
              {/* Contenu de l'historique des emprunts */}
            </View>
          )}

          <TouchableOpacity onPress={toggleObjets} style={styles.menuItem}>
            <Text style={styles.menuText}>Mes objets</Text>
            <FontAwesome name={showObjets ? 'angle-up' : 'angle-down'} size={20} />
          </TouchableOpacity>
          {showObjets && (
            <View style={styles.subMenuContent}>
              {/* Contenu de l'historique des objets */}
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={openModal} style={styles.addButton}>
        <FontAwesome name='plus' style={styles.addButtonText}/>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType='slide' transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalInput}>
              <Text>Nom de l'objet : </Text>
              <TextInput style={styles.inputObjet} placeholder="Nom objet" placeholderTextColor='#353639'/>
            </View>
            <View style={styles.modalInput}>
              <Text>Photo : </Text>
              <FontAwesome name='image' style={styles.imageObjet} />
            </View>
            <View style={styles.choixCommu}>
              <Text>Communauté(s) concerné(s) :</Text>
              <Text>Le Kiri</Text>
              <Text>La Moula</Text>
            </View>
            <View style={styles.modalBtnContent}>
            {/* Bouton pour l'ajout d'un objet */}
        <TouchableOpacity style={styles.addObjectButton} onPress={() => {
          // Ajoutez ici le code pour gérer l'ajout de l'objet dans la communauté
          closeModal(); // Fermez la modal après avoir ajouter l'objet
        }}>
          <FontAwesome style={styles.ppIcon} name='plus-square-o' size={20} color='#F8FCFB'/>
          <Text style={styles.smsButtonText}>Ajouter</Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
    </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: '100%',
    backgroundColor: '#F8FCFB'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#198EA5',
    height: '10%',
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
  pageContent: {
    height: '90%',
  },
  avatarContent: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commuIcon: {
    marginBottom: 20,
  },
  infoUser: {
    fontSize: 20
  },
  menuContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#F8FCFB'
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#198EA5'
  },
  menuText: {
    fontSize: 16,
  },
  subMenuContent: {
    paddingVertical: 10,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#198EA5'
  },
  addButton: {
    position: 'absolute',
    bottom: '0%',
    alignSelf: 'center',
    backgroundColor: '#198EA5',
    borderRadius: '50%',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonText: {
    marginLeft: 2,
    marginTop: 2,
    fontSize: 40,
    color: '#F8FCFB',
    fontWeight: 'bold',
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
  modalInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  inputObjet: {
		height: 30,
		width: 200,
		borderWidth: 2,
		borderColor: '#198EA5',
		borderRadius: 10,
		paddingLeft: '5%',
		alignItems: 'center'
  },
  imageObjet: {
    fontSize: 60,
    marginLeft: 58,
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
  addObjectButton: {
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
  ppIcon: {
    fontSize: '20',
    fontWeight: 'bold',
    marginRight: 10
  },
});

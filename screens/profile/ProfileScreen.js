import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { BACKEND_URL } from '../../Constants';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";

export default function ProfileScreen({ navigation }) {
  // On recupère le token
  const token = useSelector((state) => state.users.token);
  
  // Les états du screen
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [showCommunities, setShowCommunities] = useState(false);
  const [showPrets, setShowPrets] = useState(false);
  const [showEmprunts, setShowEmprunts] = useState(false);
  const [showObjets, setShowObjets] = useState(false);
  const [name, setName] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);
  const [isCameraActive, setCameraActive] = useState(false);

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  const isFocused = useIsFocused();

  let cameraRef = useRef(null);

  const toggleCommunities = () => setShowCommunities(!showCommunities);
  const togglePrets = () => setShowPrets(!showPrets);
  const toggleEmprunts = () => setShowEmprunts(!showEmprunts);
  const toggleObjets = () => setShowObjets(!showObjets);

  // Fonction pour la camera
  const camera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === 'granted');
    setCameraActive(true);
  };

  useEffect(() => {
    if (!token) {
      console.log('error, user not found');
    } else {
      fetch(`${BACKEND_URL}/users/profil/${token}`)
        .then(res => res.json())
        .then(data => {
          console.log("data user", data);
          setEmail(data.email);
          setUsername(data.username);
        });
    }
  }, [token]);


   	/**
	 * Fonction ajout d'un objet
	 */

     const handleAddObject = async () => {
       if (name !== "") {
        const response = await fetch(`${BACKEND_URL}/users/profil/${token}/object`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name })
        });
  
        const dataObject = await response.json();
        if (dataObject.result) {
          console.log('dataObject', dataObject.result);
        } else {
          console.log('Error', dataObject.error);
        }
      }
    };


  // Fonction pour prendre une photo avec la caméra
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
      const formData = new FormData();

      formData.append('photoFromFront', {
        uri: photo.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
    }
  };

  const openModal = () => {
    setModalVisible(true)
  };

  const closeModal = () => {
    setModalVisible(false)
  };

  if (!hasCameraPermission || !isFocused || !isCameraActive) {
    return (
      <SafeAreaView style={styles.container}>
        {/*HEADER*/}
        <View style={styles.header}>
          <Text style={styles.title}>TOUTENKOMMUN</Text>
          <FontAwesome style={styles.userIcon} name='user' />
        </View>

        {/*CONTENT*/}
        <View style={styles.pageContent}>
          <View style={styles.avatarContent}>
            <FontAwesome5 onPress={camera} style={styles.commuIcon} name='user-circle' size={150} color='#198EA5' />
            <Text style={styles.infoUser}>{username}</Text>
            <Text style={styles.infoUser}>{email}</Text>
          </View>

          <View style={styles.menuContent}>
            <TouchableOpacity onPress={toggleCommunities} style={styles.menuItem}>
              <Text style={styles.menuText}>Mes communautés</Text>
              <FontAwesome name={showCommunities ? 'angle-up' : 'angle-down'} size={20} />
            </TouchableOpacity>
            {showCommunities && (
              <View style={styles.subMenuContent}>
                {/* Contenu de la liste communautés */}
              </View>
            )}

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
                {/* Contenu de la liste des objets */}
              </View>
            )}
          </View>
        </View>

        {/*MODAL*/}
        <TouchableOpacity onPress={openModal} style={styles.addButton}>
          <FontAwesome name='plus' style={styles.addButtonText} />
        </TouchableOpacity>
        <Modal visible={isModalVisible} animationType='slide' transparent={true}>
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={closeModal} // Ferme la modal lorsque vous cliquez en dehors d'elle
            style={styles.modalContainer}
          >
            <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
              {/* Contenu de la modal */}
              <View style={styles.modalInput}>
                <Text>Nom de l'objet : </Text>
                <TextInput
                  style={styles.inputObjet}
                  placeholder="Nom objet"
                  placeholderTextColor='#353639'
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.modalInput}>
                <Text>Photo : </Text>
                <TouchableOpacity onPress={camera} style={styles.cameraButton}>
                  <FontAwesome name="camera" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.choixCommu}>
                <Text>Communauté(s) concerné(s) :</Text>
                <Text>Le Kiri</Text>
                <Text>La Moula</Text>
              </View>
              <View style={styles.modalBtnContent}>
                {/* Bouton pour l'ajout d'un objet */}
                <TouchableOpacity
                  style={styles.addObjectButton}
                  onPress={() => {
                    handleAddObject();
                    closeModal(); // Fermez la modal après avoir ajouté l'objet
                  }}
                >
                  
                  <FontAwesome
                    style={styles.ppIcon}
                    name='plus-square-o'
                    size={20}
                    color='#F8FCFB'
                  />
                  <Text style={styles.smsButtonText}>Ajouter</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    );
  }

  // Si isCameraActive est true, affichez la caméra
  return (
    <Camera type={type} flashMode={flashMode} ref={cameraRef} style={styles.camera}>
      {/* Contenu de la caméra */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
          style={styles.button}
        >
          <FontAwesome name='rotate-right' size={25} color='#ffffff' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}
          style={styles.button}
        >
          <FontAwesome name='flash' size={25} color={flashMode === FlashMode.off ? '#ffffff' : '#e8be4b'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCameraActive(false)}
          style={styles.button}
        >
          <FontAwesome name='remove' size={25} color='#ffffff' />
        </TouchableOpacity>
      </View>

      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => cameraRef && takePicture()}>
          <FontAwesome name='circle-thin' size={95} color='#ffffff' />
        </TouchableOpacity>
      </View>
    </Camera>
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
    borderRadius: 50,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10
  },
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 25,
  },
});

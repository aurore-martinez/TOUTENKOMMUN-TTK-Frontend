import React, { useEffect, useState, useRef } from "react";
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
  Image,
  FlatList,
  ScrollView,
  Button
} from "react-native";
import { Linking } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../Constants";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { addPhoto, logout } from '../../reducers/users';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  // On recupère le token
  const token = useSelector((state) => state.users.token);

  // Les états du screen
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showCommunities, setShowCommunities] = useState(false);
  const [showPrets, setShowPrets] = useState(false);
  const [showEmprunts, setShowEmprunts] = useState(false);
  const [showObjets, setShowObjets] = useState(false);
  const [userObjects, setUserObjects] = useState([]);
  const [name, setName] = useState("");
  const [communities, setCommunities] = useState(null);
  const [description, setDescription] = useState("");
  const [prets, setPret] = useState(null);
  const [emprunts,setEmprunt]= useState(null);
  
  //Gestion de l'ajout et de l'affichage de l'adresse utilisateur dans une modal
  const [address, setAddress] = useState({
    street: '',
    zipCode: '',
    city: '',
    // latitude: 0,
    // longitude: 0,
  });
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    zipCode: '',
    city: '',
  });

  console.log('address', address)
  
  const handleEditAddress = async () => {
    setNewAddress(address); // si l'adresse existe; l'utilisateur peut la modifier
    setAddressModalVisible(true);
  };

  const handleConfirmAddress = async () => {
    // Bouton validation de l'adresse ajoutée dans la modal (newAddress stockée dans Address)
    const { street, zipCode, city } = newAddress;
    try {
      const validfield =
        street !== "" && zipCode !== "" && city !== "";
      console.log("street", street)

      if (validfield) {
        const response = await fetch(`${BACKEND_URL}/users/profil/${token}/address`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ street, zipCode, city })
        })
        const dataAddress = await response.json();
        if (dataAddress.result) {
          console.log("dataAdress", dataAddress)
          setAddress(newAddress);
          setAddressModalVisible(false);
        } else {
          console.log('Error', dataAddress.error)
        }
      } else {
        console.log('Invalid address fields');
      }
    } catch (error) {
      console.error("L'adresse est invalide", error.message)
    }
  };


  const [isModalPlusVisible, setModalPlusVisible] = useState(false);
  const [isCameraActive, setCameraActive] = useState(false);
  const [isModalCommunityVisible, setModalCommunityVisible] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isModalObjectVisible, setModalObjectVisible] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [isModalLogoutVisible, setModalLogoutVisible] = useState(false);

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  const isFocused = useIsFocused();

  let cameraRef = useRef(null);

  const [pictureFromCamera, setPictureFromCamera] = useState("");
  const [objectPicture, setObjectPicture] = useState("");

  const toggleCommunities = () => setShowCommunities(!showCommunities);
  const togglePrets = () => setShowPrets(!showPrets);
  const toggleEmprunts = () => setShowEmprunts(!showEmprunts);
  const toggleObjets = () => setShowObjets(!showObjets);

  // Fonction pour la camera
  const camera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === "granted");
    setCameraActive(true);
  };

  useEffect(() => {
    if (!token) {
      console.log("error, user not found");
    } else {
      fetch(`${BACKEND_URL}/users/profil/${token}`)
        .then(res => res.json())
        .then(data => {
          console.log("Utilisateur connecté :", data);
          setEmail(data.email);
          setUsername(data.username);
          setPhoto(data.photo);
          setAddress(data.address[0] || []); // On affichera la première adresse de l'utilisateur, s'il en a entré une
          dispatch(addPhoto(data.photo));
          getUserObjects();
          getUserCommu();
          getUserBorrows();
          getUserLends();
        });
    }
  }, [token]);


  /**
  * Fonction ajout d'un objet
  */

  const handleAddObject = async () => {
    if (name !== "") {
      let photoObj = null;
      if (objectPicture) {
        const formData = new FormData();
        formData.append("photoFromFront", {
          uri: objectPicture,
          name: "photo.jpg",
          type: "image/jpeg",
        });
  
        let response =  await fetch(`${BACKEND_URL}/${token}/object/cloudinary/upload`, {
          method: 'POST',
          body: formData,
        });
  
        photoObj = await response.json();
        console.log("Secure URL Cloudinary", photoObj.url);
      }

      response = await fetch(`${BACKEND_URL}/users/profil/object/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, photo: photoObj?.url || "", communities: availableIn })
      });

      const dataObject = await response.json();
      if (dataObject.result) {
        console.log('Objet ajouté', dataObject.result);
        getUserObjects();
        setName("");
        setDescription("");
        setAvailableIn([]);
        setObjectPicture("");
      } else {
        console.log('Erreur objet non ajouté', dataObject.error);
      }
    }
  };

  const [availableIn, setAvailableIn] = useState([]);

  const handleAvailableIn = (indice) => {
    const selectedId = communities[indice]._id;
    
    if (availableIn.includes(selectedId)) {
      setAvailableIn(prevIds => prevIds.filter(id => id !== selectedId));
    } else {
      setAvailableIn(prevIds => [...prevIds, selectedId]);
      console.log('availableIn', availableIn)
    }
  };


  const handleDeleteObject = async (objectId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/objects/${token}/${objectId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        console.log("L'objet a été supprimé avec succès.");
        getUserObjects();
      } else {
        console.log("Erreur lors de la suppression de l'objet :", data.message);
      }
    } catch (error) {
      console.error("Une erreur est survenue lors de la suppression de l'objet :", error.message);
    }
  };

  const handleDeleteCommunity = async (communityId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/profil/${token}/${communityId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        console.log("La communauté a été supprimée avec succès.");
        getUserCommu();
      } else {
        console.log("Erreur lors de la suppression de la communauté :", data.message);
      }
    } catch (error) {
      console.error("Une erreur est survenue lors de la suppression de la communauté :", error.message);
    }
  };


  // Fonction pour prendre une photo avec la caméra
  const takePicture = async (pictureType) => {
    console.log("takepicture", pictureType)
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
      const formData = new FormData();

      formData.append("photoFromFront", {
        uri: photo.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      // utilise la même fonction take picture mais je switch en fontion de si j'utilise dans le cas photo User ou photo Objet 
      switch (pictureType) {
        case 'face':
          fetch(`${BACKEND_URL}/${token}/cloudinary/upload`, {
            method: 'POST',
            body: formData,
          }).then((response) => response.json())
            .then((data) => {
              data.result && dispatch(addPhoto(data.url));
              setPhoto(data.url);
              console.log("Photo enregistrée", data.url);
              setCameraActive(false);
            });

          break;

        case 'object':
          console.log(photo.uri);
          setObjectPicture(photo.uri);
          break;

        default: break;
      }
    }
  };


  const openModalLogout = () => {
    setModalLogoutVisible(true)
  }

  const closeModalLogout = () => {
    setModalLogoutVisible(false)
  }

  const openModalCommunity = (community) => {
    setModalCommunityVisible(true)
    setSelectedCommunity(community);
  };

  const openModalObject = (obj) => {
    setModalObjectVisible(true)
    setSelectedObject(obj)
    console.log(obj)
  }

  const openModal = () => {
    setModalPlusVisible(true);
  };

  const closeModal = () => {
    setModalPlusVisible(false);
    setModalCommunityVisible(false);
    setModalObjectVisible(false);
  };

  // Affichage d'objets d'un user
  const getUserObjects = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/users/profil/objects/${token}`
        );
        const data = await response.json();
        
        if (data.result) {
          console.log('Les objets du user ont bien été trouvées:', data.objects);
          setUserObjects(data.objects);
        } else {
          console.log("Erreur fetching les objets du user", data.error);
        }
      } catch (error) {
        console.error("Error fonction getUserObjects:", error.message);
      }
    };
    
    // Affichage des commu d'un user
    const getUserCommu = async () => {
     const response = await fetch(`${BACKEND_URL}/users/profil/${token}/communities`);
      
     const dataCommu = await response.json();
      
     if (dataCommu.result) {
       console.log('Les Commu du user ont bien été trouvées:', dataCommu.communities);
       setCommunities(dataCommu.communities);
     } else {
       console.log('Erreur fetching les commu du user:', dataCommu.error);
     }
   }
    
    //Fetch historique des emprunts
    const getUserBorrows = async () => {
      const response = await fetch(`${BACKEND_URL}/transactions/borrow/${token}`);
      
      const dataBorrow = await response.json();
      
      if (dataBorrow) {
        console.log("L'historique des emprunts du user ont bien été trouvées:", dataBorrow.emprunts);
        setEmprunt(dataBorrow.emprunts);
      } else {
        console.log("Erreur fetching l'historique' du user:", dataBorrow.error);
      }
    }
    
    
    //Fetch historique des prêts
    const getUserLends = async () => {
      const response = await fetch(`${BACKEND_URL}/transactions/lend/${token}`);
      
      const dataLend = await response.json();
      
      if (dataLend) {
        console.log("L'historique des prêts du user ont bien été trouvées:", dataLend.prets);
        setPret(dataLend.prets);
      } else {
        console.log("Erreur fetching l'historique' du user:", dataLend.error);
      }
    }


   //fonction logout
   const handleLogout = () => {
      setEmail("");
      setAddress("");
      setUsername("");
      setPhoto("");
      setShowCommunities(false);
      setShowPrets(false);
      setShowEmprunts(false);
      setShowObjets(false);
      setUserObjects([]);
      setName("");
      setCommunities(null);
      setDescription("");
      dispatch(logout());
    
      navigation.navigate('SignIn');
    };
    
    
    
    if (!hasCameraPermission || !isFocused || !isCameraActive) {
      return (
        <SafeAreaView style={styles.container}>
        {/*HEADER*/}
        <View style={styles.header}>
          <Text style={styles.title}>TOUTENKOMMUN</Text>
          <FontAwesome style={styles.userIcon} name="power-off" onPress={openModalLogout} />
        </View>

        {/*CONTENT*/}
        <View style={styles.pageContent}>
          <View style={styles.avatarContent}>
            <View style={styles.photoEdit}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.photos} />
              ) : (
                <FontAwesome name="user-circle-o" size={150} color="#198EA5" />
              )}
              <FontAwesome name='pencil' size={30} color="#198EA5" onPress={() => { camera(); setPictureFromCamera('face'); }} style={styles.pencilIcon} />
            </View>
            <Text style={styles.infoUser}>{username}</Text>
            <Text style={styles.infoUser}>{email}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Boutons crayon pour ajouter ou modifier une adresse*/}
              {address.length != 0 ? (
                <>
                  <Text style={styles.infoAddressUser}>
                    {address.street}, {address.zipCode} {address.city}
                  </Text>
                  <FontAwesome name='pencil' size={30} color="#198EA5" onPress={handleEditAddress} style={styles.pencilIconAddress} />
                  {/* <Button title="Modifier mon adresse" onPress={handleEditAddress} /> */}
                </>
              ) : (
                <FontAwesome name='pencil' size={30} color="#198EA5" onPress={handleEditAddress} style={styles.pencilIconAddress} />
                // <Button title="Ajouter une adresse" onPress={handleAddAddress} />
              )}
            </View>

            {/* Modal pour ajouter ou modifier une adresse */}
            <Modal visible={isAddressModalVisible} animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={[styles.infoAddressUser, { textAlign: 'center' }, { fontWeight: 'bold' }]}>Entrez ou modifiez votre nouvelle adresse :</Text>
                  <TextInput
                    placeholder="Rue"
                    value={newAddress.street}
                    style={styles.modalInputAddress}
                    onChangeText={(text) => setNewAddress({ ...newAddress, street: text })}
                  />
                  <TextInput
                    placeholder="Code postal"
                    value={newAddress.zipCode}
                    style={styles.modalInputAddress}
                    onChangeText={(text) => setNewAddress({ ...newAddress, zipCode: text })}
                  />
                  <TextInput
                    placeholder="Ville"
                    value={newAddress.city}
                    style={styles.modalInputAddress}
                    onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
                  />
                  <View style={styles.modalBtnContent2}>
                    <TouchableOpacity style={styles.emailButton1} onPress={handleConfirmAddress}>
                      <Text style={styles.emailButtonText2}>Confirmer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.emailButton2} // Example style change for cancel button
                      onPress={() => setAddressModalVisible(false)}
                    >
                      <Text style={styles.emailButtonText}>Annuler</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.menuContent}>
              <TouchableOpacity
                onPress={toggleCommunities}
                style={styles.menuItem}
              >
                <Text style={styles.menuText}>Mes communautés</Text>
                <FontAwesome
                  name={showCommunities ? "angle-up" : "angle-down"}
                  size={20}
                />
              </TouchableOpacity>
              {showCommunities && (
                <View style={styles.subMenuContent}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={communities}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => openModalCommunity(item)} style={styles.objectItem}>
                        <FontAwesome name='image' size={100} />
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
                    
                    {/* Section - Historique des prêts */}

              <TouchableOpacity onPress={togglePrets} style={styles.menuItem}>
                <Text style={styles.menuText}>Mes prêts</Text>
                <FontAwesome
                  name={showPrets ? "angle-up" : "angle-down"}
                  size={20}
                />
              </TouchableOpacity>
              {showPrets && (
                <View style={styles.subMenuContent}>
                      <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Contenu de l'historique des prêts */}
                      {prets && prets.length > 0 ? (
                        prets.map((pret, index) => (
                          <View key={index} style={styles.empruntItem}>
                          <Text style={[styles.empruntText, { fontWeight: 'bold' }]}>{pret.object.name}</Text>
                          <Text style={styles.empruntText}>Emprunteur: {pret.borrowerUser.username}</Text>
                          <Text style={styles.empruntText}>
                            Date de début: {new Date(pret.startDate).toLocaleString('fr-FR', { dateStyle: 'long' })}
                            {/* pour afficher l'heure, il faudra ajouter , timeStyle: 'short' */}
                          </Text>
                          <Text style={styles.empruntText}>
                            Date de fin: {new Date(pret.endDate).toLocaleDateString('fr-FR', { dateStyle: 'long' })}
                          </Text>
                          <Text style={styles.empruntText}>
                            Statut: 
                            {pret.isFinished ? 
                            <Text style={[styles.empruntText, { color: '#198EA5' }, { fontWeight: 'bold' }]}> Terminé</Text>
                            : 
                            <Text style={[styles.empruntText, { color: '#CE8D2C' }, { fontWeight: 'bold' }]}> En cours</Text>
                            }
                            </Text>
                    </View>
                          ))
                          ) : (
                            <Text style={styles.empruntText}>Aucun prêt trouvé.</Text>
                    )}
      
                            </ScrollView>
                            </View>
                            )}
                            
                            {/* Section - Historique des emprunts */}                      
                    <TouchableOpacity onPress={toggleEmprunts} style={styles.menuItem}>
                      <Text style={styles.menuText}>Mes emprunts</Text>
                      <FontAwesome
                        name={showEmprunts ? "angle-up" : "angle-down"}
                        size={20}
                      />
                    </TouchableOpacity>
                    {showEmprunts && (
                      <View style={styles.subMenuContent}>
                              <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Contenu de l'historique des emprunts */}
                              {emprunts && emprunts.length > 0 ? (
                                emprunts.map((emprunt, index) => (
                                  <View key={index} style={styles.empruntItem}>
                                  <Text style={[styles.empruntText, { fontWeight: 'bold' }]}>{emprunt.object.name}</Text>
                                  <Text style={styles.empruntText}>Prêteur: {emprunt.lenderUser.username}</Text>
                                  <Text style={styles.empruntText}>
                                    Date de début: {new Date(emprunt.startDate).toLocaleDateString('fr-FR', { dateStyle: 'long' })}
                                  </Text>
                                  <Text style={styles.empruntText}>
                                    Date de fin: {new Date(emprunt.endDate).toLocaleDateString('fr-FR', { dateStyle: 'long' })}
                                  </Text>
                                  <Text style={styles.empruntText}>
                                    Statut:
                                    {emprunt.isFinished ? 
                                  <Text style={[styles.empruntText, { color: '#198EA5' }, { fontWeight: 'bold' }]}> Terminé</Text>
                                  : 
                                  <Text style={[styles.empruntText, { color: '#CE8D2C' }, { fontWeight: 'bold' }]}> En cours</Text>
                                  }</Text>
                          </View>
                                  ))
                                  ) : (
                                    <Text style={styles.empruntText}>Aucun emprunt trouvé.</Text>
                                    )}
                                    </ScrollView>
                                    </View>
                          )}
            
                          <TouchableOpacity onPress={toggleObjets} style={styles.menuItem}>
                            <Text style={styles.menuText}>Mes objets</Text>
                            <FontAwesome
                              name={showObjets ? "angle-up" : "angle-down"}
                              size={20}
                            />
                          </TouchableOpacity>
                          {showObjets && (
                            <View style={styles.subMenuContent}>
                              <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={userObjects}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({ item }) => (
                                  <TouchableOpacity onPress={() => openModalObject(item)} style={styles.objectItem}>
                                    {
                          item.photo ?
                          <Image source={{ uri: item.photo }} style={{ width: 100, height: 100 }} resizeMode="contain" />
                          :
                          <FontAwesome name='image' size={100} />
            
                        }
                        <Text>{item.name}</Text>
                                  </TouchableOpacity>
                                )}
                              />
                            </View>
                          )}
                        </View>
                      </ScrollView>
                    </View>
            
                    {/*MODAL LOGOUT*/}
                    <Modal
                      visible={isModalLogoutVisible}
                      animationType="slide"
                      transparent={true}
                    >
                      <TouchableOpacity
                        activeOpacity={1}
                        onPressOut={closeModalLogout} // Ferme la modal lorsque vous cliquez en dehors d'elle
                        style={styles.modalContainer}
                      >
                        <TouchableOpacity activeOpacity={1} style={styles.modalLogoutContent}>
                          {/* Contenu de la modal */}
                          <View style={styles.modalBtnContent}>
                            {/* Bouton pour supprimer la communauté */}
                            <TouchableOpacity
                              style={styles.deconnecterButton}
                              onPress={handleLogout}
                            >
                              <FontAwesome
                                style={styles.ppIcon}
                                name="sign-out"
                                size={20}
                                color="#F8FCFB"
                              />
                              <Text style={styles.smsButtonText}>Se déconnecter</Text>
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </Modal>
            
                    {/*MODAL AJOUT OBJET*/}
                    <TouchableOpacity onPress={openModal} style={styles.addButton}>
                      <FontAwesome name="plus" style={styles.addButtonText} />
                    </TouchableOpacity>
                    <Modal
                      visible={isModalPlusVisible}
                      animationType="slide"
                      transparent={true}
                    >
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
                            <Text>Description : </Text>
                            <TextInput
                              style={styles.inputObjet}
                              placeholder="Description"
                              placeholderTextColor='#353639'
                              value={description}
                              onChangeText={setDescription}
                            />
                          </View>
                          <View style={styles.modalInput}>
                            <Text>Photo : </Text>
            
                {
                  objectPicture ?
                    <Image source={{ uri: objectPicture }} style={{ width: 100, height: 100 }} />
                    :
                    (
                      <TouchableOpacity onPress={() => { camera(); setPictureFromCamera('object') }} style={styles.cameraButton}>
                                    <FontAwesome name="camera" size={24} color="black" />
                                  </TouchableOpacity>
                                )
                }
              </View>
                          <View style={styles.choixCommuAddObjet}>
                            <Text>Communauté(s) concerné(s) :</Text>
                            <ScrollView style={{  width: '50%', height:'50%' }} contentContainerStyle={{ flex: 1, justifyContent: 'center', rowGap: 25}}>
								              {
									              communities && communities.map((commu, i) => {
										              return (
                                    <TouchableOpacity 
                                    key={i} 
                                    onPress={() => handleAvailableIn(i)} 
                                    style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', columnGap: 20, backgroundColor: communities.includes(commu._id) ? '#CE8D2C' : undefined }}>
                                      <View style={{ backgroundColor: communities.includes(commu._id) ? '#FFFFFF' : 'transparent', borderColor: '#CE8D2C', borderWidth: 1, width: 10, height: 10, borderRadius: 2 }} />
                                      <Text>{commu.name}</Text>
                                    </TouchableOpacity>
                                  )
                                })
                              }
							              </ScrollView>
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
                                name="plus-square-o"
                                size={20}
                                color="#F8FCFB"
                              />
                              <Text style={styles.smsButtonText}>Ajouter</Text>
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </Modal>
            
            
                    {/*MODAL MES COMMUNAUTES*/}
                    <Modal
                      visible={isModalCommunityVisible}
                      animationType="slide"
                      transparent={true}
                    >
                      <TouchableOpacity
                        activeOpacity={1}
                        onPressOut={closeModal} // Ferme la modal lorsque vous cliquez en dehors d'elle
                        style={styles.modalContainer}
                      >
                        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                          {/* Contenu de la modal */}
                          <View style={styles.choixCommu}>
                            <Text>Communauté : {selectedCommunity && selectedCommunity.name}</Text>
                            <Text>Code d'accès : {selectedCommunity && selectedCommunity.accessCode}</Text>
                            <Text>Description : {selectedCommunity && selectedCommunity.description}</Text>
                          </View>
                          <View style={styles.modalBtnContent}>
                            {/* Bouton pour supprimer la communauté */}
                            <TouchableOpacity
                              style={styles.desabonnerButton}
                              onPress={() => {
                                handleDeleteCommunity(selectedCommunity._id);
                                closeModal(); // Fermez la modal après avoir ajouté l'objet
                              }}
                            >
                              <FontAwesome
                                style={styles.ppIcon}
                                name="user-times"
                                size={20}
                                color="#F8FCFB"
                              />
                              <Text style={styles.smsButtonText}>Se désabonner</Text>
                            </TouchableOpacity>

                            {/* Bouton pour partager par SMS la communauté */}
                            <TouchableOpacity
                      style={styles.desabonnerButton}
                      onPress={() => {
                        const smsBody = encodeURIComponent(`Rejoignez ma communauté ${selectedCommunity.name} avec le code : ${selectedCommunity.accessCode}`);
                        Linking.openURL(`sms:&body=${smsBody}`);
                      }}
                    >
                  <FontAwesome style={styles.ppIcon} name='commenting' size={20} color='#F8FCFB' />
                  <Text style={styles.smsButtonText}>Partager par SMS</Text>
                </TouchableOpacity>


                          </View>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </Modal>
            
                    {/*MODAL MES OBJETS*/}
                    <Modal
                      visible={isModalObjectVisible}
                      animationType="slide"
                      transparent={true}
                    >
                      <TouchableOpacity
                        activeOpacity={1}
                        onPressOut={closeModal} // Ferme la modal lorsque vous cliquez en dehors d'elle
                        style={styles.modalContainer}
                      >
                        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                          {/* Contenu de la modal */}
                          <View style={styles.infoObj}>
                            <Text>Nom de l'objet : {selectedObject && selectedObject.name}</Text>
                            <Text>Description : {selectedObject && selectedObject.description}</Text>
                          </View>
                          <View style={styles.modalBtnContent}>
                            {/* Bouton pour supprimer l'objet */}
                            <TouchableOpacity
                              style={styles.desabonnerButton}
                              onPress={() => {
                                handleDeleteObject(selectedObject._id);
                                closeModal(); // Fermez la modal après avoir supprimé l'objet
                              }}
                            >
                              <FontAwesome
                                style={styles.ppIcon}
                                name="trash-o"
                                size={20}
                                color="#F8FCFB"
                              />
                              <Text style={styles.smsButtonText}>Supprimer</Text>
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
                <Camera
                  type={type}
                  flashMode={flashMode}
                  ref={cameraRef}
                  style={styles.camera}
                >
                  {/* Contenu de la caméra */}
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        setType(
                          type === CameraType.back ? CameraType.front : CameraType.back
                        )
                      }
                      style={styles.button}
                    >
                      <FontAwesome name="rotate-right" size={25} color="#ffffff" />
                    </TouchableOpacity>
            
                    <TouchableOpacity
                      onPress={() =>
                        setFlashMode(
                          flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off
                        )
                      }
                      style={styles.button}
                    >
                      <FontAwesome
                        name="flash"
                        size={25}
                        color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"}
                      />
                    </TouchableOpacity>
            
                    <TouchableOpacity
                      onPress={() => setCameraActive(false)}
                      style={styles.button}
                    >
                      <FontAwesome name="remove" size={25} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
            
                  <View style={styles.snapContainer}>
                    <TouchableOpacity onPress={() => cameraRef && takePicture(pictureFromCamera)}>
                      <FontAwesome name="circle-thin" size={95} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </Camera>
              );
            }
            
            const styles = StyleSheet.create({
              container: {
                flex: 1,
                height: "100%",
                backgroundColor: "#F8FCFB",
              },
              header: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                backgroundColor: "#198EA5",
                height: "10%",
              },
              title: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              },
              userIcon: {
                margin: 10,
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              },
              pageContent: {
                height: "90%",
              },
              avatarContent: {
                height: "38%",
                alignItems: "center",
                justifyContent: "center",
              },
              commuIcon: {
                marginBottom: 20,
              },
              infoUser: {
                fontSize: 20,
              },
              infoAddressUser: {
                fontSize: 18,
              },
              photos: {
                margin: 10,
                width: 150,
                height: 150,
                borderRadius: 100,
                borderWidth: 3,
                borderColor: "#198EA5",
              },
              photoEdit: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginRight: 5,
              },
              pencilIcon: {
                marginLeft: -34,
              },
              pencilIconAddress: {
                marginLeft: 5,
              },
              menuContent: {
                paddingHorizontal: 20,
                paddingTop: 10,
                backgroundColor: "#F8FCFB",
              },
              menuItem: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#198EA5",
              },
              menuText: {
                fontSize: 16,
              },
              subMenuContent: {
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#198EA5",
              },
              addButton: {
                position: "absolute",
                bottom: "0%",
                alignSelf: "center",
                backgroundColor: "#198EA5",
                borderRadius: 50,
                width: 70,
                height: 70,
                justifyContent: "center",
                alignItems: "center",
              },
              addButtonText: {
                marginLeft: 2,
                marginTop: 2,
                fontSize: 40,
                color: "#F8FCFB",
                fontWeight: "bold",
              },
              buttonText: {
                fontSize: 20
              },
              modalContainer: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              modalContent: {
                backgroundColor: "#F8FCFB",
                padding: 20,
                borderRadius: 10,
                marginLeft: 25,
                marginRight: 25,
                alignItems: 'center',
                justifyContent: 'center'
              },
              modalInput: {
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              },
              modalInputAddress: {
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                color: '#126171',
                fontSize: 18,
                borderColor: '#126171',
                borderWidth: 1,
                width: 250,
                height: 40,
                backgroundColor: '#EEFCFF',
                borderRadius: 10,
                paddingLeft: 10
              },
              modalLogoutContent: {
                backgroundColor: "#F8FCFB",
                padding: 20,
                borderRadius: 10,
                marginLeft: 25,
                marginRight: 25,
                alignItems: 'center',
                justifyContent: 'center'
              },
              deconnecterButton: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "70%",
                backgroundColor: "#198EA5",
                padding: 10,
                borderRadius: 5,
              },
              inputObjet: {
                height: 30,
                width: 200,
                borderWidth: 2,
                borderColor: "#198EA5",
                borderRadius: 10,
                paddingLeft: "5%",
                alignItems: "center",
              },
              imageObjet: {
                fontSize: 60,
                marginLeft: 58,
              },
              closeText: {
                color: "#198EA5",
                marginTop: 10,
                textAlign: "center",
              },
              modalBtnContent: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              },
              modalBtnContent2: {
                flexDirection: "row",
                // alignItems: "center",
                justifyContent: "space-between",
              },
              emailButton: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "40%",
                backgroundColor: "#198EA5",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              },
              emailButton1: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "40%",
                backgroundColor: "#198EA5",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
                marginHorizontal: 3
              },
              emailButton2: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "40%",
                backgroundColor: "#F8FCFB",
                borderColor: "#198EA5",
                borderWidth: 2,
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
                marginHorizontal: 3
              },
              emailButtonText: {
                color: "#198EA5",
                textAlign: "center",
                fontWeight: "bold",
              },
              emailButtonText2: {
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              },
              addObjectButton: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "40%",
                backgroundColor: "#198EA5",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
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
              ppIcon: {
                fontSize: 20,
                fontWeight: "bold",
                marginRight: 10,
              },
              camera: {
                flex: 1,
              },
              buttonsContainer: {
                flex: 0.1,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                paddingTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
              },
              button: {
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: 50,
              },
              snapContainer: {
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
                paddingBottom: 25,
              },
              desabonnerButton: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 160,
                backgroundColor: "#198EA5",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
                marginHorizontal: 15,
              },
              objectItem: {
                alignItems: 'center',
                marginRight: 14
              },
              choixCommuAddObjet : {
                height : '50%',
              },
                                            empruntItem: {
                                              // borderTopColor: "#198EA5",
                                              borderBottomColor: "#198EA5",
                                              // borderTopWidth: 0.25,
                                              borderBottomWidth: 0.25
                                            },
                                            empruntText: {
                                              textAlign: "center",
                                            }
            });
            
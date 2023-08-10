import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, StatusBar, TouchableOpacity, Image, ScrollView, StyleSheet, Text, View, TouchableNativeFeedback, Modal } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../Constants";
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/users';

export default function ConversationScreen() {

  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState("Prêt");
  const navigation = useNavigation();
  const [prets, setPret] = useState(null);
  const [emprunts,setEmprunt]= useState(null);
  const [isModalLogoutVisible, setModalLogoutVisible] = useState(false);

  //modal pour la fonction logout 
  const openModalLogout = () => {
    setModalLogoutVisible(true);
  };

  const closeModalLogout = () => {
    setModalLogoutVisible(false);
  };

   //fonction logout
   const handleLogout = () => {
    dispatch(logout());
  
    navigation.navigate('SignIn');
  };



  const handleChatRoomPress = (room) => {   
    navigation.navigate("ChatRoom", { transactionId: room._id, borrowerUser: room.borrowerUser, lenderUser: room.lenderUser, objectId: room.object._id, objectName: room.object.name, endDate: room.endDate });
  };

   // On recupère le token
   const token = useSelector((state) => state.users.token);
  
  useEffect(() => {
    if (!token) {
      console.log("error, user not found");
    } else {
      getTransactionsLender();
      getTransactionsBorrower();
    }
  }, [token]); 


  const getTransactionsLender = async () => {
    try {
      if (!token) {
        console.log('Utilisateur preteur non trouvé');
        return;
      }
  
      const response = await fetch(`${BACKEND_URL}/transactions/lender/${token}`)
  
      const transaction = await response.json();

      if (transaction.result) {
        console.log("Affichage des transactions prêts", transaction.rooms);
        setPret(transaction.rooms)
      } else {
        console.log('Erreur', transaction.error);
      }   
    } catch (error) {
      console.error('Erreur lors de affichage des prêts', error.message);
    }
  };


  const getTransactionsBorrower = async () => {
    try {
      if (!token) {
        console.log('Utilisateur preteur non trouvé');
        return;
      }
  
      const response = await fetch(`${BACKEND_URL}/transactions/borrower/${token}`)
  
      const transaction = await response.json();
      
      if (transaction.result) {
        console.log("Affichage des transactions emprunts", transaction.rooms);
        setEmprunt(transaction.rooms);
      } else {
        console.log('Erreur', transaction.error);
      }
    } catch (error) {
      console.error('Erreur lors de affichage des emprunts', error.message);
    }
  };

  

  return (
    <SafeAreaView style={styles.container}>
        {/*HEADER*/}
        <View style={styles.header}>
          <Text style={styles.title}>TOUTENKOMMUN</Text>
          <FontAwesome style={styles.userIcon} name="power-off" onPress={openModalLogout} />
        </View>

      {/* "Messages" Title */}
      <View style={styles.message}>
        <Text style={styles.conversationTitle}>Messages</Text>
      </View>

      {/* Barre de navigation entre Prêt et Emprunt */}
      <View style={styles.rowMenu}>
  <TouchableOpacity onPress={() => setSelectedTab("Prêt")}>
    <View
      style={[
        styles.iconTextContainer,
        selectedTab === "Prêt" && styles.selectedTab,
      ]}
    >
      <FontAwesome5
        name="tools"
        size={20}
        color={selectedTab === "Prêt" ? "#198EA5" : "#198EA5"}
        style={styles.listIcon}
      />
      <Text
        style={[
          styles.iconText,
          selectedTab === "Prêt" && styles.selectedTabText,
        ]}
      >
        Prêts
      </Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setSelectedTab("Emprunt")}>
    <View
      style={[
        styles.iconTextContainer,
        selectedTab === "Emprunt" && styles.selectedTab,
      ]}
    >
      <FontAwesome5
        name="book-open"
        size={20}
        color={selectedTab === "Emprunt" ? "#198EA5" : "#198EA5"}
        style={styles.mapIcon}
      />
      <Text
        style={[
          styles.iconText,
          selectedTab === "Emprunt" && styles.selectedTabText,
        ]}
      >
        Emprunts
      </Text>
    </View>
  </TouchableOpacity>
</View>

      {/* Liste des Prêts ou Emprunts */}
      <ScrollView>
  {selectedTab === "Prêt"
    ? prets && prets.map((room) => (
        [
          <TouchableOpacity
            key={room._id}
            style={styles.itemContainer}
            onPress={() => handleChatRoomPress(room)}
          >
            <View>
            {
              room.object.photo ?
                <Image source={{ uri: room.object.photo }} style={styles.photoMsg}/>
                  :
                <FontAwesome name='image' size={70} style={styles.avatarMsg}/>
            }
            </View>
            <View style={styles.info}>
              <Text style={styles.listTitle}>{room.borrowerUser.username}</Text>
              <Text style={styles.object}>{room.object.name}</Text>
              <Text style={styles.empruntText}>
                                    Statut:
                                    {room.isFinished ? 
                                  <Text style={[styles.empruntText, { color: '#198EA5' }, { fontWeight: 'bold' }]}> Terminé</Text>
                                  : 
                                  <Text style={[styles.empruntText, { color: '#CE8D2C' }, { fontWeight: 'bold' }]}> En cours</Text>
                                  }
                </Text>
            </View>
            <View style={styles.flecheMsg}>
              <FontAwesome name='angle-right' size={30} color={'#198EA5'}/>
            </View>
          </TouchableOpacity>,
          // Separator
          <View style={styles.separator} key={`separator-${room._id}`} />,
        ]
      ))
    : emprunts && emprunts.map((room) => (
        [
          <TouchableOpacity
            key={room._id}
            style={styles.itemContainer}
            onPress={() => handleChatRoomPress(room)}
          >
            <View>
            {
              room.object.photo ?
                <Image source={{ uri: room.object.photo }} style={styles.photoMsg}/>
                  :
                <FontAwesome name='image' size={70} style={styles.avatarMsg} />
            }
            </View>
            <View style={styles.info}>
              <Text style={styles.listTitle}>{room.lenderUser.username}</Text>
              <Text style={styles.object}>{room.object.name}</Text>
              <Text style={styles.empruntText}>
                                    Statut:
                                    {room.isFinished ? 
                                  <Text style={[styles.empruntText, { color: '#198EA5' }, { fontWeight: 'bold' }]}> Terminé</Text>
                                  : 
                                  <Text style={[styles.empruntText, { color: '#CE8D2C' }, { fontWeight: 'bold' }]}> En cours</Text>
                                  }</Text>
            </View>
            <View style={styles.flecheMsg}>
              <FontAwesome name='angle-right' size={30} color={'#198EA5'}/>
            </View>
          </TouchableOpacity>,
          // Separator
          <View style={styles.separator} key={`separator-${room._id}`} />,
        ]
      ))}

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

</ScrollView>




  
    </SafeAreaView>
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
  conversationTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#353639",
  },
  rowMenu: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "10%",
    backgroundColor: "#F8FCFB",
    borderBottomWidth: 1,
    borderBottomColor : "#198EA5"
  },
  selectedTab: {
    borderBottomColor: "#198EA5",
    borderBottomWidth: 2,
  },
  selectedTabText: {
    color: "#198EA5",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor : "#198EA5"
  },
  photoIcon: {
    marginRight: 10,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#198EA5",
  },
  object: {
    fontWeight: "bold",
    color: "#353639",
  },
  itemDescription: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  modalBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
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
  ppIcon: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  smsButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#198EA5",
    marginLeft: 3,
  },
  listIcon: {
    marginRight: 10,
  },
  mapIcon: {
    marginRight: 10,
  },
  message: {
    width: "100%",
    height: "10%",
    backgroundColor: "#F8FCFB",
    justifyContent: "center",
    alignItems: "center",
  },
  photoMsg: {
    height: 70,
    width: 70,
    margin: 10,
    borderWidth: 2,
    borderColor: "#198EA5",
  },
  avatarMsg: {
    margin: 10,
    color: "#198EA5",
  },
  empruntText: {
    textAlign: "center",
  },
  info: {
    width: 200,
    alignItems: 'flex-start'
  },
  flecheMsg: {
  alignItems: 'flex-end',
  width: 90
  }
});
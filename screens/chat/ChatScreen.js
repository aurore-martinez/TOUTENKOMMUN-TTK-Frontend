import React, { useState} from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/users";
import { BACKEND_URL } from "../../Constants";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';






export default function ChatScreen({ navigation, route }) {





  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("SignIn");
  };
  // modal quand j'appuie sur je rends l'objet
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  //modal pour la fonction logout 
  const openModalLogout = () => {
    setModalLogoutVisible(true);
  };

  const closeModalLogout = () => {
    setModalLogoutVisible(false);
  };

  // Exemple de messages de chat
  const chatMessages = [
    { user: "Laurent", text: "Hey tu peux me prêter ton T-MAX ?" },
    { user: "Charlène", text: "Pas de soucis ! " },
  ];

  // Fonction pour afficher les messages de chat
  const renderChatMessages = () => {
    return chatMessages.map((message, index) => (
      <View
        key={index}
        style={[
          styles.chatMessage,
          message.user === "Charlène"
            ? styles.rightChatMessage
            : styles.leftChatMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.user === "Charlène" ? styles.blackText : null,
          ]}
        >{`${message.user}: ${message.text}`}</Text>
      </View>
    ));
  };

  console.log('token', token)
  console.log('transactionId',route.params.transactionId);
  console.log('objectId',route.params.objectId);
  console.log('lenderId',route.params.lenderUser._id);  

  const handleReturnObject = async () => {
    try {
      if ( !route.params.objectId) {
        console.log('Utilisateur preteur ou objet non trouvé');
        return;
      }
      if (!route.params.lenderUser._id) {
        console.log('Utilisateur preteur non trouvé');
        return;
      }
  
      const response = await fetch(`${BACKEND_URL}/transactions/return/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objectId : route.params.objectId, transactionId : route.params.transactionId })
      });
  
      const transaction = await response.json();
      if (transaction) {
        console.log("Objet rendu avec succès !! :D", transaction);
      } else {
        console.log('Erreur', transaction.error);
      }
    } catch (error) {
      console.error('Erreur lors du retour objet', error.message);
    }
  };
  

  // État et fonction pour la saisie de message
  const [message, setMessage] = useState("");

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      console.log(`Envoi du message : ${message}`);
      setMessage("");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <FontAwesome
        style={styles.backIcon}
        name="chevron-left"
        onPress={handleGoBack}
        />
        <Text style={styles.title}>TOUTENKOMMUN</Text>
        <FontAwesome
        style={styles.userIcon}
        name="power-off"
        onPress={openModalLogout}
      />
    </View>

      {/* Conteneur de discussion */}
      <View style={styles.chatContainer}>
        {/* Contenu gauche */}
        <View style={styles.leftContent}>
          <FontAwesome style={styles.userIconX} name="user" />
          <Text style={styles.emprunteurText}>
            Emprunteur : <Text style={styles.goldText}>Laurent</Text>, jusqu'au
            : <Text style={styles.goldText}>XX/XX/XX</Text>
          </Text>
        </View>
        {/* Contenu droite */}
        <View style={styles.rightContent}>
          <FontAwesome style={styles.userIconX} name="user" />
          <Text>
            Appartient à : <Text style={styles.goldText}>Charlène</Text>
          </Text>
          <Text>Prêt du T-MAX </Text>
        </View>
      </View>

      {/* Titre de la conversation */}
      <Text style={styles.conversationTitle}>Conversation</Text>

      {/* Messages de chat */}
      <ScrollView style={styles.chatMessagesContainer}>
        {renderChatMessages()}
      </ScrollView>

      {/* Bouton pour rendre l'objet */}
      <View style={styles.btnRenderContent}>
        <TouchableOpacity style={styles.btnRender} onPress={openModal}>
          <Text style={styles.btnTextCreate}>Je rends l'objet</Text>
        </TouchableOpacity>
      </View>

      {/* Saisie de message */}
      <View style={styles.messageInputContainer}>
  <TextInput
    style={styles.messageInput}
    placeholder="Écrire un message..."
    placeholderTextColor="black"
    value={message}
    onChangeText={handleMessageChange}
  />
  <TouchableOpacity style={styles.sendButton}>
    <FontAwesome name="arrow-up" size={13} color="white" />
  </TouchableOpacity>
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
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Récapitulatif</Text>
            <Text style={styles.modalText}>Emprunteur:[USERNAME] </Text>
            <Text style={styles.modalText}>
              L'objet emprunté :{" "}
              <FontAwesome name="thumbs-up" size={20} color="black" />{" "}
            </Text>
            <Text style={styles.modalText}>Date de rendu : XX/XX/20XX</Text>

            <Text style={styles.modalText}>
              Êtes-vous sûr de vouloir rendre l'objet ?
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {


                handleReturnObject();
                closeModal();

                navigation.navigate("Prêt");
              }}
            >
              <Text style={styles.userxIcon}>
                <FontAwesome name="thumbs-up" size={20} color="white" />{" "}
                <Text style={styles.modalButtonText}>
                  Confirmer le retour de l'objet
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Barre d'état */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F8FCFB",
    // Add shadow properties here
    shadowColor: "#171717",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  chatContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#EEFCFF",
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 3,
    borderColor: "#198EA5",
  
  },
  leftContent: {
    flex: 1,
    marginRight: 10,
  },
  rightContent: {
    flex: 1,
    alignItems: "flex-end"
  },
  userIconX: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  createContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnRenderContent: {
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    marginTop:100,
  },
  btnRender: {
    flexDirection: "row",
    height: "50%",
    width: "87%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#198EA5",
    borderColor: "#198EA5",
    borderWidth: 2,
    borderRadius: 10,
  },
  btnTextCreate: {
    color: "#FFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  chatMessagesContainer: {
    flex: 1,
    marginTop: 10,
    padding: 10,
  },
  chatMessage: {
    padding: 8,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "70%", // ajustez selon vos préférences
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#DDD",
    marginTop: 10,
  },
  messageInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#198EA5",
    borderRadius: 45, // Changer la valeur pour un look plus ou moins arrondi
    padding: 15,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  chatMessage: {
    padding: 8,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "70%", // ajustez selon vos préférences
  },
  leftChatMessage: {
    backgroundColor: "#126171",
    alignSelf: "flex-start",
  },
  rightChatMessage: {
    backgroundColor: "#EEFCFF",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  blackText: {
    color: "black",
  },
  conversationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#198EA5",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  smsButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  modalLogoutContent: {
    backgroundColor: "#F8FCFB",
    padding: 20,
    borderRadius: 10,
    marginLeft: 25,
    marginRight: 25,
    alignItems: "center",
    justifyContent: "center",
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
  emprunteurText: {
    color: "black",
  },

  goldText: {
    color: "#CE8D2C",
  },
  backIcon: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', 
  }
});

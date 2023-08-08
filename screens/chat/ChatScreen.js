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





export default function ChatScreen({ navigation }) {
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const objectId = useSelector((state) => state.users.objectId);
  const transactionId= useSelector((state) => state.users.transactionId);

  

  const handleLogout = () => {
    setEmail("");
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

    navigation.navigate("SignIn");
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  
  const openModalLogout = () => {
    setModalLogoutVisible(true);
  };

  const closeModalLogout = () => {
    setModalLogoutVisible(false);
  };

  // Exemple de messages de chat
  const chatMessages = [
    { user: "Laurent", text: "Wesh ma moula , prête ton T-MAX ?" },
    { user: "Charlène", text: "Vasy frèro ! " },
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

  const returnObject = async (token, objectId, transactionId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/return/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          objectId: ({ _id: object._id }),
          transactionId: ({ _id: transaction._id }),
          token:token
        }),
      });
  
      const data = await response.json();
  
      if (data.message) {

    
        console.log("Backend response:", { message: "Objet rendu avec succès !! :D" });
        res.json({ message: "Objet rendu avec succès !! :D" });
        console.log("Erreur lors du retour de l'objet :", data.error);
      }
    } catch (error) {
      console.log("Erreur :", error.message);
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

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
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
      <View style={styles.btnCreateContent}>
        <TouchableOpacity style={styles.btnCreate} onPress={openModal}>
          <Text style={styles.btnTextCreate}>Je rends l'objet</Text>
        </TouchableOpacity>
      </View>

      {/* Saisie de message */}
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Écrire un message..."
          value={message}
          onChangeText={handleMessageChange}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </KeyboardAvoidingView>
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
                console.log("token:", token);
                console.log("objectId:", objectId);
                console.log("transactionId:", transactionId);
                returnObject(token, objectId, transactionId);
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
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 4,
    borderColor: "#198EA5",
  },
  leftContent: {
    flex: 1,
    marginRight: 10,
  },
  rightContent: {
    flex: 1,
    alignItems: "flex-end",
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
  btnCreateContent: {
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnCreate: {
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
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#ECECEC",
    borderRadius: 5,
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
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  chatMessage: {
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#126171",
  },
  leftChatMessage: {
    backgroundColor: "#126171",
    marginLeft: 10,
    marginRight: "auto",
  },
  rightChatMessage: {
    backgroundColor: "#EEFCFF",
    marginRight: 10,
    marginLeft: "auto",
    alignSelf: "flex-end",
  },
  messageText: {
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
});

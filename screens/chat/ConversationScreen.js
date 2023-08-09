import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, StatusBar, TouchableOpacity, Image, ScrollView, StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../Constants";

export default function ConversationScreen() {
  const [selectedTab, setSelectedTab] = useState("Prêt");
  const navigation = useNavigation();
  const [prets, setPret] = useState(null);
  const [emprunts,setEmprunt]= useState(null);


  const handleChatRoomPress = (room) => {
   
    navigation.navigate("ChatRoom", { transactionId: room._id, borrowerUser: room.borrowerUser, lenderUser: room.lenderUser, objectId: room.object._id });
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
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>TOUTENKOMMUN</Text>
        <FontAwesome style={styles.userIcon} name="power-off" />
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
        Prêt
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
        Emprunt
      </Text>
    </View>
  </TouchableOpacity>
</View>

      {/* Barre de séparation */}
      <View style={styles.separator} />

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
            {/* ... */}
            {
              room.object.photo ?
                <Image source={{ uri: room.object.photo }} style={{ width: 100, height: 100 }} resizeMode="contain" />
                  :
                <FontAwesome name='image' size={100} />
            }
            <Text style={styles.listTitle}>{room.borrowerUser.username}</Text>
            <Text style={styles.object}>{room.object.name}</Text>
            {/* ... */}
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
            {/* ... */}
            {
              room.object.photo ?
                <Image source={{ uri: room.object.photo }} style={{ width: 100, height: 100 }} resizeMode="contain" />
                  :
                <FontAwesome name='image' size={100} />
            }
            <Text style={styles.listTitle}>{room.lenderUser.username}</Text>
            <Text style={styles.object}>{room.object.name}</Text>
            {/* ... */}
          </TouchableOpacity>,
          // Separator
          <View style={styles.separator} key={`separator-${room._id}`} />,
        ]
      ))}
</ScrollView>




  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  rowMenu: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "10%",
    backgroundColor: "#F8FCFB",
  },
  selectedTab: {
    borderBottomColor: "#198EA5",
    borderBottomWidth: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "black",
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: "#FFF", // Add a background color to make the items more distinct
    borderRadius: 10, // Add a border radius for a rounded look
    marginBottom: 10, // Add some margin between items
  },
  photoIcon: {
    marginRight: 10,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
});
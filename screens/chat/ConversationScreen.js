import React, { useState } from "react";
import { Platform, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";

export default function ConversationScreen() {
  const [selectedTab, setSelectedTab] = useState("Prêt");
  const navigation = useNavigation();

  const dataPrets = [
    { id: "1", title: "Marteau", description: "Tu veux mon marteau ? " },
    { id: "2", title: "Scie", description: "Oublie pas ma scie" },
    { id: "3", title: "T-MAX", description: "Gros  T-MAX" },
  ];

  const dataEmprunts = [
    { id: "1", title: "MAILLOT", description: "Description du maillot" },
    { id: "2", title: "Bouteille", description: "Description de la bouteille" },
    { id: "3", title: "Tasse", description: "Description de la tasse" },
  ];
  const handleChatRoomPress = (item) => {
    navigation.navigate("ChatRoom", { itemId: item.id, itemTitle: item.title });
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
    ? dataPrets.map((item) => (
        [
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => handleChatRoomPress(item)}
          >
            <FontAwesome
              name="photo"
              size={24}
              color="#198EA5"
              style={styles.photoIcon}
            />
            <View style={styles.textContainer}>
              <Text style={styles.listTitle}>{item.title}</Text>
              {item.description && (
                <Text style={styles.itemDescription}>{item.description}</Text>
              )}
            </View>
          </TouchableOpacity>,
          // Separator
          <View style={styles.separator} key={`separator-${item.id}`} />,
        ]
      ))
    : dataEmprunts.map((item) => (
        [
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => handleChatRoomPress(item)}
          >
            <FontAwesome
              name="photo"
              size={24}
              color="#198EA5"
              style={styles.photoIcon}
            />
            <View style={styles.textContainer}>
              <Text style={styles.listTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>,
          // Separator
          <View style={styles.separator} key={`separator-${item.id}`} />,
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
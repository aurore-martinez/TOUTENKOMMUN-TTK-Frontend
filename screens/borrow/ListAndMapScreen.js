import React, { useState, useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

BACKEND_URL = "http://192.168.10.147:3000";

// Données de test pour la liste
const mockData = [
  {
    id: "1",
    title: "Martin",
    icon: "key",
    description: "Je prête ma scie les amis!",
  },
  {
    id: "2",
    title: "Kapi",
    icon: "key",
    description: "Je prête mon marteau les amis!",
  },
];

// Composant principal
export default function ListAndMapScreen({ route, navigation }) {
  // États pour gérer l'onglet sélectionné, la localisation, l'élément sélectionné et la modal
  const [selectedTab, setSelectedTab] = useState("Liste");
  const [location, setLocation] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemInfo, setSelectedItemInfo] = useState(null);
  const [mapObjects, setMapObjects] = useState([]);
  const [borrowText, setBorrowText] = useState(""); // State to manage the borrowed text
  const [isBorrowModalVisible, setIsBorrowModalVisible] = useState(false); // State to manage modal visibility
  const [isDiscussionModalVisible, setIsDiscussionModalVisible] = useState(false); 

  // Effet pour demander et surveiller les autorisations de localisation
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        // Localisation de la position
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setLocation(location);
        });
      }
    })();
  }, []);

  // Gère la sélection d'un élément de la liste
  const handleItemPress = async (item) => {
    setSelectedItem(item === selectedItem ? null : item);
    setSelectedItemInfo(item === selectedItemInfo ? null : item);
    setIsModalVisible(true);

    // Récupère les objets pour la carte
    const mapResults = await fetchSearchResults(item);
    setMapObjects(mapResults);
  };

  // Fonction pour effectuer la requête fetch
  const fetchSearchResults = async (item) => {
    try {
      const response = await fetch(`${BACKEND_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: userToken,
          name: item.title,
          communitiesId: ["communityId1", "communityId2"],
        }),
      });

      const data = await response.json();

      if (data.result) {
        console.log("Résultat de la recherche:", data.searchresult);
        return data.searchresult; // Retourne les objets pour la carte
      } else {
        console.log("Erreur de recherche:", data.error);
        return []; // Retourne un tableau vide en cas d'erreur
      }
    } catch (error) {
      console.log("Erreur:", error.message);
      return []; // Retourne un tableau vide en cas d'erreur
    }
  };
  const handleBorrowButtonPress = () => {
    setIsBorrowModalVisible(true);
  };
  const handleDiscussionModalVisible = () => {
    setisDiscussionModalVisible(true);
  };

  // Rendu du composant
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>TOUTENKOMMUN</Text>
          <FontAwesome
            style={styles.userIcon}
            name="user"
            size={20}
            color="white"
          />
        </View>
        <StatusBar style="auto" />

        {/* Section de recherche */}
        <View style={styles.contentTop}>
          <Text style={styles.titleh}>
            Fil d'actualité de
            <Text style={styles.titleh1}> [ma communauté]</Text>
          </Text>
          <View style={styles.rowSearch}>
            <TouchableOpacity activeOpacity={0.8}>
              <View style={styles.row}>
                <FontAwesome
                  name="search"
                  size={20}
                  color="#198EA5"
                  style={styles.iconSearch}
                />
                <TextInput
                  placeholder="Je recherche..."
                  autoCapitalize="none"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8}>
              <View style={styles.filter}>
                <FontAwesome
                  name="sliders"
                  size={20}
                  color="#EEFCFF"
                  style={styles.iconFilter}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Barre de navigation entre Liste et Carte */}
        <View style={styles.rowMenu}>
          <TouchableOpacity onPress={() => setSelectedTab("Liste")}>
            <View
              style={[
                styles.iconTextContainer,
                selectedTab === "Liste" && styles.selectedTab,
              ]}
            >
              <FontAwesome
                style={styles.listIcon}
                name="list"
                size={20}
                color={selectedTab === "Liste" ? "#198EA5" : "#198EA5"}
              />
              <Text
                style={[
                  styles.iconText,
                  selectedTab === "Liste" && styles.selectedTabText,
                ]}
              >
                Liste
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab("Carte")}>
            <View
              style={[
                styles.iconTextContainer,
                selectedTab === "Carte" && styles.selectedTab,
              ]}
            >
              <FontAwesome
                style={styles.mapIcon}
                name="map"
                size={20}
                color={selectedTab === "Carte" ? "#198EA5" : "#198EA5"}
              />
              <Text
                style={[
                  styles.iconText,
                  selectedTab === "Carte" && styles.selectedTabText,
                ]}
              >
                Carte
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Contenu principal */}
        <View style={styles.contentList}>
          {selectedTab === "Liste" ? (
            // Liste des éléments
            <ScrollView>
              {mockData.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.listItem,
                    selectedItem === item && styles.selectedItem,
                  ]}
                  onPress={() => handleItemPress(item)}
                >
                  <FontAwesome
                    name={item.icon}
                    size={20}
                    color="black"
                    style={styles.iconFilter}
                  />
                  <Text style={styles.itemTitle}>
                    {item.title}{" "}
                    {item.title === "Martin"
                      ? "prête une scie"
                      : item.title === "Kapi"
                      ? "prête un marteau"
                      : ""}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            // Carte avec localisation
            <View style={styles.mapContainer}>
              {selectedTab === "Carte" && location && (
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: location?.coords?.latitude || 37.78825,
                    longitude: location?.coords?.longitude || -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  {mapObjects.map((mapObj) => (
                    <Marker
                      key={mapObj.id}
                      coordinate={{
                        latitude: mapObj.latitude,
                        longitude: mapObj.longitude,
                      }}
                      title={mapObj.title}
                    />
                  ))}
                </MapView>
              )}
            </View>
          )}
        </View>

        {/* Modal pour afficher les détails de l'élément sélectionné */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setIsModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            {selectedItemInfo && (
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedItemInfo.title}</Text>
                <Text>{selectedItemInfo.description}</Text>
                <TouchableOpacity
                  onPress={handleBorrowButtonPress}
                  style={styles.emprunterButton}
                >
                  <FontAwesome
                    name="check"
                    size={20}
                    color="white"
                    style={styles.iconEmprunter}
                  />
                  <Text style={styles.emprunterButtonText}>Emprunter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                  }}
                  style={styles.modalCloseButton}
                >
                  <Text style={styles.modalCloseButtonText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Borrow Modal */}
            <Modal
  animationType="slide"
  transparent={true}
  visible={isBorrowModalVisible}
  onRequestClose={() => {
    setIsBorrowModalVisible(false);
  }}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Veux tu emprunter ? </Text>
      <View style={styles.iconContainer}>
     
        <FontAwesome  style={styles.iconX} name="camera" size={50} color="#198EA5" />
      </View>
      <View style={styles.modalButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsBorrowModalVisible(false);
            setIsDiscussionModalVisible(true)
          }}
          style={[styles.modalButton, styles.cancelButton]}
        >
          <Text style={styles.modalButtonText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {

            console.log("Borrow text:", borrowText);
            setIsBorrowModalVisible(false);
          }}
          style={[styles.modalButton, styles.confirmButton]}
        >
          <Text style={styles.modalButtonText}>Oui</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
<Modal
  animationType="slide"
  transparent={true}
  visible={isDiscussionModalVisible}
  onRequestClose={() => {
    setIsDiscussionModalVisible(false);
  }}
>
  <View style={[styles.modalContainer, styles.modalDiscussionContainer]}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Discussion</Text>
      <Text>Contenu de la discussion...</Text>
      <TouchableOpacity
        onPress={() => {
          setIsDiscussionModalVisible(false);
        }}
        style={styles.modalCloseButton}
      >
        <Text style={styles.modalCloseButtonText}>Fermer</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    height: "10%",
    backgroundColor: "#198EA5",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  titleh: {
    fontSize: 20,
    fontWeight: "600",
    color: "#353639",
  },
  titleh1: {
    fontSize: 20,
    fontWeight: "600",
    color: "#198EA5",
  },
  userIcon: {
    padding: 10,
  },
  contentTop: {
    width: "100%",
    height: "20%",
    backgroundColor: "#F8FCFB",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 250,
    height: 50,
    backgroundColor: "#F8FCFB",
    borderColor: "#198EA5",
    borderWidth: 2,
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: "5%",
    marginVertical: 12,
  },
  contentList: {
    width: "100%",
    height: "60%",
    backgroundColor: "#F8FCFB",
    borderTopWidth: 1,
  },
  rowMenu: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "10%",
    backgroundColor: "#F8FCFB",
  },
  filter: {
    borderRadius: 25,
    width: 50,
    height: 50,
    paddingLeft: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#198EA5",
    marginRight: "5%",
    marginBottom: "3%",
  },
  rowSearch: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#198EA5",
    marginLeft: 5,
  },
  map: {
    flex: 1,
  },
  selectedTab: {
    borderBottomColor: "#198EA5",
    borderBottomWidth: 2,
  },
  selectedTabText: {
    color: "#198EA5",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  iconFilter: {
    marginRight: 10,
  },
  listIcon: {
    marginRight: 10,
  },
  mapIcon: {
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginLeft: 10,
  },
  selectedItem: {
    backgroundColor: "#EEFCFF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#F8FCFB",
    padding: 70, 
    borderRadius: 10,
    marginLeft: 50, 
    marginRight: 50, 
    marginTop: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 60,
  },
  modalCloseButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    color: "#198EA5",
    fontWeight: "bold",
  },
  borrowButton: {
    backgroundColor: "#198EA5",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  emprunterButton: {
    backgroundColor: "#198EA5",
    borderRadius: 10,
    padding: 10,
  },
  emprunterButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  iconEmprunter: {
    margin: 5,
    marginLeft: 0,
  },
  mapContainer: {
    flex: 1
  },borrowTextInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "#198EA5",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  iconX:{
    textAlign: "center",

  },
  modalDiscussionContainer: {
    justifyContent: "flex-start",
    marginTop: 10, 
  },


});

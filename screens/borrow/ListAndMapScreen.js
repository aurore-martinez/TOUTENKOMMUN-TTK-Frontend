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
	ActivityIndicator,
	Dimensions,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { BACKEND_URL } from "../../Constants";
import { useSelector } from "react-redux";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/users';
import Global, { Colors, ttkFont } from "../../styles/Global";

export default function ListAndMapScreen({ route, navigation }) {
  const dispatch = useDispatch();

	// États pour gérer l'onglet sélectionné, la localisation, l'élément sélectionné et la modal
	const [selectedTab, setSelectedTab] = useState("Liste");
	const [location, setLocation] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedItemInfo, setSelectedItemInfo] = useState(null);
	const [mapObjects, setMapObjects] = useState([]);
	// const [isBorrowModalVisible, setIsBorrowModalVisible] = useState(false); // State to manage modal visibility
	const [data, setData] = useState([]);
  const [isModalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

	const [searchLoading, setSearchLoading] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const [modalFilterVisible, setModalFilterVisible] = useState(false);
	const [userCommunities, setUserCommunities] = useState([]);

	const token = useSelector((state) => state.users.token);

  const [user, setUser] = useState(null);

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

    (async () => {
      const response = await fetch(`${BACKEND_URL}/users/profil/${token}`);
      const userData = await response.json();
      if (userData.result) {
        setUser({ username: userData.username, address: userData.address[0] });
      }
    })();

		// Récupération des communautés de User
		(async () => {
			const response = await fetch(`${BACKEND_URL}/communities/${token}`);
			let userData = await response.json();
			userData = userData.communities.map(commu => { return { ...commu, selected: true }; });
			setUserCommunities(userData);
		})();
	}, []);

	useEffect(() => {
		if (!searchTerm || searchTerm === "") {
			setSearchResults(null);
			fetchFeed();
		}
	}, [searchTerm]);

	// Gère la sélection d'un élément de la liste
	const handleItemPress = async (item) => {
		setSelectedItem(item === selectedItem ? null : item);
		setSelectedItemInfo(item === selectedItemInfo ? null : item);
		setIsModalVisible(true);
	};

	const fetchFeed = async () => {
		try {
			const response = await fetch(`${BACKEND_URL}/communities/feed/${token}`);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			const mapMarkersData = data.items.map((item) => ({
				title: item.name,
				latitude: item.owner.address.latitude,
				longitude: item.owner.address.longitude,
				distance: item.distance,
			}));
			setMapObjects(mapMarkersData);
			setData(data.items);
		} catch (error) {
			console.error("Une erreur s'est produite:", error);
		}
	};

	const fetchSearchResults = async (item) => {
		try {
			setSearchLoading(true);

			const response = await fetch(`${BACKEND_URL}/search`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: token,
					name: item,
					communitiesId: userCommunities.filter(commu => commu.selected).map(commu => commu._id)
				}),
			});

			const data = await response.json();

			if (data.result) {
				const mapMarkersData = data.searchresult.map((item) => ({
					title: item.name,
					latitude: item.owner.address.latitude,
					longitude: item.owner.address.longitude,
					distance: item.distance,
				}));

				setMapObjects(mapMarkersData);
				setSearchResults(data.searchresult);
			} else {
				console.log("Erreur de recherche :", data.error);
				setSearchResults([]);
			}
		} catch (error) {
			console.log("Erreur :", error.message);
			setSearchResults([]);
		} finally {
			setSearchLoading(false);
		}
	};

	/**
	 * Fonction pour emprunter un objet
	 */
	const handleBorrow = async () => {
		const response = await fetch(`${BACKEND_URL}/transactions/borrow/${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ _id: selectedItemInfo._id, endDate: selectedDate })
		});

		const data = await response.json();

		if (response.ok) {
      setSearchTerm("");
      fetchFeed();
		} else {
			console.log(data.error);
		} 
	};

	const filterSelectedCommu = (indice) => {
		const filtered = userCommunities.map((commu, i) => {
			if (i === indice) {
				let obj = { ...commu };
				obj['selected'] = !commu['selected'];
				return obj;
			}
			else { return commu; }
		});

		setUserCommunities(filtered);
	};

  const showAndroidDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (event, date) => {
        if (date !== undefined) {
          setSelectedDate(date);
        }
      },
      mode: "date",
      format: "DD-MM-YYYY",
      minimumDate: new Date()
    });
  };

  // SearchRes sera défini qu'après l'initialisation du composant
  const searchRes = searchResults && searchResults.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.listItem,
        selectedItem === item && styles.selectedItem,
      ]}
      onPress={() => handleItemPress(item)}
    >
    <View style={styles.allObjectContent}>  
      <View style={styles.photoEdit}>
        {item.photo ? (
        <Image source={{ uri: item.photo }} style={styles.photos} />
        ) : (
        <FontAwesome name="image" size={100} color="#198EA5" />
        )}
      </View>
      <View style={styles.descriptionObjectList}>
        <View style={styles.textObjet}>
        <Text style={styles.itemTitleObj}>{item.name}</Text>
        <Text style={styles.username}>{item.owner.username}</Text>
        </View>
        <View style={styles.dispoObjet}>
        {item.isAvailable && (
        <Text style={styles.dispoText}>Disponible !</Text>
        )}
        {item.distance && (
        <Text style={styles.distanceText}>
          {item.distance} km
        </Text>
        )}
        <Text>Communauté(s) : {item.availableIn.map(e => e.nameCommu).join(', ')}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  ));

  const feedRes = data.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.listItem,
        selectedItem === item && styles.selectedItem,
      ]}
      onPress={() => handleItemPress(item)}
    >
    <View style={styles.allObjectContent}>  
      <View style={styles.photoEdit}>
        {item.photo ? (
        <Image source={{ uri: item.photo }} style={styles.photos} />
        ) : (
        <FontAwesome name="image" size={100} color="#198EA5" />
        )}
      </View>
      <View style={styles.descriptionObjectList}>
        <View style={styles.textObjet}>
        <Text style={styles.itemTitleObj}>{item.name}</Text>
        <Text style={styles.username}>{item.owner.username}</Text>
        </View>
        <View style={styles.dispoObjet}>
        {item.isAvailable && (
        <Text style={styles.dispoText}>Disponible !</Text>
        )}
        {item.distance && (
        <Text style={styles.distanceText}>
          {item.distance} km
        </Text>
        )}
        <Text>Communautés : {item.availableIn.map(e => e.nameCommu).join(', ')}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  ));

  const openModalLogout = () => {
    setModalLogoutVisible(true)
  }

  const closeModalLogout = () => {
    setModalLogoutVisible(false)
  }

   //fonction logout
   const handleLogout = () => {
      dispatch(logout());
    
      navigation.navigate('SignIn');
    };

  // Rendu du composant
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/*HEADER*/}
        <View style={styles.header}>
          <Text style={styles.title}>TOUTENKOMMUN</Text>
          <FontAwesome style={styles.userIcon} name="power-off" onPress={openModalLogout} />
        </View>

        <View style={styles.pageContent}>

        {/* Section de recherche */}
        <View style={styles.contentTop}>
          <Text style={styles.titleh}>
            Fil d'actualité de mes communautés
          </Text>
        </View> 
          <View style={styles.rowSearch}>
            <View style={styles.row}>
              <FontAwesome
                name="search"
                size={20}
                color="#198EA5"
                style={styles.iconSearchInput}
              />
              <TextInput
                placeholder="Je recherche..."
                autoCapitalize="none"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>
            <View style={styles.buttons}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (searchTerm) { fetchSearchResults(searchTerm); }
              }}
            >
              <View style={styles.filter}>
              <FontAwesome
                  name="search"
                  size={20}
                  color="#EEFCFF"
                  style={styles.iconFilter}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalFilterVisible(true)}>
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
							{/* Loading spinner pendant le chargement de la recherche */}
							<ActivityIndicator animating={searchLoading} size="large" color="#198EA5" />

							{/* Affichage du résultat de la recherche */}
							{selectedTab === "Liste" && searchRes ? searchRes : undefined}

							{/* Affichge du feed de base */}
							{selectedTab === "Liste" && !searchRes ? feedRes : undefined}
						</ScrollView>
					) : (
						// Carte avec localisation
						<View style={styles.mapContainer}>
							{selectedTab === "Carte" && location && user && (
								<MapView
									style={styles.map}
									initialRegion={{
										latitude: location?.coords?.latitude || 37.78825,
										longitude: location?.coords?.longitude || -122.4324,
										latitudeDelta: 0.8,
										longitudeDelta: 0.8,
									}}
								>

                  <Marker coordinate={{ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }} title="Votre position" pinColor="gold" />
                  <Marker coordinate={{ latitude: user.address.latitude, longitude: user.address.longitude }} title={user.username} pinColor="green" />

									{mapObjects.map((mapObj, i) => {
										// Corrected variable name
										console.log("Marker:", mapObj);
										return (
											<Marker
												key={i}
												coordinate={{
													latitude: mapObj.latitude,
													longitude: mapObj.longitude,
												}}
												title={mapObj.title}
												description={`Distance: ${mapObj.distance} km`}
											/>
										);
									})}
								</MapView>
							)}
						</View>
					)}
				</View>
      </View>

        {/* Modal emprunt */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setIsModalVisible(false);
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => {
              setIsModalVisible(false)
              setSelectedDate(new Date());
            }}  style={styles.modalContainer}>
            {selectedItemInfo && (
              <View style={styles.modalContent}>
                <View style={styles.modalTitle}>
                  <Text style={styles.modalJemprunteTextTitle}>Veux-tu confirmer l'emprunt ?</Text>
                </View>          
                <View style={styles.objectDescriptionModal}>
                    {selectedItemInfo.photo ? (
                    <Image source={{ uri: selectedItemInfo.photo }} style={styles.photoModal} />
                    ) : (
                    <FontAwesome name="image" size={70} color="#198EA5" />
                    )}
                  <View>
                    <Text style={styles.modalTitleObject}>{selectedItemInfo.name}</Text>
                    <Text style={styles.modalTitleText}>Prêteur : "{selectedItemInfo.owner.username}"</Text>
                  </View>
                </View>
                <View style={styles.modalJemprunteTitle}>
                  <Text style={styles.modalJemprunteTextTitle}>Jusqu'au :</Text>
                </View>
                <View style={styles.datePickerContainer}>
                  {Platform.OS === 'ios' && (
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      format="DD-MM-YYYY"
                      minimumDate={new Date()}
                      onChange={(event, date) => {
                        if (date !== undefined) {
                          setSelectedDate(date);
                        }
                      }}
                    />
                  )}

                  {Platform.OS === 'android' && (
                    <TouchableOpacity style={styles.datePicker} onPress={showAndroidDatePicker}>
                      <Text style={{ color: '#198EA5' }}>{selectedDate.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      handleBorrow(selectedItemInfo)
                      setIsModalVisible(false);
                      setSelectedDate(new Date());
                    }}
                    style={styles.emprunterButton}
                  >
                  <FontAwesome5
                    name="hands-helping"
                    size={20}
                    color="white"
                    style={styles.iconEmprunter}
                  />
                  <Text style={styles.emprunterButtonText}>J'emprunte !</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </Modal>

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

        {/* Modal de filtre sur les communautés */}
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalFilterVisible}
					onRequestClose={() => setModalFilterVisible(false)}>

					<View style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' }}>
						<View style={{ alignItems: 'flex-start', backgroundColor: 'white', marginVertical: Dimensions.get('screen').height / 3.75, borderRadius: 20, paddingHorizontal: 20, marginHorizontal: Dimensions.get('screen').width / 25, paddingVertical: 15 }}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', columnGap: 15 }}>
								<Text style={{ fontWeight: 'bold', fontSize: 13, width: '75%' }}>Dans quelle(s) communauté(s) voulez-vous chercher ?</Text>

                <TouchableOpacity onPress={() => setModalFilterVisible(false)} style={{ backgroundColor: '#198EA5', borderRadius: 50, justifyContent: 'center', alignItems: 'center', height: 20, width: 20 }}>
								  <FontAwesome name='close' size={15} color='white' />
                </TouchableOpacity>
							</View>
							<ScrollView style={{  width: '100%' }} contentContainerStyle={{ flex: 1, justifyContent: 'center', rowGap: 25 }}>
								{
									userCommunities && userCommunities.map((commu, i) => {
										return (
											<TouchableOpacity key={i} onPress={() => filterSelectedCommu(i)} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', columnGap: 20 }}>
												<View style={{ backgroundColor: commu.selected ? '#CE8D2C' : undefined, borderColor: '#CE8D2C', borderWidth: 1, width: 10, height: 10, borderRadius: 2 }} />
												<Text>{commu.name}</Text>
											</TouchableOpacity>
										)
									})
								}
							</ScrollView>
						</View>
					</View>
				</Modal>
      </KeyboardAvoidingView>
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
  titleh: {
  

    fontSize: 23,
    fontFamily: ttkFont,
    fontWeight: "bold",
    color: Colors.ttkBlack,
  },
  titleh1: {
    fontSize: 20,
    fontWeight: "600",
    color: "#198EA5",
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
  contentTop: {
    width: "100%",
    height: "10%",
    backgroundColor: "#F8FCFB",
    justifyContent: "center",
    alignItems: "center",
  },
  rowSearch: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: '15%',
    backgroundColor: '#F8FCFB',
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 240,
    height: 50,
    backgroundColor: "#F8FCFB",
    borderColor: "#198EA5",
    borderWidth: 2,
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 10,
    marginRight: 8,
  },
  iconSearchInput: {
    marginRight: 5
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    margin: 5,
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
  map: {
    flex: 1,
  },
  selectedTab: {
    borderBottomColor: "#198EA5",
    borderBottomWidth: 2,
    padding: 5
  },
  selectedTabText: {
    color: "#198EA5",
    fontFamily: ttkFont,

  },
  contentList: {
    width: "100%",
    height: "65%",
    backgroundColor: "#F8FCFB",
  },
  listItem: {
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: "#198EA5",
    height: 120,
  },
  iconFilter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 1,
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
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center'
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
  modalTitle: {
    borderBottomColor: "#198EA5",
    borderBottomWidth: 2,
  },
  modalJemprunteTitle: {
    marginBottom: 10,
  },
  modalJemprunteTextTitle: {
    fontWeight: "bold",
  },
  objectDescriptionModal: {
    flexDirection: 'row',
    width: 275,
    height: 100,
    alignItems: 'center',
  },
  photoModal: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: "#198EA5",
  },
  modalTitleObject: {
    width: 200,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  modalTitleText: {
    width: 200,
    fontSize: 18,
    marginLeft: 5,
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
    datePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  emprunterButton: {
    backgroundColor: "#198EA5",
    width: 250,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emprunterButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  borrower: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recapObjet: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  recapObjetText: {
    fontSize: 15,
  },
  modalCloseButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    color: "#198EA5",
    fontWeight: "bold",
  },
  iconEmprunter: {
    margin: 5,
    marginLeft: 0,
  },
  mapContainer: {
    flex: 1,
  },
  borrowTextInput: {
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
  iconX: {
    textAlign: "center",
  },
  photos: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: "#198EA5",
  },
  allObjectContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoEdit: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  descriptionObjectList: {
    justifyContent: 'space-evenly',
    marginLeft: 20,
    height: 100
  },
  itemTitleObj: {
    color: "#198EA5",
    fontWeight: "bold",
    fontSize: 19,
  },
  username: {
    fontWeight: "bold",
    color: "#353639",
  },
  dispoText: {
    color: "#353639",
    fontWeight: "bold",
  },
  datePicker: {
    marginVertical: 10,
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 10
  }
});

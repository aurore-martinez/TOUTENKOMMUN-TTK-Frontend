import React, { useEffect, useState, useRef } from "react";
import { Platform, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet, Text, View, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/users';

export default function CreateOrJoinScreen({ navigation }) {
	const token = useSelector((state) => state.users.token);

	const dispatch = useDispatch();

	const [isModalLogoutVisible, setModalLogoutVisible] = useState(false);

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
	
	return (
		<SafeAreaView style={styles.container}>
		{/*HEADER*/}
		<View style={styles.header}>
		<Text style={styles.title}>TOUTENKOMMUN</Text>
		<FontAwesome style={styles.userIcon} name="power-off" onPress={openModalLogout}/>
		</View>

		<View style={styles.pageContent}>
		<View style={styles.topContent}>
		<Text style={styles.textTopContent}>Choisir ma communauté</Text>
		</View>
		
		<View style={styles.contentContainer}>
		<View style={styles.joinContent}>
		<Text style={styles.h5}>Tu connais le nom de la communauté et tu as un code d'accès ?</Text>
		<TouchableOpacity style={styles.buttonJoin} onPress={() => navigation.navigate("Join")}>
		<View style={styles.iconTextContainer}>
		<FontAwesome style={styles.joinIcon} name='sign-out' size={20} color='#353639' />
		<Text style={styles.btnTextJoinCommu}>Rejoindre ma communauté</Text>
		</View>
		</TouchableOpacity>
		</View>
		<View style={styles.separatorBar} />
		
		<View style={styles.createContent}>
		<Text style={styles.h5}>Prêt(e) à lancer ta propre communauté et inviter les proches?</Text>
		<TouchableOpacity style={styles.buttonCreate} onPress={() => navigation.navigate("Create")}>
		<View style={styles.iconTextContainer}>
		<FontAwesome style={styles.createxIcon} name='users' size={20} color='#353639' />
		<Text style={styles.createButtonText}>Créer ma communauté</Text>
		</View>
		</TouchableOpacity>
		</View>
		</View>
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
		
		<StatusBar style="auto" />
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
		pageContent : {
			height : '90%',
		},
		topContent : {
			alignItems :'center',
			backgroundColor: "#F8FCFB",
			height : '10%',
			justifyContent : 'center',
			marginTop : '5%',
		},
		textTopContent : {
			fontSize: 25,
			color: '#353639',
			fontWeight : 'bold',
		},
		contentContainer : {
			backgroundColor: "#F8FCFB",
			height : '90%',
			justifyContent : 'flex-start',
			alignItems : 'center',
		},
		joinContent: {
			alignItems: 'center',
			justifyContent: 'center',
		},
		createContent: {
			alignItems: 'center',
			justifyContent: 'center',
		},
		buttonJoin: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			width: '87%',
			height : '20%',
			marginTop: 50,
			marginBottom: 30,
			borderRadius: 10,
			backgroundColor: '#198EA5',
		},
		buttonCreate: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			width: '87%',
			height : '20%',
			marginTop: 50,
			marginBottom: 30,
			borderRadius: 10,
			borderColor: '#198EA5',
			borderWidth: 2,
			backgroundColor: 'white',
		},
		btnTextJoinCommu: {
			textAlign: 'center',
			color: 'white',
			fontSize: 18,
			fontWeight: 'bold',
			marginRight: 16,
			marginRight: 35,
		},
		createButtonText: {
			textAlign: 'center',
			color: '#198EA5',
			fontSize: 18,
			fontWeight: 'bold',
			marginRight: 35,
		},
		iconTextContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent : 'center',
		},
		separatorBar: {
			borderBottomColor: '#126171',
			borderBottomWidth: 2,
			width: 300,
			textAlign: 'center',
			marginBottom: '5%',
		},
		h5: {
			fontSize: 20,
			color: '#353639',
			marginLeft: 15,
			marginRight: 15,
		},
		joinIcon: {
			color: 'white',
			fontSize: 20,
			fontWeight: 'bold',
			marginRight: 10,
		},
		createxIcon: {
			color: '#198EA5',
			fontSize: 20,
			fontWeight: 'bold',
			marginRight: 10,
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
		  modalBtnContent: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-evenly",
		  },
	});
	
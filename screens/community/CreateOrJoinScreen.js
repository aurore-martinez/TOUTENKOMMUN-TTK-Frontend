import React, { useEffect, useState, useRef } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/users";
import Global from "../../styles/Global";
export const inputRadius = 15;
export const btnRadius = 10;
export const ttkFont = "Tuffy";
export const ttkBoldFont = "Tuffy-Bold";
export const ttkItalicFont = "Tuffy-Italic";
export const btnPadding = 15;
export const iconPadding = 10;

export const Colors = {
  ttkGreen: "#198EA5",
  ttkBlack: "#353639",
};

export default function CreateOrJoinScreen({ navigation }) {
  const token = useSelector((state) => state.users.token);

  const dispatch = useDispatch();

  const [isModalLogoutVisible, setModalLogoutVisible] = useState(false);

  const openModalLogout = () => {
    setModalLogoutVisible(true);
  };

  const closeModalLogout = () => {
    setModalLogoutVisible(false);
  };

  //fonction logout
  const handleLogout = () => {
    dispatch(logout());

    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*HEADER*/}
      <View style={styles.header}>
        <Text style={styles.title}>TOUTENKOMMUN</Text>
        <FontAwesome
          style={styles.userIcon}
          name="user"
          onPress={openModalLogout}
        />
      </View>
      <View style={styles.pageContent}>
        <View style={styles.topContent}>
          <Text style={styles.textTopContent}>Choisir ma communauté</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={[styles.joinContent, { width: Dimensions.get('screen').width * .85 }]}>
            <Text style={Global.h5}>
              Tu connais le nom de la communauté et tu as un code d'accès ?
            </Text>
            <TouchableOpacity
              style={[Global.filledButtonWithIcon, { marginTop: 30 }]}
              onPress={() => navigation.navigate("Join")}
            >
                <FontAwesome
                  name="sign-out"
                  size={20}
                  color="white"
                />
                <Text style={Global.textBtnWithIcon}>
                  Rejoindre ma communauté
                </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bar} />

          <View style={styles.createContent}>
            <Text style={Global.h5}>
              Prêt(e) à lancer ta propre communauté et inviter les proches?
            </Text>
            <TouchableOpacity
              style={[Global.outlinedButtonWithIcon, { marginTop: 30 }]}
              onPress={() => navigation.navigate("Create")}
            >
                <FontAwesome
                  style={styles.createxIcon}
                  name="users"
                  size={20}
                  color="#353639"
                />
                <Text style={[Global.textBtnWithIcon, { color: '#198EA5' }]}>Créer ma communauté</Text>
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
  topContent: {
    alignItems: "center",
    backgroundColor: "#F8FCFB",
    height: "10%",
    justifyContent: "center",
    marginTop: "5%",
  },
  textTopContent: {
    fontSize: 25,
    fontFamily: ttkFont,
    fontWeight: "bold",
    color: Colors.ttkBlack,
  },
  contentContainer: {
    backgroundColor: "#F8FCFB",
    height: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  joinContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  createContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonJoin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "87%",
    height: "20%",
    marginTop: 50,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: "#198EA5",
  },
  buttonCreate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "87%",
    height: "20%",
    marginTop: 50,
    marginBottom: 30,
    borderRadius: 10,
    borderColor: "#198EA5",
    borderWidth: 2,
    backgroundColor: "white",
  },
  btnTextJoinCommu: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 16,
    marginRight: 35,
  },
  createButtonText: {
    textAlign: "center",
    color: "#198EA5",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 35,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
	borderBottomColor: Colors.ttkGreen,
	borderBottomWidth: 2,
	width: Dimensions.get('screen').width * 0.85,
	marginVertical: 40,
},
  h5: {
    fontSize: 17,
    fontFamily: ttkFont,
    color: Colors.ttkBlack,
  },
  joinIcon: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  createxIcon: {
    color: "#198EA5",
    fontSize: 20,
    fontWeight: "bold",
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
});

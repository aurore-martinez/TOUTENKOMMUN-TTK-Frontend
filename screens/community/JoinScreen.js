import { Platform, SafeAreaView, StatusBar, TouchableOpacity, Modal } from 'react-native';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BACKEND_URL } from '../../Constants';
import { useSelector } from 'react-redux';

export default function JoinScreen({ navigation }) {

  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [accessCode, setAcessCode] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [description, setDescription] = useState("");

  // utiliser un useRef pour vider les champs car on devait les réutiliser sur la modal
  const nameRef = useRef(null);
  const codeRef = useRef(null);

  const token = useSelector((state) => state.users.token);

  	/**
	 * Fonction envoyant le nom et le accessCode au backend
	 */
  const handleJoin = async () => {
		if (name !== "" && accessCode !== "") {
			const response = await fetch(`${BACKEND_URL}/communities/join`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, accessCode, description, token })
			});

			const existingCommunity = await response.json();
			if (existingCommunity.result) {
        nameRef.current.clear();
        codeRef.current.clear();
        setLocalisation(existingCommunity.localisation);
        setDescription(existingCommunity.description);
        // openModal();
			} else {
				console.log('Error', existingCommunity.error);
			}
		}
	};    


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>TOUTENKOMMUN</Text>
          <FontAwesome style={styles.userIcon} name='power-off' size={20} color='white'/>
        </View>

        <View style={styles.contentTop}>
        
        <View style={styles.titleContent}>
        <Text style={styles.h5}>Rejoindre ma communauté</Text>
        </View>

        <View style={styles.inputContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
        >
          <View style={styles.input}>
            <FontAwesome style={styles.icon} name="users" size={20} color='black' />
            <TextInput
              placeholder="Nom de la communauté"
              autoCapitalize="none"
              ref={nameRef}
              onChangeText={(e) => setName(e.trim())}
            />
          </View>
        </TouchableOpacity> 
        <TouchableOpacity
          activeOpacity={0.8}
        >
          <View style={styles.input}>
            <FontAwesome style={styles.icon} name="lock" size={20} color='black' />
            <TextInput
              placeholder="Code d'accès"
              autoCapitalize="none"
              ref={codeRef}
              onChangeText={(e) => setAcessCode(e.trim())}
            />
          </View>
        </TouchableOpacity> 
        </View>

        <View style={styles.btnValidateContent}>
          <TouchableOpacity style={styles.btnValidate} onPress={openModal}>
          {/* onPress={() => navigation.navigate("Prêt") */}
            <FontAwesome style={styles.handIcon} name='hand-o-right' size={20} color='#353639'/>
            <Text style={styles.btnTextValidate}>Valider</Text>
          </TouchableOpacity>
        </View>
        </View>
      
      <View style={styles.bar}></View>

      <View style={styles.contentBottom}>
        <View style={styles.titleContent}>
        <Text style={styles.h5}>Communauté(s) suggérée(s)</Text>
      </View>

      <View style={styles.comuContainer}>

        <TouchableOpacity activeOpacity={0.8} onPress={openModal}>
          <View style={styles.row}>
            <View style={styles.iconCom}>
              <FontAwesome  name='home' size={20} color='#353639'/>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.titleh3}>La familia</Text>
              <Text style={styles.titleh3}>Membres : XX</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={openModal}>
          <View style={styles.row}>
            <View style={styles.iconCom}>
              <FontAwesome  name='home' size={20} color='#353639'/>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.titleh3}>Poto Compoto</Text>
              <Text style={styles.titleh3}>Membres : XX</Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>
    
    </View>

    {Modal}
  <Modal visible={isModalVisible} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.titleh3}>Êtes-vous sûr(e) de vouloir rejoindre la communauté : "{name}"</Text>
        {/* <Text style={styles.titleh3}>Localisation : {localisation}</Text> */}
        {/* <Text style={styles.titleh3}>Description : </Text><Text style={styles.titleh4}>{description}</Text> */}
        <View style={styles.modalBtnContent}>
        {/* Bouton pour rejoindre */}
        <TouchableOpacity style={styles.joinButton} onPress={() => {
          handleJoin();
          navigation.navigate('TabNavigator', { screen: 'Prêt' });
          closeModal();
        }}>
          <FontAwesome style={styles.ppIcon} name='arrow-circle-right' size={20} color='#F8FCFB'/>
          <Text style={styles.joinButtonText}>Oui, rejoindre</Text>
        </TouchableOpacity>
    </View>
    {/* Bouton pour fermer la modal */}
    <TouchableOpacity onPress={closeModal}>
      <Text style={styles.closeText}>Fermer</Text>
    </TouchableOpacity>
  </View>
</View>
  </Modal>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    width: '100%',
    height:'10%',
    backgroundColor: '#198EA5',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  userIcon: {
    padding: 10,
  },
  btnValidateContent: {
    height: '15%',
    alignItems: 'center',
  },
  btnValidate: {
    flexDirection: 'row',
    height: '100%',
    width: '87%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#198EA5',
    borderRadius: 10,
    backgroundColor: '#198EA5',
  },
  handIcon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10
  },
  btnTextValidate: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 16
  },
  contentTop: {
    height: '45%',
    // backgroundColor : 'green',
    width: '100%',
  },
  contentBottom : {
    // backgroundColor : 'blue',
    height: '45%',
    width: '100%',
  },
  h5: {
    fontSize: 20,
    color: '#353639',
  },
  bar: {
    borderBottomColor : '#198EA5',
    borderBottomWidth: 2,
    width : '60%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '2%'
  },
  inputContainer: {
    justifyContent: 'space-evenly',
    marginTop: '5%',
    // backgroundColor: "grey",
    padding: 30,
  },
  input: {
    borderColor: '#198EA5',
    borderWidth: 2,
    fontSize: 16,
    // fontFamily: 'Futura',
    borderRadius: 10,
    marginBottom: '5%',
    paddingLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 50,
    alignItems: 'center',
  },
  icon : {
    marginRight: '3%',
  },
  titleContent:  {
    alignItems : 'center',
    justifyContent: 'center',
    marginTop: '3%'
  },
  comuContainer: {
    backgroundColor : '#F8FCFB',
    height: '100%',
    padding: 10,
    
  },
  row : {
    backgroundColor : '#F8FCFB',
    borderColor : '#198EA5',
    borderWidth: 2,
    borderRadius: 50,
    //height: '30%',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  iconCom: {
    borderColor: '#353639',
    borderWidth: 1,
    borderRadius: '50%',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEFCFF',
  },
  textContainer: {
    marginLeft: '10%',
    justifyContent: 'space-evenly',
  },
  titleh3: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F8FCFB',
    padding: 20,
    borderRadius: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  closeText: {
    color: '#198EA5',
    marginTop: 10,
    textAlign: 'center',
  },
  modalBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
 joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    backgroundColor: '#198EA5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  joinButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
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
  titleh4 : {
    textAlign: 'justify'
  },
  ppIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10
  },
});

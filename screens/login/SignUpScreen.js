import { SafeAreaView, StatusBar, TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import Global, { Colors, ttkFont, iconPadding } from '../../styles/Global';

export default function SignUpScreen({ navigation }) {
	const [firstname, setFirstname] = useState(null);
	const [lastname, setLastname] = useState(null);
	const [username, setUsername] = useState(null);

	const handleNavigate = () => {
		if (firstname && lastname && username) {
			// On transmet les infos de cette screen à la suivante
			navigation.navigate('SignUpPart2', { username, firstname, lastname });
		}
	};

	return (
		<SafeAreaView style={Global.container} >
			<View style={Global.title}>
				<Text style={Global.h1}>Toutenkommun</Text>
				<Text style={Global.h5}>Crée ton compte !</Text>
			</View>

			<View style={Global.buttonsContainers}>
				<TouchableOpacity style={[Global.btnRes, { backgroundColor: '#3B5998' }]} >
					<FontAwesome name='facebook' size={20} color='white' />
					<Text style={Global.textBtnWithIcon}>Facebook</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[Global.btnRes, { backgroundColor: '#DE4B39' }]} >
					<FontAwesome name='google' size={20} color='white' />
					<Text style={Global.textBtnWithIcon}>Google</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.bar}></View>

			<View style={styles.title3Container}>
				<Text style={styles.titleh3}>ou</Text>
			</View>

			<View style={{ marginTop: 10, rowGap: 15, alignItems: 'center' }}>
				<View style={Global.inputWithIcon}>
					<FontAwesome style={{ padding: iconPadding }} name='user' size={20} color='#353639' />
					<TextInput
						style={[{ width: '85%' }, Global.input]}
						placeholder='Prénom'
						placeholderTextColor='#353639'
						autoCapitalize='none'
						autoComplete='name'
						textContentType='name'
						value={firstname}
						onChangeText={(value) => setFirstname(value.trim())} />
				</View>

				<View style={Global.inputWithIcon}>
					<FontAwesome style={{ padding: iconPadding }} name='user' size={20} color='#353639' />
					<TextInput
						style={[{ width: '85%' }, Global.input]}
						placeholder='Nom'
						placeholderTextColor='#353639'
						autoCapitalize='none'
						autoComplete='name'
						textContentType='name'
						value={lastname}
						onChangeText={(value) => setLastname(value.trim())} />
				</View>

				<View style={Global.inputWithIcon}>
					<FontAwesome style={{ padding: iconPadding }} name='user' size={20} color='#353639' />
					<TextInput
						style={[{ width: '85%' }, Global.input]}
						placeholder='Pseudo'
						placeholderTextColor='#353639'
						autoCapitalize='none'
						autoComplete='name'
						textContentType='name'
						value={username}
						onChangeText={(value) => setUsername(value.trim())} />
				</View>
			</View>

			<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
				<TouchableOpacity style={Global.filledButtonWithIcon} onPress={handleNavigate}>
					<FontAwesome name='hand-o-right' size={20} color='white' />
					<Text style={Global.textBtnWithIcon}>Continuer</Text>
				</TouchableOpacity>
			</View>
			
			<StatusBar barStyle='default' backgroundColor={Colors.ttkGreen} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: '#F8FCFB',
		justifyContent: 'space-between',
	},
	titleContainer: {
		alignItems: 'center',
		marginTop: '10%',
	},
	titleh3: {
		fontSize: 20,
		fontWeight: '600',
		fontFamily: ttkFont,
	},
	bar: {
		borderBottomColor: '#198EA5',
		borderBottomWidth: 2,
		width: '60%',
		textAlign: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	icon: {
		marginRight: '3%',
		marginBottom: '3%'
	},
	title3Container: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '5%'
	},
});

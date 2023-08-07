import { Dimensions, StatusBar, StyleSheet } from 'react-native';

export const Colors = {
  ttkGreen: '#198EA5',
  ttkBlack: '#353639'
};

export const inputRadius = 15;
export const btnRadius = 10;
export const ttkFont = 'Tuffy';
export const ttkBoldFont = 'Tuffy-Bold';
export const ttkItalicFont = 'Tuffy-Italic';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8FCFB',
	},
  buttonsContainers: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	textContent: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '10%',
	},
	h1: {
		fontSize: 40,
    fontFamily: ttkFont,
		fontWeight: 'bold',
		color: Colors.ttkBlack,
	},
	h5: {
		fontSize: 20,
    fontFamily: ttkFont,
		color: Colors.ttkBlack,
	},
	btnFB: {
		flexDirection: 'row',
		height: '40%',
		width: '35%',
		backgroundColor: '#3B5998',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		borderRadius: 10,
	},
	btnGG: {
		flexDirection: 'row',
		height: '40%',
		width: '35%',
		backgroundColor: '#DE4B39',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		borderRadius: 10,
	},
	textBtnFB: {
		color: 'white',
		fontSize: '20',
		fontWeight: 'bold'
	},
	textBtnGG: {
		color: 'white',
		fontSize: '20',
		fontWeight: 'bold'
	}, inputContent: {
		height: '25%',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	userContent: {
		flexDirection: 'row',
		height: '30%',
		width: '87%',
		borderWidth: 2,
		borderColor: '#198EA5',
		borderRadius: 10,
		paddingLeft: '5%',
		alignItems: 'center'
	},
	userIcon: {
		padding: 10,
	},
	mdpContent: {
		flexDirection: 'row',
		height: '30%',
		width: '87%',
		borderWidth: 2,
		borderColor: '#198EA5',
		borderRadius: 10,
		paddingLeft: '5%',
		alignItems: 'center'
	},
	mdpIcon: {
		padding: 10,
	},
	btnValidateContent: {
		height: '15%',
		alignItems: 'center',
	},
	btnValidate: {
		flexDirection: 'row',
		height: '50%',
		width: '87%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#198EA5',
		borderRadius: 10,
	},
	handIcon: {
		color: 'white',
		fontSize: '20',
		fontWeight: 'bold',
		marginRight: 10
	},
	btnTextValidate: {
		color: 'white',
		fontSize: '20',
		fontWeight: 'bold',
		marginRight: 16
	},
	bar: {
		borderBottomColor: '#198EA5',
		borderBottomWidth: 2,
		width: '87%',
		textAlign: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: '5%'
	},
	btnCreate: {
		flexDirection: 'row',
		height: '50%',
		width: '87%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F8FCFB',
		borderBottomColor: '#198EA5',
		borderBottomWidth: 2,
		borderLeftColor: '#198EA5',
		borderLeftWidth: 2,
		borderTopColor: '#198EA5',
		borderTopWidth: 2,
		borderRightColor: '#198EA5',
		borderRightWidth: 2,
		borderRadius: 10,
	},
  inputWithIcon: {
    flex: 1,
    flexShrink: 1,
    alignItems: 'center',
		justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderColor: Colors.ttkGreen,
    borderWidth: 1,
    width: Dimensions.get('screen').width * 0.85,
    borderRadius: inputRadius
  },
  filledButtonWithIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.ttkGreen,
    backgroundColor: Colors.ttkGreen,
    width: Dimensions.get('screen').width * 0.85,
    borderRadius: btnRadius,
  },
  outlinedButtonWithIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.ttkGreen,
    width: Dimensions.get('screen').width * 0.85,
    borderRadius: btnRadius,
  },
  input: {
    fontFamily: ttkFont,
    padding: 10,
    // height: 40
  }
});
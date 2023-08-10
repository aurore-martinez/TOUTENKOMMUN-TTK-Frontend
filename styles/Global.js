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
export const btnPadding = 15;
export const iconPadding = 10;

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8FCFB',
	},
  title: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '10%',
  },
  buttonsContainers: {
    padding: 30,
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
  inputWithIcon: {
    alignItems: 'center',
		justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderColor: Colors.ttkGreen,
    borderWidth: 1,
    width: Dimensions.get('screen').width * 0.85,
    borderRadius: inputRadius
  },
  filledButtonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.ttkGreen,
    backgroundColor: Colors.ttkGreen,
    width: Dimensions.get('screen').width * 0.85,
    borderRadius: btnRadius,
    padding: btnPadding
  },
  outlinedButtonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.ttkGreen,
    width: Dimensions.get('screen').width * 0.85,
    borderRadius: btnRadius,
    padding: btnPadding
  },
  input: {
    fontFamily: ttkFont,
    padding: 10,
  },
  textBtnWithIcon: {
    color: 'white',
    fontSize: 20,
    fontFamily: ttkFont,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  btnRes: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		borderRadius: btnRadius,
		padding: btnPadding
	},
});
import { Platform, SafeAreaView, StatusBar,StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ListAndMapScreen({ navigation }) {
  return (
    <SafeAreaView >
      {/* style={styles.container} */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
      <View style={styles.header}>
          <Text style={styles.title}>TOUTENKOMMUN</Text>
          <FontAwesome style={styles.userIcon} name='user' size={20} color='white'/>
        </View>
        <StatusBar style="auto" />
          
        <View style={styles.contentTop}>
                    {/* titre + input search */}
          <Text style={styles.titleh}>Fil d'actualité de<Text style={styles.titleh1}> [ma communauté]</Text></Text>
          <View style={styles.rowSearch}>
          <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.row}>
              <FontAwesome  name='search' size={20} color='#198EA5' style={styles.iconSearch}/>
              <TextInput
              placeholder="Je recherche..."
              autoCapitalize="none"
              />
          </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.filter}>
          <FontAwesome  name='sliders' size={20} color='#EEFCFF' style={styles.iconFilter}/>
          </View>
          </TouchableOpacity>
          </View>
        </View>

          <View style={styles.rowMenu}>
              <Text style={styles.titleMenu}>List</Text>
              <Text style={styles.titleMenu}>Map</Text>
          </View>

                    {/* list VISIBLE */}
        <View style={styles.contentList}>
          <Text style={styles.titleh1}>LIST VISIBLE</Text>

        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FCFB',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height:'10%',
    backgroundColor: '#198EA5',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  titleh: {
    fontSize: 20,
    fontWeight: '600',
    color: '#353639',
  },
  titleh1: {
    fontSize: 20,
    fontWeight: '600',
    color: '#198EA5',
  },
  userIcon: {
    padding: 10,
  },
  contentTop: {
    width: '100%',
    height: '20%',
    backgroundColor: '#F8FCFB',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 250,
    height: 50,
    backgroundColor: '#F8FCFB',
    borderColor: '#198EA5',
    borderWidth: 2,
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: '5%',
    marginVertical: 12
  },
  // iconFilter : {
  //   marginRight: '5%',
  //   marginBottom: '3%'
  // },
  contentList: {
    width: '100%',
    height: '60%',
    backgroundColor: '#F8FCFB',
    borderTopWidth: 1
  },
  rowMenu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    backgroundColor: '#F8FCFB',
  },
  titleMenu: {
    fontSize: 16,
    fontWeight: '600',
    color: '#353639',
  },
  filter: {
    borderRadius: '50%',
    width: 50,
    height: 50,
    paddingLeft: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#198EA5',
    alignItems: 'center',
    marginRight: '5%',
    marginBottom: '3%'
  },
  rowSearch : {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginTop: 20
  }
});

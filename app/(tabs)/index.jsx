import { View, Text, StyleSheet, ImageBackground,ScrollView, TouchableOpacity  } from 'react-native';
import { StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';



export default function Home() {
  const router = useRouter();
  return (
   
<View style={styles.container}>
      <StatusBar barStyle="dark-content" />


        <View style={styles.header}> 
            <View style={styles.element}> 
            <TouchableOpacity onPress={()=> router.push('../notifications')}> 
            <Ionicons name="notifications-outline" style={{marginTop:20, color:'black'}} size={24} color="#888" />
            </TouchableOpacity> 
            <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={{float:"left", marginTop: '10%'}}>Coucou 👋, John Doe </Text>
            <TouchableOpacity onPress={()=> router.push('../profil')}>
            <View style={styles.back}>

            <Ionicons name="person-outline" size={20} color="#888" style={styles.icon} />

            </View>
            </TouchableOpacity>

            </View>
            </View> 
        </View>
  <ScrollView>
        <ImageBackground 
        source={require("../../assets/images/5366317_33300.jpg")} 
        imageStyle={{ borderRadius: 20}}
        style={styles.background}
        >
            <Text style={styles.head}>MRV Mali </Text>

        </ImageBackground>

        <Text style={{marginTop: 20, marginLeft:20, fontSize: 20}}>Secteurs</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
            
        <View style={styles.card}>
            <Text >Secteur 1</Text>
        </View>
        <View style={styles.card}>
            <Text >Secteur 1</Text>
        </View>
        <View style={styles.card}>
            <Text >Secteur 1</Text>
        </View>
        </ScrollView>
        </View>

        <View style={styles.cardAction}>
         
                <Text style={{fontSize: 25, fontWeight: 500, marginBottom:10}}>Action</Text>
                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry's standard dummy
                </Text>

                <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 20}}>
                    <View style={{flexDirection: 'row'}}>
                    <AntDesign name="calendar" size={24} color="#01AFAF" />
                    <Text style={{marginTop: 3, marginLeft: 10}}>
                        Date: 12/12/2021
                    </Text>
                    </View>
                    
                    <Feather name="corner-down-right" size={30} color="#01AFAF" />

                </View>
         

        </View>

        <Text style={{marginTop: 20, marginLeft:20, fontSize: 20}}>Documents</Text>
       

        <View style={{flexDirection: 'row', gap: 10, marginTop: 15}}>
          <View style={styles.backg}>
          <FontAwesome6 name="file-text" size={24} color='#01AFAF' />
          </View>
        
        <Text style={{maxWidth: '80%'}}>galley of type and scrambled it to make a type specimen book.</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10, marginTop: 15}}>
          <View style={styles.backg}>
          <FontAwesome6 name="file-text" size={24} color='#01AFAF' />
          </View>
        
        <Text style={{maxWidth: '80%'}}> to make a type specimen book.</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10, marginTop: 15}}>
          <View style={styles.backg}>
          <FontAwesome6 name="file-text" size={24} color='#01AFAF' />
          </View>
        
        <Text style={{maxWidth: '80%'}}>galley of type and scrambled it to make a type specimen book.</Text>
        </View>
        </ScrollView>
</View>

  );
 
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
     
    },
    header: {
        marginTop: '15%',
        
    },
    element: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
         marginHorizontal: 20
    },
    back: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        width: 65,
        height: 62,
        borderRadius: 50,
    },

    background: {
        justifyContent: "center",
        height: 160,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 200,

   
        marginHorizontal: 20,
        marginTop: 20,
      
      },
      head: {
      textAlign: "right",
        fontSize: 30,
        fontWeight: 700,
        color: '#098D8D',
        marginRight: 20
      },
      card: {
       height: 100,
       width: 160,
       backgroundColor: '#f1f1f1',
         borderRadius: 5,
         alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 13,
            marginTop: 20,
    },
    cardAction:{
        backgroundColor: '#f1f1f1',
        borderRadius: 12,
        padding: 10,
        marginHorizontal: 13,
        marginTop: 20,
        width: '94%',
        height: 200,
        padding: 20,
    },
    backg: {
        backgroundColor: '#f1f1f1',
        width: 45,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 13,
       
    }
  })
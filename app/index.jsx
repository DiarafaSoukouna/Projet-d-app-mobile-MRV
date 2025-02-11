import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import { useRouter, Link } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.formC}>
      <LinearGradient colors={['#C2FFFF', '#01AFAF']} style={styles.cont}/>

      <View style={styles.forms}>
      <Text style={styles.title}>Connexion</Text>

    

      <View style={styles.inputContainer}> 
      <Ionicons name="person-outline" size={20} color="#888" style={styles.icon} />
     <TextInput 
  style={styles.input} 
  placeholder="Nom d'utilisateur" 
  placeholderTextColor="#000000" 
  autoCapitalize="none" 
/>
  </View>
  <View style={styles.inputContainer}> 
      <Ionicons 
        name="lock-closed-outline" 
        size={20} 
        color="#888" 
        style={styles.icon}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Mot de passe" 
        secureTextEntry 
        placeholderTextColor={'#000000'}

      />
  </View>
      
      <TouchableOpacity onPress={() => router.push("/(tabs)")} style={styles.buton}><Text style={"textAlign:center"}>Se connecter</Text></TouchableOpacity>
   
 <Link href={{
          pathname: '/home'
        }} style={styles.mot}>
   
        <Text >Mot de passe oublié ? </Text>
   
      </Link>
      </View>
      
      </View>

      
      <View><Text style={{textAlign: 'center', fontSize: 25, marginBottom:35}}>Bienvenue sur MRV👋</Text></View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#8DE2E2',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40
  },
  cont:{
    width: 180,
    height: 120,
    marginBottom: -60,
    borderRadius: 120,
    backgroundColor: '#95f0f0',  
    marginLeft: 70,
  },
  input: {
  width: '100%',
  },
  formC:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buton:{
   backgroundColor: '#31BDBD',
   padding: 15,
   borderRadius: 30,
   alignItems: 'center',
   justifyContent: 'center',
   marginTop: 10,
  },
  forms: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: '50%',
    width: '86%',
    padding: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
 
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    padding: 13,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    marginBottom: 10,
    backgroundColor: '#D9D9D9',

  },
  icon: {
    marginRight: 10,
  },
  mot: {
   margin: 20,
   textAlign: 'center',
   color: '#3731eb',
   textDecorationLine: 'underline'
     
  }
});
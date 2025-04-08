import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { StatusBar } from 'react-native';
import { useRouter, Link } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
// import {BaseURL} from './get_api'; 
export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
 
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

 
  useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1500, easing: Easing.linear }),
        -1, 
        false
      );
      
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );
    } else {
      rotation.value = 0;
      scale.value = 1;
    }
  }, [loading]);


  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value }
      ],
    };
  });

  const login = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('identifiant', username);
      formData.append('pass', password);

      const response = await axios.post('https://data.mrv-mali.org/api/auth/login', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 200) {
        console.log('Connexion réussie ! Token sauvegardé.', response.data );
        const token = response.data.token;
        await AsyncStorage.setItem('userToken', token); 
        router.replace('/(tabs)');
      }
    } catch (error) {
      if (error.response) {
        console.log('Échec de connexion :', error.response.data.message);
        alert('Identifiants incorrects');
      } else {
        console.error('Erreur lors de la connexion :', error.message);
        alert('Une erreur est survenue');
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <KeyboardAwareScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.formC}>
        <LinearGradient colors={['#C2FFFF', '#01AFAF']} style={styles.cont} />

        <View style={styles.forms}>
          <Text style={styles.title}>Connexion</Text>

          <View style={styles.inputContainer}> 
            <Ionicons name="person-outline" size={20} color="#888" style={styles.icon} />
            <TextInput 
              style={styles.input} 
              placeholder="Nom d'utilisateur" 
              placeholderTextColor="#000000" 
              autoCapitalize="none" 
              value={username} 
              onChangeText={setUsername}
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
              value={password} 
              onChangeText={setPassword}
            />
          </View>
          
          <TouchableOpacity onPress={login} style={styles.buton} disabled={loading}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Animated.View style={[styles.loadingIcon, animatedStyles]}>
                  <Ionicons name="water-outline" size={24} color="#fff" />
                </Animated.View>
                <ActivityIndicator size="small" color="#fff" style={styles.activityIndicator} />
                <Text style={styles.loadingText}>Connexion en cours...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Se connecter</Text>
            )}
          </TouchableOpacity>
   
          <Link href={{
            pathname: './mot_de_passe'
          }} style={styles.mot}>
            <Text>Mot de passe oublié ? </Text>
          </Link>
        </View>
      </View>

      <View><Text style={{textAlign: 'center', fontSize: 25, marginBottom:35}}>Bienvenue sur MRV👋</Text></View>
      
    </KeyboardAwareScrollView>
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
  cont: {
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
  formC: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buton: {
    backgroundColor: '#31BDBD',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    minHeight: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  forms: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: 400,
    width: '90%',
    padding: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    padding: Platform.select({
      ios: 12, 
      android: 6,
    }),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
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
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    marginRight: 8,
  },
  activityIndicator: {
    marginRight: 8,
  },
  loadingText: {
    color: '#fff',
    fontWeight: '500',
  }
});
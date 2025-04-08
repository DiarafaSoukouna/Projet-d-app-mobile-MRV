import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const ProfileForm = () => {
  
    const [email, setEmail] = useState('diarafasouk@gmail.com');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleUpdate = () => {
        console.log('Mise à jour avec :', { nom, prenom, email, password });
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 20}}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>

           <Text style={styles.ecrit}>Modifier mot de passe</Text>          

        <View style={styles.grand}>
           
            <Text style={styles.label}>Email :</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Entrez votre email" 
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address"
            />

            <Text style={styles.label}>Actuel mot de passe :</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Entrez votre mot de passe" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            />
            <Text style={styles.label}>Nouveau mot de passe :</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Entrez votre mot de passe" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            />
            <Text style={styles.label}>Confirmer le mot de passe :</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Entrez votre mot de passe" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Modifier</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
     container: {
        flex: 1,
        backgroundColor: '#e8fcff',
        
    },
    grand: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding : 30,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
  
    input: {
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',

    },
    button: {
        backgroundColor: '#01afaf',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
 
    nom: {
        fontSize: 22,
        fontWeight: '400',
        marginTop: 20,
        textAlign: 'center',
    },
    ecrit :{
        fontSize: 28,
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 600,
        color: '#000' 
    }
});

export default ProfileForm;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';

const ProfileForm = () => {
    const [nom, setNom] = useState('Soukouna');
    const [prenom, setPrenom] = useState('Diarafa');
    const [email, setEmail] = useState('diarafasouk@gmail.com');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleUpdate = () => {
        console.log('Mise à jour avec :', { nom, prenom, email, password });
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 20 }}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.pic}>
                <Text style={styles.initials}>DS</Text>
            </View>

             <Text style={styles.nom}>Diarafa Soukouna</Text>            

        <View style={styles.grand}>
            <Text style={styles.label}>Nom :</Text>
            <TextInput 
                style={styles.input} 
                placeholder="votre nom" 
                value={nom} 
                onChangeText={setNom} 
            />

            <Text style={styles.label}>Prénom :</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Entrez votre prénom" 
                value={prenom} 
                onChangeText={setPrenom} 
            />

            <Text style={styles.label}>Email :</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Entrez votre email" 
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address"
            />

<TouchableOpacity style={styles.button1} onPress={()=> router.push('./mot_de_passe')}>
                <View style={{flexDirection : 'row', justifyContent: 'space-between'}}>
                <Text style={styles.buttonText}>Modifier mot de passe </Text>
                <Entypo name="arrow-right" size={24} color="#fff" />
                </View>
            </TouchableOpacity>

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
    initials: {
        fontSize: 50,
        color: 'white',
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
    button1: {
        backgroundColor: '#01afaf',
        padding: 15,
        borderRadius: 5,
    },

    button: {
        backgroundColor: '#01afaf',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pic: {
        width: 120,
        height: 120,
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#D9D9D9',
        backgroundColor: '#01afaf',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nom: {
        fontSize: 22,
        fontWeight: '400',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default ProfileForm;
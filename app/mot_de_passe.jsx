import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { get_data, BaseURL } from './get_api';
import AsyncStorage from '@react-native-async-storage/async-storage';



const MotDePasse = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(1);
    const [email, setEmail] = useState('');


    const get_user = ()=>{
         get_data(`${BaseURL}/users.routes.php?id=${userId}`, setUser);
         setEmail(user.email);


    }
    useEffect(() => {
         const id_user =  AsyncStorage.getItem('userId');
if (id_user !== null) {
  setUserId(parseInt(id_user));
}
        get_user();
    }, []);

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!currentPassword) {
            errors.currentPassword = 'Le mot de passe actuel est requis';
            isValid = false;
        }

        if (!newPassword) {
            errors.newPassword = 'Le nouveau mot de passe est requis';
            isValid = false;
        } else if (newPassword.length < 6) {
            errors.newPassword = 'Le mot de passe doit contenir au moins 6 caractères';
            isValid = false;
        }

        if (newPassword !== confirmPassword) {
            errors.confirmPassword = 'Les mots de passe ne correspondent pas';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleUpdate = () => {
        if (validateForm()) {
            // Implement password update logic here
            Alert.alert(
                "Succès",
                "Votre mot de passe a été modifié avec succès",
                [{ text: "OK", onPress: () => router.back() }]
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            <LinearGradient
                colors={['#0a8f8f', '#01afaf', '#3cc4c4']}
                style={styles.headerGradient}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back-outline" size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Modifier mot de passe</Text>
                
                <View style={styles.iconContainer}>
                    <Ionicons name="lock-closed" size={40} color="white" />
                </View>
            </LinearGradient>

            <View style={styles.grand}>
                <Text style={styles.sectionTitle}>Sécurité du compte</Text>
                
                <Text style={styles.label}>Email :</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Entrez votre email" 
                    value={user.email} 
                    onChangeText={setEmail} 
                    keyboardType="email-address"
                    editable={false}
                />

                <Text style={styles.label}>Mot de passe actuel :</Text>
                <TextInput 
                    style={[styles.input, errors.currentPassword && styles.inputError]} 
                    placeholder="Entrez votre mot de passe actuel" 
                    value={currentPassword} 
                    onChangeText={setCurrentPassword} 
                    secureTextEntry 
                />
                {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword}</Text>}

                <Text style={styles.label}>Nouveau mot de passe :</Text>
                <TextInput 
                    style={[styles.input, errors.newPassword && styles.inputError]} 
                    placeholder="Entrez votre nouveau mot de passe" 
                    value={newPassword} 
                    onChangeText={setNewPassword} 
                    secureTextEntry 
                />
                {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

                <Text style={styles.label}>Confirmer le mot de passe :</Text>
                <TextInput 
                    style={[styles.input, errors.confirmPassword && styles.inputError]} 
                    placeholder="Confirmez votre nouveau mot de passe" 
                    value={confirmPassword} 
                    onChangeText={setConfirmPassword} 
                    secureTextEntry 
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Mettre à jour le mot de passe</Text>
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
    headerGradient: {
        paddingTop: 20,
        paddingBottom: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backButton: {
        marginLeft: 20,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15,
        borderWidth: 2,
        borderColor: 'white',
    },
    grand: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding: 30,
        marginTop: -20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#0a8f8f',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    inputError: {
        borderColor: '#ff3b30',
        borderWidth: 1,
    },
    errorText: {
        color: '#ff3b30',
        fontSize: 14,
        marginBottom: 10,
        marginTop: -5,
    },
    button: {
        backgroundColor: '#01afaf',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MotDePasse;
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Table, Row, Rows } from 'react-native-table-component';

export default function GroupeScreen() {
    const router = useRouter();
    const [tableHead] = useState(['Nom', 'Prenom']);
    const [tableData] = useState([
        ['Toure', 'Groupe A', 'Actif'],
        ['Sanogo', 'Groupe B', 'Inactif'],
        ['Fily', 'Groupe C', 'Actif'],
        
    ]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.titre}>Titre groupe ...</Text>
            <ScrollView horizontal>
                <View style={styles.tableContainer}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text} widthArr={[200, 200]} />
                        <Rows data={tableData} textStyle={styles.text} widthArr={[200, 200]} />
                    </Table>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
      
    },
    backButton: {
        marginTop: '13%',
        marginBottom: 10,
        marginLeft: 20,
    },
    titre: {
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 20,
        marginLeft: 20
    },
    tableContainer: {
        marginTop: 20,
        width: '100%',
        marginLeft: 10,
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff',
    },
    text: {
        margin: 10,
        textAlign: 'center',
    },
});
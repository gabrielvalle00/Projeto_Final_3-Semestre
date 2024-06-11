import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Home = () => {
    return (
        <View style={styles.container}>
            
            <View style={styles.content}>
                
                <Text style={styles.title}>Bem-vindo à Nossa Clínica</Text>
                <Text style={styles.description}>
                    Nossa clínica oferece os melhores serviços de saúde com uma equipe altamente qualificada e dedicada ao seu bem-estar. Venha nos visitar e confira todos os nossos serviços.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
    },
});

export default Home;

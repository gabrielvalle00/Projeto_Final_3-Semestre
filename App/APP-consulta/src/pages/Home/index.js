import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title } from 'react-native-paper';

export default function Home() {
    const navigation = useNavigation();

    function navigateToDetails() {
        navigation.navigate('Detalhes');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Bem-vindo ao Aplicativo de Consulta Médica</Text>
                </View>

                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>Consultas Recentes</Text>
                    <ScrollView horizontal>
                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Consulta 1</Title>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Consulta 2</Title>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Consulta 3</Title>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>Especialidades</Text>
                    <ScrollView horizontal>
                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Cardiologia</Title>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Dermatologia</Title>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Ginecologia</Title>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>Médicos Recomendados</Text>
                    <ScrollView horizontal>
                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Dr. João Silva</Title>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Dra. Maria Santos</Title>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToDetails}>
                            <Card style={styles.card}>
                                <Card.Cover source={require('../../assets/ka.jpg')} />
                                <Card.Content>
                                    <Title>Dr. Pedro Oliveira</Title>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        marginBottom: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
        marginBottom: 20,
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
    },
    card: {
        width: 150,
        height: 250,
        backgroundColor: 'white',
        marginBottom: 10,
        marginRight: 10,
    },
});

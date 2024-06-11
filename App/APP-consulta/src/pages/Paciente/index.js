import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../../service/api';

const Paciente = () => {
    const [consultas, setConsultas] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {
        const fetchPacienteData = async () => {
            const pacienteResponse = await api.get('/paciente/1'); // Altere para o ID correto
            setPaciente(pacienteResponse.data);
            const consultasResponse = await api.get('/consultas/paciente/1'); // Altere para o ID correto
            setConsultas(consultasResponse.data);
        };

        fetchPacienteData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Paciente</Text>
            <Text>Nome: {paciente.nome}</Text>
            <Text>CPF: {paciente.cpf}</Text>
            <Text>Email: {paciente.email}</Text>
            <Text>Telefone: {paciente.telefone}</Text>
            <Text style={styles.title}>Consultas</Text>
            {consultas.map((consulta) => (
                <View key={consulta.id} style={styles.consulta}>
                    <Text>Data: {consulta.data}</Text>
                    <Text>Médico: {consulta.medico}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    consulta: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 8,
    },
});

export default Paciente;

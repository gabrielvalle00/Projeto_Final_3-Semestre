import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../../service/api';

const Medico = () => {
    const [consultas, setConsultas] = useState([]);
    const [medico, setMedico] = useState({});

    useEffect(() => {
        const fetchMedicoData = async () => {
            const medicoResponse = await api.get('/medico/1'); // Altere para o ID correto
            setMedico(medicoResponse.data);
            const consultasResponse = await api.get('/consultas/medico/1'); // Altere para o ID correto
            setConsultas(consultasResponse.data);
        };

        fetchMedicoData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Médico</Text>
            <Text>Nome: {medico.nome}</Text>
            <Text>CPF: {medico.cpf}</Text>
            <Text>Email: {medico.email}</Text>
            <Text>Telefone: {medico.telefone}</Text>
            <Text>Especialidade: {medico.especialidade}</Text>
            <Text style={styles.title}>Consultas</Text>
            {consultas.map((consulta) => (
                <View key={consulta.id} style={styles.consulta}>
                    <Text>Data: {consulta.data}</Text>
                    <Text>Paciente: {consulta.paciente}</Text>
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

export default Medico;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <Text style={styles.drawerHeaderText}>Bem-vindo!</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    drawerHeader: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        marginBottom: 20,
    },
    drawerHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CustomDrawer;

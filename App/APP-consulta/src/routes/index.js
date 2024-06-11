import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../pages/Login';
import Paciente from '../pages/Paciente';
import Medico from '../pages/Medico';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
                <Drawer.Screen name="Login" component={Login} />
                <Drawer.Screen name="Paciente" component={Paciente} />
                <Drawer.Screen name="Medico" component={Medico} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

import React, { useState, useContext, createContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'; // Added imports for DrawerContentScrollView and DrawerItemList
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Paciente from './src/pages/Paciente';
import Medico from './src/pages/Medico';

const AuthContext = createContext();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => {
  const { state, logout } = useContext(AuthContext);

  // Verifica se o usuário está autenticado. Se não estiver, navega para a tela de login
  useEffect(() => {
      if (!state.isAuthenticated) {
          navigation.navigate('Login');
      }
  }, [state.isAuthenticated, navigation]);

  return (
      <Stack.Navigator>
          <Stack.Screen
              name="Home"
              component={Home}
              options={{
                  headerRight: () => (
                      <TouchableOpacity
                          style={styles.loginButton}
                          onPress={() => {
                              state.isAuthenticated ? logout() : navigation.navigate('Login');
                          }}
                      >
                          <Text style={styles.loginButtonText}>
                              {state.isAuthenticated ? 'Sair' : 'Login'}
                          </Text>
                      </TouchableOpacity>
                  ),
              }}
          />
      </Stack.Navigator>
  );
};

const PacienteStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Paciente" component={Paciente} />
        </Stack.Navigator>
    );
};

const MedicoStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Medico" component={Medico} />
        </Stack.Navigator>
    );
};

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};

export default function App() {
  const [state, setState] = useState({
      isAuthenticated: false,
      role: null, // 'paciente' or 'medico'
  });

  const login = (role) => {
      setState({ isAuthenticated: true, role });
  };

  const logout = () => {
      setState({ isAuthenticated: false, role: null });
  };

  return (
      <AuthContext.Provider value={{ state, login, logout }}>
          <NavigationContainer>
              <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
                  <Drawer.Screen name="Home" component={MainStack} />
                  {state.isAuthenticated && state.role === 'paciente' && (
                      <Drawer.Screen name="Paciente" component={PacienteStack} />
                  )}
                  {state.isAuthenticated && state.role === 'medico' && (
                      <Drawer.Screen name="Medico" component={MedicoStack} />
                  )}
              </Drawer.Navigator>
          </NavigationContainer>
      </AuthContext.Provider>
  );
}

const CustomDrawerContent = (props) => {
  const { state, logout } = useContext(AuthContext);

  return (
      <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                  state.isAuthenticated ? logout() : props.navigation.navigate('Login');
              }}
          >
              <Text style={styles.loginButtonText}>
                  {state.isAuthenticated ? 'Sair' : 'Login'}
              </Text>
          </TouchableOpacity>
      </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

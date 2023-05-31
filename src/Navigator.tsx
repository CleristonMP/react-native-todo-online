import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Auth from './screens/Auth';
import TaskList from './screens/TaskList';
import commonStyles from './commonStyles';
import Menu from './screens/Menu';
import AuthOrApp from './screens/AuthOrApp';

const menuConfig: DrawerNavigationOptions = {
  drawerLabelStyle: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: 'normal',
    fontSize: 20,
  },
  drawerActiveTintColor: '#080',
  headerShown: false,
};

const Drawer = createDrawerNavigator();

const MyDrawer = (props: any) => {
  const {email, name} = props.navigation.state.params;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <Menu {...props} email={email} name={name} />}
        screenOptions={menuConfig}
        initialRouteName="Hoje">
        <Drawer.Screen name="Hoje">
          {(props: any) => <TaskList title="Hoje" daysAhead={0} {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Amanhã">
          {(props: any) => <TaskList title="Amanhã" daysAhead={1} {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Semana">
          {(props: any) => <TaskList title="Semana" daysAhead={7} {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Mês">
          {(props: any) => <TaskList title="Mês" daysAhead={30} {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const mainRoutes = {
  AuthOrApp: {
    name: 'AuthOrApp',
    screen: AuthOrApp,
  },
  Auth: {
    name: 'Auth',
    screen: Auth,
  },
  Home: {
    name: 'Home',
    screen: MyDrawer,
  },
};

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'AuthOrApp',
});

export default createAppContainer(mainNavigator);

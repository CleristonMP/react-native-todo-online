import React from 'react';
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

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
const Stack = createNativeStackNavigator();

type StackNavigation = {
  AuthOrApp: undefined;
  Auth: undefined;
  Home: {
    user: string;
    email: string;
  };
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

const MyDrawer = (props: any) => {
  const {email, name} = props.route.params;

  return (
    <Drawer.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={componentProps => (
        <Menu {...componentProps} email={email} name={name} />
      )}
      screenOptions={menuConfig}
      defaultStatus="closed"
      initialRouteName="Hoje">
      <Drawer.Screen name="Hoje">
        {componentProps => (
          <TaskList title="Hoje" daysAhead={0} {...componentProps} />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Amanhã">
        {componentProps => (
          <TaskList title="Amanhã" daysAhead={1} {...componentProps} />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Semana">
        {componentProps => (
          <TaskList title="Semana" daysAhead={7} {...componentProps} />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Mês">
        {componentProps => (
          <TaskList title="Mês" daysAhead={30} {...componentProps} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthOrApp" component={AuthOrApp} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Home" component={MyDrawer} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default Navigator;

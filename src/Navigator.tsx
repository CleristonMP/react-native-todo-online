import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Auth from './screens/Auth';
import TaskList from './screens/TaskList';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Hoje">
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
}

const mainRoutes = {
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
  initialRouteName: 'Auth',
});

export default createAppContainer(mainNavigator);

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationState} from '@react-navigation/native';
import axios from 'axios';
import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {NavigationParams, NavigationScreenProp} from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

export default class AuthOrApp extends Component<Props> {
  async componentDidMount() {
    const userDataJson = await AsyncStorage.getItem('userData');
    let userData = null;
    try {
      userData = JSON.parse(userDataJson!);
    } catch (e) {
      // userData inválido
    }

    if (userData && userData.token) {
      axios.defaults.headers.common.Authorization = `bearer ${userData.token}`;
      this.props.navigation.navigate('Home', userData);
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

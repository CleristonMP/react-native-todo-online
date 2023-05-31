import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export default class AuthOrApp extends Component {
  async componentDidMount() {
    const componentProps: any = this.props;

    const userDataJson = await AsyncStorage.getItem('userData');
    let userData = null;
    try {
      userData = JSON.parse(userDataJson!);
    } catch (e) {
      // userData inválido
    }

    if (userData && userData.token) {
      axios.defaults.headers.common.Authorization = `bearer ${userData.token}`;
      componentProps.navigation.navigate('Home', userData);
    } else {
      componentProps.navigation.navigate('Auth');
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

import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class AuthOrApp extends Component {
  async componentDidMount() {
    const userDataJson = await AsyncStorage.getItem('userData');
    var userData = null;

    try {
      userData = JSON.parse(userDataJson);
    } catch (e) {
      console.error(e);
    }

    if (userData && userData.token) {
      axios.defaults.headers.common['Authorization'] = `bearer ${
        userData.token
      }`;
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

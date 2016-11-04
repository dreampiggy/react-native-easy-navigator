import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import TestPage from './TestPage';

const SCENE_INDEX = {
  TESTPAGE: 0,
};

export default class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  _onForward(tag) {
    switch (tag) {
      case SCENE_INDEX.TESTPAGE:
        this.props.navigator.push({
          ...this.props.route,
          component: TestPage,
          title: 'TestPage',
          leftButtonIcon: require('./images/left.png'),
          onLeftButtonPress: () => this.props.navigator.pop(),
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this._onForward.bind(this)(SCENE_INDEX.TESTPAGE)}>
          <Text>Tap me to push to the test scene</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

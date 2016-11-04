import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Navigator,
  NavigatorIOS,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';

import NavigationBar from 'react-native-navbar';

export default class EasyNavigator extends Component {
  static propTypes = {
    configureScene: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]),
    title: Image.propTypes.source

  }

  static defaultProps = {
    ...Component,
    nativeIOS: false,
    nativeIOSBarHeight: 64, // iOS Navbar 44 and statusbar 20
  }

  constructor(props) {
    super(props);
  }

  render() {
    let route = this.props.initialRoute;
    if (!route) return;

    if (this.props.nativeIOS) { // for iOS native navigation controller
      if (Platform.OS === 'ios') {
        initialRouteIOS = {
          component: route.component,
          passProps: route.passProps,
          title: route.title,
          titleImage: route.titleImage,
          leftButtonIcon: route.leftButtonIcon,
          leftButtonTitle: route.leftButtonTitle,
          onLeftButtonPress: route.onLeftButtonPress,
          rightButtonIcon: route.rightButtonIcon,
          rightButtonTitle: route.rightButtonTitle,
          onRightButtonPress: route.onRightButtonPress,
        }

        this._customizeStatusBar(route.statusBar);

        return (
          <NavigatorIOS
            initialRoute={initialRouteIOS}
            itemWrapperStyle={{marginTop: this.props.nativeIOSBarHeight}}
            barTintColor={route.tintColor ? route.tintColor : null}
            tintColor={route.buttonColor ? route.buttonColor : null}
            titleTextColor={route.titleColor ? route.titleColor : null}
            style={{flex: 1}} />
        );
      }
    }

    return (
      <Navigator
        initialRoute={route}
        renderScene={this._renderScene.bind(this)}
        configureScene={this._configureScene.bind(this)} />
    );
  }

  _customizeStatusBar(data) {
    if (Platform.OS === 'ios') {
      const animated = (data.animated || NavigationBar.defaultProps.statusBar.animated)
      if (data.style) {
        StatusBar.setBarStyle(data.style, animated);
      }
      if (data.hidden !== undefined) {
        let showHideTransition = 'none';
        if (animated) {
          showHideTransition = data.hidden ?
            (data.hideAnimation || NavigationBar.defaultProps.statusBar.hideAnimation) :
            (data.showAnimation || NavigationBar.defaultProps.statusBar.showAnimation);
        }
        StatusBar.setHidden(data.hidden, showHideTransition);
      }
    }
  }

  _configureScene(route, routeStack) {
    let animate = Platform.OS === 'ios' ? this.props.animateIOS : this.props.animateAndroid;
    if (animate) {
      if (typeof(animate) === 'function') {
        return animate(route, routeStack);
      } else if (typeof(animate) === 'string') {
        return Navigator.SceneConfigs[animate] ? Navigator.SceneConfigs[animate]
          : null; // default
      }
    } else {
      return null;
    }
  }

  _titleConfig(titleObj) {
    if (titleObj.titleView) { //优先处理View
      return (
        <View style={styles.title}>
          <TouchableOpacity onPress={titleObj.onTitlePress}>
            {titleObj.titleView}
          </TouchableOpacity>
        </View>
      )
    } else if (titleObj.titleImage) { //然后图片
      return (
        <View style={styles.title}>
          <TouchableOpacity onPress={titleObj.onTitlePress}>
            <View source={titleObj.titleImage} />
          </TouchableOpacity>
        </View>
      )
    } else { //字符串
      return {
        title: titleObj.title,
        style: styles.title,
        tintColor: titleObj.titleColor,
      }
    }
  }


  _buttonConfig(buttonObj) {
    if (buttonObj.buttonView) {
      return (
        <View style={styles.button}>
          <TouchableOpacity onPress={buttonObj.onButtonPress}>
            {buttonObj.buttonView}
          </TouchableOpacity>
        </View>
      );
    } else if (buttonObj.buttonImage) {
      return (
        <View style={styles.button}>
          <TouchableOpacity onPress={buttonObj.onButtonPress}>
            <Image source={buttonObj.buttonImage} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return {
        title: buttonObj.buttonTitle,
        tintColor: buttonObj.buttonColor,
        handler: buttonObj.buttonPress,
      }
    }
  }

  _renderScene(route, navigator) {
    let titleObj = {
      title: route.title,
      titleColor: route.titleColor,
      titleImage: route.titleImage,
      titleView: route.titleView,
      titlePress: route.onTitlePress,
    };
    let leftButtonObj = {
      buttonTitle: route.leftButtonTitle,
      buttonColor: route.buttonColor,
      buttonImage: route.leftButtonIcon,
      buttonView: route.leftButtonView,
      onButtonPress: route.onLeftButtonPress,
    };
    let rightButtonObj = {
      buttonText: route.rightButtonTitle,
      buttonColor: route.buttonColor,
      buttonImage: route.rightButtonIcon,
      buttonView: route.rightButtonView,
      onButtonPress: route.onRightButtonPress,
    }

    return (
      <View style={{flex: 1}}>
        <NavigationBar
          style={route.style}
          tintColor={route.tintColor}
          statusBar={route.statusBar}
          title={this._titleConfig.bind(this)(titleObj)}
          leftButton={this._buttonConfig.bind(this)(leftButtonObj)}
          rightButton={this._buttonConfig.bind(this)(rightButtonObj)} />
        <route.component route={route} navigator={navigator} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    width: 44,
    height: 44,
  },
})

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import TNNavigator from './components/TNNavigator';
import HomePage from './components/HomePage';

class AwesomeProject extends Component {
  render() {
    return (
      <TNNavigator
        initialRoute={{ //Route定义为这个Navigator的路由，包括每次跳转需要的参数，NavigationBar配置
          component: HomePage, //render的Component
          title: 'Home Senen', //导航栏标题
          style: null, //自定义导航栏样式
          tintColor: '#22ca92', //导航栏背景色
          titleColor: '#ffffff', //导航栏标题颜色,
          titleImage: null, //导航栏标题图片
          titleView: null, //自定义RN视图(原生无效)
          onTitlePress: null, // 导航栏标题点击方法
          backButtonIcon: require('./images/left.png'),
          leftButtonTitle: 'Back', // 左侧按钮标题
          leftButtonIcon: require('./images/time.png'), //左侧按钮图片
          leftButtonView: null, // 自定义RN视图(原生无效)
          onLeftButtonPress: null, // 左侧按钮点击方法，默认为pop返回上一级
          rightButtonTitle: 'Share', // 右侧按钮标题
          rightButtonIcon: require('./images/share.png'), //右侧按钮图片
          rightButtonView: null, // 自定义RN视图(原生无效)
          onRightButtonPress: () => Alert.alert('Share Button', 'Weibo',[
            {text: 'OK', onPress: () => console.log('OK Pressed')}]), // 右侧按钮点击方法，默认无值
          buttonColor: 'white', // 左右侧按钮颜色（仅在按钮为字符串时，或者原生时有效）
          statusBar: {
            style: 'default', //状态栏颜色，light-content指白色，default（默认）为黑色
            hidden: false, //是否隐藏状态栏
            tintColor: null, //状态栏背景色
            hideAnimation: 'none', //隐藏导航栏动画，fade淡出，slide滑出，none（默认）为无动画
            showAnimation: 'slide', //显示导航栏动画
          },
        }}
        nativeIOS={false}
        animateIOS='HorizontalSwipeJump' //参考Navigator的转场动画(iOS)，当native时无效，参数为字符串或者可以自定义函数
        animateAndroid='FloatFromBottomAndroid' //转场动画(Android)
      />
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

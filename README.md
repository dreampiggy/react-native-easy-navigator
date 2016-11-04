# EasyNavigator

## 功能:
+ 通过对Navigator和Navigator.NavigationBar的封装，对外提供一个导航栏组件，可对Android和iOS提供差异化配置，对外接口透明，随时切换原生或者JS（先暂时做iOS的，利用NavigatorIOS）
+ 允许自定义左Button，右Button，title的View（比如用图片），提供方法来配置左Button，右Button，title的点击回调方法。如果导航栏按钮提供自定义View（推荐），那么优先处理；同样，图片优先级大于文字；
+ 允许自定义设备状态栏（最顶部）的简单样式，隐藏状态栏
+ 由于使用了原生的Navigator封装，这样可以使用所有官方文档中对应的方法。但由于Navigator是NavigatorIOS的严格超集，且JS语言的动态性，为了兼容在配置时指定NavigatorIOS，仅使用NavigatorIOS有的方法：push, popN, pop, replaceAtIndex, replace, replacePrevious, popToTop, popToRoute, replacePreviousAndPop, resetTo。
+ 接上一条，如果配置使用原生，props如果使用Navigator独有的函数（比如onDidFocus），将不会起作用
+ 不同于原生Navigator固定死Navigator的配置，封装后可以在每次转场之前（通过push方法传入navigationBar对象）来配置新页面的NavigationBar的样式，支持按钮点击，转场动画等


## 配置:

```jsx
<EasyNavigator
  initialRoute={{ //Route定义为这个Navigator的路由，包括每次跳转需要的参数，NavigationBar配置
    component: HomePage, //render的Component
    title: 'Home Senen', //导航栏标题
    style: null, //自定义导航栏样式
    tintColor: '#22ca92', //导航栏背景色
    titleColor: '#ffffff', //导航栏标题颜色,
    titleImage: null, //导航栏标题图片(原生无效)
    titleView: null, //自定义RN视图(原生无效)
    onTitlePress: null, // 导航栏标题点击方法
    leftButtonTitle: 'Back', // 左侧按钮标题
    leftButtonIcon: require('./images/time.png'), //左侧按钮图片
    leftButtonView: null, // 自定义RN视图(原生无效),三者优先级为View>Icon>Title
    onLeftButtonPress: null, // 左侧按钮点击方法
    rightButtonTitle: 'Share', // 右侧按钮标题
    rightButtonIcon: require('./images/share.png'), //右侧按钮图片
    rightButtonView: null, // 自定义RN视图(原生无效)
    onRightButtonPress: () => Alert.alert('Share Button', 'Weibo',[
      {text: 'OK', onPress: () => console.log('OK Pressed')}]), // 右侧按钮点击方法
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
```

## 转场使用：

```jsx
_onPress() {
  this.props.navigator.push({
    ...this.props.route,
    component: TestPage,
    title: 'TestPage',
    leftButtonIcon: require('../images/left.png'),
    onLeftButtonPress: () => this.props.navigator.pop(),
    passProps: {
    	data: ['a', 'b', 'c'],
    	param: 123
    }
  })
}
```

## 转场传参

Navigator中，route表示的是当前的路由状态，在EasyNavigator中，除了最基本的component是必选的，navigationBar在不提供时，将使用初始配置的样式，其它参数都是自定义的，但为了避免同Navigator自身的属性干扰，建议传参均放在`passProps`属性下，参考示例

push方法的入参就是一个route，我们在这里可以传递给下一个Component需要的参数，在对应的NextComponent中，就可以获得两个额外的props，一个是route，包括了push进去的所有对象（component, passProps, title等），可以理解为iOS的segue传值或者Android的intent传参。

另一个props是navigator，相当于iOS的UINavigationController，可以控制导航栈，push和pop


## 关于后续发展

1. 考虑使用redux来管理参数传递问题，由于统一把所有state存到store中，更容易解决push过去的子组件想要传参到父组件的问题（在不使用redux的情况下，需要在push的时候往`passProps`传一个callback function，也可以解决）
2. 考虑Android方面使用原生的Activity之类形式，或者提供更好的模拟原生转场的动画
import React from 'react';
import { StyleSheet, FlatList, Text, View, Icon, ListView, Animated, Platform } from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

import FlatGrid from './FlatGrid'
import SwipUser from './SwipUser'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const STATUS_BAR_HEIGHT = (Platform.OS === 'ios') ? 20 : 0 ;
const NAVBAR_HEIGHT = 150;

const NB_ROW = 30;

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 2,
        backgroundColor: "white",
      }}
    />
  );
};

export default class LaunchScreen extends React.Component {
  
  constructor(props) {
  super(props);

  this.state = {
      loading: true,
      data: [],
      page: 1,
      seed: 1,
      activeRow: null,
      scrollAnim: new Animated.Value(0),
    };
  }
  
  componentDidMount() {
    this.makeRemoteRequest();
  }

  // to get a random user from a free API name
  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=${NB_ROW}`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          loading: false,
        });
      })
      .catch(error => {
        console.log(`Error Remote Request ${error}`);
      });
  };

  // To have a unique row collapsed
  setSelected = (activeRow, collapsed) => {
    this.setState({
      activeRow: collapsed === false ? null : activeRow
    })
  }
  
  // Animation to get a biggest header when change tab
  _onChangeTab = () => {
    Animated.timing(                     
      this.state.scrollAnim,                    
      {
        toValue: 1,                            
      }
    ).start();  
  }

  render() {

    const navbarOpacity = this.state.scrollAnim.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }); 

    const headerHeight = this.state.scrollAnim.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [NAVBAR_HEIGHT/2, STATUS_BAR_HEIGHT],
      extrapolate: 'clamp',
    });

    if (this.state.loading === true)
      return (<View/>)

    return (
      <View style={styles.mainContainer}>
        
        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <View style={styles.bar}>
            <Animated.Text style={[styles.title,{ opacity: navbarOpacity}]}>
              SlideOfSwip
            </Animated.Text>
          </View>
        </Animated.View>
        <ScrollableTabView
          onChangeTab={this._onChangeTab}
          style={[styles.scrollTabView]}
          renderTabBar={() => <DefaultTabBar />}
          >
          <View tabLabel='Random List' style={{flex:1}}>
            <FlatGrid
                data={this.state.data}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
              )}/>
          </View>
          <View tabLabel='Filter List' style={{flex:1}}>
              <SwipUser 
                data={this.state.data}
              />
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  scrollTabView:{
    flex:1,
  },
  mainContainer: {
    flex:1,
    backgroundColor: '#EFEFEF'
  },
  header: {
    backgroundColor: '#FF3B3F',
    overflow: 'hidden',
    height: NAVBAR_HEIGHT
  },
  bar: {
    marginTop: STATUS_BAR_HEIGHT,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
})
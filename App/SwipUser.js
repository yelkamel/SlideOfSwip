
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';

import FilterSelector from './FilterSelector'

export default class FlatGrid extends React.Component {
    static propTypes = {
        data: PropTypes.array,
      };
    
    static defaultProps = {
        data: [{}]
    };

    constructor(props) {
        super(props);
        this.state = {
            gender: 'male',
        };
    }

    renderPage = (data, gender) => {
       return data.filter(val => val.gender === gender).map((rowData) => 
       <View
        key={rowData.id} 
        style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
            style={{height: 100, width: 100, margin: 10, borderRadius: 20}}
            source={{uri: rowData.picture.thumbnail }} />
            <Text style={styles.subtext}> 
            {`${rowData.name.first} ${rowData.name.last}`}
            </Text>
      </View>)
    }

    render() {
    const {data} = this.props;
    const {gender} = this.state;

    return (
    <View style={styles.mainView}>
        <FilterSelector 
            setGender={(gender) => this.setState({gender})}/>
        <Swiper 
            style={styles.swipView}
            showsButtons={true}
            loop={false}
            removeClippedSubviews={false}
            automaticallyAdjustContentInsets={true}>
            {this.renderPage(data, gender)}
        </Swiper>
    </View>
    );
  }
}
var styles = StyleSheet.create({
    text: {
        color: 'grey',
        fontSize: 30,
        fontWeight: 'bold',
    },
    mainView:
    {
        flex:1
    },
    swipView:{
        backgroundColor: '#FF3B3F'
    },
    subtext:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        margin: 5,
    },
})



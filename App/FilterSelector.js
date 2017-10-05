
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';

export default class FilterSelector extends React.Component {
    static propTypes = {
        setGender: PropTypes.func.isRequired,
      };
    
    static defaultProps = {
        setGender: () => null
    };

    constructor(props) {
        super(props);
        this.state = {
            gender: 'male',
        };
    }

    setGender = (gender) => {
        this.setState({ gender })
        this.props.setGender(gender)
    }

    renderButton(gender) {
        var opacity = (gender == this.state.gender) ? 1 : 0.6
        return (
            <TouchableHighlight style={[styles.buttonView, {opacity}]}>
                <Text 
                    style={styles.text}
                    onPress={() => this.setGender(gender)}>
                    {gender} 
                </Text> 
            </TouchableHighlight>
        )
    }

    render() {
    const {gender } = this.state;
    
    return (
    <View style={styles.mainView}>
        {this.renderButton('male')}
        {this.renderButton('female')}
    </View>
    );
  }
}
var styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5
    },
    buttonView:{
        backgroundColor: 'navy',
        borderRadius: 10,
        overflow: 'hidden',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    mainView:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:50,
    }
})



import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text,TouchableWithoutFeedback, Image, View } from 'react-native';
import Collapsible from './Collapsible'

export default class CollapsibleRow extends React.PureComponent {

  render() {
    const { rowData, rowId ,collapsed } = this.props;
    
    return (
     <View style={styles.mainContainer}>
        <TouchableWithoutFeedback
        onPress={() => this.props.setSelected(rowId, collapsed)} >
        <View style={styles.rowView}>
          <Text style={styles.text}> 
            {rowData.email}
          </Text>
        </View>
        </TouchableWithoutFeedback>
        <Collapsible
          collapsed={this.props.collapsed}
          align="center"
          duration={100}
        >
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{height: 50, width: 50, margin: 3, borderRadius: 20}}
            source={{uri: rowData.picture.thumbnail }} />
          <Text style={styles.subtext}> 
          {`${rowData.name.first} ${rowData.name.last}`}
          </Text>
        </View>
        </Collapsible>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 20,
    margin: 3,
  },
  rowView:
  {
    backgroundColor: 'grey', 
    flex:1
  },
  subtext:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    margin: 5,
  },
  mainContainer:{
    backgroundColor: '#FF3B3F',
    flex: 1,        
  }
})
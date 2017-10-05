
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, FlatList, View } from 'react-native';

import CollapsibleRow from './CollapsibleRow'

const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          justifyContent:'center',
          width: 400,
          backgroundColor: "white",
        }}
      />
    );
};

export default class FlatGrid extends React.PureComponent {
    static propTypes = {
        data: PropTypes.array,
      };
    
    static defaultProps = {
        data: [{}]
    };

    constructor(props) {
        super(props);
        this.state = {
            activeRow: null,
        };
    }

    setSelected = (activeRow, collapsed) => {    
        this.setState({
            activeRow: collapsed === false ? null : activeRow
        })
    }

    render() {
    const {rowData, rowIndex ,collapsed } = this.props;
    
    return (
    <View tabLabel='Next Event' >
        <FlatList
            {...this.props}
            data={this.props.data}
            renderItem={({item, index}) => <CollapsibleRow 
                rowData={item}
                rowId={index}
                setSelected={this.setSelected}
                collapsed={this.state.activeRow !== index}/>
            }
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={item => item.email}
            selected={this.state.activeRow}
            onEndReachedThreshold={50}
            scrollRenderAheadDistance={10}
            scrollEventThrottle={16}
            />
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
    }
})



import React from 'react';
import { Appbar } from 'react-native-paper';

/**
 * App头部导航
 */
export default class AppHeader extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return (
            <Appbar.Header>
              {this.props.back ? <Appbar.BackAction onPress={()=>{this.props.navigation.goBack();}} /> : null}
              <Appbar.Content title="文档扫描" />
            </Appbar.Header>
          );
    }
}
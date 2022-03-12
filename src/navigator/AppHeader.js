import React from 'react';
import { Appbar } from 'react-native-paper';
import NavigationService from './NavigationService';

/**
 * App头部导航
 * 如果其他页面需要定制header就在当前文件夹下新建一个js文件
 */
export default class AppHeader extends React.Component {

    constructor(props){
        super(props);
        //console.log("AppHeader.props",props.options.title);
    }
    render(){
        return (
            <Appbar.Header>
              {this.props.back ? <Appbar.BackAction onPress={()=>{NavigationService.goBack();}} /> : null}
              <Appbar.Content title={this.props.options.title||this.props.route.name} />
            </Appbar.Header>
          );
    }
}
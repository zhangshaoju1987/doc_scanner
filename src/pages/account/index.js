import React from "react";
import { Button,Text } from "react-native-paper";
import Settings from "./Settings";
import NavigationService from "../../navigator/NavigationService";

export default class Account extends React.Component{
    constructor(props){
        super(props);
    }

    toPage(routerName){
        NavigationService.navigate(routerName);
    }
    render(){
        return (
            <React.Fragment>
                <Button mode="contained" onPress={this.toPage.bind(this,"Settings")} style={{margin:20}}>设置</Button>
                <Text>如果是同一个wifi网络,可以开启网络服务,用户可以再电脑上通过访问网页的方式,访问文档信息</Text>
            </React.Fragment>
        )
    }
}

export {Settings}
import React from "react";
import { Button } from "react-native-paper";
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
            </React.Fragment>
        )
    }
}

export {Settings}
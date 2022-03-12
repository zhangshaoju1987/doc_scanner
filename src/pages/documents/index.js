import React from "react";
import { Button } from "react-native-paper";
import Certificate from "./Certificate";
import Invoice from "./Invoice";
import NavigationService from "../../navigator/NavigationService";

export default class Document extends React.Component{
    constructor(props){
        super(props);
    }

    toPage(routerName){
        NavigationService.navigate(routerName);
    }
    render(){
        return (
            <React.Fragment>
                <Button mode="contained" onPress={this.toPage.bind(this,"Invoice")} style={{margin:20}}>我的发票</Button>
                <Button mode="contained" onPress={this.toPage.bind(this,"Certificate")} style={{margin:20}}>我的证件</Button>
            </React.Fragment>
        )
    }
}

export {Invoice,Certificate}
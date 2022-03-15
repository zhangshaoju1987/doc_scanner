import React from "react";
import {View,StyleSheet} from "react-native";
import { Button,Caption,Headline,HelperText,Switch,Text } from "react-native-paper";
import Settings from "./Settings";
import NavigationService from "../../navigator/NavigationService";

export default class Account extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            netService:true
        };
    }

    toPage(routerName){
        NavigationService.navigate(routerName);
    }
    render(){
        return (
            <React.Fragment>
                <View style={styles.list}>
					<View style={styles.listBox}>
						<View>
							<Headline>允许浏览器访问</Headline>
						</View>
                        <Switch style={{margin:8}} value={this.state.netService} onValueChange={(flag)=>{this.setState({netService:flag})}} />
					</View>
                    <HelperText visible={true}>
                        您可以通过 http://10.3.40.18 访问该app上的文档资源
                    </HelperText>
                    <HelperText visible={true}>
                        需要手机和电脑在同一个wifi下
                    </HelperText>
				</View>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    list: {
		height: 100,
		borderStyle: "solid",
        padding:5,
		borderBottomColor: "#dedede",
		backgroundColor: '#fff'
	},
    listBox: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',

	}
});


export {Settings}
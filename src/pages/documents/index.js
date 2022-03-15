import React from "react";
import {StyleSheet,Dimensions,View} from "react-native";
import Certificate from "./Certificate";
import Invoice from "./Invoice";
import NavigationService from "../../navigator/NavigationService";
import { store } from '../../redux/store';
import * as settingAction from "../../redux/action/settingAction";
import { Touchable } from "../../components/Touchable";
import { IconButton, Text } from "react-native-paper";

export default class Document extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        store.dispatch(settingAction.showTabBar());
    }
    toPage(routerName){
        NavigationService.navigate(routerName);
    }
    render(){
        return (
            <View style={styles.list}>

                <Touchable
                    onPress={this.toPage.bind(this,"Invoice")}>
                    <View style={styles.listBox}>
                        <IconButton
                            icon="file-document"
                            size={50}
                            color="#87C0CA"
                            style={styles.listBoxImg}
                        />
                        <Text style={styles.listBoxText}>发票</Text>
                    </View>
                </Touchable>

                <Touchable
                    onPress={this.toPage.bind(this,"Certificate")}>
                    <View style={styles.listBox}>
                        <IconButton
                            icon="certificate"
                            size={50}
                            color="#C12C1f"
                            style={styles.listBoxImg}
                        />
                        <Text style={styles.listBoxText}>证书</Text>
                    </View>
                </Touchable>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    list: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		marginTop: 50,
		paddingLeft: 40,
		paddingRight: 40,
		borderBottomWidth: 0.5,
		borderStyle: "solid",
		borderBottomColor: "#dedede",
		paddingBottom: 40
	},
	listBox: {
		width: (Dimensions.get("window").width - 40 * 2 - 40) / 4,
		marginRight: 10,
		marginBottom: 10,
		alignItems: 'center',
	},
	listBoxImg: {
		width: 50,
		height: 50,
	},

	listBoxText: {
		fontSize: 13,
		paddingTop: 0,
		textAlign: 'center'
	}
});

export {Invoice,Certificate}
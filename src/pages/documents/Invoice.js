import React from "react";
import {View,Image,ScrollView} from "react-native";
import { Button, Colors, Divider } from "react-native-paper";
import { connect } from "react-redux";
import {store} from "../../redux/store";
import * as invoiceAction from "../../redux/action/invoiceAction";
/**
 * 我的发票展示
 */
class Invoice extends React.Component{
    constructor(props){
        super(props);
    }
    ocr(doc){
        console.log("ocr识别",doc.id,doc.viewHeight,doc.viewWidth);
    }
    remove(id){
        store.dispatch(invoiceAction.removeInvoice(id));
    }
    render(){
        return (
            <ScrollView>
                {
                    this.props.invoiceList.map((item)=>(
                    <View key={item.id}>
                        <Image style={{width:item.viewWidth*0.2,height:item.viewHeight*0.2}} source={{uri:item.uri}} />
                        <Button mode="contained" color={Colors.brown200} onPress={()=>{this.ocr(item)}}>发票识别</Button>
                        <Button mode="contained" color={Colors.blue50} onPress={()=>{this.remove(item.id)}}>删除发票</Button>
                        <Divider/>
                    </View>
                    ))
                }
            </ScrollView>
        );
    }
}

const mapStateToProps = (state)=>{
    const {invoice:{invoiceList}} = state;
    console.log("检测到",invoiceList.length,"张发票");
    return {invoiceList};
}

export default connect(mapStateToProps)(Invoice);
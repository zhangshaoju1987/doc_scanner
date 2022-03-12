import React from "react";
import {View,Image,ScrollView} from "react-native";
import { Button, Divider } from "react-native-paper";
import { connect } from "react-redux";
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
    render(){
        return (
            <ScrollView>
                {
                    this.props.invoiceList.map((item)=>(
                    <View key={item.id}>
                        <Image style={{width:item.viewWidth*0.2,height:item.viewHeight*0.2}} source={{uri:item.uri}} />
                        <Button mode="contained" onPress={()=>{this.ocr(item)}}>ORC识别</Button>
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
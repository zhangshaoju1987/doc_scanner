import React from "react";
import {View,Image,ScrollView,StyleSheet} from "react-native";
import { Button, Colors, Divider, FAB, Portal,Text } from "react-native-paper";
import { connect } from "react-redux";
import {store} from "../../redux/store";
import * as invoiceAction from "../../redux/action/invoiceAction";
import OcrClient from "../../clients/OcrClient";


/**
 * 我的发票展示
 */
class Invoice extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    ocr(doc){
        console.log("ocr识别",doc.id,doc.viewHeight,doc.viewWidth);
        if(doc.ocrInfo){
            this.setState({ocrResult:JSON.stringify(doc.ocrInfo,null,2)});
            return;
        }
        this.setState({recoginzing:true})
        const image = doc.uri.replace("data:image/jpeg;base64,","");
        OcrClient.vatInvoice(image)
        .then((resp)=>{
            this.setState({ocrResult:JSON.stringify(resp,null,2),recoginzing:false});
            store.dispatch(invoiceAction.addOcrResult(doc.id,resp));
        })
        .catch(err=>{
            console.log("识别出现错误",err);
            this.setState({ocrResult:undefined,recoginzing:false});
        });
    }
    remove(id){
        store.dispatch(invoiceAction.removeInvoice(id));
    }
    render(){

        return (
            <View>
                <ScrollView>
                {
                    this.props.invoiceList.map((item)=>(
                    <View key={item.id}>
                        <Image style={{width:item.viewWidth*0.2,height:item.viewHeight*0.2}} source={{uri:item.uri}} />
                        <Button mode="contained" disabled={this.state.recoginzing} loading={this.state.recoginzing} color={Colors.brown200} onPress={()=>{this.ocr(item)}}>发票识别</Button>
                        <Button mode="contained" color={Colors.blue50} onPress={()=>{this.remove(item.id)}}>删除发票</Button>
                        <Divider/>
                    </View>
                    ))
                }
                </ScrollView>
                {
                this.state.ocrResult &&
                <Portal>
                    <ScrollView style={{marginTop:this.props.headerHeight,marginBottom:54,backgroundColor:"white"}}>
                        <Text >
                            {this.state.ocrResult}
                        </Text>
                    </ScrollView>
                    <FAB
                        style={styles.closeFab}
                        small={false}
                        icon="keyboard-return"
                        onPress={() => {this.setState({ocrResult:undefined})}}
                    />
                </Portal>
                }
                
            </View>
        );
    }
}

const mapStateToProps = (state)=>{
    const {invoice:{invoiceList},setting:{headerHeight}} = state;
    //console.log("检测到",invoiceList.length,"张发票");
    return {invoiceList,headerHeight};
}


const styles = StyleSheet.create({
    closeFab: {
      position: 'absolute',
      margin: 32,
      right: "38%",
      bottom: 40,
  }
});
export default connect(mapStateToProps)(Invoice);
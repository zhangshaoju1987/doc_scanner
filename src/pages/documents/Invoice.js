import React from "react";
import {View,Image,ScrollView,StyleSheet,Alert} from "react-native";
import { Button, Colors, Divider, FAB, Portal,Text } from "react-native-paper";
import { connect } from "react-redux";
import ImageView from "react-native-image-viewing";


import {store} from "../../redux/store";
import * as invoiceAction from "../../redux/action/invoiceAction";
import OcrClient from "../../clients/OcrClient";
import { Touchable } from "../../components/Touchable";


/**
 * 我的发票展示
 */
class Invoice extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isVisible:false,
            recoginzing:{}
        }
    }
    ocr(doc){
        console.log("ocr识别",doc.id,doc.viewHeight,doc.viewWidth);
        if(doc.ocrInfo){
            this.setState({ocrResult:JSON.stringify(doc.ocrInfo,null,2)});
            return;
        }
        const recoginzing = this.state.recoginzing;
        recoginzing[doc.id] = true;
        this.setState({recoginzing})
        const image = doc.uri.replace("data:image/jpeg;base64,","");
        OcrClient.vatInvoice(image)
        .then((resp)=>{
            recoginzing[doc.id] = false;
            this.setState({recoginzing})
            if(resp.result.ocrInfo.error_code){
                Alert.alert("识别失败",resp.result.ocrInfo.error_msg);
                store.dispatch(invoiceAction.addOcrResult(doc.id,undefined));
                return;
            }
            this.setState({ocrResult:JSON.stringify(resp.result.ocrInfo,null,2)});
            store.dispatch(invoiceAction.addOcrResult(doc.id,resp.result.ocrInfo));
        })
        .catch(err=>{
            console.log("识别出现错误",err);
            recoginzing[doc.id] = false;
            this.setState({ocrResult:undefined,recoginzing});
        });
    }
    remove(id){
        store.dispatch(invoiceAction.removeInvoice(id));
    }
    componentDidMount(){
        const images = [];
        this.props.invoiceList.forEach(element => {
            images.push({uri:element.uri});
        });
        this.setState({images});
    }
    render(){

        return (
            <View>
                <ScrollView>
                {
                    this.props.invoiceList.map((item,idx)=>(
                    <View key={item.id}>
                            <View  style={{flexDirection:"row",alignItems:"center",justifyContent:"center",margin:5}}>
                                <Touchable onPress={()=>{this.setState({isVisible:true,imageIdxToShow:idx})}}>
                                    <Image style={{width:item.viewWidth*0.15,height:item.viewHeight*0.15}} source={{uri:item.uri}} />
                                </Touchable>  
                            </View>
                        
                        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",margin:5}}>
                            <Button style={{margin:5,width:120}} mode="contained" disabled={this.state.recoginzing[item.id]} loading={this.state.recoginzing[item.id]} color={Colors.green600} onPress={()=>{this.ocr(item)}}>
                                {item.ocrInfo?"发票信息":"识别发票"}
                            </Button>
                            <Button style={{margin:5,width:120}} mode="contained" color={Colors.red900} onPress={()=>{this.remove(item.id)}}>删除发票</Button>
                        </View>
                        <Divider/>
                    </View>
                    ))
                }
                </ScrollView>
                {
                this.state.ocrResult &&
                <Portal>
                    <ScrollView style={{marginTop:this.props.headerHeight,marginBottom:this.props.bottomHeight,backgroundColor:"white"}}>
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
                <Portal>
                <ImageView
                    images={this.state.images}
                    imageIndex={this.state.imageIdxToShow}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                        this.setState({isVisible:false})
                    }}
                    />
                </Portal>
            </View>
        );
    }
}

const mapStateToProps = (state)=>{
    const {invoice:{invoiceList},setting:{headerHeight,bottomHeight}} = state;
    //console.log("检测到",invoiceList.length,"张发票");
    return {invoiceList,headerHeight,bottomHeight};
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
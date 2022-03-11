import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform ,Dimensions} from "react-native";
import Permissions from 'react-native-permissions';
import {DocumentCropper,DocumentScanner} from "@zhumi/react-native-document-scanner";
import SplashScreen from "react-native-splash-screen";
import { Button } from "react-native-paper";

//console.log("Dimensions.get('window').width",Dimensions.get('window').width);
export default class Scanner extends React.Component {

  constructor(props){
    super(props);
    this.pdfScannerElement = React.createRef(null);
    this.customCrop = React.createRef(null);
    this.useBase64 = false;
    this.state = {
      allowed:false,
      document:undefined
    }
  }

  setAllowed(allowed){
    this.setState({allowed});
  }
  onPictureTaken(data){

    const uri = this.useBase64?`data:image/jpeg;base64,${data.initialImage}`:data.initialImage;
    //console.log("检测到文档边界:rectangleCoordinates.topLeft=",data.rectangleCoordinates.topLeft);
    Image.getSize(uri, 
      (width, height) => {

        this.setState({
          imageWidth: width,
          imageHeight: height,
          initialImage: uri,
          rectangleCoordinates:data.rectangleCoordinates
        });        
      },
      (err) => {
        console.log("Image.getSize失败",err);
      }
    );
  }

  async requestCamera() {
    const result = await Permissions.request(Platform.OS === "android" ? "android.permission.CAMERA" : "ios.permission.CAMERA");
    if (result === "granted") this.setAllowed(true);
  }

  componentDidMount(){
    SplashScreen.hide();
    this.requestCamera();
  }

  doCapture() {
    this.pdfScannerElement.current.capture()
  }
  crop() {
    this.customCrop.current.crop();
  }
  cancel(){
    this.setState({
      initialImage:undefined,
      document:undefined
    });
  }
  /**
   * 获取到最后裁剪下来的文档
   * @param {string} image 
   * @param {*} newCoordinates 
   */
   onGotDocument(image, newCoordinates) {

    const uri = `data:image/jpeg;base64,${image}`;
    Image.getSize(uri, 
      (width, height) => {
        console.log("文档宽高",width, height);
        const viewWidth = Dimensions.get("window").width;
        const scale = viewWidth/width;
        this.setState({
          document:{
            uri:uri,
            viewWidth,                // 文档展示的宽度
            viewHeight:height*scale   // 文档展示的高度
          },
          rectangleCoordinates:newCoordinates,
          initialImage:undefined,
        });     
      },
      (err) => {
        console.log("文档展示失败",err);
      }
    );
   
    //console.log("成功获取到文档如下\n",image);
  }
  render(){

    if (!this.state.allowed) {
      return (
        <View style={styles.permissions}>
          <Text>等待获取相机权限</Text>
        </View>
      )
    }
    if(this.state.document?.uri){
      //console.log("this.state.document",this.state.document.substring(0,100));
      const doc = this.state.document;
      return (
        <React.Fragment>
          <Image style={{position:"absolute",width:doc.viewWidth/1.5,height:doc.viewHeight/1.5}} source={{ uri: doc.uri}} resizeMode="contain"/>
          <Button icon="camera" mode="contained" onPress={this.cancel.bind(this)}>
            继续拍下一张
          </Button>
        </React.Fragment>
      )
    }
    if (this.state.initialImage) {
      return (
        <React.Fragment>
          <DocumentCropper
            updateImage={this.onGotDocument.bind(this)}
            rectangleCoordinates={this.state.rectangleCoordinates}
            initialImage={this.state.initialImage}
            height={this.state.imageHeight}
            width={this.state.imageWidth}
            ref={this.customCrop}
            overlayColor="rgba(18,190,210, 1)"
            overlayStrokeColor="rgba(20,190,210, 1)"
            handlerColor="rgba(20,150,160, 1)"
            enablePanStrict={false}
          />
          <Button icon="camera" mode="contained" onPress={this.crop.bind(this)}>
              保存
          </Button>
          <Button icon="camera" mode="contained" onPress={this.cancel.bind(this)}>
              取消
          </Button>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <DocumentScanner
          useBase64={this.useBase64}
          ref={this.pdfScannerElement}
          style={styles.scanner}
          onPictureTaken={this.onPictureTaken.bind(this)}
          overlayColor="rgba(0,0,0, 0.7)"
          enableTorch={true}
          detectionCountBeforeCapture={15}
        />
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined
  },
  button: {
    alignSelf: "center",
    position: "absolute",
    bottom: 32,
  },
  buttonText: {
    backgroundColor: "rgba(245, 252, 255, 0.7)",
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: "100%",
  },
  permissions: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  }
})
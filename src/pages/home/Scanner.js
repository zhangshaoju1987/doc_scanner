import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform ,Dimensions} from "react-native";
import Permissions from 'react-native-permissions';
import {DocumentCropper,DocumentScanner} from "@zhumi/react-native-document-scanner";
import SplashScreen from "react-native-splash-screen";
import { Button } from "react-native-paper";


console.log("Dimensions.get('window').width",Dimensions.get('window').width);
export default class Scanner extends React.Component {

  constructor(props){
    super(props);
    this.pdfScannerElement = React.createRef(null);
    this.customCrop = React.createRef(null);
    this.useBase64 = false;
    this.state = {
      allowed:false
    }
  }

  setAllowed(allowed){
    this.setState({allowed});
  }
  onPictureTaken(data){

    const uri = this.useBase64?`data:image/jpeg;base64,${data.initialImage}`:data.initialImage;
    console.log("检测到文档边界:rectangleCoordinates.topLeft=",data.rectangleCoordinates.topLeft);
    Image.getSize(uri, 
      (width, height) => {

        const scale = 1;
        const rectangleCoordinates = {
          "bottomLeft":{
            "x":data.rectangleCoordinates.bottomLeft.x*scale,
            "y":data.rectangleCoordinates.bottomLeft.y*scale,
          },
          "bottomRight":{
            "x":data.rectangleCoordinates.bottomRight.x*scale,
            "y":data.rectangleCoordinates.bottomRight.y*scale,
          },
          "topLeft":{
            "x":data.rectangleCoordinates.topLeft.x*scale,
            "y":data.rectangleCoordinates.topLeft.y*scale,
          },
          "topRight":{
            "x":data.rectangleCoordinates.topRight.x*scale,
            "y":data.rectangleCoordinates.topRight.y*scale,
          }
        }
        this.setState({
          imageWidth: width,
          imageHeight: height,
          initialImage: uri,
          rectangleCoordinates
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
      image:undefined
    });
  }
  /**
   * 获取到最后裁剪下来的文档
   * @param {string} image 
   * @param {*} newCoordinates 
   */
  updateImage(image, newCoordinates) {
    this.setState({
      image,
      rectangleCoordinates: newCoordinates,
      initialImage:undefined,
    });
    console.log("成功获取到文档newCoordinates=",newCoordinates,"\n",image.substring(0,100));
  }
  render(){

    if (!this.state.allowed) {
      return (
        <View style={styles.permissions}>
          <Text>请求相机权限</Text>
        </View>
      )
    }
    if(this.state.image){
      return (
        <View>
          <Image style={{width:Dimensions.get("window").width}} source={{ uri: `data:image/jpeg;base64,${this.state.image}`}} resizeMode="contain" />
          <Button icon="camera" mode="contained" onPress={this.cancel.bind(this)}>
            重拍
          </Button>
        </View>
        
      )
    }
    if (this.state.initialImage) {
      return (
        <React.Fragment>
          <DocumentCropper
            updateImage={this.updateImage.bind(this)}
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
        <TouchableOpacity onPress={this.doCapture.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>拍照</Text>
        </TouchableOpacity>
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
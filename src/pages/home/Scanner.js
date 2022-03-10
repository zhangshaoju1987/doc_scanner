import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform } from "react-native";
import Permissions from 'react-native-permissions';
import {DocumentCropper,DocumentScanner} from "@zhumi/react-native-document-scanner";
import SplashScreen from "react-native-splash-screen";
import { Button } from "react-native-paper";

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
  setPicture(data){
    const uri = this.useBase64?`data:image/jpeg;base64,${data.initialImage}`:data.initialImage;
    Image.getSize(uri, 
      (width, height) => {
        this.setState({
          imageWidth: width,
          imageHeight: height,
          initialImage: uri,
          rectangleCoordinates: data.rectangleCoordinates
        });
        console.log("width, height",width, height,"rectangleCoordinates=",data.rectangleCoordinates);
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
  /**
   * 获取到最后裁剪下来的文档
   * @param {string} image 
   * @param {*} newCoordinates 
   */
  updateImage(image, newCoordinates) {
    this.setState({
      image,
      rectangleCoordinates: newCoordinates
    });
    console.log("获取到文档",image.substring(0,100));
  }
  render(){

    if (!this.state.allowed) {
      return (<View style={styles.permissions}>
        <Text>请求相机权限</Text>
      </View>)
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
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <DocumentScanner
          useBase64={this.useBase64}
          ref={this.pdfScannerElement}
          style={styles.scanner}
          onPictureTaken={this.setPicture.bind(this)}
          overlayColor="rgba(0,0,0, 0.7)"
          enableTorch={true}
          detectionCountBeforeCapture={5}
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
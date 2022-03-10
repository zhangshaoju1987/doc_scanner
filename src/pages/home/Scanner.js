import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform } from "react-native";
import Permissions from 'react-native-permissions';
import {DocumentCrop,DocumentScanner} from "@zhumi/react-native-document-scanner";
import SplashScreen from "react-native-splash-screen";

export default function App() {
  const pdfScannerElement = useRef(null)
  const [data, setData] = useState({})
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    async function requestCamera() {
      const result = await Permissions.request(Platform.OS === "android" ? "android.permission.CAMERA" : "ios.permission.CAMERA")
      if (result === "granted") setAllowed(true)
    }
    SplashScreen.hide();
    requestCamera();
  }, [])

  function handleOnPressRetry() {
    setData({})
  }
  function doCapture() {
    pdfScannerElement.current.capture()
  }
  if (!allowed) {
    return (<View style={styles.permissions}>
      <Text>请求相机权限</Text>
    </View>)
  }
  if (data.croppedImage) {
    console.log("data", data)
    return (
      <React.Fragment>
        <Image source={{ uri: "data:image/png;base64,"+data.initialImage }} style={styles.preview} />
        <TouchableOpacity onPress={handleOnPressRetry} style={styles.button}>
          <Text style={styles.buttonText}>重试</Text>
        </TouchableOpacity>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <DocumentScanner
        useBase64={true}
        ref={pdfScannerElement}
        style={styles.scanner}
        onPictureTaken={setData}
        overlayColor="rgba(0,0,0, 0.7)"
        enableTorch={true}
        detectionCountBeforeCapture={5}
      />
      <TouchableOpacity onPress={doCapture} style={styles.button}>
        <Text style={styles.buttonText}>拍照</Text>
      </TouchableOpacity>
    </React.Fragment>
  )
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
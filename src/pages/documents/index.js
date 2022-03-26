import React from "react";
import { View, Image, ScrollView, StyleSheet, Alert, PermissionsAndroid,Dimensions } from "react-native";
import { Button, Colors, Divider, FAB, Portal, Text } from "react-native-paper";
import { connect } from "react-redux";
import ImageView from "react-native-image-viewing";
import CameraRoll from "@react-native-community/cameraroll";

import { store } from "../../redux/store";
import * as invoiceAction from "../../redux/action/invoiceAction";
import RNFS from "react-native-fs";
import { Touchable } from "../../components/Touchable";
import {detectDocument,DocumentCropper} from "@zhumi/react-native-document-scanner";
import { launchImageLibrary} from 'react-native-image-picker';

/**
 * 我的发票展示
 */
class Document extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: false,
			recoginzing: {}
		}
		this.customCrop = React.createRef();
	}
	async hasAndroidPermission() {
		const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

		const hasPermission = await PermissionsAndroid.check(permission);
		if (hasPermission) {
			return true;
		}

		const status = await PermissionsAndroid.request(permission);
		return status === 'granted';
	}
	remove(id) {
		Alert.alert(
			"消息提醒",
			"是否确认删除?",
			[
				{
					text: "确认",
					onPress: () => store.dispatch(invoiceAction.removeInvoice(id))
				},
				{
					text: "放弃",
					onPress: () => console.log("OK Pressed")
				}
			]
		);
		;
	}
	test(){
		
		launchImageLibrary({mediaType:"photo",selectionLimit:1}, (resp)=>{

			if(!resp.assets || resp.assets.length == 0){
				return;
			}
			console.log("屏幕宽高：",parseInt(Dimensions.get('window').width)," x ",parseInt(Dimensions.get('window').height));
			console.log("launchImageLibrary",resp);
			const uri = resp.assets[0].uri;
			detectDocument(uri,(res)=>{
				console.log("边界识别",res);
				if(!res.success){
					Alert.alert("消息提醒",res.message);
					return;
				}
				if(!res.size || res.size.width<100 || res.size.height<100){
					Alert.alert("消息提醒","图片太小");
					return;
				}
				this.setState({
					initialImage: uri,
					imageWidth: res.size.width,
					imageHeight: res.size.height,
					rectangleCoordinates:res.rectangleCoordinates
				});
			});		
		});

	}
	async saveToAlbum(doc) {
		//console.log(doc.viewWidth);

		if (Platform.OS === "android" && !(await this.hasAndroidPermission())) {
			return;
		}
		const dir = Platform.OS == "ios" ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath;
		const filePath = `${dir}/${new Date().getTime()}.jpeg`;
		const content = doc.uri.replace("data:image/jpeg;base64,", "");
		console.log("保存文件", filePath);
		RNFS.writeFile(filePath, content, "base64")
			.then(async () => {
				const res = await CameraRoll.save(filePath, { type: "photo", album: "拍文档" });
				console.log("保存到相册", res);
				Alert.alert("消息提醒", "保存成功\n图片在相册的分类目录为:拍文档");
				RNFS.unlink(filePath);
			}).catch((err) => {
				console.log("保存失败", err);
				Alert.alert("消息提醒", "保存失败" + err.message);
			});

	}
	initData(){
		const images = [];
		this.props.invoiceList.forEach(element => {
			images.push({ uri: element.uri });
		});
		this.setState({ images });
	}
	componentDidMount() {
		this.initData();
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.initData();
		});
	}

	componentWillUnmount(){
		this._unsubscribe();
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
				//console.log("文档宽高",width, height);
				const viewWidth = Dimensions.get("window").width;
				const scale = viewWidth/width;
				this.setState({
					document:{
						id:new Date().getTime(),
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

	/**
	 * 保存并识别
	 */
	save(){
		store.dispatch(invoiceAction.addInvoice(this.state.document));
		Alert.alert("消息提醒","已保存到我的文档");
	}

	cancel(){
		this.setState({initialImage:undefined,document:undefined});
	}
	crop() {
		this.customCrop.current.crop();
	}
	render() {

		if(this.state.document?.uri){
			//console.log("this.state.document",this.state.document.substring(0,100));
			const doc = this.state.document;
			return (
				<React.Fragment>
					<Image style={[{width:doc.viewWidth/1.2,height:doc.viewHeight/1.2,flex:1,marginLeft:(doc.viewWidth-doc.viewWidth/1.2)/2}]} source={{ uri: doc.uri}} resizeMode="contain"/>
					<FAB
						style={styles.cancelFab}
						small={false}
						icon="keyboard-return"
						onPress={() => {this.cancel();}}
					/>
				</React.Fragment>
			)
		}
		return (
			<View style={{height:"100%"}}>
				<ScrollView>
					{
						this.props.invoiceList.map((item, idx) => (
							<View key={item.id}>
								<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", margin: 5 }}>
									<Touchable onPress={() => { this.setState({ isVisible: true, imageIdxToShow: idx }) }}>
										<Image style={{ width: item.viewWidth * 0.25, height: item.viewHeight * 0.25 }} source={{ uri: item.uri }} />
									</Touchable>
								</View>
								<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", margin: 5 }}>
									<Button style={{ margin: 5, width: 110 }} mode="contained" onPress={() => { this.saveToAlbum(item) }}>保存到相册</Button>
									<Button style={{ margin: 5, width: 60 }} mode="outlined" color={Colors.red900} onPress={() => { this.remove(item.id) }}>删除</Button>
								</View>
								<Divider />
							</View>
						))
					}
				</ScrollView>
				{
					this.state.ocrResult &&
					<Portal>
						<ScrollView style={{ marginTop: this.props.headerHeight, marginBottom: this.props.bottomHeight, backgroundColor: "white" }}>
							<Text >
								{this.state.ocrResult}
							</Text>
						</ScrollView>
						<FAB
							style={styles.closeFab}
							small={false}
							icon="keyboard-return"
							onPress={() => { this.setState({ ocrResult: undefined }) }}
						/>
					</Portal>
				}
				<Portal>
					<ImageView
						images={this.state.images}
						imageIndex={this.state.imageIdxToShow}
						visible={this.state.isVisible}
						onRequestClose={() => {
							this.setState({ isVisible: false })
						}}
					/>
				</Portal>
				{
					 this.state.initialImage &&
					<Portal>
						<DocumentCropper
							updateImage={this.onGotDocument.bind(this)}
							rectangleCoordinates={this.state.rectangleCoordinates}
							initialImage={this.state.initialImage}
							height={this.state.imageHeight}
							width={this.state.imageWidth}
							imageSource="image"
							ref={this.customCrop}
							overlayColor="rgba(18,190,210, 1)"
							overlayStrokeColor="rgba(20,190,210, 1)"
							handlerColor="rgba(20,150,160, 1)"
							enablePanStrict={false}
						/>
						<FAB
							style={styles.cancelFab}
							small={false}
							icon="keyboard-return"
							onPress={() => {this.cancel();}}
						/>
						<FAB
							style={styles.cropFab}
							small={false}
							icon="scissors-cutting"
							onPress={() => {this.crop();}}
						/>
					</Portal>
				}
				<FAB
					style={styles.importPhotoFAB}
					small={false}
					icon="folder-image"
					onPress={() => {this.test();}}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { invoice: { invoiceList }, setting: { headerHeight, bottomHeight } } = state;
	//console.log("检测到",invoiceList.length,"张发票");
	return { invoiceList, headerHeight, bottomHeight };
}


const styles = StyleSheet.create({
	closeFab: {
		position: 'absolute',
		margin: 32,
		right: "38%",
		bottom: 40,
	},
	importPhotoFAB:{
		position: 'absolute',
		margin: 32,
		right: "38%",
		bottom: 10,
	},
	cancelFab:{
		position: 'absolute',
		backgroundColor:Colors.amber100,
		margin: 32,
		left: "22%",
		bottom: 0,
	  },
	cropFab:{
	position: 'absolute',
	backgroundColor:Colors.amber100,
	margin: 32,
	right: "22%",
	bottom: 0,
	},
});
export default connect(mapStateToProps)(Document);
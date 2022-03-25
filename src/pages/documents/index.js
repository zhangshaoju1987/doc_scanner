import React from "react";
import { View, Image, ScrollView, StyleSheet, Alert, PermissionsAndroid } from "react-native";
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

			console.log("launchImageLibrary",resp);
			const uri = resp.assets[0].uri;
			Image.getSize(uri,(width,height)=>{
				detectDocument(uri,(err,res)=>{
					console.log("width,height",width,height);
					console.log("边界识别",res);
					this.setState({
						imageWidth: width,
						imageHeight: height,
						initialImage: uri,
						rectangleCoordinates:res
					});
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
	onGotDocument(doc){

	}

	render() {

		return (
			<View>
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
									<Button style={{ margin: 5, width: 110 }} color={Colors.blueGrey400} mode="contained" onPress={() => { this.test() }}>边界检测</Button>
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
							ref={this.customCrop}
							overlayColor="rgba(18,190,210, 1)"
							overlayStrokeColor="rgba(20,190,210, 1)"
							handlerColor="rgba(20,150,160, 1)"
							enablePanStrict={false}
						/>
					</Portal>
				}
				
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { invoice: { invoiceList }, setting: { headerHeight, bottomHeight } } = state;
	console.log("检测到",invoiceList.length,"张发票");
	return { invoiceList, headerHeight, bottomHeight };
}


const styles = StyleSheet.create({
	closeFab: {
		position: 'absolute',
		margin: 32,
		right: "38%",
		bottom: 40,
	}
});
export default connect(mapStateToProps)(Document);
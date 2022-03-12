import React from "react";
import {View} from "react-native";
import { Avatar, Button, Card } from "react-native-paper";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
export default class Settings extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Card>
                    <Card.Title title="设置页面" left={LeftContent} />
                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions>
                </Card>
            </View>
        );
    }
}
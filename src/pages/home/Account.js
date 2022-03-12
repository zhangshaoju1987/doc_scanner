import React from "react";
import { Avatar, Button, Card, Paragraph, Title } from "react-native-paper";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
export default class Settings extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>
                <Card.Title title="账号也没" subtitle="Card Subtitle" left={LeftContent} />
                <Card.Content>
                    <Title>设置</Title>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
        );
    }
}
import React from "react";
import { Avatar, Button, Card, Paragraph, Title } from "react-native-paper";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
export default class MyInvoice extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>
                <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                <Card.Content>
                    <Title>Card title</Title>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
        );
    }
}
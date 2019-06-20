import React, { Component } from 'react';
import { Text, View, Dimensions, Keyboard } from 'react-native';
import { Bubble, Day, GiftedChat, Send } from 'react-native-gifted-chat';

const { width, height } = Dimensions.get('window');

export default class AwesomeChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
        messages: []
    };
  }
  retrieveMessageData = () => {
    return [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      },
      {
        _id: 2,
        text: 'Hello kitten',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      }
    ];
  };

  componentWillMount = () => {
    const messages = this.retrieveMessageData();
    this.setState({
        messages
    })
  }

  handleSend = messages => {
    Keyboard.dismiss();

    if (room === 0) {
      this.sendFirstMessage(messages);
    } else {
      this.sendMessagesToExistingChat(messages);
    }
  };

  renderBubble = props => {
    return <Bubble {...props} />;
  };

  onSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {

    return (
      <GiftedChat
        messages={this.state.messages}
        onPress={Keyboard.dismiss}
        alwaysShowSend
        isAnimated
        inverted
        showUserAvatar
        messages={this.state.messages}
        onSend={this.onSend}
        renderBubble={this.renderBubble}
        keyExtractor={(item, index) => index.toString()}
        user={{
          _id: 1,
          avatar: 'https://placeimg.com/140/140/any'
        }}
      />
    );
  }
}

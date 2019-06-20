import React, { Component } from 'react';
import { Text, View, Dimensions, Keyboard } from 'react-native';
import { Bubble, Day, GiftedChat, Send } from 'react-native-gifted-chat';

const { width, height } = Dimensions.get('window');

export default class AwesomeChat extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onPressAvatar = props => {
    if (props._id === this.props.user.user.owner.id) {
      return;
    }
    const { petId, pet } = this.state;
    this.props.fetchGetOthersProfile({
      token: this.props.user.token,
      petId
    });
    this.props.navigation.navigate('FriendProfile', { petId, name: pet.name });
  };

  sendMessagesToExistingChat = messages => {
    const { user } = this.props;

    getAuthenticatedJsonData(
      `/chats/${room}`,
      'POST',
      {
        message: messages[0].text,
        type: 'text'
      },
      user.token
    )
      .then(response => console.log('promise response', response))
      .catch(error => console.log('promise error', error));
  };

  sendFirstMessage = async messages => {
    const { user, chatRoom } = this.props;
    const { room, petId } = this.state;

    await this.state.connectCallback();

    getAuthenticatedJsonData(
      `/chats/${room}`,
      'POST',
      {
        message: messages[0].text,
        type: 'text',
        pet_id: petId
      },
      user.token
    )
      .then(response => {
        this.setState({ room: response[1].room_id });
        console.log('room ---- ', response[1]);
        const newRoom = response[1].room_id;
        if (newRoom > 0) {
          chatRoom({ room: newRoom, token: user.token });
          this.getChatMessages(user.token, newRoom, this.state.chatPage);
        }
      })
      .catch(error => console.log('promise error', error));
  };

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

  renderDay = props => {
    return (
      <Day
        {...props}
        textStyle={{
          color: '#71A850',
          fontFamily: 'Exo-Regular',
          marginVertical: wp(4)
        }}
      />
    );
  };

  renderTime = () => {
    return null;
  };

  renderSend = props => {
    return (
      <View style={{ alignSelf: 'center', justifySelf: 'center' }}>
        <Send
          {...props}
          containerStyle={{
            justifyContent: 'center'
          }}
        >
          <ScalableImage
            source={Images.send}
            width={wp(6)}
            // style={styles.send}
          />
        </Send>
      </View>
    );
  };

  renderMessageText = props => {
    if (props.currentMessage.type === 'text') {
      return (
        <View>
          <Text style={props.textStyle.left}>{props.currentMessage.text}</Text>
        </View>
      );
    }
  };

  renderInputToolbar = () => {
    return <View style={{ height: 0, backgroundColor: 'transparent' }} />;
  };
  renderChatFooter = () => {
    return <View style={{ height: 100, backgroundColor: 'white' }} />;
  };

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
    // return (
    //   this.props.chatMessages ? this.props.chatMessages.chatMessages : []
    // )
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    const messageData = this.retrieveMessageData();

    return (
      <GiftedChat
        onPress={Keyboard.dismiss}
        alwaysShowSend
        isAnimated
        inverted
        showUserAvatar
        messages={messageData}
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

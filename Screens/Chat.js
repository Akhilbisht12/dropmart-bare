import React from 'react'
import { View, Text } from 'react-native';
import WebView from 'react-native-webview';

const Chat = () => {
    return (
        <WebView source={{uri : 'https://dropmarts.com/chat-bot-for-app/'}}/>
    )
}

export default Chat

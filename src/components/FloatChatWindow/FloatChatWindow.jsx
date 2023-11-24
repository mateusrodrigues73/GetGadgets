import { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  WindowContainer,
  ChatWindowContainer,
  Header,
  UserContainer,
  UserIconWrapper,
  UserIcon,
  UserImage,
  UserName,
  CloseUserChatIcon,
  ChatContainer,
  MessagesWrapper,
  MessageSendBox,
  MessageText,
  NewMessageContainer,
  NewMessageInput,
  SendMessageIcon,
} from './FloatChatWindow.styles';

import Loader from '../Loader';

import { AuthContext } from '../../contexts/AuthProvider';
import { ChatContext } from '../../contexts/ChatProvider';

const FloatChatWindow = ({ isOpen, setIsOpen }) => {
  const [messageText, setMessageText] = useState('');
  const [arrayMessages, setArrayMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { sessionUser } = useContext(AuthContext);
  const { userChat, setUserChat, insertNewMessage } = useContext(ChatContext);
  const messagesWrapperRef = useRef();

  const sendMessage = async () => {
    if (!messageText) {
      return;
    }
    const message = {
      mensagem: messageText,
      id_destinatario: userChat.id,
      id_remetente: sessionUser.id,
    };
    setIsLoading(true);
    const result = await insertNewMessage(message);
    setIsLoading(false);
    if (result) {
      const newArray = [...arrayMessages];
      newArray.push(messageText);
      setArrayMessages(newArray);
      setMessageText('');
    }
  };

  const scrollToBottom = () => {
    if (messagesWrapperRef.current) {
      messagesWrapperRef.current.scrollTop =
        messagesWrapperRef.current.scrollHeight;
    }
  };

  const handleInputChange = (event) => {
    if (messageText.length > 499) {
      event.preventDefault();
    } else {
      setMessageText(event.target.value);
    }
  };

  const sendMessageOnEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const back = () => {
    setUserChat(null);
    setIsOpen(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [arrayMessages]);

  return (
    userChat && (
      <>
        <WindowContainer open={isOpen}>
          <ChatWindowContainer>
            <Header>
              <UserContainer>
                <UserIconWrapper>
                  {userChat.imagem === 'no_image' ? (
                    <UserIcon />
                  ) : (
                    <UserImage
                      src={userChat.imagem}
                      alt={`${userChat.nome} ${userChat.sobrenome}`}
                    />
                  )}
                </UserIconWrapper>
                <UserName>{userChat.nome}</UserName>
                <CloseUserChatIcon onClick={back} />
              </UserContainer>
            </Header>
            <ChatContainer>
              <MessagesWrapper ref={messagesWrapperRef}>
                {arrayMessages.length > 0 &&
                  arrayMessages.map((message, index) => (
                    <MessageSendBox key={index}>
                      <MessageText>{message}</MessageText>
                    </MessageSendBox>
                  ))}
              </MessagesWrapper>
              <NewMessageContainer>
                <NewMessageInput
                  placeholder="Digite uma mensagem"
                  onChange={handleInputChange}
                  value={messageText}
                  onKeyDown={sendMessageOnEnter}
                />
                <SendMessageIcon onClick={sendMessage} />
              </NewMessageContainer>
            </ChatContainer>
          </ChatWindowContainer>
        </WindowContainer>
        {isLoading && <Loader />}
      </>
    )
  );
};

FloatChatWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default FloatChatWindow;

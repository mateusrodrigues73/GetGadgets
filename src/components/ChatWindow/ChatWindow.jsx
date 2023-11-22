import { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  ChatWindowContainer,
  Header,
  HeaderTitle,
  CloseChatIcon,
  UsersContainer,
  Warning,
  UserContainer,
  UserIconWrapper,
  UserIcon,
  UserImage,
  UserName,
  ChatContainer,
  UserChatContainer,
  CloseUserChatIcon,
  MessagesWrapper,
  MessageSendBox,
  MessageReceivedBox,
  MessageText,
  MessageDate,
  NewMessageContainer,
  NewMessageInput,
  SendMessageIcon,
} from './ChatWindow.styles';

import Loader from '../Loader';

import { AuthContext } from '../../contexts/AuthProvider';
import { ChatContext } from '../../contexts/ChatProvider';

const ChatWindow = ({ isOpen, setIsOpen }) => {
  const [chatId, setChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageText, setMessageText] = useState('');
  const { sessionUser } = useContext(AuthContext);
  const { messages, insertNewMessage } = useContext(ChatContext);
  const messagesWrapperRef = useRef();

  const sendMessage = async () => {
    if (!messageText) {
      return;
    }
    const message = {
      mensagem: messageText,
      id_destinatario: chatId,
      id_remetente: sessionUser.id,
    };
    setMessageText('');
    setIsLoading(true);
    await insertNewMessage(message);
    setIsLoading(false);
  };

  const sendMessageOnEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
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

  const back = () => {
    setChatId(null);
    setMessageText('');
  };

  const closeChat = () => {
    setMessageText('');
    setIsOpen(false);
  };

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const renderChat = () => {
    const chatUser = messages.filter((iten) => iten.user.id === chatId);
    return (
      <ChatContainer>
        <UserChatContainer>
          <UserIconWrapper>
            {chatUser[0].user.imagem === 'no_image' ? (
              <UserIcon />
            ) : (
              <UserImage
                src={chatUser[0].user.imagem}
                alt={`${chatUser[0].user.nome} ${chatUser[0].user.sobrenome}`}
              />
            )}
          </UserIconWrapper>
          <UserName>{`${chatUser[0].user.nome} ${chatUser[0].user.sobrenome}`}</UserName>
          <CloseUserChatIcon onClick={back} />
        </UserChatContainer>
        <MessagesWrapper ref={messagesWrapperRef}>
          {chatUser[0].messages.map((iten, index) =>
            iten.remetente === sessionUser.id ? (
              <MessageSendBox key={index}>
                <MessageText>{iten.mensagem}</MessageText>
                <MessageDate>{formatDate(iten.data_hora)}</MessageDate>
              </MessageSendBox>
            ) : (
              <MessageReceivedBox key={index}>
                <MessageText>{iten.mensagem}</MessageText>
                <MessageDate>{formatDate(iten.data_hora)}</MessageDate>
              </MessageReceivedBox>
            )
          )}
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
    );
  };

  const renderUsers = () => {
    if (messages === null) {
      return (
        <Warning>Você ainda não recebeu nem enviou nenhuma mensagem</Warning>
      );
    }
    if (messages === false) {
      return (
        <Warning>
          Parece que ocorreu um erro ao carregar suas conversas, sentimos muito
          pelo ocorrido, peçamos que tente novamente mais tarde
        </Warning>
      );
    }
    return (
      <UsersContainer>
        {messages &&
          messages.map((iten) => (
            <UserContainer
              key={iten.user.id}
              onClick={() => setChatId(iten.user.id)}
            >
              <UserIconWrapper>
                {iten.user.imagem === 'no_image' ? (
                  <UserIcon />
                ) : (
                  <UserImage
                    src={iten.user.imagem}
                    alt={`${iten.user.nome} ${iten.user.sobrenome}`}
                  />
                )}
              </UserIconWrapper>
              <UserName>{`${iten.user.nome} ${iten.user.sobrenome}`}</UserName>
            </UserContainer>
          ))}
      </UsersContainer>
    );
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [chatId]);

  return (
    <>
      <ChatWindowContainer open={isOpen}>
        <Header>
          <HeaderTitle>Suas conversas</HeaderTitle>
          <CloseChatIcon onClick={closeChat} />
        </Header>
        {!chatId ? renderUsers() : renderChat()}
      </ChatWindowContainer>
      {isLoading && <Loader />}
    </>
  );
};

ChatWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ChatWindow;

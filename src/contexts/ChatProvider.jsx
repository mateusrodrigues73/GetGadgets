import { useState, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

import { SupabaseContext } from './SupabaseProvider';
import { AuthContext } from './AuthProvider';

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(null);
  const [messagesListener, setMessagesListener] = useState(null);
  const { supabase } = useContext(SupabaseContext);
  const { sessionUser, saveLocalStorage, deleteLocalStorage } =
    useContext(AuthContext);

  const organizeMessages = (data) => {
    const organizedMessages = {};
    data.forEach((message) => {
      const isUserLoggedSender = message.from.id === sessionUser.id;
      const otherUser = isUserLoggedSender ? message.to : message.from;
      const otherUserId = otherUser.id;
      if (!organizedMessages[otherUserId]) {
        organizedMessages[otherUserId] = {
          user: {
            id: otherUser.id,
            nome: otherUser.nome,
            sobrenome: otherUser.sobrenome,
            imagem: otherUser.imagem,
          },
          messages: [],
          lastMessageTime: new Date(message.data_hora).getTime(),
        };
      }
      organizedMessages[otherUserId].messages.push({
        mensagem: message.mensagem,
        data_hora: message.data_hora,
        remetente: message.from.id,
      });
      const currentMessageTime = new Date(message.data_hora).getTime();
      if (currentMessageTime > organizedMessages[otherUserId].lastMessageTime) {
        organizedMessages[otherUserId].lastMessageTime = currentMessageTime;
      }
    });
    const sortedUsers = Object.values(organizedMessages).sort(
      (a, b) => b.lastMessageTime - a.lastMessageTime
    );
    return sortedUsers;
  };

  const getMessages = async () => {
    saveLocalStorage();
    try {
      const { data, error } = await supabase
        .from('usuarios_mensagens')
        .select(
          'mensagem,' +
            'data_hora,' +
            'from:id_remetente(id, nome, sobrenome, imagem),' +
            'to:id_destinatario(id, nome, sobrenome, imagem)'
        )
        .or(
          `id_destinatario.eq.${sessionUser.id},id_remetente.eq.${sessionUser.id}`
        )
        .order('data_hora', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      if (data.length > 0) {
        const organizedMessages = organizeMessages(data);
        setMessages(organizedMessages);
      } else {
        setMessages(null);
      }
      deleteLocalStorage();
    } catch (error) {
      setMessages(false);
      deleteLocalStorage();
    }
  };

  const unsubscribeMessagesListener = () => {
    if (messagesListener) {
      messagesListener.unsubscribe();
    }
    setMessagesListener(null);
  };

  useEffect(() => {
    if (sessionUser) {
      getMessages();
      setMessagesListener(
        supabase
          .channel('table-db-changes')
          .on(
            'postgres_changes',
            {
              event: 'insert',
              schema: 'public',
              table: 'usuarios_mensagens',
              filter: `id_destinatario=eq.${sessionUser.id}`,
            },
            () => getMessages()
          )
          .on(
            'postgres_changes',
            {
              event: 'insert',
              schema: 'public',
              table: 'usuarios_mensagens',
              filter: `id_remetente=eq.${sessionUser.id}`,
            },
            () => getMessages()
          )
          .subscribe()
      );
    }
    return unsubscribeMessagesListener();
  }, [sessionUser]);

  const chatContextValue = { messages };

  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

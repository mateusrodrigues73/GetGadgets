import styled from 'styled-components';
import {
  ArrowLeftOutlined,
  CloseOutlined,
  UserOutlined,
  SendOutlined,
} from '@ant-design/icons';

export const ChatWindowContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ open }) => (open ? '0' : '-25vw')};
  width: 25vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  row-gap: 15px;
  background: ${({ theme }) => theme.colors.secondaryDark};
  background-repeat: no-repeat;
  transition: left 1s ease-out;
  border-radius: 0px 20px 20px 0px;
  border: 2px solid ${({ theme }) => theme.colors.neutralWith};
  overflow: hidden;
  z-index: 1;
`;

export const Header = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  height: 100px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const CloseChatIcon = styled(ArrowLeftOutlined)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 30px;
  color: ${({ theme }) => theme.colors.neutralWith};
  margin-right: 10px;

  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;

export const Warning = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutralWith};
  margin-left: 15px;
  margin-right: 15px;
`;

export const UsersContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 15px;
  justify-content: flex-start;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UserContainer = styled.div`
  width: 100%;
  padding: 5px;
  padding-left: 10px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    border: 1px solid ${({ theme }) => theme.colors.neutralWith};
  }
`;

export const UserIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.neutralWith};
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserIcon = styled(UserOutlined)`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondaryLight};
`;

export const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const UserName = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 15px;
`;

export const UserChatContainer = styled.div`
  width: 100%;
  padding: 5px;
  padding-left: 10px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 15px;
  position: relative;
`;

export const CloseUserChatIcon = styled(CloseOutlined)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 25px;
  color: ${({ theme }) => theme.colors.neutralWith};
  position: absolute;
  top: 17px;
  right: 20px;

  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;

export const MessagesWrapper = styled.div`
  width: 100%;
  height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const MessageSendBox = styled.div`
  width: 90%;
  word-wrap: break-word;
  padding: 5px;
  border-radius: 5px 0px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  padding-bottom: 20px;
  position: relative;
`;

export const MessageReceivedBox = styled.div`
  width: 90%;
  word-wrap: break-word;
  padding: 5px;
  border-radius: 5px 0px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-self: flex-start;
  padding-bottom: 20px;
  position: relative;
`;

export const MessageText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const MessageDate = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.neutralWith};
  position: absolute;
  bottom: 2px;
  right: 5px;
`;

export const NewMessageContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const NewMessageInput = styled.textarea`
  width: 100%;
  height: 55px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  padding: 7px 25px 7px 15px;
  border: none;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.neutralWith};
  resize: none;

  &::placeholder {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 18px;
    color: ${({ theme }) => theme.colors.neutralWith};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    border: 1px solid ${({ theme }) => theme.colors.neutralWith};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SendMessageIcon = styled(SendOutlined)`
  position: absolute;
  font-size: 20px;
  bottom: 15px;
  right: 5px;
  color: ${({ theme }) => theme.colors.neutralWith};

  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;

import styled from 'styled-components';
import { CloseOutlined, UserOutlined, SendOutlined } from '@ant-design/icons';

export const WindowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ChatWindowContainer = styled.div`
  width: 25vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.secondaryDark};
  background-repeat: no-repeat;
  transition: left 1s ease-out;
  border-radius: 20px 0px;
  border: 2px solid ${({ theme }) => theme.colors.neutralWith};
  overflow: hidden;
  z-index: 1;
`;

export const Header = styled.div`
  width: 100%;
  height: 60px;
  padding: 15px 10px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 15px;
  position: relative;
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

export const CloseUserChatIcon = styled(CloseOutlined)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 25px;
  color: ${({ theme }) => theme.colors.neutralWith};
  position: absolute;
  right: 5px;
  top: 12px;

  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
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

export const MessagesWrapper = styled.div`
  width: 100%;
  height: calc(50vh - 145px);
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  align-items: flex-end;
  justify-content: flex-start;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MessageSendBox = styled.div`
  width: auto;
  word-wrap: break-word;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 5px 0px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
`;

export const MessageText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
  text-align: right;
`;

export const NewMessageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 35px;
`;

export const NewMessageInput = styled.input`
  width: 100%;
  height: 35px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  padding: 7px 30px 7px 15px;
  border: none;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
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
`;

export const SendMessageIcon = styled(SendOutlined)`
  position: absolute;
  font-size: 20px;
  top: 7px;
  right: 5px;
  color: ${({ theme }) => theme.colors.neutralWith};

  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;

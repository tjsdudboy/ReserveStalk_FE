import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../lib/assets/로고.png';

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3d4df;
`;

const LogoImg = styled.img`
  width: 700px; 
  height: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const EnterButton = styled.button`
  margin-top: 20px;
  padding: 20px 330px;
  font-size: 20px;
  border: 2px solid #cbcbcb;
  background-color: #FFFFFF;
  color: black;
  cursor: pointer;
  border-radius: 5px;
`;

const Main = () => {
  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate('/login');
  };

  return (
    <Background>
      <Content>
        <LogoImg src={Logo} alt="로고 이미지를 불러올 수 없습니다." />
        <EnterButton onClick={handleEnterClick}>Enter</EnterButton>
      </Content>
    </Background>
  );
};

export default Main;

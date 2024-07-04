import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  background-color: #ffe4e1;
  padding: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #ffb6c1;
  color: black;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #ff69b4;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (endpoint) => {
    if (endpoint) {
      // For simplicity, redirecting to endpoint directly. Adjust as needed.
      navigate(endpoint);
    }
  };

  return (
    <SidebarContainer>
      <SidebarButton onClick={() => handleNavigation('/products')}>제품조회</SidebarButton>
      <SidebarButton onClick={() => handleNavigation('/stockInOut')}>입출고 등록</SidebarButton>
      <SidebarButton onClick={() => handleNavigation('/stockInOut')}>입출고 조회</SidebarButton>
      <SidebarButton onClick={() => handleNavigation('/stock')}>재고관리</SidebarButton>
      <SidebarButton onClick={() => alert('예약 내역 확인 기능은 아직 구현되지 않았습니다.')}>예약 내역 확인</SidebarButton>
      <SidebarButton onClick={() => alert('TODO 기능은 아직 구현되지 않았습니다.')}>TODO</SidebarButton>
      <SidebarButton onClick={() => handleNavigation('/checkPassword')}>마이페이지</SidebarButton>
      <SidebarButton onClick={() => alert('로그아웃 기능은 아직 구현되지 않았습니다.')}>로그아웃</SidebarButton>
    </SidebarContainer>
  );
};

export default Sidebar;

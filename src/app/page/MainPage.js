import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NavigationBar from '../api/Sidebar';

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3d4df;
`;

const LogoContainer = styled.div`
  width: 50%;
  height: 50%;
  background-color: peachpuff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: orange;
`;

const SubText = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: gray;
`;

const MainPage = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        let response = null;
        if (token) {
          response = await axios.get("/api/user", {
            headers: {
              Authorization: `${token}`,
            },
          });
        } else {
          response = await axios.get("/api/user", {
            withCredentials: true,
          });
        }
        sessionStorage.setItem("username", response.data.username);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MainContainer>
      <NavigationBar />
      <Content>
        <LogoContainer>
          <div>
            <LogoText>Reserve</LogoText>
            <SubText>Stalk</SubText>
          </div>
        </LogoContainer>
      </Content>
    </MainContainer>
  );
};

export default MainPage;
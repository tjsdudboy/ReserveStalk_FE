import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import { login } from '../api/authApi';
import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LogoText = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: orange;
  text-align: center;
`;

const LogoSubText = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: black;
  text-align: center;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const InputField = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  padding: 0 10px;
  font-size: 18px;
  border: 2px solid #3b5998;
  border-radius: 5px;
`;

const DefaultButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #3b5998;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepLogin, setKeepLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if ((storedUsername && storedPassword)!==null) {
      setUsername(storedUsername);
      setPassword(storedPassword);
    }

    localStorage.removeItem("Authorization");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (keepLogin) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }

    try {
      const qs = require("qs");
      console.log("Logging in with:", { username, password }); 
      const response = await axios.post("/api/login",
        qs.stringify(
        {
          username: username,
          password: password
        }
      ),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });
      console.log("Login response:", response); 

      let token = response.headers["authorization"];
      localStorage.setItem("Authorization", token);

      setUsername("");
      setPassword("");

      navigate(`/main`);
    } catch (error) {
      console.error("로그인 실패:", error);
      setUsername("");
      setPassword("");
      alert("로그인에 실패했습니다. 사용자 이름과 비밀번호를 확인해주세요.");
    }
  };

  const handleSignUp = () => {
    navigate(`/join`);
  };

  const handleCheckboxChange = (e) => {
    setKeepLogin(e.target.checked);
  };

  return (
    <Background>
      <LogoText>Reseve</LogoText>
      <LogoSubText>Stalk</LogoSubText>
      <form onSubmit={handleLogin}>
        <InputBlock>
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputBlock>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="checkbox"
            checked={keepLogin}
            onChange={handleCheckboxChange}
          />
          <label>로그인 상태 유지</label>
        </div>
        <DefaultButton type="submit">
          로그인
        </DefaultButton>
      </form>
      <DefaultButton onClick={handleSignUp}>
        회원 가입
      </DefaultButton>
    </Background>
  );
};

export default Login;

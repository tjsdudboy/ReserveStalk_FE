import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PWCheck = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.post(`/api/checkPassword/${id}`, 
        { originPassword: password }, 
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate(`/myPage/${id}`);
      }
    } catch (error) {
      setError('비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
    }
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div>
      <h2>비밀번호를 입력하세요</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">제출</button>
        <button type="button" onClick={handleCancel}>취소</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default PWCheck;

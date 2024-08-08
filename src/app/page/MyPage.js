import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const MyPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get(`/api/MyPage/${userId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.put(`/api/MyPage/${userId}`, {
        ...user,
        password: newPassword,
        checkPassword: confirmPassword,
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.status === 200) {
        setMessage('비밀번호가 성공적으로 변경되었습니다.');
        navigate(-2);
      }
    } catch (error) {
      console.error('Failed to update password', error);
      setMessage('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>마이페이지</h2>
      <div>
        <label>아이디: </label>
        <span>{user.username}</span>
      </div>
      <div>
        <label>이름: </label>
        <span>{user.name}</span>
      </div>
      <div>
        <label>이메일: </label>
        <span>{user.email}</span>
      </div>
      <div>
        <label>새로운 비밀번호: </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>비밀번호 확인: </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>저장</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MyPage;

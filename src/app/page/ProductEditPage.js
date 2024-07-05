import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #e3e3e3;
  padding: 20px;
  border-radius: 8px;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const ProductEditPage = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState('');
  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');
  const [price, setPrice] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get(`/api/products/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const product = response.data;
        setProductName(product.name || '');
        setCategory1(product.category1 || '');
        setCategory2(product.category2 || '');
        setPrice(product.price || '');
        setUnitPrice(product.unitPrice || '');
        setDescription(product.description || '');
      } catch (error) {
        console.error('There was an error!', error);
        setError('제품 정보를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (category1 === '' || category2 === '') {
      setError('분류1과 분류2를 선택해야 합니다.');
      return;
    }
    try {
      const token = localStorage.getItem('Authorization');
      await axios.put(`/api/products/${id}`, {
        name: productName,
        category1,
        category2,
        price,
        unitPrice,
        description,
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });
      navigate('/products');
    } catch (error) {
      console.error('There was an error!', error);
      setError('제품 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <MainContainer>
      <Content>
        <Form onSubmit={handleUpdate}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Label>제품명</Label>
          <Input value={productName} onChange={(e) => setProductName(e.target.value)} disabled/>

          <Label>분류1</Label>
          <Select value={category1} onChange={(e) => setCategory1(e.target.value)}>
            <option value="">분류1 선택</option>
            <option value="MANUFACTURES">MANUFACTURES</option>
            <option value="MERCHANDISE">MERCHANDISE</option>
          </Select>

          <Label>분류2</Label>
          <Select value={category2} onChange={(e) => setCategory2(e.target.value)}>
            <option value="">분류2 선택</option>
            <option value="GEL">GEL</option>
            <option value="TOOL">TOOL</option>
            <option value="DRILL">DRILL</option>
            <option value="STONE">STONE</option>
          </Select>

          <Label>제품 가격</Label>
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

          <Label>단가</Label>
          <Input type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />

          <Label>비고</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />

          <Button type="submit">수정</Button>
        </Form>
      </Content>
    </MainContainer>
  );
};

export default ProductEditPage;

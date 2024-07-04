import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import NavigationBar from '../api/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #4CAF50;
  color: white;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

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
        console.log("response: ", response.data);
        const products = await axios.get('/api/products', {
          headers: {
            Authorization: `${token}`,
          },
        });
        setProducts(products.data.content);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem("Authorization");
      const response = await axios.get('/api/products', {
        params: {
          category1,
          category2,
          date,
        },
        headers: {
          Authorization: `${token}`,
        },
      });
      setProducts(response.data.content); 
    } catch (error) {
      console.error('There was an error!', error);
    }
  }, [category1, category2, date]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = () => {
    fetchProducts();
  };

  const handleRegister = () => {
    navigate('/products/add');
  };

  return (
    <MainContainer>
      <NavigationBar />
      <Content>
        <FilterContainer>
          <Select value={category1} onChange={(e) => setCategory1(e.target.value)}>
            <option value="">분류1 선택</option>
            <option value="MANUFACTURES">MANUFACTURES</option>
            <option value="MERCHANDISE">MERCHANDISE</option>
          </Select>
          <Select value={category2} onChange={(e) => setCategory2(e.target.value)}>
            <option value="">분류2 선택</option>
            <option value="GEL">GEL</option>
            <option value="TOOL">TOOL</option>
            <option value="DRILL">DRILL</option>
            <option value="STONE">STONE</option>
          </Select>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button onClick={handleSearch}>검색</Button>
          <Button onClick={handleRegister}>제품등록</Button>
        </FilterContainer>
        <Table>
          <thead>
            <tr>
              <Th>no</Th>
              <Th>분류1</Th>
              <Th>분류2</Th>
              <Th>제품명</Th>
              <Th>제품 가격</Th>
              <Th>비고</Th>
              <Th>등록일</Th>
              <Th>수정일</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <Td>{index + 1}</Td>
                <Td>{product.category1}</Td>
                <Td>{product.category2}</Td>
                <Td>{product.name}</Td>
                <Td>{product.price}</Td>
                <Td>{product.description}</Td>
                <Td>{new Date(product.date).toLocaleDateString()}</Td>
                <Td>{new Date(product.date).toLocaleDateString()}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </MainContainer>
  );
};

export default ProductsPage;

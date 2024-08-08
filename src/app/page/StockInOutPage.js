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
  cursor: pointer;
  background-color: ${props => props.selected ? '#f0f8ff' : 'transparent'};
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [transactionType, setTransactionType] = useState('');
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
        const products = await axios.get('/api/stockInOut', {
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
      const response = await axios.get('/api/stockInOut', {
        params: {
          transactionType
        },
        headers: {
          Authorization: `${token}`,
        },
      });
      setProducts(response.data.content);
    } catch (error) {
      console.error('There was an error!', error);
    }
  }, [transactionType]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleRegister = () => {
    navigate('/stockInOut/edit');
  };

  return (
    <MainContainer>
      <NavigationBar />
      <Content>
        <FilterContainer>
          <Select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
            <option value="">입/출고 구분</option>
            <option value="IN">입고</option>
            <option value="OUT">출고</option>
          </Select>
          <Button onClick={handleRegister}>입/출고 등록</Button>
        </FilterContainer>
        <Table>
          <thead>
            <tr>
              <Th>no</Th>
              <Th>제품명</Th>
              <Th>입/출고 수량</Th>
              <Th>입/출고 구분</Th>
              <Th>등록일</Th>
              <Th>수정일</Th>
              <Th>비고</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}
                onClick={() => setSelectedProductId(product.id)}
                style={{ backgroundColor: selectedProductId === product.id ? '#f0f8ff' : 'transparent' }}
              >
                <Td selected={selectedProductId === product.id}>{index + 1}</Td>
                <Td selected={selectedProductId === product.id}>{product.productName}</Td>
                <Td selected={selectedProductId === product.id}>{product.quantity}</Td>
                <Td selected={selectedProductId === product.id}>{product.transactionType}</Td>
                <Td selected={selectedProductId === product.id}>{new Date(product.creatDate).toLocaleDateString()}</Td>
                <Td selected={selectedProductId === product.id}>{new Date(product.updateDate).toLocaleDateString()}</Td>
                <Td selected={selectedProductId === product.id}>{product.description}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </MainContainer>
  );
};

export default ProductsPage;

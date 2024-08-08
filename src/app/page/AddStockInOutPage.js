import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import NavigationBar from '../api/Sidebar';
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
const StockInOutAddPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [transactionType, setTransactionType] = useState('IN');
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductNames = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get('/api/products', {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log(response.data.content);
        console.log("조회한 데이터");
        setProducts(response.data.content||[]);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };
    fetchProductNames();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.post('/api/stockInOut', {
        productId: selectedProduct,
        quantity,
        transactionType,        
        description,
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setTransactions([...transactions, response.data]);
      setSelectedProduct('');
      setQuantity('');
      setTransactionType('IN');
      setDescription('');
      navigate('/stockInOut');
    } catch (error) {
      console.error('There was an error!', error);
      alert('입/출고 등록 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (selectedTransaction) {
      const confirmDelete = window.confirm("정말로 이 항목을 삭제하시겠습니까?");
      if (confirmDelete) {
        try {
          const token = localStorage.getItem("Authorization");
          await axios.delete(`/api/stockInOut/${selectedTransaction.id}`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          setTransactions(transactions.filter(transaction => transaction.id !== selectedTransaction.id));
          setSelectedTransaction(null);
          navigate('/stockInOut');
        } catch (error) {
          console.error('There was an error!', error);
          alert('삭제 중 오류가 발생했습니다.');
        }
      }
    } else {
      alert("삭제할 항목을 선택하세요.");
    }
  };
  const handleEdit = async () => {
    if (selectedTransaction) {
      try {
        const token = localStorage.getItem("Authorization");
        const response = await axios.put(`/api/stockInOut/${selectedTransaction.id}`, {
          productId: selectedProduct,
          quantity,
          transactionType,
          description,
        }, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setTransactions(transactions.map(transaction => transaction.id === selectedTransaction.id ? response.data : transaction));
        setSelectedTransaction(null);
        setSelectedProduct('');
        setQuantity('');
        setTransactionType('IN');
        setDescription('');
        navigate('/stockInOut');
      } catch (error) {
        console.error('There was an error!', error);
        alert('수정 중 오류가 발생했습니다.');
      }
    } else {
      alert("수정할 항목을 선택하세요.");
    }
  };

  return (
    <MainContainer>
      <Content>
          <Label>제품명</Label>
          <Select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            <option value="">제품 선택</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Select>

          <Label>입/출고 수량</Label>
          <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

          <Label>입/출고 구분</Label>
          <Select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
            <option value="IN">입고</option>
            <option value="OUT">출고</option>
          </Select>

          <Label>비고</Label>
          <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

          <Button onClick={handleSave}>저장</Button>
          <Button onClick={handleDelete}>삭제</Button>
          <Button onClick={handleEdit}>수정</Button>
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
            {transactions.map((transaction, index) => (
              <tr key={transaction.id}
                onClick={() => setSelectedTransaction(transaction)}
                style={{ backgroundColor: selectedTransaction?.id === transaction.id ? '#f0f8ff' : 'transparent' }}
              >
                <Td>{index + 1}</Td>
                <Td>{products.find(product => product.id === transaction.productId)?.name}</Td>
                <Td>{transaction.quantity}</Td>
                <Td>{transaction.transactionType}</Td>
                <Td>{new Date(transaction.createAt).toLocaleDateString()}</Td>
                <Td>{new Date(transaction.updateAt).toLocaleDateString()}</Td>
                <Td>{transaction.description}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </MainContainer>
  );
};

export default StockInOutAddPage;

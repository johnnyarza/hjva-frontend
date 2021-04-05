import React, { useState, useEffect } from 'react';
import SideBar from '../../components/SideBar';

import {
  Container, Content, TableContainer,
} from './style';

import api from '../../services/api';

export default function ProductDashboard() {
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadAllProducts() {
      const res = await api.get('product');
      setProducts(res.data);
      if (res.data[0]) {
        const categoriesSet = new Set(res.data.map((p) => p.category));
        const cats = [...categoriesSet];
        setCategories(cats);
      }
    }
    loadAllProducts();
  }, []);

  function generateTableRows(category) {
    if (products[0] && categories[0]) {
      const prodsByCat = products.filter((p) => p.category === category);
      const rows = prodsByCat.map((p) => (
        <tr className="row-data" key={`prodDash-TContainter-trData-${p.id}`}>
          <td>{p.name}</td>
          <td>{p.description}</td>
        </tr>
      ));
      return rows;
    }
    return null;
  }

  const changeTableDisplay = (data, display = 'block') => {
    if (data.target.children[1]) {
      data.target.children[1].style.display = display;
    }
  };

  return (
    <>
      <SideBar />
      <Container>
        <Content>
          {categories.length && (
            categories.map((cat) => (
              <TableContainer key={`prodDash-TContainter-${cat}`} onMouseEnter={changeTableDisplay} onMouseLeave={(data) => changeTableDisplay(data, 'none')}>
                <h1>{cat}</h1>
                <table>
                  <tbody>
                    <tr>
                      <th style={{ width: '200px' }}>Nome</th>
                      <th style={{ width: '70%' }}>Descrição</th>
                    </tr>
                    {generateTableRows(cat)}
                  </tbody>
                </table>

              </TableContainer>
            ))
          )}
        </Content>
      </Container>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';
import { deleteService } from '../../store/actions/serviceActions';

// components
import Layout from '../../layout/Layout';
import { options, compareByServicename, compareByServicetype } from '../../utils';
import SearchAndSort from '../../components/SearchAndSort/SearchAndSort';

// styles
import styled from 'styled-components';
import { Patient, Controls } from '../../GlobalStyles';
import { useAlert } from 'react-alert';

const ServiceList = ({ auth: { token }, deleteService }) => {
  // states
  const alert = useAlert();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [searchTerms, setSearchTerms] = useState('');
  const [services, setServices] = useState([]);
  const [postSize, setPostSize] = useState('');
  const [sortBy, setSortBy] = useState('');

  const getServices = (variables) => {
    axios
      .get(
        `/api/services/?limit=${variables.limit}&skip=${variables.skip}&searchTerm=${variables.searchTerm}`,
        options(token),
      )
      .then((response) => {
        if (variables.loadMore) {
          setServices([...services, ...response.data.services]);
        } else {
          setServices(response.data.services);
        }
        setPostSize(response.data.postSize);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    const variables = {
      skip,
      limit,
    };
    getServices(variables);
  }, []);

  // handlers
  const updateSearchTerms = (newSearchTerm, type) => {
    if (type === 'search') {
      const variables = {
        skip: 0,
        limit,
        searchTerm: newSearchTerm,
      };

      setSkip(0);
      setSearchTerms(newSearchTerm);

      getServices(variables);
    } else {
      onSort(newSearchTerm);
    }
  };

  const onLoadMore = () => {
    let newskip = skip + limit;

    const variables = {
      skip: newskip,
      limit,
      loadMore: true,
      searchTerm: searchTerms,
    };
    getServices(variables);
    setSkip(newskip);
  };

  const onSort = (term) => {
    setSortBy(term);
    if (term === 'first') {
      setServices(services.sort(compareByServicename));
    } else if (term === 'second') {
      setServices(services.sort(compareByServicetype));
    }
  };

  const onDelete = (id, isdeleted) => {
    if (isdeleted) {
      alert.show('Ушбу маълумот ўчирилган.');
    } else {
      alert.show('Маълумотни йўқ қилмоқчимисиз?', {
        actions: [
          {
            copy: 'Йўқ қилиш',
            onClick: () => {
              deleteService(id);
              setServices(services.filter((s) => s._id !== id));
            },
          },
        ],
      });
    }
  };

  return (
    <Layout>
      <SearchAndSort first="Хизмат номи" second="Хизмат тури" refreshFunction={updateSearchTerms} />

      <TableContainer>
        <PatientsContainer>
          <tbody>
            <tr>
              <th>Хизмат номи</th>
              <th>Хизмат тури</th>
              <th>Нарх</th>
              <th></th>
            </tr>
            {services[0] &&
              services.map((service) => (
                <Patient key={service._id}>
                  <td>{service.title}</td>
                  <td>{service.servicetype.title}</td>
                  <td>{service.price}</td>
                  <td>
                    <Controls>
                      <Link to={`/service/edit/${service._id}`} className="edit">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <Link
                        onClick={() => onDelete(service._id, service.isdeleted)}
                        to="#"
                        className={`delete ${service.isdeleted && 'disabledBtn'}`}
                      >
                        <i className="fas fa-trash"></i>
                      </Link>
                    </Controls>
                  </td>
                </Patient>
              ))}
          </tbody>
        </PatientsContainer>
        {postSize >= limit && <button onClick={onLoadMore}>Қолганларни юклаш</button>}
      </TableContainer>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(requireAuth, connect(mapStateToProps, { deleteService }))(ServiceList);

const TableContainer = styled.div`
  width: 95%;
  margin: 0 auto 2rem;
  padding: 2rem 3rem;
  border-radius: 1rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  button {
    width: 20%;
    margin: 2rem auto 0;
    align-self: center;
  }
`;

const PatientsContainer = styled.table`
  width: 100%;
  font-family: 'Nunito', sans-serif;

  th {
    text-align: start;
    font-size: 1.3rem;
  }

  button {
    margin: 1rem 0;
    cursor: pointer;
  }
`;

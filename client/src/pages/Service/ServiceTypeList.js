import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';

// components
import Layout from '../../layout/Layout';
import { options } from '../../utils';

// styles
import styled from 'styled-components';
import { Patient, Controls } from '../../GlobalStyles';
import { deleteServiceType } from '../../store/actions/serviceTypeActions';

const ServiceTypeList = ({ auth: { token }, deleteServiceType }) => {
  // states
  const alert = useAlert();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [servicetypes, setServicetypes] = useState([]);
  const [postSize, setPostSize] = useState([]);

  const getServicetypes = (variables) => {
    axios
      .get(`/api/servicetypes?limit=${variables.limit}&skip=${variables.skip}`, options(token))
      .then((response) => {
        if (variables.loadMore) {
          setServicetypes([...servicetypes, ...response.data.servicetypes]);
        } else {
          setServicetypes(response.data.servicetypes);
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
      loadMore: false,
    };

    getServicetypes(variables);
  }, []);

  // handlers
  const onLoadMore = () => {
    let newskip = skip + limit;

    const variables = {
      skip: newskip,
      limit,
      loadMore: true,
    };

    getServicetypes(variables);
    setSkip(newskip);
  };

  const onDelete = (id, isdeleted) => {
    if (isdeleted) {
      alert.show('Ушбу маълумот ўчирилган.');
    } else {
      alert.show('Ҳаракатни ортга қайтаришни иложи йўқ!', {
        title: 'Маълумотни йўқ қилмоқчимисиз?',
        actions: [
          {
            copy: 'Йўқ қилиш',
            onClick: () => {
              deleteServiceType(id);
              setServicetypes(servicetypes.filter((s) => s._id !== id));
            },
          },
        ],
      });
    }
  };

  return (
    <Layout>
      <TableContainer>
        <PatientsContainer>
          <tbody>
            <tr>
              <th>Хизмат номи</th>
              <th>Хизмат тури ҳақида маълумот</th>
              <th></th>
            </tr>
            {servicetypes[0] &&
              servicetypes.map((servicetype) => (
                <Patient key={servicetype._id}>
                  <td>{servicetype.title}</td>
                  <td>{servicetype.description}</td>
                  <td>
                    <Controls>
                      <Link to={`/servicetype/edit/${servicetype._id}`} className="edit">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <Link onClick={() => onDelete(servicetype._id)} to="#" className="delete">
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

export default compose(
  requireAuth,
  connect(mapStateToProps, { deleteServiceType }),
)(ServiceTypeList);

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

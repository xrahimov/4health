import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';
import { getDoctors } from '../../store/actions/doctorActions';

// components
import Layout from '../../layout/Layout';
import { options } from '../../utils';
import FilterAndSort from '../../components/SearchAndSort/FilterAndSort';

// styles
import styled from 'styled-components';
import { Patient, Controls } from '../../GlobalStyles';
import { useAlert } from 'react-alert';

const UziChildList = ({ auth: { token }, getDoctors, doctor: { doctors } }) => {
  // states
  const alert = useAlert();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const [searchTerms, setSearchTerms] = useState('');
  const [uzichilds, setUzichilds] = useState([]);
  const [uziparents, setUziparents] = useState([]);
  const [postSize, setPostSize] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [error, setError] = useState();
  const [filterParent, setFilterParent] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');

  useEffect(() => {
    getDoctors();
    getAllUzichilds();
  }, []);

  // handler
  const getAllUzichilds = () => {
    const variables = {
      skip,
      limit,
    };

    axios
      .get(
        `/api/uzichilds/?limit=${variables.limit}&skip=${variables.skip}&searchTerm=${variables.searchTerm}`,
        options(token),
      )
      .then((response) => {
        if (variables.loadMore) {
          setUzichilds([...uzichilds, ...response.data.uzichilds]);
        } else {
          setUzichilds(response.data.uzichilds);
        }
        setPostSize(response.data.postSize);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const onLoadMore = () => {
    let newskip = skip + limit;

    const variables = {
      skip: newskip,
      limit,
      loadMore: true,
      searchTerm: searchTerms,
    };
    getAllUzichilds(variables);
    setSkip(newskip);
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
              axios
                .delete(`/api/uzichilds/${id}`, options(token))
                .then((response) => {
                  setUzichilds(uzichilds.filter((s) => s._id !== response.data.uzichild._id));
                })
                .catch((err) => {
                  console.log(err.response.data.message);
                });
            },
          },
        ],
      });
    }
  };

  const getUziParents = (variables) => {
    axios
      .get(
        `/api/uziparents?limit=${variables.limit}&skip=${variables.skip}&vrach=${variables.vrach}`,
        options(token),
      )
      .then((response) => {
        setUziparents(response.data.uziParents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUziChildren = (variables) => {
    axios
      .get(`/api/uzichilds/uziparent/${variables.uziparent}`, options(token))
      .then((response) => {
        if (variables.loadMore) {
          setUzichilds([...uzichilds, ...response.data.uzichilds]);
        } else {
          setUzichilds(response.data.uzichilds);
        }
        setPostSize(response.data.postSize);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const updateSearchTerms = (newSearchTerm, type) => {
    if (newSearchTerm === '') {
      getAllUzichilds();
    } else {
      if (type === 'vrach') {
        setSkip(0);
        const variables = {
          skip: 0,
          limit,
          vrach: newSearchTerm,
        };
        getUziParents(variables);
      } else if (type === 'uziparent') {
        const variables = {
          uziparent: newSearchTerm,
        };
        getUziChildren(variables);
      }
    }
    setSortBy(type);
  };

  return (
    <Layout>
      <FilterAndSort
        first="Шаблон"
        second="Доктор"
        refreshFunction={updateSearchTerms}
        doctors={doctors}
        uziparents={uziparents}
      />
      <TableContainer>
        <PatientsContainer>
          <tbody>
            <tr>
              <th>Хизмат номи</th>
              <th>Хизмат тури</th>
              <th>Контент</th>
              <th></th>
            </tr>
            {uzichilds[0] &&
              uzichilds.map((uzichild) => (
                <Patient key={uzichild._id}>
                  <td>{uzichild.title}</td>
                  <td>{uzichild.uziparent.title}</td>
                  <td dangerouslySetInnerHTML={{ __html: uzichild.content }} />
                  <td>
                    <Controls>
                      <Link to={`/uzichild/edit/${uzichild._id}`} className="edit">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <Link
                        onClick={() => onDelete(uzichild._id, uzichild.isdeleted)}
                        to="#"
                        className={`delete ${uzichild.isdeleted && 'disabledBtn'}`}
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
  doctor: state.doctor,
});

export default compose(requireAuth, connect(mapStateToProps, { getDoctors }))(UziChildList);

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

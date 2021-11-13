import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';
import { getDoctors } from '../../store/actions/doctorActions';

// components
import Layout from '../../layout/Layout';
import { compareByDoctor, compareByUziparentTitle, options } from '../../utils';
import FilterAndSort from '../../components/SearchAndSort/FilterAndSort';

// styles
import styled from 'styled-components';
import { Patient, Controls } from '../../GlobalStyles';

const UziParentList = ({ auth: { token }, getDoctors, doctor: { doctors } }) => {
  // states
  const alert = useAlert();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [uziParents, setUziParents] = useState([]);
  const [postSize, setPostSize] = useState([]);

  useEffect(() => {
    const variables = {
      skip,
      limit,
      loadMore: false,
      vrach: '',
    };
    getDoctors();
    getUziParents(variables);
  }, []);

  // handlers
  const onLoadMore = () => {
    let newskip = skip + limit;

    const variables = {
      skip: newskip,
      limit,
      vrach: '',
      loadMore: true,
    };

    getUziParents(variables);
    setSkip(newskip);
  };

  const getUziParents = (variables) => {
    axios
      .get(
        `/api/uziparents?limit=${variables.limit}&skip=${variables.skip}&vrach=${variables.vrach}`,
        options(token),
      )
      .then((response) => {
        if (variables.loadMore) {
          setUziParents([...uziParents, ...response.data.uziParents]);
        } else {
          setUziParents(response.data.uziParents);
        }
        setPostSize(response.data.postSize);
      })
      .catch((err) => {
        console.log(err);
      });
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
                .delete(`/api/uziparents/${id}`, options(token))
                .then((response) => {
                  setUziParents(uziParents.filter((s) => s._id !== response.data.uziparent._id));
                })
                .catch((err) => {
                  console.log(err.message);
                });
            },
          },
        ],
      });
    }
  };

  const updateSearchTerms = (newSearchTerm, type) => {
    if (type === 'filter') {
      const variables = {
        skip: 0,
        limit,
        vrach: newSearchTerm,
      };

      setSkip(0);

      getUziParents(variables);
    } else {
      onSort(newSearchTerm);
    }
  };

  const onSort = (term) => {
    //  setSortBy(term);
    if (term === 'first') {
      setUziParents(uziParents.sort(compareByUziparentTitle));
    } else if (term === 'second') {
      setUziParents(uziParents.sort(compareByDoctor));
    }
  };

  return (
    <Layout>
      <FilterAndSort
        first="Шаблон"
        second="Доктор"
        refreshFunction={updateSearchTerms}
        doctors={doctors}
      />
      <TableContainer>
        <PatientsContainer>
          <tbody>
            <tr>
              <th>Шаблон номи</th>
              <th>Шаблон ҳақида маълумот</th>
              <th></th>
              <th>Врач</th>
              <th></th>
            </tr>
            {uziParents[0] &&
              uziParents.map((uziparent) => (
                <Patient key={uziparent._id}>
                  <td>{uziparent.title}</td>
                  <td>{uziparent.description}</td>
                  <td>
                    {uziparent.uzichilds?.map((uzichild) => {
                      return <p key={uzichild._id}>{uzichild.title}</p>;
                    })}
                  </td>
                  <td>
                    {uziparent.vrach.firstname} {uziparent.vrach.lastname[0]}.{' '}
                    {uziparent.vrach.fathername}
                  </td>
                  <td>
                    <Controls>
                      <Link to={`/uziparent/edit/${uziparent._id}`} className="edit">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <Link
                        onClick={() => onDelete(uziparent._id, uziparent.isdeleted)}
                        to="#"
                        className="delete"
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

export default compose(requireAuth, connect(mapStateToProps, { getDoctors }))(UziParentList);

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

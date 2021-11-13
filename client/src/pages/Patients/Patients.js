import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireUser from '../../hoc/requireUser';

// components
import Layout from '../../layout/Layout';
import SearchAndSort from '../../components/SearchAndSort/SearchAndSort';

// styles
import styled from 'styled-components';
import { Patient } from '../../GlobalStyles';

// functions
import { compareByFirstname, compareByLastname, dateFormatter, options } from '../../utils';

const Patients = ({ auth: { token } }) => {
  // states
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [searchTerms, setSearchTerms] = useState('');
  const [patients, setPatients] = useState([]);
  const [postSize, setPostSize] = useState();
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const variables = {
      skip,
      limit,
    };

    getPatients(variables);
  }, []);

  // handlers
  const getPatients = (variables) => {
    axios
      .get(
        `/api/patients?limit=${variables.limit}&skip=${variables.skip}&searchTerm=${variables.searchTerm}`,
        options(token),
      )
      .then((response) => {
        if (variables.loadMore) {
          setPatients([...patients, ...response.data.patients]);
        } else {
          setPatients(response.data.patients);
        }
        setPostSize(response.data.postSize);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const updateSearchTerms = (newSearchTerm, type) => {
    if (type === 'search') {
      const variables = {
        skip: 0,
        limit,
        searchTerm: newSearchTerm,
      };

      setSkip(0);
      setSearchTerms(newSearchTerm);

      getPatients(variables);
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
    getPatients(variables);
    setSkip(newskip);
  };

  const onSort = (term) => {
    setSortBy(term);
    if (term === 'first') {
      setPatients(patients.sort(compareByFirstname));
    } else if (term === 'second') {
      setPatients(patients.sort(compareByLastname));
    }
  };

  return (
    <Layout>
      <SearchAndSort first="Исм" second="Фамилия" refreshFunction={updateSearchTerms} />

      <TableContainer>
        <PatientsContainer>
          <tbody>
            <tr>
              <th>Исм Фамилия</th>
              <th>Туғилган сана</th>
              <th>Телефон рақам</th>
              <th></th>
              <th></th>
            </tr>
            {patients[0] &&
              patients.map((patient) => (
                <Patient key={patient._id}>
                  <td>
                    {patient.firstname} {patient.lastname}
                  </td>
                  <td>{dateFormatter(patient.birthday)}</td>
                  <td>{patient.phonenumber}</td>
                  <td>
                    <Link to={`/service/${patient._id}`}>Хизмат кўрсатиш</Link>
                  </td>
                  <td>
                    <Link to={`/patients/patient/${patient._id}`}>Тўлиқ маълумот</Link>
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

export default compose(requireUser, connect(mapStateToProps))(Patients);

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

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireLabarant from '../../hoc/requireLabarant';

// components
import Layout from '../../layout/Layout';
import SearchAndSort from '../../components/SearchAndSort/SearchAndSort';

// styles
import styled from 'styled-components';
import { PatientsContainer, Patient } from '../../GlobalStyles';
import { compareByPFname, compareByPLname } from '../../utils';

// functions
import { dateFormatter, options, socket } from '../../utils';

const LabList = ({ auth: { token } }) => {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [searchTerms, setSearchTerms] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [postSize, setPostSize] = useState();

  const getAppointments = (variables) => {
    axios
      .get(
        `/api/appointments?limit=${variables.limit}&skip=${variables.skip}&searchTerm=${variables.searchTerm}&isfinished=${variables.isfinished}&appointmenttype=${variables.appointmenttype}`,
        options(token),
      )
      .then((response) => {
        if (variables.loadMore) {
          setAppointments([...appointments, ...response.data.appointments]);
        } else {
          setAppointments(response.data.appointments);
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
      isfinished: false,
      ispaid: false,
      appointmenttype: 'lab',
    };

    getAppointments(variables);

    return () => {
      setAppointments();
    };
  }, []);

  socket.on('new-labappointment', (data) => {
    setAppointments([data, ...appointments]);
  });

  const onLoadMore = () => {
    let newskip = skip + limit;

    const variables = {
      skip: newskip,
      limit,
      loadMore: true,
      isfinished: false,
      ispaid: false,
      appointmenttype: 'lab',
    };

    getAppointments(variables);
    setSkip(newskip);
  };

  const onSort = (term) => {
    setSortBy(term);
    if (term === 'first') {
      setAppointments(appointments.sort(compareByPFname));
    } else if (term === 'second') {
      setAppointments(appointments.sort(compareByPLname));
    }
  };

  const updateSearchTerms = (newSearchTerm, type) => {
    if (type === 'search') {
      const variables = {
        skip: 0,
        limit,
        isfinished: false,
        searchTerm: newSearchTerm,
        appointmenttype: 'lab',
      };

      setSkip(0);
      setSearchTerms(newSearchTerm);

      getAppointments(variables);
    } else {
      onSort(newSearchTerm);
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
              <th>Сана</th>
              <th>Хизмат номи</th>
              <th></th>
            </tr>
            {appointments[0] &&
              appointments.map((appointment) => (
                <Patient key={appointment._id}>
                  <td>
                    {appointment.patient.firstname} {appointment.patient.lastname}
                  </td>
                  <td>{dateFormatter(appointment.updatedAt)}</td>
                  <td>
                    {appointment.services.map((singleService) => (
                      <p key={singleService._id}>{singleService.title}</p>
                    ))}
                  </td>
                  <td>
                    <Link to={`/lab/${appointment._id}`}>Тўлдириш</Link>
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

export default compose(requireLabarant, connect(mapStateToProps))(LabList);

const TableContainer = styled.div`
  width: 95%;
  margin: 0 auto 2rem;
  padding: 2rem 0;
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

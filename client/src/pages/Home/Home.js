import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireUser from '../../hoc/requireUser';
import { deleteAppointment } from '../../store/actions/appointmentActions';

// components
import Layout from '../../layout/Layout';
import SearchAndSort from '../../components/SearchAndSort/SearchAndSort';

// styles
import { PatientsContainer, Patient, Controls } from '../../GlobalStyles';
import styled from 'styled-components';

// functions
import { dateFormatter, options, compareByPFname, compareByPLname, socket } from '../../utils';
import { useAlert } from 'react-alert';

const Home = ({ auth: { token }, deleteAppointment }) => {
  const alert = useAlert();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [searchTerms, setSearchTerms] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [postSize, setPostSize] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        console.error(err.response.data.message);
      });
  };

  useEffect(() => {
    const variables = {
      skip,
      limit,
      isfinished: true,
      ispaid: false,
      appointmenttype: ['lab', 'uzi'],
    };

    getAppointments(variables);

    return () => {
      setAppointments();
    };
  }, []);

  socket.on('finished-appointment', (data) => {
    setAppointments([data, ...appointments]);
  });

  const updateSearchTerms = (newSearchTerm, type) => {
    if (type === 'search') {
      const variables = {
        skip: 0,
        limit,
        isfinished: true,
        searchTerm: newSearchTerm,
        appointmenttype: ['lab', 'uzi'],
      };

      setSkip(0);
      setSearchTerms(newSearchTerm);

      getAppointments(variables);
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
      isfinished: true,
      ispaid: false,
      appointmenttype: ['lab', 'uzi'],
    };
    getAppointments(variables);
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
              deleteAppointment(id);
              setAppointments(appointments.filter((s) => s._id !== id));
            },
          },
        ],
      });
    }
  };

  const onSort = (term) => {
    setSortBy(term);
    if (term === 'first') {
      setAppointments(appointments.sort(compareByPFname));
    } else if (term === 'second') {
      setAppointments(appointments.sort(compareByPLname));
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
              <th>Хизмат</th>
              <th>Нархи</th>
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
                    {appointment.services[0] &&
                      appointment.services.map((s) => {
                        return <p key={s._id}>{s.title}</p>;
                      })}
                    {appointment.uzis[0] &&
                      appointment.uzis.map((s) => {
                        return <p key={s._id}>{s.title}</p>;
                      })}
                  </td>
                  <td>{appointment.price}</td>
                  <td>
                    <Controls>
                      <Link
                        to={`/printlab/${appointment._id}`}
                        className={`edit ${isLoading && 'disabledBtn'}`}
                        target="_blank"
                        onClick={(event) => {
                          event.preventDefault();
                          appointment.appointmenttype[0] === 'lab'
                            ? window.open(`/printlab/${appointment._id}`)
                            : window.open(`/printuzi/${appointment._id}`);
                        }}
                      >
                        <i className="fas fa-file-pdf"></i>
                      </Link>
                      <Link
                        onClick={() => {
                          !isLoading && onDelete(appointment._id, appointment.isdeleted);
                        }}
                        to="#"
                        className={`delete ${
                          (appointment.isdeleted || isLoading) && 'disabledBtn'
                        }`}
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

export default compose(requireUser, connect(mapStateToProps, { deleteAppointment }))(Home);

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

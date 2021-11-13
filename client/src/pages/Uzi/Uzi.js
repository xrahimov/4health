import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router';
import { editAppointment, getAppointment } from '../../store/actions/appointmentActions';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireLabarant from '../../hoc/requireLabarant';

// styles
import styled from 'styled-components';
import {
  StyledDoctor,
  Description,
  StyledRegister,
} from '../../GlobalStyles';

// components
import Layout from '../../layout/Layout';

// functions
import { dateFormatter, options } from '../../utils';
import axios from 'axios';

const Uzi = ({
  auth: { token },
  appointment: { appointment },
  history,
  getAppointment,
  editAppointment,
}) => {
  const { id } = useParams();
  const [error, setError] = useState('');

  useEffect(() => {
    getAppointment(id);
  }, []);

  const handleResult = (e) => {
    setError();

    for (let i in appointment.uzis) {
      for (let j in appointment.uzis[i].uzichilds) {
        if (appointment.uzis[i].uzichilds[j]._id === e.target.name) {
          appointment.uzis[i].uzichilds[j].result = e.target.value;
        }
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    appointment.isfinished = true;
    editAppointment(id, appointment, history);
  };

  return (
    <Layout>
      {appointment ? (
        <>
          <StyledPatient>
            <h3 className="fullname">{`${appointment.patient.firstname} ${appointment.patient.lastname} ${appointment.patient.fathername}`}</h3>

            <PatientDescription>
              <div className="dates">
                <div>
                  <p>Ташриф буюрган санаси:</p>
                  <p>{dateFormatter(appointment.createdAt)}</p>
                </div>
                <div>
                  <p>Туғулган санаси:</p>
                  <p>{dateFormatter(appointment.patient.birthday)}</p>
                </div>
              </div>
            </PatientDescription>
          </StyledPatient>
          <StyledLabRegister>
            <form onSubmit={onSubmit}>
              {appointment.uzis?.map((u, key) => {
                return (
                  <React.Fragment key={u._id}>
                    <h4>{u.title}</h4>
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Rezultat</th>
                          <th>Norma</th>
                          <th>Edizm</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointment.uzis[key].uzichilds?.map((s) => {
                          return (
                            <tr key={s._id}>
                              <td>{s.title}</td>
                              <td>
                                <input name={s._id} type="text" onChange={handleResult} required />
                              </td>
                              <td>{s.norm}</td>
                              <td>{s.edizm}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </React.Fragment>
                );
              })}
              <div>
                <button type="submit">Тасдиқлаш</button>
              </div>
            </form>

            {error !== '' ? <p className="error">{error}</p> : null}
          </StyledLabRegister>
        </>
      ) : (
        <div></div>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
  auth: state.auth,
});

export default compose(
  requireLabarant,
  withRouter,
  connect(mapStateToProps, { getAppointment, editAppointment }),
)(Uzi);

const StyledPatient = styled(StyledDoctor)`
  width: 90%;
  margin: 1rem auto;
  padding: 2rem;
  box-shadow: none;

  .fullname {
    text-align: center;
    color: #000;
  }
`;

const PatientDescription = styled(Description)`
  width: 85%;
  margin: 2rem auto;

  .dates {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      text-align: center;

      p {
        font-weight: 500;
      }
    }
  }
`;

const StyledLabRegister = styled(StyledRegister)`
  padding: 1rem 3rem;

  h4 {
    text-align: center;
  }

  table {
    width: 100%;
    margin: 1.5rem 0;
    border-collapse: collapse;
    border: 1px solid #000;

    td,
    th {
      border: 1px solid #000;
      padding: 0.5rem;
      font-size: 1.15rem;
    }

    th {
      text-align: start;
    }
  }
`;

// const FooterContent = styled.footer`
//   margin: 4rem 0 2rem;

//   h4 {
//     text-align: start;
//   }

//   .wish {
//     color: ${colors.primaryColor};
//   }

//   .sign {
//     display: flex;
//     justify-content: space-between;
//     margin-top: 2rem;

//     p {
//       width: 40%;
//       border-bottom: 1px solid #000;
//     }
//   }
// `;

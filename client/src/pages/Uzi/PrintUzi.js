import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router';
import { getAppointment } from '../../store/actions/appointmentActions';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireLabarant from '../../hoc/requireLabarant';

// styles
import styled from 'styled-components';
import { StyledDoctor, Description } from '../../GlobalStyles';

// functions
import { dateFormatter } from '../../utils';

const PrintUzi = ({ appointment: { appointment }, getAppointment }) => {
  const { id } = useParams();
  const [error, setError] = useState('');
  const r = /\d+\D\D/g;

  useEffect(() => {
    getAppointment(id);
  }, []);

  return (
    <>
      {appointment ? (
        <>
          <StyledPatient>
            <h3 className="fullname">
              <u>Bahodir Shifo Diagnostika</u>
            </h3>
            <p>
              <b>
                <span className="green">Диагностический центр</span> <br />
                <span className="blue">
                  г. Ташкент, Яшнабадский р-н, ул. Авиасозлар, дом 56 <br />
                  +99890 983 0572 +99890372 54 18 (Telegram)
                </span>
              </b>
            </p>
            <PatientDescription>
              <div className="dates">
                <div>
                  <p>
                    <b>Мижоз:</b>
                  </p>
                  <p>{`${appointment.patient.firstname} ${appointment.patient.lastname} ${appointment.patient.fathername}`}</p>
                </div>
                <div>
                  <p>
                    <b>Санаси:</b>
                  </p>
                  <p>{dateFormatter(appointment.createdAt)}</p>
                </div>
                <div>
                  <p>
                    <b>Туғулган санаси:</b>
                  </p>
                  <p>{dateFormatter(appointment.patient.birthday)}</p>
                </div>
              </div>
            </PatientDescription>
          </StyledPatient>

          <StyledLabRegister>
            {appointment.uzis.map((i) => {
              return (
                <Fragment key={i._id}>
                  <h4>{i.title}</h4>
                  {i.uzichilds.map((j) => {
                    let ind = j.content.lastIndexOf('</');
                    return (
                      <div
                        key={j._id}
                        style={{
                          fontSize: j.content.match(r) ? j.content.match(r)[0] : '18px',
                          fontFamily: 'Arial',
                        }}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              j.content.slice(0, ind) +
                              '<span><strong>' +
                              ' ' +
                              j.result +
                              ' ' +
                              j.edizm +
                              '</strong>' +
                              ' ' +
                              j.norm +
                              '</span>' +
                              j.content.slice(ind),
                          }}
                        />
                        {/* <button onClick={() => console.log('furrrr', j.content.match(r))}>
                          hisS
                        </button> */}
                      </div>
                    );
                  })}
                </Fragment>
              );
            })}

            {error !== '' ? <p className="error">{error}</p> : null}
            <FooterContent>
              <b>
                {/* <p>Интерпретация резултатов анализов толко за лечашим врачом!</p>
                <p className="wish">"Bahodir Shifo" диагностика желает вам здоровя!</p> */}
                <p className="sign">
                  Врач УЗИ: {appointment.uzidoctor.firstname} {appointment.uzidoctor.lastname}{' '}
                  {appointment.uzidoctor.fathername}
                  {/* <span></span> */}
                </p>
              </b>
            </FooterContent>
          </StyledLabRegister>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
});

export default compose(
  requireLabarant,
  withRouter,
  connect(mapStateToProps, { getAppointment }),
)(PrintUzi);

const StyledPatient = styled(StyledDoctor)`
  width: 100%;
  margin: 0.5rem auto;
  padding: 0.5rem;
  box-shadow: none;

  .fullname {
    text-align: center;
    color: #f52a2a;
  }

  .green {
    color: #1bab3d;
  }

  .blue {
    color: #2797a8;
  }
`;

const PatientDescription = styled(Description)`
  width: 100%;
  margin: 1rem auto;

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

const StyledRegister = styled.div`
  width: 100%;
  margin: 1rem auto;
  padding: 1rem 0 2rem;
  background-color: #fff;
  border-radius: 1rem;

  button {
    margin-top: 1rem;
  }
`;

const StyledLabRegister = styled(StyledRegister)`
  padding: 1rem 1rem;

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

const FooterContent = styled.footer`
  margin: 1rem 0;

  h4 {
    text-align: start;
  }

  .wish {
    color: #2797a8;
  }

  .sign {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    span {
      width: 40%;
      border-bottom: 1px solid #000;
    }
  }
`;

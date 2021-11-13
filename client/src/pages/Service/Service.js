import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';
import { getServiceTypes } from '../../store/actions/serviceTypeActions';
import { addAppointment } from '../../store/actions/appointmentActions';
import { getDoctors } from '../../store/actions/doctorActions';

// form validation
import { useFormik } from 'formik';
import { appointmentSchema } from './validation';
import { RadioContainer } from '../../GlobalStyles';

// styles
import styled from 'styled-components';
import {
  StyledDoctor,
  Description,
  StyledTitle,
  StyledRegister,
  SelectContainer,
  RegisterContainer,
} from '../../GlobalStyles';
import { StyledPickerContainer } from '../PatientRegister/BirthdayPicker';

// components
import Layout from '../../layout/Layout';

// functions
import { dateFormatter, options } from '../../utils';

const Service = ({
  auth: { token },
  servicetype: { error, servicetypes },
  doctor: { doctors },
  history,
  getServiceTypes,
  addAppointment,
  getDoctors,
}) => {
  const { id } = useParams();

  // states
  const [servicetype, setServicetype] = useState();
  const [price, setPrice] = useState('');
  const [patient, setPatient] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [uzidoctor, setUzidoctor] = useState();
  const [uziparents, setUziparents] = useState([]);
  const [selectedUzis, setSelectedUzis] = useState([]);
  const [currenttype, setCurrenttype] = useState('lab');

  useEffect(() => {
    axios
      .get(`/api/patients/${id}`, options(token))
      .then((response) => {
        setPatient(response.data.patient);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });

    getServiceTypes();
    getDoctors();
  }, []);

  const changeCurrenttype = (e) => {
    setPrice(0);
    if (e.target.value === 'lab') {
      setCurrenttype('lab');
      setSelectedUzis([]);
      setUzidoctor();
    } else {
      setCurrenttype('uzi');
      setSelectedServices([]);
    }
  };

  const getServices = (id) => {
    setServices([]);
    axios
      .get(`/api/services/servicetype/${id}`, options(token))
      .then((response) => {
        setServices(response.data.services);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  // handler functions
  const handleType = (event) => {
    if (event.target.value !== '') {
      setServicetype(event.target.value);
      getServices(event.target.value);
    }
  };

  const handleUzidoctor = (event) => {
    if (event.target.value !== '') {
      setUzidoctor(doctors.find((doctor) => doctor._id === event.target.value));
      axios
        .get(`/api/uziparents?limit=${100}&skip=${0}&vrach=${event.target.value}`, options(token))
        .then((response) => {
          setUziparents(response.data.uziParents);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleService = (event) => {
    if (event.target.value !== '') {
      const sId = event.target.value;
      !selectedServices.find((s) => s._id === sId) &&
        selectedServices.push(services.find((s) => s._id === sId));

      setPrice(services.find((s) => s._id === sId).price);
      handlePrice();
    }
  };

  const handlePrice = (cprice) => {
    if (cprice) {
      setPrice(price - cprice);
    } else {
      let currentPrice = 0;
      selectedServices.forEach((s) => {
        currentPrice += s.price;
      });
      selectedUzis.forEach((s) => {
        currentPrice += s.price;
      });

      setPrice(currentPrice);
    }
  };

  const handleUnselect = (id, cprice, type) => {
    type === 'service'
      ? setSelectedServices(selectedServices.filter((s) => s._id !== id))
      : setSelectedUzis(selectedUzis.filter((s) => s._id !== id));
    handlePrice(cprice);
  };

  const handleUzi = (event) => {
    if (event.target.value !== '') {
      const sId = event.target.value;
      !selectedUzis.find((s) => s._id === sId) &&
        selectedUzis.push(uziparents.find((s) => s._id === sId));

      setPrice(uziparents.find((s) => s._id === sId).price);
      handlePrice();
    }
  };

  // form validation
  const formik = useFormik({
    initialValues: {
      patient: '',
      services: '',
      price: '',
    },
    validationSchema: appointmentSchema,
    onSubmit: (values) => {
      let types = [];
      selectedServices[0] && types.push('lab');
      uzidoctor && types.push('uzi');

      values.price = parseInt(price);
      values.patient = patient;
      values.services = selectedServices;
      values.uzis = selectedUzis;
      values.searchfield = patient.firstname;
      values.appointmenttype = types;
      values.uzidoctor = uzidoctor ? uzidoctor : {};
      addAppointment(values, history);
    },
  });

  return (
    <Layout>
      {patient ? (
        <>
          <StyledTitle>Хизмат кўрсатиш</StyledTitle>

          <StyledPatient>
            <h3 className="fullname">{`${patient.firstname} ${patient.lastname} ${patient.fathername}`}</h3>

            <PatientDescription>
              <div className="dates">
                <div>
                  <p>
                    <b>Туғулган санаси:</b>
                  </p>
                  <p>{dateFormatter(patient.birthday)}</p>
                </div>
                <div>
                  <p>
                    <b>Телефон рақами:</b>
                  </p>
                  <p>+998{patient.phonenumber}</p>
                </div>
              </div>
              {/* <p>
                Ташхиз: Лорем ипсум долор сит амет, еу нам сцаевола аппеллантур, еу цум видит вирис
                санцтус. Хас ат ессе менандри, вел лудус феугиат не. Ех еверти облияуе вим, пер ет
                нуллам феугиат сусципиантур. Амет инани цонсеяуат цу нам, поссим тхеопхрастус
                делицатиссими ат дуо. Вим дисцере сенсерит ид. Сеа доценди партиендо ад, нам тибияуе
                хендрерит еу.
              </p> */}
            </PatientDescription>
          </StyledPatient>

          <StyledPatient>
            <RadioContainer>
              <input
                type="radio"
                name="select"
                id="option-1"
                value="uzi"
                onChange={changeCurrenttype}
              />
              <input
                type="radio"
                name="select"
                id="option-2"
                value="lab"
                onChange={changeCurrenttype}
                defaultChecked
              />
              <label htmlFor="option-1" className="option option-1">
                <div className="dot"></div>
                <span>УЗИ</span>
              </label>
              <label htmlFor="option-2" className="option option-2">
                <div className="dot"></div>
                <span>Лабаратория</span>
              </label>
            </RadioContainer>
          </StyledPatient>

          <StyledPatient style={{ padding: '1rem 2rem' }}>
            {selectedServices[0] &&
              selectedServices.map((sService, index) => {
                return (
                  <button
                    onClick={() => handleUnselect(sService._id, sService.price, 'service')}
                    key={index}
                    style={{ width: 'fit-content', margin: '1rem' }}
                  >
                    {sService.title}
                  </button>
                );
              })}

            {selectedUzis[0] &&
              selectedUzis.map((sService, index) => {
                return (
                  <button
                    onClick={() => handleUnselect(sService._id, sService.price, 'uzi')}
                    key={index}
                    style={{ width: 'fit-content', margin: '1rem' }}
                  >
                    {sService.title}
                  </button>
                );
              })}
          </StyledPatient>

          <StyledRegister>
            <RegisterContainer>
              <form onSubmit={formik.handleSubmit} noValidate>
                <div>
                  <SelectContainer>
                    {currenttype === 'lab' && (
                      <>
                        <StyledPickerContainer className="type">
                          <label htmlFor="servicetype">Хизмат тури</label>
                          <select name="servicetype" id="servicetype" onChange={handleType}>
                            <option value="">Танлаш</option>
                            {servicetypes[0] &&
                              servicetypes.map((type) => {
                                return (
                                  <option key={type._id} value={type._id}>
                                    {type.title}
                                  </option>
                                );
                              })}
                          </select>
                        </StyledPickerContainer>
                        <StyledPickerContainer className="type">
                          <label htmlFor="service">Хизмат номи</label>
                          <select name="service" id="service" onChange={handleService}>
                            <option value="">Танлаш</option>
                            {services[0] &&
                              services.map((service) => {
                                return (
                                  <option key={service._id} value={service._id}>
                                    {service.title}
                                  </option>
                                );
                              })}
                          </select>
                        </StyledPickerContainer>
                      </>
                    )}
                    {currenttype === 'uzi' && (
                      <>
                        <StyledPickerContainer className="type">
                          <label htmlFor="uzidoctor">Врач</label>
                          <select name="uzidoctor" id="uzidoctor" onChange={handleUzidoctor}>
                            <option value="">Танлаш</option>
                            {doctors[0] &&
                              doctors.map((doctor) => {
                                return (
                                  <option key={doctor._id} value={doctor._id}>
                                    {doctor.firstname} {doctor.lastname} {doctor.fathername}
                                  </option>
                                );
                              })}
                          </select>
                        </StyledPickerContainer>
                        <StyledPickerContainer className="type">
                          <label htmlFor="uziparent">УЗИ</label>
                          <select name="uziparent" id="uziparent" onChange={handleUzi}>
                            <option value="">Танлаш</option>
                            {uziparents[0] &&
                              uziparents.map((uziparent) => {
                                return (
                                  <option key={uziparent._id} value={uziparent._id}>
                                    {uziparent.title}
                                  </option>
                                );
                              })}
                          </select>
                        </StyledPickerContainer>
                      </>
                    )}
                    <div>
                      <label htmlFor="price">Хизмат нархи</label>
                      <input
                        name="price"
                        type="number"
                        id="price"
                        min={0}
                        onBlur={formik.handleBlur}
                        value={price}
                        disabled
                      />

                      {formik.touched.price && formik.errors.price ? (
                        <p className="error">{formik.errors.price}</p>
                      ) : null}
                    </div>
                  </SelectContainer>

                  {formik.touched.servicetype && formik.errors.servicetype ? (
                    <p className="error">{formik.errors.servicetype}</p>
                  ) : null}
                </div>

                {error && <p className="error">{error}</p>}

                <div>
                  <button type="submit">Рўйҳатдан ўтказиш</button>
                </div>
              </form>
            </RegisterContainer>
          </StyledRegister>
        </>
      ) : (
        <div></div>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  servicetype: state.servicetype,
  service: state.service,
  doctor: state.doctor,
});

export default compose(
  requireAuth,
  withRouter,
  connect(mapStateToProps, {
    getServiceTypes,
    addAppointment,
    getDoctors,
  }),
)(Service);

const StyledPatient = styled(StyledDoctor)`
  width: 90%;
  padding: 1rem 0 2rem;

  .fullname {
    text-align: center;
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

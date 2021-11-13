import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import axios from 'axios';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';

// form validation
import { editPatient } from '../../store/actions/patientActions';

import {
  StyledTitle,
  StyledRegister,
  SelectContainer,
  RegisterContainer,
} from '../../GlobalStyles';

// components
import Layout from '../../layout/Layout';
import BirthdayPicker, { StyledPickerContainer } from '../PatientRegister/BirthdayPicker';
import requireUser from '../../hoc/requireUser';
import { dateFormatter, options } from '../../utils';

const PatientEdit = ({ auth: { token }, patient: { isLoading, error }, history, editPatient }) => {
  const { id } = useParams();

  // form states
  const [patient, setPatient] = useState({});
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [fathername, setFathername] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  // useEffects
  useEffect(() => {
    axios.get(`/api/patients/${id}`, options(token)).then((res) => {
      if (res.status === 200) {
        setPatient(res.data.patient);
        setBirthday(res.data.patient.birthday);
        setGender(res.data.patient.gender);
        setFirstname(res.data.patient.firstname);
        setLastname(res.data.patient.lastname);
        setFathername(res.data.patient.fathername);
        setPhonenumber(res.data.patient.phonenumber);
      } else {
        alert(res.data.message);
      }
    });
  }, []);

  // handler functions
  const handleBirthday = (date) => {
    setBirthday(new Date(parseInt(date.byear), parseInt(date.bmonth), parseInt(date.bday)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      gender,
      firstname,
      lastname,
      fathername,
      phonenumber: parseInt(phonenumber),
      birthday,
    };

    editPatient(id, formData, history);
  };

  return (
    <Layout>
      <StyledTitle>Маълумотларни ўзгартириш</StyledTitle>
      <StyledRegister>
        <RegisterContainer>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstname">Исм</label>
              <input
                placeholder={firstname}
                name="firstname"
                id="firstname"
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                required
              />

              <label htmlFor="lastname">Фамилия</label>
              <input
                placeholder={lastname}
                name="lastname"
                type="text"
                id="lastname"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                required
              />

              <label htmlFor="fathername">Шарифи</label>
              <input
                placeholder={fathername}
                name="fathername"
                id="fathername"
                type="text"
                onChange={(e) => setFathername(e.target.value)}
                value={fathername}
                required
              />

              <SelectContainer>
                <div>
                  <label htmlFor="dob">Туғилган куни: {dateFormatter(birthday)}</label>
                  <BirthdayPicker
                    defaultDate={birthday}
                    handleBirthday={(date) => handleBirthday(date)}
                  />
                </div>

                <StyledPickerContainer className="gender">
                  <label htmlFor="gender">Жинси</label>
                  <select
                    value={gender}
                    name="gender"
                    id="gender"
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Жинс</option>
                    <option value="m">Эркак</option>
                    <option value="f">Аёл</option>
                  </select>
                </StyledPickerContainer>
              </SelectContainer>

              <label htmlFor="phonenumber">Телефон рақами</label>
              <input
                name="phonenumber"
                id="phonenumber"
                type="number"
                min="500000000"
                max="999999999"
                onChange={(e) => setPhonenumber(e.target.value)}
                value={phonenumber}
                required
              />
            </div>

            {error && <p className="error">{error}</p>}

            <div>
              <button type="submit" disabled={isLoading}>
                Таҳрирлаш
              </button>
            </div>
          </form>
        </RegisterContainer>
      </StyledRegister>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  patient: state.patient,
});

export default compose(
  requireUser,
  withRouter,
  connect(mapStateToProps, { editPatient }),
)(PatientEdit);

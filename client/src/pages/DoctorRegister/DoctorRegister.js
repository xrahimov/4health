import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireUser from '../../hoc/requireUser';
import { addDoctor } from '../../store/actions/doctorActions';

// form validation
import { useFormik } from 'formik';
import { doctorSchema } from './validation';

// styles
import {
  StyledTitle,
  StyledRegister,
  SelectContainer,
  RegisterContainer,
} from '../../GlobalStyles';

// components
import Layout from '../../layout/Layout';
import BirthdayPicker, { StyledPickerContainer } from '../PatientRegister/BirthdayPicker';

const DoctorRegister = ({ history, addDoctor, doctor: { isLoading, error } }) => {
  // states
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();

  // handler functions
  const handleBirthday = (date) => {
    setBirthday(new Date(parseInt(date.byear), parseInt(date.bmonth), parseInt(date.bday)));
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  // form validation
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      fathername: '',
      phonenumber: '',
    },
    validationSchema: doctorSchema,
    onSubmit: (values) => {
      values.birthday = birthday;
      values.gender = gender;
      values.phonenumber = parseInt(values.phonenumber);
      addDoctor(values, history);
    },
  });

  return (
    <Layout>
      <StyledTitle>Шифоркорни рўйҳатдан ўтказиш</StyledTitle>

      <StyledRegister>
        <RegisterContainer>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div>
              <label htmlFor="firstname">Исм</label>
              <input
                placeholder="Исм"
                name="firstname"
                id="firstname"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
              />

              {formik.touched.firstname && formik.errors.firstname ? (
                <p className="error">{formik.errors.firstname}</p>
              ) : null}

              <label htmlFor="lastname">Фамилия</label>
              <input
                placeholder="Фамилия"
                name="lastname"
                type="text"
                id="lastname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.surname}
              />

              {formik.touched.lastname && formik.errors.lastname ? (
                <p className="error">{formik.errors.lastname}</p>
              ) : null}

              <label htmlFor="fathername">Шарифи</label>
              <input
                placeholder="Шарифи"
                name="fathername"
                id="fathername"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fathername}
              />
              {formik.touched.fathername && formik.errors.fathername ? (
                <p className="error">{formik.errors.fathername}</p>
              ) : null}

              <SelectContainer>
                <div>
                  <label htmlFor="dob">Туғилган куни</label>
                  <BirthdayPicker handleBirthday={(date) => handleBirthday(date)} />
                </div>

                <StyledPickerContainer className="gender">
                  <label htmlFor="gender">Жинси</label>
                  <select name="gender" id="gender" onChange={handleGender}>
                    <option value="gender">Жинс</option>
                    <option value="m">Эркак</option>
                    <option value="f">Аёл</option>
                  </select>
                </StyledPickerContainer>
              </SelectContainer>

              {formik.touched.gender && formik.errors.gender ? (
                <p className="error">{formik.errors.gender}</p>
              ) : null}

              <label htmlFor="phonenumber">Телефон рақами</label>
              <input
                placeholder="Телефон рақами"
                name="phonenumber"
                id="phonenumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phonenumber}
              />

              {formik.touched.phonenumber && formik.errors.phonenumber ? (
                <p className="error">{formik.errors.phonenumber}</p>
              ) : null}
            </div>

            {error && <p className="error">{error}</p>}

            <div>
              <button type="submit" disabled={isLoading || !formik.isValid}>
                Рўйҳатдан ўтказиш
              </button>
            </div>
          </form>
        </RegisterContainer>
      </StyledRegister>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  doctor: state.doctor,
});

export default compose(
  requireUser,
  withRouter,
  connect(mapStateToProps, { addDoctor }),
)(DoctorRegister);

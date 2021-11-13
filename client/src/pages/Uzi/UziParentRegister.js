import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getDoctors } from '../../store/actions/doctorActions';

// form validation
import { useFormik } from 'formik';
import { uziParentSchema } from '../ServiceRegister/validation';

// styles
import {
  StyledTitle,
  StyledRegister,
  RegisterContainer,
  SelectContainer,
} from '../../GlobalStyles';

// components
import Layout from '../../layout/Layout';
import { StyledPickerContainer } from '../PatientRegister/BirthdayPicker';
import requireAuth from '../../hoc/requireAuth';
import { options } from '../../utils';

const UziParentRegister = ({ auth: { token }, history, getDoctors, doctor: { doctors } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    getDoctors();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: 0,
    },
    validationSchema: uziParentSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      values.vrach = doctor;
      axios
        .post('/api/uziparents', values, options(token))
        .then(() => {
          setIsLoading(false);
          history.push('/uziparentslist');
        })
        .catch((err) => {
          setError(err.message);
        });
    },
  });

  return (
    <Layout>
      <StyledTitle>Янги шаблон қўшиш</StyledTitle>
      <StyledRegister>
        <RegisterContainer>
          <form onSubmit={formik.handleSubmit} noValidate>
            <label htmlFor="title">Шаблон номи</label>
            <input
              placeholder="Шаблон номи"
              name="title"
              id="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />

            {formik.touched.title && formik.errors.title ? (
              <p className="error">{formik.errors.title}</p>
            ) : null}

            <SelectContainer>
              <div>
                <label htmlFor="price">Шаблон нархи</label>
                <input
                  name="price"
                  type="number"
                  id="price"
                  min={0}
                  placeholder="Шаблон нархини киритинг"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                />

                {formik.touched.price && formik.errors.price ? (
                  <p className="error">{formik.errors.price}</p>
                ) : null}
              </div>

              <StyledPickerContainer className="type">
                <label htmlFor="vrach">Врач:</label>
                <select name="vrach" id="vrach" onChange={(e) => setDoctor(e.target.value)}>
                  <option value="">Танлаш</option>
                  {doctors[0] &&
                    doctors.map((d) => {
                      return (
                        <option key={d._id} value={d._id}>
                          {d.firstname} {d.lastname} {d.fathername}
                        </option>
                      );
                    })}
                </select>
              </StyledPickerContainer>
            </SelectContainer>

            <label htmlFor="description">Шаблон ҳақида маълумот</label>
            <textarea
              cols="30"
              rows="8"
              name="description"
              placeholder="Шаблон ҳақида қисқача маълумот"
              id="description"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            ></textarea>

            {formik.touched.description && formik.errors.description ? (
              <p className="error">{formik.errors.description}</p>
            ) : null}

            {error && <p className="error">{error}</p>}

            <div>
              <button type="submit" disabled={isLoading || !formik.isValid || !doctor}>
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
  auth: state.auth,
  doctor: state.doctor,
});

export default compose(
  requireAuth,
  withRouter,
  connect(mapStateToProps, { getDoctors }),
)(UziParentRegister);

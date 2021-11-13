import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';
import { addService } from '../../store/actions/serviceActions';
import { getServiceTypes } from '../../store/actions/serviceTypeActions';

// form validation
import { useFormik } from 'formik';
import { serviceSchema } from './validation';

// styles
import {
  StyledTitle,
  StyledRegister,
  RegisterContainer,
  SelectContainer,
} from '../../GlobalStyles';
import { StyledPickerContainer } from '../PatientRegister/BirthdayPicker';

// components
import Layout from '../../layout/Layout';

const ServiceRegister = ({
  servicetype: { error, servicetypes },
  history,
  addService,
  getServiceTypes,
}) => {
  // states
  const [servicetype, setServicetype] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    getServiceTypes();
  }, []);

  // handler functions
  const handleType = (event) => {
    setServicetype(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  // form validation
  const formik = useFormik({
    initialValues: {
      title: '',
      norm: '',
      edizm: '',
    },
    validationSchema: serviceSchema,
    onSubmit: (values) => {
      values.price = parseInt(price);
      values.servicetype = servicetypes.find((stype) => stype._id === servicetype);
      addService(values, history);
    },
  });

  return (
    <Layout>
      <StyledTitle>Хизматни рўйҳатдан ўтказиш</StyledTitle>

      <StyledRegister>
        <RegisterContainer>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div>
              <SelectContainer>
                <StyledPickerContainer className="type">
                  <label htmlFor="type">Хизмат тури</label>
                  <select name="type" id="type" onChange={handleType}>
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
              </SelectContainer>

              {formik.touched.servicetype && formik.errors.servicetype ? (
                <p className="error">{formik.errors.servicetype}</p>
              ) : null}

              <label htmlFor="title">Хизмат номи</label>
              <input
                placeholder="Хизмат номини киритинг"
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

              <label htmlFor="price">Хизмат нархи</label>
              <input
                name="price"
                type="number"
                id="price"
                min={0}
                placeholder="Хизмат нархини киритинг"
                onChange={handlePrice}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />

              {formik.touched.price && formik.errors.price ? (
                <p className="error">{formik.errors.price}</p>
              ) : null}

              <label htmlFor="norm">Норма</label>
              <input
                placeholder="Норма"
                name="norm"
                id="norm"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.norm}
              />

              {formik.touched.norm && formik.errors.norm ? (
                <p className="error">{formik.errors.norm}</p>
              ) : null}

              <label htmlFor="title">Ед. изм</label>
              <input
                placeholder="Ед. изм"
                name="edizm"
                id="edizm"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.edizm}
              />

              {formik.touched.edizm && formik.errors.edizm ? (
                <p className="error">{formik.errors.edizm}</p>
              ) : null}
            </div>

            {error && <p className="error">{error}</p>}

            <div>
              <button type="submit">Рўйҳатдан ўтказиш</button>
            </div>
          </form>
        </RegisterContainer>
      </StyledRegister>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  servicetype: state.servicetype,
});

export default compose(
  requireAuth,
  withRouter,
  connect(mapStateToProps, { addService, getServiceTypes }),
)(ServiceRegister);

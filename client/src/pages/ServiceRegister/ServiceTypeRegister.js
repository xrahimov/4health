import React from 'react';
import { withRouter } from 'react-router-dom';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';

// form validation
import { useFormik } from 'formik';
import { addServiceType } from '../../store/actions/serviceTypeActions';
import { serviceTypeSchema } from './validation';

// styles
import { StyledTitle, StyledRegister, RegisterContainer } from '../../GlobalStyles';

// components
import Layout from '../../layout/Layout';
import requireAuth from '../../hoc/requireAuth';

const ServiceTypeRegister = ({ servicetype: { isLoading, error }, history, addServiceType }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: serviceTypeSchema,
    onSubmit: (values) => {
      addServiceType(values, history);
    },
  });

  return (
    <Layout>
      <StyledTitle>Янги хизмат турини қўшиш</StyledTitle>
      <StyledRegister>
        <RegisterContainer>
          <form onSubmit={formik.handleSubmit} noValidate>
            <label htmlFor="title">Хизмат тури</label>
            <input
              placeholder="Хизмат турининг номи"
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

            <label htmlFor="description">Хизмат тури ҳақида маълумот</label>
            <textarea
              cols="30"
              rows="8"
              name="description"
              placeholder="Хизмат тури ҳақида қисқача маълумот"
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
              <button
                type="submit"
                // disabled={isLoading || !formik.isValid}
              >
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
  servicetype: state.servicetype,
});

export default compose(
  requireAuth,
  withRouter,
  connect(mapStateToProps, { addServiceType }),
)(ServiceTypeRegister);

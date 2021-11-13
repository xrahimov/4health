import React from 'react';
import { withRouter } from 'react-router-dom';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';

// form validation
import { useFormik } from 'formik';
import { addSpec } from '../../store/actions/specActions';
import { specSchema } from './validation';

// styles
import { StyledTitle, StyledRegister, RegisterContainer } from '../../GlobalStyles';

// components
import Layout from '../../layout/Layout';
import requireUser from '../../hoc/requireUser';

const SpecRegister = ({ spec: { isLoading, error }, history, addSpec }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: specSchema,
    onSubmit: (values) => {
      addSpec(values, history);
    },
  });

  return (
    <Layout>
      <StyledTitle>Янги муттахассислик қўшиш</StyledTitle>
      <StyledRegister>
        <RegisterContainer>
          <form onSubmit={formik.handleSubmit} noValidate>
            <label htmlFor="title">Муттахассислик</label>
            <input
              placeholder="Муттахассислик номи"
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

            <label htmlFor="description">Муттахассислик ҳақида маълумот</label>
            <textarea
              cols="30"
              rows="8"
              name="description"
              placeholder="Муттахассислик ҳақида қисқача маълумот"
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
  spec: state.spec,
});

export default compose(
  requireUser,
  withRouter,
  connect(mapStateToProps, { addSpec }),
)(SpecRegister);

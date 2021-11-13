import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import { loginUserWithEmail } from '../../store/actions/authActions';
import { loginSchema } from './validation';

// constants
import { GOOGLE_AUTH_LINK } from '../../constants'

// styles
import styled from 'styled-components';
import { colors } from '../../GlobalStyles';

// icons
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook } from 'react-icons/gr';

const Login = ({ auth: { isAuthenticated, me, error, isLoading }, history, loginUserWithEmail }) => {
  // functions
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginUserWithEmail(values, history);
    },
  });

  // if (isAuthenticated) return <Redirect to="/" />;

  return (
    <StyledLogin>
      <LoginContainer>
        <form onSubmit={formik.handleSubmit}>
          <h2>
            <i className="fas fa-sign-in-alt"></i> Кириш
          </h2>
{/* 
          <StyledSigninIcons>
            <div>
              <button>
                <FcGoogle />
              </button>
              <button>
                <GrFacebook />
              </button>
            </div>
          </StyledSigninIcons> */}

          <div>
            <input
              placeholder="Эмаил аддресс"
              name="email"
              type="email"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />

            {formik.touched.email && formik.errors.email ? (
              <p className="error">Эмаил аддрессни тўлиқ киритинг</p>
            ) : null}

            <input
              placeholder="Пароль"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            {formik.touched.password && formik.errors.password ? (
              <p className="error">Пароль майдонини тўлдиринг</p>
            ) : null}
          </div>

          {error && <p className="error">{error}</p>}

          <div>
            <button className="submit-btn" disabled={isLoading || !formik.isValid} type="submit">
              Тасдиқлаш
            </button>
          </div>
        </form>
      </LoginContainer>
    </StyledLogin>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(withRouter, connect(mapStateToProps, { loginUserWithEmail }))(Login);

const StyledLogin = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LoginContainer = styled.div`
  max-width: 450px;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex: 1;

  form {
    width: 100%;
  }

  h2 {
    margin-bottom: 1rem;
  }

  input {
    margin-bottom: 0.5rem;
    color: ${colors.primaryColor};
  }

  button {
    margin-top: 1rem;
  }
`;

export const StyledSigninIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 1em;

  svg {
    font-size: 2rem;

    &:last-child {
      color: #4267b2;
    }
  }

  button {
    background: white;
    width: auto;
    padding: 0.7em 1em;
    border-radius: 1em;

    &:last-child {
      margin-left: 1.5em;
    }
  }

  p {
    color: ${colors.textColor};
    position: relative;
    width: 100%;

    &::before {
      content: '';
      width: 35%;
      height: 3px;
      top: 50%;
      left: 0;
      position: absolute;
      background: ${colors.backgroundColor};
    }

    &::after {
      content: '';
      width: 35%;
      height: 3px;
      top: 50%;
      right: 0;
      position: absolute;
      background: ${colors.backgroundColor};
    }
  }
`;



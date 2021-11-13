import React, { useState, useRef, useEffect } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import { logOutUser } from '../../store/actions/authActions';

// styles
import styled from 'styled-components';
import { colors } from '../../GlobalStyles';
import LogoSVG from './LogoSVG';

const Navbar = ({ logOutUser, history, auth }) => {
  const { pathname } = useLocation();

  // references
  const doctorsContainerRef = useRef(null);
  const servicesContainerRef = useRef(null);
  const patientsContainerRef = useRef(null);

  // states
  const [isDoctorShowing, setIsDoctorShowing] = useState(false);
  const [isServiceShowing, setIsServiceShowing] = useState(false);
  const [isPatientShowing, setIsPatientShowing] = useState(false);

  useEffect(() => {
    toggleNav(isDoctorShowing, doctorsContainerRef);
    toggleNav(isServiceShowing, servicesContainerRef);
    toggleNav(isPatientShowing, patientsContainerRef);
  }, [isDoctorShowing, isServiceShowing, isPatientShowing]);

  // functions
  const onLogOut = () => {
    logOutUser(history);
  };

  const serviceClickHandler = () => {
    setIsServiceShowing(!isServiceShowing);
  };

  const patientClickHandler = () => {
    setIsPatientShowing(!isPatientShowing);
  };

  const doctorClickHandler = () => {
    setIsDoctorShowing(!isDoctorShowing);
  };

  const toggleNav = (state, ref) => {
    // changing styles of the service nav section
    if (state) {
      ref.current.style.display = 'block';
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.opacity = '1';
        }
      }, 100);
    } else {
      ref.current.style.opacity = '0';
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.display = 'none';
        }
      }, 200);
    }
  };

  return (
    <Nav>
      <NavLinks>
        <Logo>
          {/* <LogoSVG /> */} <h1>Logo</h1>
        </Logo>

        <NavItem>
          <Link to="/" className={pathname === '/' ? 'active' : ''}>
            <i className="fas fa-clinic-medical"></i>
            <span>Бош саҳифа</span>
          </Link>
        </NavItem>

        <NavItem>
          <Link to="/lablist" className={pathname === '/lablist' ? 'active' : ''}>
            <i className="fas fa-flask"></i>
            <span>Лобаротория</span>
          </Link>
        </NavItem>

        {/*===== Service Links =====*/}
        <NavItem>
          <Link
            to="#"
            className={
              pathname === '/servicelist' ||
              pathname === '/serviceregister' ||
              pathname === '/servicetypelist' ||
              pathname === '/servicetyperegister'
                ? ' active'
                : ''
            }
            onClick={serviceClickHandler}
          >
            <div>
              <i className="fas fa-stethoscope"></i>
              <span>Лаб. хизматлар</span>
              <ChevronIcon className="fas fa-chevron-down"></ChevronIcon>
            </div>
          </Link>
        </NavItem>

        <LinksContainer ref={servicesContainerRef}>
          <NavItem>
            <Link to="/servicelist" className={pathname === '/servicelist' ? 'active' : ''}>
              Рўйҳат
            </Link>
          </NavItem>

          <NavItem>
            <Link to="/serviceregister" className={pathname === '/serviceregister' ? 'active' : ''}>
              Рўйҳатдан ўтказиш
            </Link>
          </NavItem>

          <NavItem>
            <Link to="/servicetypelist" className={pathname === '/servicetypelist' ? 'active' : ''}>
              Хизмат тури рўйҳати
            </Link>
          </NavItem>

          <NavItem>
            <Link
              to="/servicetyperegister"
              className={pathname === '/servicetyperegister' ? 'active' : ''}
            >
              Хизмат турини қўшиш
            </Link>
          </NavItem>
        </LinksContainer>

        {/*===== Customer Links =====*/}
        <NavItem>
          <Link
            to="#"
            className={
              pathname === '/patients' ||
              pathname === '/patientregister' ||
              pathname.includes('/patients/patient/')
                ? 'active'
                : ''
            }
            onClick={patientClickHandler}
          >
            <i className="fas fa-users"></i>
            <span>Мижозлар</span>
            <ChevronIcon className="fas fa-chevron-down"></ChevronIcon>
          </Link>
        </NavItem>

        <LinksContainer ref={patientsContainerRef}>
          <NavItem>
            <Link to="/patients" className={pathname === '/patients' ? 'active' : ''}>
              Рўйҳат
            </Link>
          </NavItem>

          <NavItem>
            <Link to="/patientregister" className={pathname === '/patientregister' ? 'active' : ''}>
              Рўйҳатдан ўтказиш
            </Link>
          </NavItem>
        </LinksContainer>

        {/*===== Doctors Links =====*/}
        <NavItem>
          <Link
            to="#"
            className={
              pathname === '/doctors' ||
              pathname === '/doctorregister' ||
              pathname.includes('/doctors/doctor/')
                ? 'active'
                : ''
            }
            onClick={doctorClickHandler}
          >
            <i className="fas fa-user-md"></i>
            <span>Шифокорлар</span>

            <ChevronIcon className="fas fa-chevron-down"></ChevronIcon>
          </Link>
        </NavItem>

        <LinksContainer ref={doctorsContainerRef}>
          <NavItem>
            <Link to="/doctors" className={pathname === '/doctors' ? 'active' : ''}>
              Рўйҳат
            </Link>
          </NavItem>

          <NavItem>
            <Link to="/doctorregister" className={pathname === '/doctorregister' ? 'active' : ''}>
              Рўйҳатдан ўтказиш
            </Link>
          </NavItem>
        </LinksContainer>

        <NavItem onClick={onLogOut}>
          <Link to="/login">
            <i className="fas fa-sign-out-alt"></i>
            <span>Чиқиш</span>
          </Link>
        </NavItem>
      </NavLinks>
    </Nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);

const Nav = styled.nav`
  width: 17%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: all 0.4s ease-in-out;
  background: #fff;
`;

const Logo = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.textColor};
  padding: 0.5rem 0;
  margin-bottom: 1rem;
`;

const NavLinks = styled.ul`
  position: fixed;
  top: 0;
  left: 0;
  list-style: none;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 17%;
  min-height: 100vh;
  box-shadow: 2px 2px 10px ${colors.textColor};
  transition: all 0.3s ease-in-out;
`;

const NavItem = styled.li`
  width: 100%;
  display: inline-flex;
  transition: all 1s ease-in-out;
  margin-bottom: 0.6rem;

  a {
    width: 100%;
    display: block;
    padding: 0.5rem 1.5rem;
    text-decoration: none;
    color: ${colors.textColor};
    transition: all 0.3s ease-in-out;
    position: relative;
  }

  a:hover {
    color: ${colors.primaryColor};
    background: ${colors.lightPrimaryColorBackground};
  }

  span {
    margin-left: 0.5rem;
  }

  .active {
    color: ${colors.primaryColor};
    background: ${colors.lightPrimaryColorBackground};
    border-right: 4px solid ${colors.primaryColor};
  }

  .services {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ChevronIcon = styled.i`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translate(-5%, -50%);
`;

const LinksContainer = styled.div`
  width: 100%;
  padding-left: 1rem;
  display: none;
  opacity: 0;
  transition: all 0.4s ease-in-out;

  a {
    display: block;
  }
`;

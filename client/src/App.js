import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// redux setup
import { compose } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { logInUserWithOauth, loadMe } from './store/actions/authActions';

// pages and components
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Admin from './pages/Admin/Admin';
import NotFound from './pages/NotFound/NotFound';
import Loader from './components/Loader/Loader';
import Patient from './pages/Patient/Patient';
import Patients from './pages/Patients/Patients';
import PatientRegister from './pages/PatientRegister/PatientRegister';
import Doctor from './pages/Doctor/Doctor';
import DoctorsLayout from './pages/Doctors/DoctorsLayout';
import DoctorRegister from './pages/DoctorRegister/DoctorRegister';
import SpecRegister from './pages/DoctorRegister/SpecRegister';
import ServiceRegister from './pages/ServiceRegister/ServiceRegister';
import ServiceTypeRegister from './pages/ServiceRegister/ServiceTypeRegister';
import ServiceList from './pages/Service/ServiceList';
import Service from './pages/Service/Service';
import Lab from './pages/Lab/Lab';
import LabList from './pages/Lab/LabList';
import PatientEdit from './pages/Patient/PatientEdit';
import PrintLab from './pages/Lab/PrintLab';
import PrintUzi from './pages/Uzi/PrintUzi';
import ServiceEdit from './pages/Service/ServiceEdit';
import ServiceTypeList from './pages/Service/ServiceTypeList';
import ServiceTypeEdit from './pages/Service/ServiceTypeEdit';
import UziChildRegister from './pages/Uzi/UziChildRegister';
import UziParentRegister from './pages/Uzi/UziParentRegister';
import UziParentList from './pages/Uzi/UziParentList';
import UziChildList from "./pages/Uzi/UziChildList";
import UziChildEdit from './pages/Uzi/UziChildEdit';
import UziParentEdit from "./pages/Uzi/UziParentEdit";
import UziList from './pages/Uzi/UziList';
import Uzi from './pages/Uzi/Uzi';

// styles
import { GlobalStyles } from './GlobalStyles';

// animation
import { AnimatePresence } from 'framer-motion';
import DoctorEdit from "./pages/Doctor/DoctorEdit"

const App = ({ logInUserWithOauth, auth, loadMe }) => {
  useEffect(() => {
    loadMe();
  }, [loadMe]);

  //redosled hookova
  useEffect(() => {
    if (window.location.hash === '#_=_') window.location.hash = '';

    const cookieJwt = Cookies.get('x-auth-cookie');
    if (cookieJwt) {
      Cookies.remove('x-auth-cookie');
      logInUserWithOauth(cookieJwt);
    }
  }, []);

  useEffect(() => {
    if (!auth.appLoaded && !auth.isLoading && auth.token && !auth.isAuthenticated) {
      loadMe();
    }
  }, [auth.isAuthenticated, auth.token, loadMe, auth.isLoading, auth.appLoaded]);

  const location = useLocation();

  return (
    <>
      <GlobalStyles />
      {auth.appLoaded ? (
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/admin" component={Admin} />
            <Route path="/doctors" component={DoctorsLayout} exact />
            <Route path="/doctors/doctor/:id" component={Doctor} exact />
            <Route path="/doctors/edit/:id" component={DoctorEdit} exact />
            <Route path="/doctorregister" component={DoctorRegister} exact />
            <Route path="/lab/:id" component={Lab} exact />
            <Route path="/lablist" component={LabList} exact />
            <Route path="/login" component={Login} />
            <Route path="/notfound" component={NotFound} />
            <Route path="/patients" component={Patients} exact />
            <Route path="/patients/patient/:id" component={Patient} exact />
            <Route path="/patients/patient/edit/:id" component={PatientEdit} exact />
            <Route path="/patientregister" component={PatientRegister} exact />
            <Route path="/printlab/:id" component={PrintLab} exact />
            <Route path="/printuzi/:id" component={PrintUzi} exact />
            <Route path="/register" component={Register} />
            <Route path="/servicelist" component={ServiceList} exact />
            <Route path="/serviceregister" component={ServiceRegister} exact />
            <Route path="/servicetyperegister" component={ServiceTypeRegister} exact />
            <Route path="/servicetypelist" component={ServiceTypeList} exact />
            <Route path="/servicetype/edit/:id" component={ServiceTypeEdit} exact />
            <Route path="/service/:id" component={Service} exact />
            <Route path="/service/edit/:id" component={ServiceEdit} exact />
            <Route path="/specregister" component={SpecRegister} exact />
            <Route path="/uzi/:id" component={Uzi} exact />
            <Route path="/uzichild/edit/:id" component={UziChildEdit} exact />
            <Route path="/uziparent/edit/:id" component={UziParentEdit} exact />
            <Route path="/uzichildregister" component={UziChildRegister} exact />
            <Route path="/uziparentregister" component={UziParentRegister} exact />
            <Route path="/uzichildslist" component={UziChildList} exact />
            <Route path="/uziparentslist" component={UziParentList} exact />
            <Route path="/uzilist" component={UziList} exact />
            <Route exact path="/:username" component={Profile} />
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      ) : (
        <Loader />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { logInUserWithOauth, loadMe }))(App);

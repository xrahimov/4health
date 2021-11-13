import { combineReducers } from 'redux';

import authReducer from './authReducer';
import registerReducer from './registerReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import messageReducer from './messageReducer';
import patientReducer from './patientReducer';
import specReducer from './specReducer';
import doctorReducer from './doctorReducer';
import serviceReducer from './serviceReducer';
import serviceTypeReducer from './serviceTypeReducer';
import labResultReducer from './labResultReducer';
import appointmentReducer from './appointmentReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  message: messageReducer,
  user: userReducer,
  users: usersReducer,
  patient: patientReducer,
  spec: specReducer,
  doctor: doctorReducer,
  service: serviceReducer,
  servicetype: serviceTypeReducer,
  labresult: labResultReducer,
  appointment: appointmentReducer
});

import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_APPOINTMENT_LOADING,
  GET_APPOINTMENT_SUCCESS,
  GET_APPOINTMENT_FAIL,
  GET_APPOINTMENTS_LOADING,
  GET_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENTS_FAIL,
  ADD_APPOINTMENT_LOADING,
  ADD_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT_LOADING,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,
  EDIT_APPOINTMENT_LOADING,
  EDIT_APPOINTMENT_SUCCESS,
  EDIT_APPOINTMENT_FAIL,
} from '../types';

export const getAppointment = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_APPOINTMENT_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`/api/appointments/${id}`, options);

    dispatch({
      type: GET_APPOINTMENT_SUCCESS,
      payload: {
        appointment: response.data.appointment,
        appointmentServices: response.data.services,
      },
    });
  } catch (err) {
    dispatch({
      type: GET_APPOINTMENT_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const getAppointments = (variables) => async (dispatch, getState) => {
  dispatch({
    type: GET_APPOINTMENTS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/appointments/filter', variables, options);

    dispatch({
      type: GET_APPOINTMENTS_SUCCESS,
      payload: { appointments: response.data.appointments },
    });
  } catch (err) {
    dispatch({
      type: GET_APPOINTMENTS_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addAppointment = (formData, history) => async (dispatch, getState) => {
  dispatch({
    type: ADD_APPOINTMENT_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/appointments', formData, options);

    dispatch({
      type: ADD_APPOINTMENT_SUCCESS,
      payload: { appointment: response.data.appointment },
    });
    history.push('/');
  } catch (err) {
    dispatch({
      type: ADD_APPOINTMENT_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteAppointment = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_APPOINTMENT_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/appointments/${id}`, options);

    dispatch({
      type: DELETE_APPOINTMENT_SUCCESS,
      payload: { appointment: response.data.appointment },
    });
  } catch (err) {
    dispatch({
      type: DELETE_APPOINTMENT_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editAppointment = (id, formData, history) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_APPOINTMENT_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`/api/appointments/${id}`, formData, options);

    dispatch({
      type: EDIT_APPOINTMENT_SUCCESS,
      payload: { appointment: response.data.appointment },
    });

    history.push('/lablist');
  } catch (err) {
    dispatch({
      type: EDIT_APPOINTMENT_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
    });
  }
};

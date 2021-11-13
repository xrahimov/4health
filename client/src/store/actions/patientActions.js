import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_PATIENTS_LOADING,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAIL,
  ADD_PATIENT_LOADING,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAIL,
  DELETE_PATIENT_LOADING,
  DELETE_PATIENT_SUCCESS,
  DELETE_PATIENT_FAIL,
  EDIT_PATIENT_LOADING,
  EDIT_PATIENT_SUCCESS,
  EDIT_PATIENT_FAIL,
} from '../types';

export const getPatients = (variables) => async (dispatch, getState) => {
  dispatch({
    type: GET_PATIENTS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(`/api/patients/filter`, variables, options);

    dispatch({
      type: GET_PATIENTS_SUCCESS,
      payload: { patients: response.data.patients },
    });

  } catch (err) {
    dispatch({
      type: GET_PATIENTS_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addPatient = (formData, history) => async (dispatch, getState) => {
  dispatch({
    type: ADD_PATIENT_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);

    const response = await axios.post('/api/patients', formData, options);

    dispatch({
      type: ADD_PATIENT_SUCCESS,
      payload: { patient: response.data.patient },
    });
    history.push('/patients');
  } catch (err) {
    dispatch({
      type: ADD_PATIENT_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deletePatient = (id, history) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_PATIENT_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/patients/${id}`, options);

    dispatch({
      type: DELETE_PATIENT_SUCCESS,
      payload: { patient: response.data.patient },
    });
    history.push('/patients');
  } catch (err) {
    dispatch({
      type: DELETE_PATIENT_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editPatient = (id, formData, history) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_PATIENT_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`/api/patients/${id}`, formData, options);

    dispatch({
      type: EDIT_PATIENT_SUCCESS,
      payload: { patient: response.data.patient },
    });

    history.push(`/patients/patient/${id}`)
  } catch (err) {
    dispatch({
      type: EDIT_PATIENT_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
    });
  }
};

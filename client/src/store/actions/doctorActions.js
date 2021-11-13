import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_DOCTORS_LOADING,
  GET_DOCTORS_SUCCESS,
  GET_DOCTORS_FAIL,
  ADD_DOCTOR_LOADING,
  ADD_DOCTOR_SUCCESS,
  ADD_DOCTOR_FAIL,
  DELETE_DOCTOR_LOADING,
  DELETE_DOCTOR_SUCCESS,
  DELETE_DOCTOR_FAIL,
  EDIT_DOCTOR_LOADING,
  EDIT_DOCTOR_SUCCESS,
  EDIT_DOCTOR_FAIL,
} from '../types';

export const getDoctors = () => async (dispatch, getState) => {
  dispatch({
    type: GET_DOCTORS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/doctors', options);

    dispatch({
      type: GET_DOCTORS_SUCCESS,
      payload: { doctors: response.data.doctors },
    });
  } catch (err) {
    dispatch({
      type: GET_DOCTORS_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addDoctor = (formData, history) => async (dispatch, getState) => {
  dispatch({
    type: ADD_DOCTOR_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/doctors', formData, options);

    dispatch({
      type: ADD_DOCTOR_SUCCESS,
      payload: { doctor: response.data.doctor },
    });
    history.push('/doctors');
  } catch (err) {
    dispatch({
      type: ADD_DOCTOR_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteDoctor = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_DOCTOR_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/doctors/${id}`, options);

    dispatch({
      type: DELETE_DOCTOR_SUCCESS,
      payload: { doctor: response.data.doctor },
    });
  } catch (err) {
    dispatch({
      type: DELETE_DOCTOR_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editDoctor = (id, formData, history) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_DOCTOR_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`/api/doctors/${id}`, formData, options);

    dispatch({
      type: EDIT_DOCTOR_SUCCESS,
      payload: { doctor: response.data.doctor },
    });

    history.push('/doctors')
  } catch (err) {
    dispatch({
      type: EDIT_DOCTOR_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
    });
  }
};

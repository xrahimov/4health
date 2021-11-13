import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_SERVICES_LOADING,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAIL,
  ADD_SERVICE_LOADING,
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAIL,
  DELETE_SERVICE_LOADING,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
  EDIT_SERVICE_LOADING,
  EDIT_SERVICE_SUCCESS,
  EDIT_SERVICE_FAIL,
} from '../types';

export const getServices = (variables) => async (dispatch, getState) => {
  dispatch({
    type: GET_SERVICES_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/services/filter', variables, options);

    dispatch({
      type: GET_SERVICES_SUCCESS,
      payload: { services: response.data.services },
    });
  } catch (err) {
    dispatch({
      type: GET_SERVICES_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addService = (formData, history) => async (dispatch, getState) => {
  dispatch({
    type: ADD_SERVICE_LOADING,
    payload: { me: { ...getState().auth.me } },
  });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/services', formData, options);

    dispatch({
      type: ADD_SERVICE_SUCCESS,
      payload: { service: response.data.service },
    });
    history.push('/servicelist');
  } catch (err) {
    dispatch({
      type: ADD_SERVICE_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteService = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_SERVICE_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/services/${id}`, options);

    dispatch({
      type: DELETE_SERVICE_SUCCESS,
      payload: { service: response.data.service },
    });
  } catch (err) {
    dispatch({
      type: DELETE_SERVICE_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editService = (id, formData, history) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_SERVICE_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`/api/services/${id}`, formData, options);

    dispatch({
      type: EDIT_SERVICE_SUCCESS,
      payload: { service: response.data.service },
    });

    history.push('/servicelist')
  } catch (err) {
    dispatch({
      type: EDIT_SERVICE_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
    });
  }
};

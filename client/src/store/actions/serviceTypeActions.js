import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_SERVICE_TYPES_LOADING,
  GET_SERVICE_TYPES_SUCCESS,
  GET_SERVICE_TYPES_FAIL,
  ADD_SERVICE_TYPE_LOADING,
  ADD_SERVICE_TYPE_SUCCESS,
  ADD_SERVICE_TYPE_FAIL,
  DELETE_SERVICE_TYPE_LOADING,
  DELETE_SERVICE_TYPE_SUCCESS,
  DELETE_SERVICE_TYPE_FAIL,
  EDIT_SERVICE_TYPE_LOADING,
  EDIT_SERVICE_TYPE_SUCCESS,
  EDIT_SERVICE_TYPE_FAIL,
} from '../types';

export const getServiceTypes = () => async (dispatch, getState) => {
  dispatch({
    type: GET_SERVICE_TYPES_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/servicetypes', options);

    dispatch({
      type: GET_SERVICE_TYPES_SUCCESS,
      payload: { servicetypes: response.data.servicetypes },
    });
  } catch (err) {
    dispatch({
      type: GET_SERVICE_TYPES_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addServiceType = (formData, history) => async (dispatch, getState) => {
  dispatch({
    type: ADD_SERVICE_TYPE_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/servicetypes', formData, options);

    dispatch({
      type: ADD_SERVICE_TYPE_SUCCESS,
      payload: { servicetype: response.data.servicetype },
    });
    
    history.push('/servicetypelist')
  } catch (err) {
    dispatch({
      type: ADD_SERVICE_TYPE_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteServiceType = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_SERVICE_TYPE_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/servicetypes/${id}`, options);

    dispatch({
      type: DELETE_SERVICE_TYPE_SUCCESS,
      payload: { servicetype: response.data.servicetype },
    });
  } catch (err) {
    dispatch({
      type: DELETE_SERVICE_TYPE_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editServiceType = (id, formData, history) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_SERVICE_TYPE_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`/api/servicetypes/${id}`, formData, options);

    dispatch({
      type: EDIT_SERVICE_TYPE_SUCCESS,
      payload: { servicetype: response.data.servicetype },
    });

    history.push('/servicetypelist')
  } catch (err) {
    dispatch({
      type: EDIT_SERVICE_TYPE_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
    });
  }
};
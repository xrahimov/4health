import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_SPECS_LOADING,
  GET_SPECS_SUCCESS,
  GET_SPECS_FAIL,
  ADD_SPEC_LOADING,
  ADD_SPEC_SUCCESS,
  ADD_SPEC_FAIL,
  DELETE_SPEC_LOADING,
  DELETE_SPEC_SUCCESS,
  DELETE_SPEC_FAIL,
  EDIT_SPEC_LOADING,
  EDIT_SPEC_SUCCESS,
  EDIT_SPEC_FAIL,
} from '../types';

export const getSpecs = () => async (dispatch, getState) => {
  dispatch({
    type: GET_SPECS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/specs', options);

    dispatch({
      type: GET_SPECS_SUCCESS,
      payload: { specs: response.data.specializations },
    });
  } catch (err) {
    dispatch({
      type: GET_SPECS_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addSpec = (formData, history) => async (dispatch, getState) => {
  dispatch({
    type: ADD_SPEC_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/specs', formData, options);

    dispatch({
      type: ADD_SPEC_SUCCESS,
      payload: { spec: response.data.spec },
    });
    history.push('/')
  } catch (err) {
    dispatch({
      type: ADD_SPEC_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteSpec = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_SPEC_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/specs/${id}`, options);

    dispatch({
      type: DELETE_SPEC_SUCCESS,
      payload: { spec: response.data.spec },
    });
  } catch (err) {
    dispatch({
      type: DELETE_SPEC_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editSpec = (id, formData) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_SPEC_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`/api/specs/${id}`, formData, options);

    dispatch({
      type: EDIT_SPEC_SUCCESS,
      payload: { spec: response.data.spec },
    });
  } catch (err) {
    dispatch({
      type: EDIT_SPEC_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
    });
  }
};
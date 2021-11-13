import axios from 'axios';
import { saveAs } from 'file-saver';

import { attachTokenToHeaders } from './authActions';
import {
  GET_LAB_RESULT_LOADING,
  GET_LAB_RESULT_SUCCESS,
  GET_LAB_RESULT_FAIL,
  GET_LAB_RESULTS_LOADING,
  GET_LAB_RESULTS_SUCCESS,
  GET_LAB_RESULTS_FAIL,
  ADD_LAB_RESULT_LOADING,
  ADD_LAB_RESULT_SUCCESS,
  ADD_LAB_RESULT_FAIL,
  DELETE_LAB_RESULT_LOADING,
  DELETE_LAB_RESULT_SUCCESS,
  DELETE_LAB_RESULT_FAIL,
  EDIT_LAB_RESULT_LOADING,
  EDIT_LAB_RESULT_SUCCESS,
  EDIT_LAB_RESULT_FAIL,
} from '../types';

export const getLabResults = () => async (dispatch, getState) => {
  dispatch({
    type: GET_LAB_RESULTS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/labresults', options);

    dispatch({
      type: GET_LAB_RESULTS_SUCCESS,
      payload: { labresults: response.data.labresults },
    });
  } catch (err) {
    dispatch({
      type: GET_LAB_RESULTS_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const getLabResult = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_LAB_RESULT_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`/api/labresults/${id}`, options);

    dispatch({
      type: GET_LAB_RESULT_SUCCESS,
      payload: { labresult: response.data.labresult },
    });
  } catch (err) {
    dispatch({
      type: GET_LAB_RESULT_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addLabResult = (formData, history) => async (dispatch, getState) => {
  dispatch({
    type: ADD_LAB_RESULT_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/labresults', formData, options);

    dispatch({
      type: ADD_LAB_RESULT_SUCCESS,
      payload: { labresult: response.data.labresult },
    });
    history.push('/');
  } catch (err) {
    dispatch({
      type: ADD_LAB_RESULT_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteLabResult = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_LAB_RESULT_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/labresults/${id}`, options);

    dispatch({
      type: DELETE_LAB_RESULT_SUCCESS,
      payload: { labresult: response.data.labresult },
    });
  } catch (err) {
    dispatch({
      type: DELETE_LAB_RESULT_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editLabResult = (id, formData) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_LAB_RESULT_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`/api/labresults/${id}`, formData, options);

    dispatch({
      type: EDIT_LAB_RESULT_SUCCESS,
      payload: { labresult: response.data.labresult },
    });
  } catch (err) {
    dispatch({
      type: EDIT_LAB_RESULT_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
    });
  }
};
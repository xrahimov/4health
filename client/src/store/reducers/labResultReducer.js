/* eslint-disable import/no-anonymous-default-export */
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

const initialState = {
  labresults: [],
  labresult: null,
  isLoading: false,
  error: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_LAB_RESULT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LAB_RESULTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_LAB_RESULT_LOADING:
      return {
        ...state,
        labresults: [
          {
            id: 0,
            result: 'Loading...',
            isLoading: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          ...state.labresults,
        ],
      };
    case DELETE_LAB_RESULT_LOADING:
    case EDIT_LAB_RESULT_LOADING:
      return {
        ...state,
        labresults: state.labresults.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: true };
          return m;
        }),
      };
    case GET_LAB_RESULT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        labresult: payload.labresult,
      };
    case GET_LAB_RESULTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        labresults: payload.labresults,
      };
    case ADD_LAB_RESULT_SUCCESS:
      return {
        ...state,
        labresults: state.labresults.map((m) => {
          if (m.id === 0) return payload.labresult;
          return m;
        }),
      };
    case DELETE_LAB_RESULT_SUCCESS:
      return {
        ...state,
        labresults: state.labresults.filter((m) => m.id !== payload.labresult.id),
      };
    case EDIT_LAB_RESULT_SUCCESS:
      return {
        ...state,
        labresults: state.labresults.map((m) => {
          if (m.id === payload.labresult.id) return payload.labresult;
          return m;
        }),
      };
    case DELETE_LAB_RESULT_FAIL:
    case EDIT_LAB_RESULT_FAIL:
      return {
        ...state,
        error: null,
        labresults: state.labresults.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: false, error: payload.error };
          return m;
        }),
      };
    case GET_LAB_RESULT_FAIL:
    case GET_LAB_RESULTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case ADD_LAB_RESULT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        labresults: state.labresults.filter((m) => m.id !== 0),
      };
    default:
      return state;
  }
}

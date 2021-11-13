/* eslint-disable import/no-anonymous-default-export */
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

const initialState = {
  specs: [],
  isLoading: false,
  error: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_SPECS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_SPEC_LOADING:
      return {
        ...state,
        specs: [
          {
            id: 0,
            title: 'Loading...',
            description: 'Loading...',
            isLoading: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          ...state.specs,
        ],
      };
    case DELETE_SPEC_LOADING:
    case EDIT_SPEC_LOADING:
      return {
        ...state,
        specs: state.specs.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: true };
          return m;
        }),
      };
    case GET_SPECS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        specs: payload.specs,
      };
    case ADD_SPEC_SUCCESS:
      return {
        ...state,
        specs: state.specs.map((m) => {
          if (m.id === 0) return payload.specialization;
          return m;
        }),
      };
    case DELETE_SPEC_SUCCESS:
      return {
        ...state,
        specs: state.specs.filter((m) => m.id !== payload.specialization.id),
      };
    case EDIT_SPEC_SUCCESS:
      return {
        ...state,
        specs: state.specs.map((m) => {
          if (m.id === payload.specialization.id) return payload.specialization;
          return m;
        }),
      };
    case DELETE_SPEC_FAIL:
    case EDIT_SPEC_FAIL:
      return {
        ...state,
        error: null,
        specs: state.specs.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: false, error: payload.error };
          return m;
        }),
      };
    case GET_SPECS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case ADD_SPEC_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        specs: state.specs.filter((m) => m.id !== 0),
      };
    default:
      return state;
  }
}

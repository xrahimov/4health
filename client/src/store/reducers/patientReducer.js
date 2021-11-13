/* eslint-disable import/no-anonymous-default-export */
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

const initialState = {
  patients: [],
  isLoading: false,
  error: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_PATIENTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_PATIENT_LOADING:
      return {
        ...state,
        patients: [
          {
            id: 0,
            firstname: 'Loading...',
            isLoading: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          ...state.patients,
        ],
      };
    case DELETE_PATIENT_LOADING:
    case EDIT_PATIENT_LOADING:
      return {
        ...state,
        patients: state.patients.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: true };
          return m;
        }),
      };
    case GET_PATIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patients: payload.patients,
      };
    case ADD_PATIENT_SUCCESS:
      return {
        isLoading: false,
        patients: state.patients.map((m) => {
          if (m.id === 0) return payload.patient;
          return m;
        }),
        error: null,
      };
    case DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        patients: state.patients.filter((m) => m.id !== payload.patient.id),
      };
    case EDIT_PATIENT_SUCCESS:
      return {
        ...state,
        patients: state.patients.map((m) => {
          if (m.id === payload.patient.id) return payload.patient;
          return m;
        }),
      };
    case DELETE_PATIENT_FAIL:
    case EDIT_PATIENT_FAIL:
      return {
        ...state,
        error: null,
        patients: state.patients.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: false, error: payload.error };
          return m;
        }),
      };
    case GET_PATIENTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case ADD_PATIENT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        patients: state.patients.filter((m) => m.id !== 0),
      };
    default:
      return state;
  }
}

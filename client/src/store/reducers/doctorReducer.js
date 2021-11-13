/* eslint-disable import/no-anonymous-default-export */
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


const initialState = {
  doctors: [],
  isLoading: false,
  error: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_DOCTORS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_DOCTOR_LOADING:
      return {
        ...state,
        doctors: [
          {
            id: 0,
            firstname: 'Loading...',
            isLoading: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          ...state.doctors,
        ],
      };
    case DELETE_DOCTOR_LOADING:
    case EDIT_DOCTOR_LOADING:
      return {
        ...state,
        doctors: state.doctors.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: true };
          return m;
        }),
      };
    case GET_DOCTORS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        doctors: payload.doctors,
      };
    case ADD_DOCTOR_SUCCESS:
      return {
        ...state,
        doctors: state.doctors.map((m) => {
          if (m.id === 0) return payload.doctor;
          return m;
        }),
      };
    case DELETE_DOCTOR_SUCCESS:
      return {
        ...state,
        doctors: state.doctors.filter((m) => m.id !== payload.doctor.id),
      };
    case EDIT_DOCTOR_SUCCESS:
      return {
        ...state,
        doctors: state.doctors.map((m) => {
          if (m._id === payload.doctor._id) return payload.doctor;
          return m;
        }),
      };
    case DELETE_DOCTOR_FAIL:
    case EDIT_DOCTOR_FAIL:
      return {
        ...state,
        error: null,
        doctors: state.doctors.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: false, error: payload.error };
          return m;
        }),
      };
    case GET_DOCTORS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case ADD_DOCTOR_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        doctors: state.doctors.filter((m) => m.id !== 0),
      };
    default:
      return state;
  }
}

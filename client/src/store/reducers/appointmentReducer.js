/* eslint-disable import/no-anonymous-default-export */
import {
  GET_APPOINTMENT_LOADING,
  GET_APPOINTMENT_SUCCESS,
  GET_APPOINTMENT_FAIL,
  GET_APPOINTMENTS_LOADING,
  GET_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENTS_FAIL,
  ADD_APPOINTMENT_LOADING,
  ADD_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT_LOADING,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,
  EDIT_APPOINTMENT_LOADING,
  EDIT_APPOINTMENT_SUCCESS,
  EDIT_APPOINTMENT_FAIL,
} from '../types';


const initialState = {
  appointments: [],
  appointment: null,
  appointmentServices: null,
  isLoading: false,
  error: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_APPOINTMENT_LOADING:
    case GET_APPOINTMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_APPOINTMENT_LOADING:
      return {
        ...state,
      };
    case DELETE_APPOINTMENT_LOADING:
    case EDIT_APPOINTMENT_LOADING:
      return {
        ...state,
      };
    case GET_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        appointment: payload.appointment,
        appointmentServices: payload.appointmentServices,
      };
    case GET_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        appointments: payload.appointments,
      };
    case ADD_APPOINTMENT_SUCCESS:
      return {
        ...state,
      };
    case DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
      };
    case EDIT_APPOINTMENT_SUCCESS:
      return {
        ...state,
      };
    case DELETE_APPOINTMENT_FAIL:
    case EDIT_APPOINTMENT_FAIL:
      return {
        ...state,
        error: null,
      };
    case GET_APPOINTMENT_FAIL:
    case GET_APPOINTMENTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case ADD_APPOINTMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    default:
      return state;
  }
}

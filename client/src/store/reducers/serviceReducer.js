/* eslint-disable import/no-anonymous-default-export */
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

const initialState = {
  services: [],
  isLoading: false,
  error: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_SERVICES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_SERVICE_LOADING:
      return {
        ...state,
        services: [
          {
            id: 0,
            title: 'Loading...',
            isLoading: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          ...state.services,
        ],
      };
    case DELETE_SERVICE_LOADING:
    case EDIT_SERVICE_LOADING:
      return {
        ...state,
        services: state.services.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: true };
          return m;
        }),
      };
    case GET_SERVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        services: payload.services,
      };
    case ADD_SERVICE_SUCCESS:
      return {
        ...state,
        services: state.services.map((m) => {
          if (m.id === 0) return payload.service;
          return m;
        }),
      };
    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        // services: state.services.filter((m) => m.id !== payload.service.id),
      };
    case EDIT_SERVICE_SUCCESS:
      return {
        ...state,
        // services: state.services.map((m) => {
        //   if (m.id === payload.service.id) return payload.service;
        //   return m;
        // }),
      };
    case DELETE_SERVICE_FAIL:
    case EDIT_SERVICE_FAIL:
      return {
        ...state,
        error: null,
        // services: state.services.map((m) => {
        //   if (m.id === payload.id) return { ...m, isLoading: false, error: payload.error };
        //   return m;
        // }),
      };
    case GET_SERVICES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case ADD_SERVICE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        services: state.services.filter((m) => m.id !== 0),
      };
    default:
      return state;
  }
}

/* eslint-disable import/no-anonymous-default-export */
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

const initialState = {
  servicetypes: [],
  isLoading: false,
  error: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_SERVICE_TYPES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_SERVICE_TYPE_LOADING:
      return {
        ...state,
        servicetypes: [
          {
            id: 0,
            title: 'Loading...',
            description: 'Loading...',
            isLoading: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          ...state.servicetypes,
        ],
      };
    case DELETE_SERVICE_TYPE_LOADING:
    case EDIT_SERVICE_TYPE_LOADING:
      return {
        ...state,
        // servicetypes: state.servicetypes.map((m) => {
        //   if (m._id === payload._id) return { ...m, isLoading: true };
        //   return m;
        // }),
      };
    case GET_SERVICE_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        servicetypes: payload.servicetypes,
      };
    case ADD_SERVICE_TYPE_SUCCESS:
      return {
        ...state,
        servicetypes: state.servicetypes.map((m) => {
          if (m._id === 0) return payload.specialization;
          return m;
        }),
      };
    case DELETE_SERVICE_TYPE_SUCCESS:
      return {
        ...state,
        servicetypes: state.servicetypes.filter((m) => m.id !== payload.specialization.id),
      };
    case EDIT_SERVICE_TYPE_SUCCESS:
      return {
        ...state,
        // servicetypes: state.servicetypes.map((m) => {
        //   if (m.id === payload.specialization.id) return payload.specialization;
        //   return m;
        // }),
      };
    case DELETE_SERVICE_TYPE_FAIL:
    case EDIT_SERVICE_TYPE_FAIL:
      return {
        ...state,
        error: null,
        // servicetypes: state.servicetypes.map((m) => {
        //   if (m.id === payload.id) return { ...m, isLoading: false, error: payload.error };
        //   return m;
        // }),
      };
    case GET_SERVICE_TYPES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case ADD_SERVICE_TYPE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        servicetypes: state.servicetypes.filter((m) => m.id !== 0),
      };
    default:
      return state;
  }
}

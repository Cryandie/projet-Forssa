/* eslint-disable import/no-anonymous-default-export */
import {
  GET_FEEDBACKS,
  CREATE_FEEDBACK,
  UPDATE_FEEDBACK,
  FEEDBACK_ERROR,
} from "../actions/types";
const initialState = {
  feedback: null,
  feedbacks: [],
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FEEDBACKS:
      return {
        ...state,
        feedbacks: payload,
        loading: false,
      };
    case CREATE_FEEDBACK:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_FEEDBACK:
      return {
        ...state,
        loading: false,
      };
    case FEEDBACK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

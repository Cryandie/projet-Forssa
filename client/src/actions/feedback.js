import axios from "axios";
import { setAlert } from "./alert";
import {
  FEEDBACK_ERROR,
  GET_FEEDBACKS,
  CREATE_FEEDBACK,
  UPDATE_FEEDBACK,
} from "./types";

export const getFeedbacks = (profileId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/feedback/${profileId}/feedbacks`);
    dispatch({
      type: GET_FEEDBACKS,
      payload: res.data.feedbacks,
    });
  } catch (err) {
    dispatch({
      type: FEEDBACK_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const createFeedback = (data, profileId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.post(`/api/feedback/${profileId}/create`, data, config);
    dispatch({
      type: CREATE_FEEDBACK,
    });
  } catch (err) {
    dispatch({
      type: FEEDBACK_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const updateFeedback = (data, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.put(`/api/feedback/${id}/update`, data, config);
    dispatch({
      type: UPDATE_FEEDBACK,
    });
  } catch (err) {
    dispatch({
      type: FEEDBACK_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

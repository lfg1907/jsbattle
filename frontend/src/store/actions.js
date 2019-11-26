/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { GET_ALL_QUESTIONS } from './constants';

const _getAllQuestions = questions => {
  return {
    questions,
    type: GET_ALL_QUESTIONS
  };
};

const getAllQuestions = () => {
  return async dispatch => {
    const questions = (await axios.get('/api/questions'))
      .data;
    return dispatch(_getAllQuestions(questions));
  };
};

export { getAllQuestions };

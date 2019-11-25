import axios from 'axios';
import { GET_QUESTION } from './constants';

const _getQuestion = question => {
  return {
    question,
    type: GET_QUESTION
  };
};

const getQuestion = () => {
  return async (dispatch) => {
    const question = (await axios.get('/question/'))
  }
}
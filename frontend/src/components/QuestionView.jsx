import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { actions } from '../store';

const QuestionView = ({
  currentQ,
  testCases,
  getTestCases
}) => {
  useEffect(() => {
    getTestCases(currentQ.questionId);
  }, []);

  if (!testCases.length) return null;

  return (
    <div id="question-view">
      <div id="question-prompt">
        <h3>{currentQ.question.title}</h3>
        <p>{currentQ.question.prompt}</p>
      </div>
      <div id="test-case-div">
        <h4>Test Cases:</h4>
        <ul>
          {testCases.map(testCase => (
            <li key={testCase.id}>
              <span className="code">{`${testCase.arguments} `}</span>
              should yield
              <span className="code">{` ${testCase.answer}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ testCases, testResults }) => {
  return {
    testCases,
    testResults
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTestCases: qID =>
      dispatch(actions.fetchTestCases(qID)),
    getTestResults: (qID, code) =>
      dispatch(actions.fetchTestResults(qID, code))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionView);

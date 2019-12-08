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
  }, [currentQ.id]);

  if (!testCases.length) return null;

  return (
    <div id="question-view">
      <div id="question-container">
        <div id="question-prompt">
          <h3>{currentQ.question.title}</h3>
          <p>{currentQ.question.prompt}</p>
        </div>
        <div id="test-case-div">
          <h4>Test Cases:</h4>
          <ul id="test-examples-list">
            {testCases.map(testCase => (
              <li
                className="test-examples"
                key={testCase.id}
              >
                <p>
                  <span className="code">{`${testCase.arguments} `}</span>
                  should yield
                  <span className="code">{` ${testCase.answer}`}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
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

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

import Editor from './Editor';

const EditorPage = ({
  questions,
  testCases,
  getAllQuestions,
  getTestCases
}) => {
  const [editorValue, setEditorValue] = useState('');
  const handleEditorChange = ev => {
    setEditorValue(ev.target.value);
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  if (!questions.length) {
    return '...loading';
  }

  getTestCases(questions[0].id);

  // always shows first question for now
  // when all test cases are in, show random question

  return (
    <div>
      <h3>{questions[0].prompt}</h3>
      <Editor
        value={editorValue}
        onChange={handleEditorChange}
      />
      <div className="test-case-div">
        <h4>Test Cases:</h4>
        <ul>
          {testCases.map(testCase => (
            <li>
              {`${testCase.arguments} `}
              should yield
              {` ${testCase.answer}`}
            </li>
          ))}
        </ul>
      </div>

      <button type="button">Test</button>
      <button type="button">Submit</button>
    </div>
  );
};

const mapStateToProps = ({ questions, testCases }) => {
  return {
    questions,
    testCases
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTestCases: qID =>
      dispatch(actions.fetchTestCases(qID)),
    getAllQuestions: () =>
      dispatch(actions.getAllQuestions())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorPage);

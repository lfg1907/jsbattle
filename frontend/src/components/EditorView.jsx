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

  const testCode = () => {
    document.querySelector('#test-results').innerHTML =
      "This don't work";
    document.querySelector('#test-results').style.color =
      'red';
  };

  // always shows first question for now
  // when all test cases are in, show random question

  return (
    <div>
      <h3>{questions[0].prompt}</h3>
      <Editor
        value={editorValue}
        onChange={handleEditorChange}
      />
      <div id="test-case-div">
        <h4>Test Cases:</h4>
        <ul>
          {testCases.map(testCase => (
            <li key={testCase.id}>
              {`${testCase.arguments} `}
              should yield
              {` ${testCase.answer}`}
            </li>
          ))}
        </ul>
      </div>
      <div id="test-results" />

      <button type="button" onClick={testCode}>
        Test
      </button>
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

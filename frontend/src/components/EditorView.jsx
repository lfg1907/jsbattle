import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

import Editor from './Editor';

const EditorPage = ({
  questions,
  testCases,
  testResults,
  getAllQuestions,
  getTestCases,
  getTestResults
}) => {
  const [editorValue, setEditorValue] = useState('');
  const [testCasesLoaded, setTestCasesLoaded] = useState(
    false
  );
  const handleEditorChange = ev => {
    setEditorValue(ev.doc.getValue());
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  if (!questions.length) {
    return '...loading';
  }

  if (!testCasesLoaded) {
    getTestCases(questions[0].id);
    setTestCasesLoaded(true);
  }

  const countWrongResults = results => {
    return results.filter(result => !!result.wrong).length;
  };

  const testCode = () => {
    getTestResults(questions[0].id, editorValue);
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
      <div id="console-logs">
        {testResults.length &&
        testResults[0].consoles.length ? (
          <div>
            <h4>Log:</h4>
            <ul>
              {testResults[0].consoles.map(c => (
                <li>{c}</li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
      <div id="test-results">
        {testResults
          ? testResults.map(output => {
              if (output.wrong)
                return (
                  <p className="wrong">{output.wrong}</p>
                );
              return (
                <p className="right">{output.result}</p>
              );
            })
          : ''}
        {testResults.length &&
        !countWrongResults(testResults) ? (
          <h4>All tests pass!</h4>
        ) : (
          ''
        )}
      </div>

      <button type="button" onClick={testCode}>
        Test
      </button>
      <button type="button">Submit</button>
    </div>
  );
};

const mapStateToProps = ({
  questions,
  testCases,
  testResults
}) => {
  return {
    questions,
    testCases,
    testResults
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTestCases: qID =>
      dispatch(actions.fetchTestCases(qID)),
    getTestResults: (qID, code) =>
      dispatch(actions.fetchTestResults(qID, code)),
    getAllQuestions: () =>
      dispatch(actions.getAllQuestions())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorPage);

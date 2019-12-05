import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

import Editor from './Editor';

const EditorPage = ({
  currentQ,
  testResults,
  getTestResults
}) => {
  const funcString = `function ${currentQ.question.functionName}(${currentQ.question.params}) {\n  \n}`;
  const [editorValue, setEditorValue] = useState(
    funcString
  );
  const handleEditorChange = ev => {
    setEditorValue(ev.doc.getValue());
  };

  const countWrongResults = results => {
    return results.filter(result => !!result.wrong).length;
  };

  const testCode = () => {
    getTestResults(currentQ.questionId, editorValue);
  };

  return (
    <div>
      <Editor
        value={editorValue}
        onChange={handleEditorChange}
      />
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

const mapStateToProps = ({ testResults }) => {
  return {
    testResults
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTestResults: (qID, code) =>
      dispatch(actions.fetchTestResults(qID, code))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorPage);

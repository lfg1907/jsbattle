import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

import Editor from './Editor';
import EditorOutputs from './EditorOutputs';

const EditorPage = ({
  currentQ,
  testResults,
  getTestResults,
  completeQuestion
}) => {
  const [editorValue, setEditorValue] = useState('');
  useEffect(() => {
    const funcString = `function ${currentQ.question.functionName}(${currentQ.question.params}) {
  // Your code here...\n}`;
    setEditorValue(funcString);
  }, [currentQ.id]);

  const handleEditorChange = ev => {
    setEditorValue(ev.doc.getValue());
  };

  const testCode = () => {
    getTestResults(currentQ.questionId, editorValue);
  };

  const submitCode = () => {
    completeQuestion(currentQ.id);
  };

  return (
    <div id="editor-view">
      <Editor
        value={editorValue}
        onChange={handleEditorChange}
      />
      <button type="button" onClick={testCode}>
        Test
      </button>
      <button type="button" onClick={submitCode}>
        Submit
      </button>
      <EditorOutputs testResults={testResults} />
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
      dispatch(actions.fetchTestResults(qID, code)),
    completeQuestion: qID =>
      dispatch(actions.completeQuestion(qID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorPage);

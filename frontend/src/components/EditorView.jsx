import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

import Editor from './Editor';
import EditorOutputs from './EditorOutputs';

const countWrongResults = results => {
  return results.filter(result => !!result.wrong).length;
};

const EditorPage = ({
  currentQ,
  testResults,
  getTestResults,
  completeQuestion,
  updateScore,
  player,
  getPlayer
}) => {
  const [editorValue, setEditorValue] = useState('');
  const playerID = localStorage.getItem('jsBattlePlayerId');
  useEffect(() => {
    getPlayer(playerID);
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
    getTestResults(currentQ.questionId, editorValue);
    if (!countWrongResults(testResults))
      updateScore(playerID, parseInt(player.score, 10) + 1);
    completeQuestion(currentQ.id);
  };

  return (
    <div id="editor-view">
      <h3>
        Your Score:
        {` ${player.score}`}
      </h3>
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

const mapStateToProps = ({ testResults, player }) => {
  return {
    testResults,
    player
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTestResults: (qID, code) =>
      dispatch(actions.fetchTestResults(qID, code)),
    updateScore: (playerID, amt) =>
      dispatch(actions.updateScore(playerID, amt)),
    completeQuestion: qID =>
      dispatch(actions.completeQuestion(qID)),
    getPlayer: playerID =>
      dispatch(actions.getPlayer(playerID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorPage);

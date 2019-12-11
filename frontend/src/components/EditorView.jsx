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
  setTestResults,
  getTestResults,
  completeQuestion,
  updateScore,
  player,
  getPlayer,
  game,
  gameSocket
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

  const [submitted, setSubmitted] = useState(false);

  const submitCode = ev => {
    // eslint-disable-next-line no-param-reassign
    ev.target.disabled = true;
    document.querySelector('#test-button').disabled = true;
    getTestResults(currentQ.questionId, editorValue);
    setSubmitted(true);
  };

  const handleNextQ = ev => {
    // eslint-disable-next-line no-param-reassign
    ev.target.disabled = true;
    if (!countWrongResults(testResults))
      updateScore(playerID, parseInt(player.score, 10) + 1);
    gameSocket.emit('player submitted', {
      gameQuestion: currentQ,
      game
    });
  };

  gameSocket.on('all submitted', () => {
    document.querySelector('#test-button').disabled = false;
    document.querySelector(
      '#submit-button'
    ).disabled = false;
    setSubmitted(false);
    setTestResults([]);
    completeQuestion(currentQ.id);
  });

  return (
    <div id="editor-view">
      <h2>
        <span className="light">Your score</span>
        {` ${player.score} ${
          player.score > 1 ? 'pts' : 'pt'
        }`}
      </h2>

      <Editor
        value={editorValue}
        onChange={handleEditorChange}
      />

      <div id="button-container">
        <button
          type="button"
          id="test-button"
          onClick={testCode}
        >
          Test
        </button>
        <button
          type="button"
          id="submit-button"
          onClick={submitCode}
        >
          Submit
        </button>

        {submitted ? (
          <button
            id="next-button"
            type="button"
            onClick={handleNextQ}
          >
            Next Question
          </button>
        ) : (
          ''
        )}
      </div>

      <EditorOutputs testResults={testResults} />
    </div>
  );
};

const mapStateToProps = ({
  testResults,
  player,
  gameSocket
}) => {
  return {
    testResults,
    player,
    gameSocket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTestResults: results =>
      dispatch(actions.setTestResults(results)),
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

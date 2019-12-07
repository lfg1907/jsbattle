import React from 'react';

const countWrongResults = results => {
  return results.filter(result => !!result.wrong).length;
};

const EditorOutputs = ({ testResults }) => {
  return (
    <div id="editor-outputs">
      <div id="console-logs">
        <h4>Log</h4>
        {testResults.length &&
        testResults[0].consoles.length ? (
          <ul>
            {testResults.map(testResult =>
              testResult.consoles.map(c => <li>{c}</li>)
            )}
          </ul>
        ) : (
          ''
        )}
      </div>
      <div id="test-results">
        <h4>Results</h4>
        {testResults.length &&
        !countWrongResults(testResults) ? (
          <h5 className="right">All tests passed!</h5>
        ) : (
          ''
        )}
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
      </div>
    </div>
  );
};

export default EditorOutputs;

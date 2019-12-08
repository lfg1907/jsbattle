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
          <ul id="test-list">
            {testResults.map(testResult =>
              testResult.consoles.map(c => (
                <li className="test-result">{c}</li>
              ))
            )}
          </ul>
        ) : (
          ''
        )}
      </div>
      <div id="test-results">
        <h4>
          {testResults.length &&
          !countWrongResults(testResults) ? (
            <span className="right">All tests passed!</span>
          ) : (
            'Results'
          )}
        </h4>
        {}
        {testResults ? (
          <ul id="results-list">
            {testResults.map(output => {
              if (output.wrong)
                return (
                  <li className="result-result wrong">
                    {output.wrong}
                  </li>
                );
              return (
                <li className="result-result right">
                  {output.result}
                </li>
              );
            })}
          </ul>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default EditorOutputs;

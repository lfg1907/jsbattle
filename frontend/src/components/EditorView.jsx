import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Editor from './Editor';

const EditorPage = ({ questions }) => {
  const [editorValue, setEditorValue] = useState('');
  const handleEditorChange = ev => {
    setEditorValue(ev.target.value);
  };

  useEffect(() => {
    // do something here
  }, []);

  if (!questions.length) {
    return '...loading';
  }
  return (
    <div>
      <h3>{questions[0].prompt}</h3>
      <Editor
        value={editorValue}
        onChange={handleEditorChange}
      />
      <button type="button">Test</button>
      <button type="button">Submit</button>
    </div>
  );
};

const mapStateToProps = ({ questions }) => {
  return {
    questions
  };
};

export default connect(mapStateToProps, null)(EditorPage);

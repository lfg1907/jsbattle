import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Editor from './Editor';

const EditorPage = () => {
  const [editorValue, setEditorValue] = useState('');
  const handleEditorChange = ev => {
    setEditorValue(ev.target.value);
  };

  useEffect(() => {
    // do something here
  }, []);

  return (
    <div>
      <Editor
        value={editorValue}
        onChange={handleEditorChange}
      />
      <button type="button">Test</button>
      <button type="button">Submit</button>
    </div>
  );
};

export default connect(null)(EditorPage);

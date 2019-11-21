// Simple wrapper around the CodeMirror component
// so we don't have to deal with boilerplate stuff all the time
import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import './style.css';
import 'codemirror/mode/javascript/javascript';

const Editor = ({ value }) => {
  return (
    <CodeMirror
      value={value}
      className="goose-teeth"
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true
      }}
    />
  );
};

export default Editor;

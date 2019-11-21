import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/javascript/javascript';

const Editor = () => {
  return (
    <CodeMirror
      value=""
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true
      }}
    />
  );
};

export default Editor;

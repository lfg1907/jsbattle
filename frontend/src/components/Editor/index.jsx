// Simple wrapper around the CodeMirror component
// so we don't have to deal with boilerplate stuff all the time
import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import './style.css';
import 'codemirror/mode/javascript/javascript';

const Editor = ({ value, onChange }) => {
  const [codeValue, setCodeValue] = useState(value);

  return (
    <CodeMirror
      value={codeValue}
      onChange={onChange}
      onBeforeChange={(editor, data, val) => {
        setCodeValue(val);
      }}
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CodeMirror } from 'codemirror';
import { axios } from 'axios';
import { SequelizeScopeError } from 'sequelize/types';

class App extends Component {
  render() {
    const onButtonClick = async () => {
      const textArea = document.querySelector('textarea');
      const consolesDiv = document.getElementById(
        'consoles'
      );
      const resultDiv = document.getElementById('result');
      const errorsDiv = document.getElementById('errors');

      const code = textArea.value;

      try {
        const { consoles, result } = (
          await axios.post('/api/submit', { code })
        ).data;

        const ul = document.createElement('UL');
        consoles.forEach(msg => {
          const li = document.createElement('LI');
          li.innerHTML = msg;
          ul.appendChild(li);
        });
        consolesDiv.appendChild(ul);

        const p = document.createElement('p');
        p.innerHTML = result;
        resultDiv.appendChild(p);
      } catch (ex) {
        const p = document.createElement('p');
        p.innerHTML = ex.response.data.message;
        errorsDiv.appendChild(p);
      }
    };
    return (
      <div>
        <textarea rows="10" cols="50" />
        <button onClick={onButtonClick}>Submit</button>

        <div id="errors">
          <h3>Errors</h3>
        </div>

        <div id="result">
          <h3>Result</h3>
        </div>
        <div id="consoles">
          <h3>Consoles</h3>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(App);

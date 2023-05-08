import React from 'react';
import './App.css';
import ComboBox, { IComboBox } from './components/combo-box';

function App() {
  const comboBoxItems: IComboBox[] = [
    { label: 'Apple', value: 'Apple'},
    { label: 'Banana', value: 'Banana'},
    { label: 'Blueberry', value: 'Blueberry'},
    { label: 'Mango', value: 'Mango'}
  ]

  return (
    <div className="App">
      <div className="content">
        <ComboBox items={comboBoxItems} />
      </div>
    </div>
  );
}

export default App;

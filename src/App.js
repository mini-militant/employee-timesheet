import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import UserDataDisplay from './components/UserData/UserDataDisplay';

function App() {
  return (
    <div className="App">
        <Header/>
        <br/>
        <UserDataDisplay/>
    </div>
  );
}

export default App;

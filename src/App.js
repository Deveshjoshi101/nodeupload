import React from 'react';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-2xl text-center font-semibold text-[#07074D]">File Upload and Download</h1>
        <FileUpload />
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import Header from './components/Header';
import SurveyGrid from './components/SurveyGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <SurveyGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;
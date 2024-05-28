import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../Components/Navbar';
import NewsComponent from '../Components/NewsComponent';

export default class App extends Component {  
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<NewsComponent key="general" pageSize={5} country="in" category="general" />} />
            <Route path="/Home" element={<NewsComponent key="general" pageSize={5} country="in" category="general" />} />
            <Route path="/business" element={<NewsComponent key="business" pageSize={5} country="in" category="business" />} />
            <Route path="/entertainment" element={<NewsComponent key="entertainment" pageSize={5} country="in" category="entertainment" />} />
            <Route path="/health" element={<NewsComponent key="health" pageSize={5} country="in" category="health" />} />
            <Route path="/science" element={<NewsComponent key="science" pageSize={5} country="in" category="science" />} />
            <Route path="/technology" element={<NewsComponent key="technology" pageSize={5} country="in" category="technology" />} />
            <Route path="/sports" element={<NewsComponent key="sports" pageSize={5} country="in" category="sports" />} />
          </Routes>
        </Router>
      </>
    );
  }
}

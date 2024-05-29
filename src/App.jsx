import React, {useState}  from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../Components/Navbar';
import NewsComponent from '../Components/NewsComponent';
import LoadingBar from 'react-top-loading-bar';

const App = ()=> { 

  const [progress, setProgress] = useState(0);
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress} 
           />
          <Routes>
            <Route path="/" element={<NewsComponent key="general" setProgress={setProgress} pageSize={5} country="in"  category="general" />} />
            <Route path="/Home" element={<NewsComponent key="general" setProgress={setProgress} pageSize={5} country="in"  category="general" />} />
            <Route path="/business" element={<NewsComponent key="business" setProgress={setProgress} pageSize={5} country="in"  category="business" />} />
            <Route path="/entertainment" element={<NewsComponent key="entertainment" setProgress={setProgress} pageSize={5} country="in"  category="entertainment" />} />
            <Route path="/health" element={<NewsComponent key="health" setProgress={setProgress} pageSize={5} country="in"  category="health" />} />
            <Route path="/science" element={<NewsComponent key="science" setProgress={setProgress} pageSize={5} country="in"  category="science" />} />
            <Route path="/technology" element={<NewsComponent key="technology" setProgress={setProgress} pageSize={5} country="in"  category="technology" />} />
            <Route path="/sports" element={<NewsComponent key="sports" setProgress={setProgress} pageSize={5} country="in"  category="sports" />} />
          </Routes>
        </Router>
      </>
    );
  }

  export default App;
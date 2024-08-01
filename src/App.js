import React from 'react';
import FlowChart from './FlowChart';
import "./App.css"
const App = () => {
  return (
      <div>
      <FlowChart />
      </div>
  );
};

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import FlowChart from './FlowChart';
// import Create from "./components/Pages/create"
// import "./App.css"
// const App = () => {
//   return (
//     <Router>
//     <Routes>
//         <Route path="/" element={<Create />} />
//         <Route path="/flow/:id" element={<FlowChart />} />
//     </Routes>
// </Router>
//   );
// };

// export default App;

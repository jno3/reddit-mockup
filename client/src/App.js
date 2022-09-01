import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './pages/Layout';
import CreateSub from './pages/CreateSub';

// function App() {
//   return (
//     <div>
//       <Thread/>
//     </div>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='create' element={<CreateSub/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;

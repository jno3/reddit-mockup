import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserLoginPage } from './features/user/UserLoginPage';
import { UserRegister } from './features/user/UserRegister';
import { SubFeature } from './features/sub/SubFeature';
import { Thread } from './features/thread/Thread';
import { ThreadFeature } from './features/thread/ThreadFeature';
import { CreateSubPage } from './features/sub/CreateSubPage';
import { HomePage } from './features/homepage/HomePage';
import { Layout } from './features/layout/Layout';
// import authUser, { tokenLogout } from './features/auth/authUser';

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
        <Route path='/' /*element={<Layout />}*/ element={<Layout/>}>
          <Route index element={<HomePage />} />
          <Route path='register' element={<UserRegister />} />
          <Route path='login' element={<UserLoginPage />} />
          <Route path='create' element={<CreateSubPage />} />
          <Route path='r/:subname' element={<SubFeature />}/>
          <Route path='r/:subname/newthread' element={<Thread />}/>
          <Route path='r/:subname/:threadid' element={<ThreadFeature />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;

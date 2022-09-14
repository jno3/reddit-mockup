import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserLoginPage } from './features/user/UserLoginPage';
import { UserRegisterPage } from './features/user/UserRegisterPage';
import { SubFeature } from './features/sub/SubFeature';
import { ThreadPage } from './features/thread/ThreadPage';
import { ThreadFeature } from './features/thread/ThreadFeature';
import { CreateSubPage } from './features/sub/CreateSubPage';
import { HomePage } from './features/homepage/HomePage';
import { Layout } from './features/layout/Layout';
import { ProfilePage } from './features/profile/ProfilePage';
import { NotFoundPage} from './features/notfound/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' /*element={<Layout />}*/ element={<Layout/>}>
          <Route index element={<HomePage />} />
          <Route path='register' element={<UserRegisterPage />} />
          <Route path='login' element={<UserLoginPage />} />
          <Route path='create' element={<CreateSubPage />} />
          <Route path='r/:subname' element={<SubFeature />}/>
          <Route path='r/:subname/newthread' element={<ThreadPage />}/>
          <Route path='r/:subname/:threadid' element={<ThreadFeature />}/>
          <Route path='u/:username' element={<ProfilePage/>}/>        
          <Route path='notfound' element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;

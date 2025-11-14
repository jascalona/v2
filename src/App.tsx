import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from './interface/structure/layout';

//Interface
import MainInterface from './interface/structure/main_interface';
import Home from './interface/home'
import Inbox from './interface/inbox'
import Activities from './interface/activities'
import Project from './interface/project';

//Setting
import Setting from './interface/setting/setting';
import Members from './interface/setting/members';
import General from './interface/setting/general';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='home' element={<Home />} />
          <Route path='init' element={<MainInterface />} />
          <Route path='inbox' element={<Inbox />} />
          <Route path='activities' element={<Activities />}/>
          <Route path='project' element={<Project />} />

          {/*RUTA PARA DIRECTORIO SETTING*/}
          <Route path='setting' element={<Setting />}>
            <Route path='members' element={<Members />} />
            <Route path='general' element={<General />} />
          </Route>
        </Route>


      </Routes >
    </>
  )
}

export default App

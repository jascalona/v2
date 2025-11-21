import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from './interface/structure/layout';

//Interface
import MainInterface from './interface/structure/main_interface';
import Home from './interface/home'
import Inbox from './interface/inbox'
import Activities from './interface/activities'
import Project from './interface/product';

//Setting
import Setting from './interface/setting/setting';
import Members from './interface/setting/members';
import General from './interface/setting/general';
import ManagerProduct from './interface/setting/manager_product';

//General
import Empresa from './interface/setting/empresa';
import Area from './interface/setting/area';
import Subarea from './interface/setting/subarea';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='home' element={<Home />} />
          <Route path='init' element={<MainInterface />} />
          <Route path='inbox' element={<Inbox />} />
          <Route path='activities' element={<Activities />} />
          <Route path='product' element={<Project />} />

          {/*RUTA PARA DIRECTORIO SETTING*/}
          <Route path='setting' element={<Setting />}>

            <Route path='general' element={<General />} >
              <Route path='empresa' element={<Empresa />} />
              <Route path='area' element={<Area />} />
              <Route path='subarea' element={<Subarea />} />
            </Route>


            <Route path='members' element={<Members />} />
            <Route path='managerproduct' element={<ManagerProduct />} />
          </Route>
        </Route>


      </Routes >
    </>
  )
}

export default App

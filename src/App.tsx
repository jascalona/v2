import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from './interface/structure/layout';

//Interface
import MainInterface from './interface/structure/main_interface';
import Home from './interface/home'
import Inbox from './interface/inbox'
import Activities from './interface/activities'
import Project from './interface/product';
import UIRequest from './interface/request';


//Setting
import Setting from './interface/setting';
import Members from './interface/setting/members';
import General from './interface/setting/general';
import ManagerProduct from './interface/setting/manager_product';
import MasterCore from './interface/setting/mastercore';


//General
import Empresa from './interface/setting/general/empresa';
import Area from './interface/setting/general/area';
import Subarea from './interface/setting/general/subarea';


//Core Master
import Product from './interface/setting/master_core/product';
import Componentes from './interface/setting/master_core/componentes';
import Category from './interface/setting/master_core/category';
import SubCategory from './interface/setting/master_core/sub_category';
import Article from './interface/setting/master_core/article';
import SLA from './interface/setting/master_core/sla';
import Login from './interface/login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />

          <Route path='' element={<Layout />}>

            <Route path='home' element={<Home />} />
            <Route path='init' element={<MainInterface />} />
            <Route path='inbox' element={<Inbox />} />
            <Route path='activities' element={<Activities />} />
            <Route path='product' element={<Project />} />
            <Route path='uirequest' element={<UIRequest />} />

            {/*RUTA PARA DIRECTORIO SETTING*/}
            <Route path='setting' element={<Setting />}>

              <Route path='general' element={<General />} >
                <Route path='empresa' element={<Empresa />} />
                <Route path='area' element={<Area />} />
                <Route path='subarea' element={<Subarea />} />
              </Route>

              {/*RUTAS PARA DIRECTORIO CORE MASTER*/}
              <Route path='mastercore' element={<MasterCore />} >
                <Route path='product' element={<Product />} />
                <Route path='componentes' element={<Componentes />} />
                <Route path='category' element={<Category />} />
                <Route path='subcategory' element={<SubCategory />} />
                <Route path='article' element={<Article />} />
                <Route path='sla' element={<SLA />} />

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

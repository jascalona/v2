import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from './interface/structure/layout';

//Interface
import MainInterface from './interface/structure/main_interface';
import Home from './interface/pages/home'
import Inbox from './interface/pages/inbox'
import Activities from './interface/pages/activities'
import Project from './interface/pages/product';
import UIRequest from './interface/pages/request';
import TaskManager from './interface/pages/taskmanager';
import Customer from './interface/pages/customers';

//Setting
import Setting from './interface/pages/setting';
import Members from './interface/setting/members';
import General from './interface/setting/general';
import ManagerProduct from './interface/setting/manager_product';
import MasterCore from './interface/setting/mastercore';

// config router
import ProtectedRoute from './interface/config/ProtectedRoute';


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
import Login from './interface/pages/login';
import DetallesSolicitud from './interface/pages/details';


function App() {
  return (
    <>
      <Routes>
        {/* RUTA PÚBLICA: Login */}
        <Route path='/' element={<Login />} />

        {/* ENVOLTURA DE SEGURIDAD: Solo entran si hay Token */}
        <Route element={<ProtectedRoute />}>
          
          {/* Aquí dentro van todas tus rutas protegidas con Layout */}
          <Route path='' element={<Layout />}>
            <Route path='home' element={<Home />} />
            <Route path='init' element={<MainInterface />} />
            <Route path='inbox' element={<Inbox />} />
            <Route path='activities' element={<Activities />} />
            <Route path='product' element={<Project />} />
            <Route path='uirequest' element={<UIRequest />} />
            <Route path='taskmanager' element={<TaskManager />} />
            <Route path='detalles' element={<DetallesSolicitud />} />
            <Route path='customer' element={<Customer />} />

            {/* Componentes de configuracion general */}
            <Route path='setting' element={<Setting />}>
              <Route path='general' element={<General />} >
                <Route path='empresa' element={<Empresa />} />
                <Route path='area' element={<Area />} />
                <Route path='subarea' element={<Subarea />} />
              </Route>

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

        </Route> 
      </Routes>
    </>
  )
}

export default App

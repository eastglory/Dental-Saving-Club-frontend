import React, {useState} from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import {products} from '../../assets/Products'

const ControllableSidebar = ({routes, onWarrantySearch}) => {

  const [serial, setSerial] = useState('')
  const [loading, setLoading] = useState(false)

  const searchSerial = () => {
    setLoading(true)
    axios.get('https://coordinated-supreme-spoonbill.glitch.me/getrepairtrackerdata').then(res => {
      let _data = res.data
      let temp = _data.map(item => (
          {...item, toWarranty: 
            calculateWarranty(item), 
            warranty: products.find(product => product.label == item.product).warranty,
            difference: (new Date(item.datRec).getTime() - new Date(item.dop).getTime())/(1000 * 3600 * 24),
          }
      ))
      const result = temp.find(item => item.serial == serial)
      onWarrantySearch(result)

      setLoading(false)
    }).catch(err => {setLoading(false); console.log(err)})
  }

  const calculateWarranty = (item) => {
    let difference = new Date(item.datRec).getTime() - new Date(item.dop).getTime()
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24))
    let productsWarranty = products.find(product => product.label == item.product).warranty
    let warranty = Math.ceil(totalDays * 100 / productsWarranty)
    return warranty
  }

  return (
      <div style={{ display: 'flex', height: '100vh' , overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              DSC Repair Hub
            </a>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              {routes.map((prop, key) => {
                  if (!prop.redirect)
                  return (
                      <NavLink
                          exact
                          to={prop.layout + prop.path}
                          // className="nav-link"
                          activeClassName="activeClicked"
                          key={key}
                      >
                          <CDBSidebarMenuItem icon={prop.icon} >{prop.name}</CDBSidebarMenuItem>
                      </NavLink>
                  );
                  return null;
              })}
              
              {/* <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/tables" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/profile" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/analytics" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
              </NavLink>
  
              <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
              </NavLink> */}
            </CDBSidebarMenu>
          </CDBSidebarContent>
          <CDBSidebarFooter className="text-center">
            <div>
              <p>Warranty Tracker</p>
              <InputText
                  className=" mb-2 p-2 mt-1" 
                  value={serial} 
                  placeholder="Type Serial..." 
                  onChange={(e) => {setSerial(e.target.value)}}
                ></InputText>
                <Button 
                  icon="pi pi-search" 
                  className="p-button-secondary mb-2 mt-1 p-2" 
                  onClick={searchSerial}
                  loading={loading}/>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
};

export default ControllableSidebar;
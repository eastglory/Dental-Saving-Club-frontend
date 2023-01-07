import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const ControllableSidebar = ({routes}) => {
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
    
          </CDBSidebar>
        </div>
      );
};

export default ControllableSidebar;
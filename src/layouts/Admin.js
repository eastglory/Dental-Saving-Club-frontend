/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useRef } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import axios from "axios";
import ControllableSidebar from "components/Sidebar/ControllableSidebar";
import { Dialog } from 'primereact/dialog'
import { ProgressBar } from 'react-bootstrap';

import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";

function Admin() {
  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const location = useLocation();
  const [dialogVisible, setDialogVisible] = useState(false)
  const [warranty, setWarranty] = useState(0)
  const [warrantyDay, setWarrantyDay] = useState(0)
  const [difference, setDifference] = useState(0)
  const [dop, setDop] = useState('')
  const [recId, setRecId] = useState('')
  const [datRec, setDatRec] = useState('')
  const mainPanel = useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const formatDate = (date) => {
    if(date) return new Date(date).toISOString().split('T')[0]
    else return ''
  }


  const onWarrantySearch = (result) => {
    setWarranty(result.toWarranty)
    setRecId(result.recId)
    setDop(formatDate(result.dop))
    setDatRec(formatDate(result.datRec))
    setDifference(result.difference)
    setWarrantyDay(result.warranty)
    setDialogVisible(true)
  }
  useEffect(() => {
    console.log("Getting Data")
    axios.get('https://coordinated-supreme-spoonbill.glitch.me/getalltray')
            .then(res => {localStorage.setItem('tray', JSON.stringify(res.data))})
            .catch(err => console.log(err) )
        
        axios.get('https://coordinated-supreme-spoonbill.glitch.me/getallclients')
            .then(res => localStorage.setItem('clients', JSON.stringify(res.data)))
            .catch(err => console.log(err))
  }, [])


  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper d-flex">
        {/* <Sidebar color={color} image={hasImage ? image : ""} routes={routes} /> */}
        <ControllableSidebar routes={routes} onWarrantySearch = {onWarrantySearch}/>
        <div className="overflow-auto w-100" ref={mainPanel}>
          <AdminNavbar />
          <div className="content px-3 pt-4">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
        </div>
      </div>
      <Dialog header="Result" style={{ width: '20vw' }} visible={dialogVisible} onHide={() => setDialogVisible(false)}>
        <p>Warranty: {warranty < 100 ? 'Yes' : 'No'}</p>
        <p>RecId: {recId}</p>
        <p>Date of Purchase: {dop}</p>
        <p>Recevied Date: {datRec}</p>
        <ProgressBar className='bg-white'>
          <ProgressBar className="progress-bar-label-overflow text-dark" variant="success" label={`${100 > warranty? difference: warrantyDay} days`} now={(100 > warranty? warranty: 100)/2} key={1} />
          <ProgressBar className="progress-bar-label-overflow text-dark" variant="danger" label={100 > warranty? `${warrantyDay-difference} days left`: `${difference-warrantyDay} days over`} now={(100>warranty? 0: warranty-100)/2} key={2} />
        </ProgressBar>
      </Dialog>
      {/* <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      /> */}
    </>
  );
}

export default Admin;

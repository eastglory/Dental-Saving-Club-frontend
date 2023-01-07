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
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import RepairTracker from "views/RepairTracker.js";
import RepairAuth from "views/RepairAuth.js"
import RepairTray from "views/RepairTray.js";
import Customer from "views/Customer.js";
import RepairJournal from "views/RepairJournal";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "chart-line",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/repairTray",
    name: "Repair Tray",
    icon: "table",
    component: RepairTray,
    layout: "/admin"
  },
  {
    path: "/repairAuth",
    name: "Repair Authorization",
    icon: "sticky-note",
    component: RepairAuth,
    layout: "/admin"
  },
  {
    path: "/repairJournal",
    name: "Repair Journal",
    icon: "book",
    component: RepairJournal,
    layout: "/admin"
  },
  {
    path: "/repairTracker",
    name: "Repair Tracker",
    icon: "clock",
    component: RepairTracker,
    layout: "/admin"
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "users",
    component: Customer,
    layout: "/admin"
  },
];

export default dashboardRoutes;

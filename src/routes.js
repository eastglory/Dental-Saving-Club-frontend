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

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/repairTray",
    name: "Repair Tray",
    icon: "nc-icon nc-settings-gear-64",
    component: RepairTray,
    layout: "/admin"
  },
  {
    path: "/repairAuth",
    name: "Repair Authorization",
    icon: "nc-icon nc-check-2",
    component: RepairAuth,
    layout: "/admin"
  },
  {
    path: "/repairJournal",
    name: "Repair Journal",
    icon: "nc-icon nc-settings-90",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/repairTracker",
    name: "Repair Tracker",
    icon: "nc-icon nc-watch-time",
    component: RepairTracker,
    layout: "/admin"
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "nc-icon nc-circle-09",
    component: Customer,
    layout: "/admin"
  },
  {
    path: "/report",
    name: "Report",
    icon: "nc-icon nc-notes",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/analysis",
    name: "Analysis",
    icon: "nc-icon nc-chart-bar-32",
    component: Dashboard,
    layout: "/admin"
  },
];

export default dashboardRoutes;

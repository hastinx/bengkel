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
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import MasterSparePart from "views/Master/MasterSparePart";
import MasterKaryawan from "views/Master/MasterKaryawan";
import MasterCustomer from "views/Master/MasterCustomer";
import MasterKendaraan from "views/Master/MasterKendaraan";
import Penjualan from "views/Transaksi/Penjualan";
import DataPenjualan from "views/Transaksi/DataPenjualan";
import ReportCash from "views/Report/ReportPenjualanCash";
import ReportHutang from "views/Report/ReportPenjualanUtang";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    type: 'parent',
    icon: "nc-icon nc-money-coins",
    name: 'Transaksi'
  },
  {
    parent: 'Transaksi',
    path: "/penjualan",
    name: "Transaksi",
    icon: "nc-icon nc-money-coins",
    component: Penjualan,
    layout: "/admin"
  },
  {
    parent: 'Transaksi',
    path: "/data-penjualan",
    name: "Data Transaksi",
    icon: "nc-icon nc-money-coins",
    component: DataPenjualan,
    layout: "/admin"
  },
  {
    type: 'parent',
    icon: "nc-icon nc-notes",
    name: 'Master'
  },
  {
    parent: "Master",
    path: "/master-spare-part",
    name: "Master Spare Part",
    icon: "nc-icon nc-notes",
    component: MasterSparePart,
    layout: "/admin"
  },
  {
    parent: "Master",
    path: "/master-karyawan",
    name: "Master Karyawan",
    icon: "nc-icon nc-notes",
    component: MasterKaryawan,
    layout: "/admin"
  },
  {
    parent: "Master",
    path: "/master-customer",
    name: "Master Customer",
    icon: "nc-icon nc-notes",
    component: MasterCustomer,
    layout: "/admin"
  },
  {
    parent: "Master",
    path: "/master-kendaraan",
    name: "Master Kendaraan",
    icon: "nc-icon nc-notes",
    component: MasterKendaraan,
    layout: "/admin"
  },
  {
    type: 'parent',
    icon: "nc-icon nc-paper-2",
    name: 'Report'
  },
  {
    parent: "Report",
    path: "/report-cash",
    name: "Transaksi Lunas",
    icon: "nc-icon nc-paper-2",
    component: ReportCash,
    layout: "/admin"
  },
  {
    parent: "Report",
    path: "/report-hutang",
    name: "Transaksi Hutang",
    icon: "nc-icon nc-paper-2",
    component: ReportHutang,
    layout: "/admin"
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: UserProfile,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
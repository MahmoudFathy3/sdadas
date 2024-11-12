import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "@layouts/mainLayouts";
import Home from "@pages/Home/Home";
import Complexes from "@pages/Complexes/Complexes";
import ComplexeLists from "@pages/Complexes/ComplexeLists";
import DetailsComplexe from "@pages/Complexes/DetailsComplexe";
import ComplexeEdit from "@pages/Complexes/ComplexeEdit";
import Governorate from "@pages/Governorate/Governorate";
import Users from "@pages/Users/Users";
import UsersList from "@pages/Users/UsersList";
import DetailsUser from "@pages/Users/detailsUser";
import UserEdit from "@pages/Users/UserEdit";
import Buildings from "@pages/Buildings/Buildings";
import BuildingsList from "@pages/Buildings/BuildingsList";
import DetailsBuilding from "@pages/Buildings/DetailsBuilding";
import BuildingEdit from "@pages/Buildings/BuildingEdit";
import Login from "@pages/Auth/Login/Login";
import Units from "@pages/Units/Units";
import UnitsList from "@pages/Units/UnitsList";
import UnitsEdit from "@pages/Units/UnitsEdit";
import DetailsUnit from "@pages/Units/DetailsUnit";
import UnitManagement from "@pages/Units/Unit Management/UnitMangement";
import Services from "@pages/Services/Services";
import ServicesList from "@pages/Services/ServicesList";
import ServicesEdit from "@pages/Services/ServicesEdit";
import DetailsService from "@pages/Services/DetailsService";
import Invoices from "@pages/Invoices/Invoices";
import InvoicesList from "@pages/Invoices/InvoicesList";
import InvoiceEdit from "@pages/Invoices/InvoiceEdit";
import DetailsInvoice from "@pages/Invoices/DetailsInvoice";
// import Complaints from "@pages/Complaints/Complaints";
import ComplaintsList from "@pages/Complaints/ComplaintsList";
import ComplaintEdit from "@pages/Complaints/ComplaintEdit";
import DetailsComplaint from "@pages/Complaints/DetailsComplaint";
import Images from "@pages/Images/Images";
import ImagesList from "@pages/Images/ImagesList";
import ImageEdit from "@pages/Images/ImageEdit";
import DetailsImage from "@pages/Images/DetailsImage";
import Ads from "@pages/Ads/Ads";
import AdsList from "@pages/Ads/AdsList";
import AdsEdit from "@pages/Ads/AdsEdit";
import DetailsAds from "@pages/Ads/DetailsAds";
import Notification from "@pages/Notification/Notification";
import NotificationList from "@pages/Notification/NotificationList";
import NotificationEdit from "@pages/Notification/NotificationEdit";
import DetailsNotification from "@pages/Notification/DetailsNotification";
import GovernorateList from "@pages/Governorate/GovernorateList";
import GovernorateEdit from "@pages/Governorate/GovernorateEdit";
import UnitBuilding from "@pages/Units/Unit Building/UnitBuilding";
import CreateUnits from "@pages/Units/Create Units/CreateUnits";
import Workers from "@pages/Workers/Workers";
import WorkersList from "@pages/Workers/WorkersList";
import Crafts from "@pages/Crafts/Crafts";
import CraftsList from "@pages/Crafts/CraftsList";
import CraftsEdit from "@pages/Crafts/CraftsEdit";
import WorkersEdit from "@pages/Workers/WorkersEdit";
import Error from "@pages/Error/Error";

const routes = createBrowserRouter([
  {
    path: "/*",
    element: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/complexes/add",
        element: <Complexes />,
      },
      {
        path: "/complexes/list",
        element: <ComplexeLists />,
      },
      {
        path: "/complexes/list/:id/edit",
        element: <ComplexeEdit />,
      },
      {
        path: "/complexes/list/:id/details",
        element: <DetailsComplexe />,
      },
      {
        path: "/governorate/add",
        element: <Governorate />,
      },
      {
        path: "/governorate/list",
        element: <GovernorateList />,
      },
      {
        path: "/governorate/list/:id/edit",
        element: <GovernorateEdit />,
      },
      {
        path: "/users/add",
        element: <Users />,
      },
      {
        path: "/users/list",
        element: <UsersList />,
      },
      {
        path: "/users/list/:id/edit",
        element: <UserEdit />,
      },
      {
        path: "/users/list/:id/details",
        element: <DetailsUser />,
      },
      {
        path: "/workers/add",
        element: <Workers />,
      },
      {
        path: "/workers/list",
        element: <WorkersList />,
      },
      {
        path: "/workers/list/:id/edit",
        element: <WorkersEdit />,
      },
      {
        path: "/buildings/add",
        element: <Buildings />,
      },
      {
        path: "/buildings/list",
        element: <BuildingsList />,
      },
      {
        path: "/buildings/list/:id/edit",
        element: <BuildingEdit />,
      },
      {
        path: "/buildings/list/:id/details",
        element: <DetailsBuilding />,
      },
      {
        path: "/units/add",
        element: <Units />,
      },
      {
        path: "/units/list/:id/edit",
        element: <UnitsEdit />,
      },
      {
        path: "/units/list",
        element: <UnitsList />,
      },
      {
        path: "/units/list/:id/details",
        element: <DetailsUnit />,
      },
      {
        path: "/units/management",
        element: <UnitManagement />,
      },
      {
        path: "/units/management/:id/buildings",
        element: <UnitBuilding />,
      },
      {
        path: "/units/management/:id/buildings/:id",
        element: <CreateUnits />,
      },
      {
        path: "/services/add",
        element: <Services />,
      },
      {
        path: "/services/list",
        element: <ServicesList />,
      },
      {
        path: "/services/list/:id/edit",
        element: <ServicesEdit />,
      },
      {
        path: "/services/list/:id/details",
        element: <DetailsService />,
      },
      {
        path: "/craft/add",
        element: <Crafts />,
      },
      {
        path: "/craft/list",
        element: <CraftsList />,
      },
      {
        path: "/craft/list/:id/edit",
        element: <CraftsEdit />,
      },
      {
        path: "/invoices/add",
        element: <Invoices />,
      },
      {
        path: "/invoices/list",
        element: <InvoicesList />,
      },
      {
        path: "/invoices/list/:id/edit",
        element: <InvoiceEdit />,
      },
      {
        path: "/invoices/list/:id/details",
        element: <DetailsInvoice />,
      },
      {
        path: "/complaints/list",
        element: <ComplaintsList />,
      },
      {
        path: "/complaints/list/:id/edit",
        element: <ComplaintEdit />,
      },
      {
        path: "/complaints/list/:id/details",
        element: <DetailsComplaint />,
      },
      {
        path: "/images/add",
        element: <Images />,
      },
      {
        path: "/images/list",
        element: <ImagesList />,
      },
      {
        path: "/images/list/:id/edit",
        element: <ImageEdit />,
      },
      {
        path: "/images/list/:id/details",
        element: <DetailsImage />,
      },
      {
        path: "/ads/add",
        element: <Ads />,
      },
      {
        path: "/ads/list",
        element: <AdsList />,
      },
      {
        path: "/ads/list/:id/edit",
        element: <AdsEdit />,
      },
      {
        path: "/ads/list/:id/details",
        element: <DetailsAds />,
      },
      {
        path: "/notifications/add",
        element: <Notification />,
      },
      {
        path: "/notifications/list",
        element: <NotificationList />,
      },
      {
        path: "/notifications/list/:id/edit",
        element: <NotificationEdit />,
      },
      {
        path: "/notifications/list/:id/details",
        element: <DetailsNotification />,
      },
    ],
  },
]);

export default routes;

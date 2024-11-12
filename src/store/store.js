import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./reducers/Auth/LoginSlice";
import HomeSlice from "./reducers/Home/HomeSlice";
import RoleSlice from "./reducers/Auth/RoleSlice";
import UnitsSlice from "./reducers/Units/UnitsSlice";
import ComplexeSlice from "./reducers/Complexes/ComplexeSlice";
import GrogovernorateSlice from "./reducers/Governorate/GovernorateSlice";
import UsersSlice from "./reducers/Users/UsersSlice";
import BuildingSlice from "./reducers/Building/BuildingSlice";
import ServiceSlice from "./reducers/Service/ServiceSlice";
import CraftsSlice from "./reducers/Crafts/CraftsSlice";
import ComplaintsSlice from "./reducers/Complaints/ComplaintsSlice";
import InvoicesSlice from "./reducers/Invoices/InvoicesSlice";
import AdsSlice from "./reducers/Ads/AdsSlice";
import ImageSlice from "./reducers/Image/ImageSlice";
import WorkersSlice from "./reducers/Workers/WorkersSlice";
import NotificationSlice from "./reducers/Notification/NotificationSlice";

const store = configureStore({
  reducer: {
    login: LoginSlice,
    home: HomeSlice,
    role: RoleSlice,
    units: UnitsSlice,
    complexes: ComplexeSlice,
    governorate: GrogovernorateSlice,
    users: UsersSlice,
    buildings: BuildingSlice,
    services: ServiceSlice,
    crafts: CraftsSlice,
    complaints: ComplaintsSlice,
    invoices: InvoicesSlice,
    ads: AdsSlice,
    images: ImageSlice,
    workers: WorkersSlice,
    notification: NotificationSlice,
  },
});

export default store;

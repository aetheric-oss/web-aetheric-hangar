interface IMenuItem {
  name: string;
  path: string;
}
interface IDropdownValues {
  [key: string]: string;
}
interface IProfileSettingsFormValue {
  type: string;
  value: string;
}
interface ISubMenuItem {
  name: string;
  path: string;
  component: ConcreteComponent | string;
}
interface IItineraryDisplayData {
  id: string;
  origin_vertiport: string;
  origin_vertipad: string;
  target_vertiport: string;
  target_vertipad: string;
  origin_start_time: string;
  target_start_time: string;
  total_cost: number;
}
interface IBookFlight {
  user_id: string | undefined;
  date: string;
  start_hour: string;
  start_minute: string;
  origin_vertiport: string;
  target_vertiport: string;
  cargo_weight_g: number;
  itinerary: IItineraryDisplayData | undefined;
}

interface ISignup {
  email: string;
  name: string;
}

interface IFlightPlan {
  origin_vertiport_id: string;
  origin_vertipad_id: string;
  target_vertiport_id: string;
  target_vertipad_id: string;
  path: IPath[];
  origin_timeslot_start: string;
  origin_timeslot_end: string;
  target_timeslot_start: string;
  target_timeslot_end: string;
  vehicle_id: string;
  flight_priority: number
}

interface IPath {
  longitude: number;
  latitude: number;
  altitude: number;
}

interface IInvoiceItem {
  item: string;
  cost: number;
}

interface IItineraryInfo {
  flight_plans: IFlightPlan[];
  currency_unit: string;
  cargo_weight_g: number;
  user_id: string;
  acquisition_vertiport_id: string;
  delivery_vertiport_id: string;
  invoice: IInvoiceItem[];
}

interface IItinerary {
  id: string;
  itinerary: IItineraryInfo;
}

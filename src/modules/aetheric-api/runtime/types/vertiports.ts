import type {
  IGetForIdRequest,
  IAdvancedSearchFilter,
  IApiFactory,
} from "../types";

export interface IAssetBase {
  id: string;
  name: string;
  group_id: string | null;
  owner: string;
  created_at: string;
  updated_at: string;
  whitelist: string[];
  status: string
}

export interface IVertiport extends IAssetBase, IVertiportCreate { }
export interface IVertiportCreate {
  basics: IAssetBase;
  description: string;
  geo_location: any;
  schedule: string;
}

export interface IVertipad {
  basics: IAssetBase;
  vertiport_id: string;
  enabled: boolean;
  occupied: boolean;
  geo_location: {
    longitude: number;
    latitude: number;
    altitude: number;
  }
  schedule: string;
}

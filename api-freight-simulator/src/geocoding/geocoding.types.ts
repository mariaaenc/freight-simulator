interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface LatLng {
  lat: number;
  lng: number;
}

interface Bounds {
  northeast: LatLng;
  southwest: LatLng;
}

interface Viewport {
  northeast: LatLng;
  southwest: LatLng;
}

interface Geometry {
  bounds: Bounds;
  location: LatLng;
  location_type: string;
  viewport: Viewport;
}

interface GeocodingResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  postcode_localities: string[];
  types: string[];
}

export interface GeocodingResponse {
  results: GeocodingResult[];
  status: string;
}

export interface LongitudeLatitudeResponse {
  latitude: number;
  longitude: number;
}

import { GeocodingResponse } from '../geocoding.types';

export const mockGeocodingResponse: GeocodingResponse = {
  results: [
    {
      address_components: [
        {
          long_name: '89222-520',
          short_name: '89222-520',
          types: ['postal_code'],
        },
        {
          long_name: 'Rua Palmitos',
          short_name: 'R. Palmitos',
          types: ['route'],
        },
        {
          long_name: 'Bom Retiro',
          short_name: 'Bom Retiro',
          types: ['political', 'sublocality', 'sublocality_level_1'],
        },
        {
          long_name: 'Joinville',
          short_name: 'Joinville',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Santa Catarina',
          short_name: 'SC',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'Brasil',
          short_name: 'BR',
          types: ['country', 'political'],
        },
      ],
      formatted_address:
        'R. Palmitos - Bom Retiro, Joinville - SC, 89222-520, Brasil',
      geometry: {
        bounds: {
          northeast: {
            lat: -26.2678182,
            lng: -48.8481598,
          },
          southwest: {
            lat: -26.2695544,
            lng: -48.8506312,
          },
        },
        location: {
          lat: -26.2688194,
          lng: -48.84945159999999,
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: -26.2673373197085,
            lng: -48.8480465197085,
          },
          southwest: {
            lat: -26.2700352802915,
            lng: -48.8507444802915,
          },
        },
      },
      place_id: 'ChIJBa8_isWv3pQR0KM4cl5IvFY',
      postcode_localities: ['Bom Retiro', 'Santo Antônio'],
      types: ['postal_code'],
    },
  ],
  status: 'OK',
};

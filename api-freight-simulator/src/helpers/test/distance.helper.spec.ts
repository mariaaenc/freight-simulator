import { calculateDistance } from '../distance.helper';

describe('calculateDistance()', () => {
  it.each`
    a                                                         | b                                                                    | expectedDistance
    ${{ lat: -26.3044, lon: -48.8487, name: 'Joinville SC' }} | ${{ lat: -26.2437, lon: -48.6386, name: 'São Francisco do Sul SC' }} | ${22.01}
    ${{ lat: -23.5505, lon: -46.6333, name: 'São Paulo SP' }} | ${{ lat: -25.4294, lon: -49.2719, name: 'Curitiba PR' }}             | ${339.01}
    ${{ lat: -12.9777, lon: -38.5016, name: 'Salvador BA' }}  | ${{ lat: -25.4294, lon: -49.2719, name: 'Curitiba PR' }}             | ${1785.72}
  `(
    'calculate distance between "$a.name" and "$b.name" should be $expectedDistance',
    ({ a, b, expectedDistance }) => {
      const distance = calculateDistance(a.lat, a.lon, b.lat, b.lon);
      expect(distance).toBeCloseTo(expectedDistance, 2);
    },
  );

  it('calculate distance between same points as zero', () => {
    const lat = -26.3044;
    const lon = -48.8487;

    const distance = calculateDistance(lat, lon, lat, lon);
    expect(distance).toBe(0);
  });
});

/**
 * Haversine Formula to Calculate Distance (a)
 *  a = sin²(Δϕ / 2) + cos(ϕ1) * cos(ϕ2) * sin²(Δλ / 2)
 *  c = 2 * atan2(√a, √(1 - a))
 *  d = R * c
 *
 *  Where:
 *  ϕ1 and ϕ2 are the latitudes of the two points in radians.
 *  Δϕ is the difference between the latitudes of the two points in radians.
 *  Δλ is the difference between the longitudes of the two points in radians.
 *  R is the Earth's radius (approximately 6,371 km).
 *  c is the central angle in radians.
 *  d is the distance between the two points in kilometers.
 */

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const earthRadius = 6371;
  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);

  const deltaLatRad = lat2Rad - lat1Rad;
  const deltaLonRad = lon2Rad - lon1Rad;

  const haversineValue =
    Math.sin(deltaLatRad / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLonRad / 2) ** 2;

  const centralAngle =
    2 * Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue));

  return earthRadius * centralAngle;
}

const toRadians = (angle: number) => angle * (Math.PI / 180);

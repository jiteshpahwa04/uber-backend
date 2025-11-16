function haversineDistance(lat1, lon1, lat2, lon2, unit = 'km') {
  const R_EARTH_KM = 6371; // Radius of Earth in kilometers
  const R_EARTH_MILES = 3958.8; // Radius of Earth in miles

  // Convert degrees to radians
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  const rlat1 = toRadians(lat1);
  const rlon1 = toRadians(lon1);
  const rlat2 = toRadians(lat2);
  const rlon2 = toRadians(lon2);

  const dLat = rlat2 - rlat1;
  const dLon = rlon2 - rlon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rlat1) * Math.cos(rlat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let distance;
  if (unit === 'miles') {
    distance = R_EARTH_MILES * c;
  } else { // default to kilometers
    distance = R_EARTH_KM * c;
  }

  return distance;
}

module.exports = {
  haversineDistance
};
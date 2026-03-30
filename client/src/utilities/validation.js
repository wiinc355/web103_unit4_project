export function validateCar(car) {
  if (car.exterior === 'red' && car.interior === 'suede') {
    return 'Invalid combination: red + suede';
  }
  return null;
}

// Export isValidCombination for EditCar.jsx
export function isValidCombination(features) {
  // Example: disallow red exterior with suede interior
  if (features.exterior === 'red' && features.interior === 'suede') {
    return false;
  }
  return true;
}
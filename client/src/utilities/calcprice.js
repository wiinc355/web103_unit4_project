// Example: Calculate total price based on features
export function calculatePrice(basePrice, features) {
  let total = basePrice;
  if (features && typeof features === 'object') {
    for (const key in features) {
      if (features[key]?.price) total += Number(features[key].price);
    }
  }
  return total;
}

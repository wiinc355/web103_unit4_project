// Utility to map car features to their images
// Usage: getFeatureImages(car) => { roof: {name, image}, wheels: {name, image}, ... }
import { getAllCustomItems } from '../services/CustomItemsAPI';

export async function getFeatureImages(car) {
  const items = await getAllCustomItems();
  const featureTypes = ['roof', 'wheels', 'exterior', 'interior', 'convertible'];
  const result = {};
  featureTypes.forEach(type => {
    const featureName = car[type];
    if (!featureName) return;
    // Try exact match, ignoring case and plural/singular
    let match = items.find(item =>
      item.itemname && item.itemname.toLowerCase() === featureName.toLowerCase() &&
      (item.catagory?.toLowerCase().replace(/s$/, '') === type.replace(/s$/, ''))
    );
    // Fallback: partial match (case-insensitive, includes)
    if (!match) {
      match = items.find(item =>
        item.itemname && featureName && item.itemname.toLowerCase().includes(featureName.toLowerCase()) &&
        (item.catagory?.toLowerCase().replace(/s$/, '') === type.replace(/s$/, ''))
      );
    }
    if (match && match.image) {
      result[type] = { name: match.itemname, image: match.image };
    }
  });
  return result;
}

// Utility to get feature images for a list of cars
import { getAllCustomItems } from '../services/CustomItemsAPI';

export async function getCarsFeatureImages(cars) {
  const items = await getAllCustomItems();
  const featureTypes = ['roof', 'wheels', 'exterior', 'interior', 'convertible'];
  const carImages = {};
  cars.forEach(car => {
    const images = {};
    featureTypes.forEach(type => {
      const featureName = car[type];
      if (!featureName) return;
      let match = items.find(item =>
        item.itemname && item.itemname.toLowerCase() === featureName.toLowerCase() &&
        (item.catagory?.toLowerCase().replace(/s$/, '') === type.replace(/s$/, ''))
      );
      if (!match) {
        match = items.find(item =>
          item.itemname && featureName && item.itemname.toLowerCase().includes(featureName.toLowerCase()) &&
          (item.catagory?.toLowerCase().replace(/s$/, '') === type.replace(/s$/, ''))
        );
      }
      if (match && match.image) {
        images[type] = match.image;
      }
    });
    carImages[car.id] = images;
  });
  return carImages;
}

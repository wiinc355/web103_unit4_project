// optionsObj: { exterior: [..], wheels: [..], ... } (from setOptions)
// selected: { exterior, wheels, interior, roof, convertible }
export function calculatePrice(exterior, wheels, interior, roof, convertible, optionsObj) {
  let price = 20000;

  // Helper to get price from options array
  function getFeaturePrice(type, value) {
    if (!optionsObj || !optionsObj[type]) return 0;
    const found = optionsObj[type].find(opt => opt.itemname === value);
    return found && found.price ? Number(found.price) : 0;
  }

  price += getFeaturePrice('exterior', exterior);
  price += getFeaturePrice('wheels', wheels);
  price += getFeaturePrice('interior', interior);
  price += getFeaturePrice('roof', roof);
  price += getFeaturePrice('convertible', convertible);

  return price;
}
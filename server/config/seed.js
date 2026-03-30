import { pool } from './database.js';

async function seedData() {
  try {
    // Seed cars
    await pool.query(`
      INSERT INTO cars (make, model, color, price, roof, wheels, exterior, interior, convertible, features) VALUES
        ('Toyota', 'Corolla', 'Blue', 20000, 'standard', 'standard', 'Blue', 'Cloth', false, '{"sunroof": false, "wheels": "standard"}'),
        ('Honda', 'Civic', 'Red', 22000, 'moonroof', 'alloy', 'Red', 'Leather', false, '{"sunroof": true, "wheels": "alloy"}'),
        ('Ford', 'Mustang', 'Black', 35000, 'hardtop', 'sport', 'Black', 'Leather', true, '{"sunroof": true, "wheels": "sport"}')
    `);
    // Seed customitems
    await pool.query(`
      INSERT INTO customitems (itemname, image, catagory, price) VALUES
('silver flare metallic', 'https://boltbucket-exemplar.onrender.com/images/exteriors/silver_flare_metallic.png', 'exteriors', 2000),
('ed mist', 'https://boltbucket-exemplar.onrender.com/images/exteriors/red_mist.png', 'exteriors', 2000),
('arctic white', 'https://boltbucket-exemplar.onrender.com/images/exteriors/arctic_white.png', 'exteriors', 1500),
('hypersonic gray', 'https://boltbucket-exemplar.onrender.com/images/exteriors/hypersonic_gray.png', 'exteriors', 1500),
('amplify orange', 'https://boltbucket-exemplar.onrender.com/images/exteriors/amplify_orange.png', 'exteriors', 2500),
('caffeine metallic', 'https://boltbucket-exemplar.onrender.com/images/exteriors/caffeine_metallic.png', 'exteriors', 2500),
('black', 'https://boltbucket-exemplar.onrender.com/images/exteriors/black.png', 'exteriors', 1000),
('torch red', 'https://boltbucket-exemplar.onrender.com/images/exteriors/torch_red.png', 'exteriors', 1000),
('accelerate yellow', 'https://boltbucket-exemplar.onrender.com/images/exteriors/accelerate_yellow.png', 'exteriors', 500),
('elkhart lake blue', 'https://boltbucket-exemplar.onrender.com/images/exteriors/elkhart_lake_blue.png', 'exteriors', 500),
('adrenaline red', 'https://boltbucket-exemplar.onrender.com/images/interiors/adrenaline_red.jpg', 'interiors', 2000),
('habanero interior', 'https://boltbucket-exemplar.onrender.com/images/interiors/habanero_interior.jpg', 'interiors', 2000),
('adrenaline red dipped', 'https://boltbucket-exemplar.onrender.com/images/interiors/adrenaline_red_dipped.jpg', 'interiors', 1500),
('artemis', 'https://boltbucket-exemplar.onrender.com/images/interiors/artemis.jpg', 'interiors', 1500),
('jet black grey seats', 'https://boltbucket-exemplar.onrender.com/images/interiors/jet_black_grey_seats.jpg', 'interiors', 2500),
('jet black red stitching', 'https://boltbucket-exemplar.onrender.com/images/interiors/jet_black_red_stitching.jpg', 'interiors', 2500),
('jet black', 'https://boltbucket-exemplar.onrender.com/images/interiors/jet_black.avif', 'interiors', 1000),
('natural dipped', 'https://boltbucket-exemplar.onrender.com/images/interiors/natural_dipped.jpg', 'interiors', 1000),
('natural perforated', 'https://boltbucket-exemplar.onrender.com/images/interiors/natural_perforated.jpg', 'interiors', 500),
('sky cool grey perforated', 'https://boltbucket-exemplar.onrender.com/images/interiors/sky_cool_grey_perforated.jpg', 'interiors', 500),
('two tone blue', 'https://boltbucket-exemplar.onrender.com/images/interiors/two_tone_blue.avif', 'interiors', 1800),
('two toned red black', 'https://boltbucket-exemplar.onrender.com/images/interiors/two_toned_red_black.jpg', 'interiors', 1800),
('carbon flash body color', 'https://boltbucket-exemplar.onrender.com/images/roofs/carbon_flash_body_color.avif', 'roofs', 1500),
('carbon flash nacelles', 'https://boltbucket-exemplar.onrender.com/images/roofs/carbon_flash_nacelles.png', 'roofs', 2000),
('carbon fiber with body color', 'https://boltbucket-exemplar.onrender.com/images/roofs/carbon_fiber_with_body_color.png', 'roofs', 1000),
('dual roof', 'https://boltbucket-exemplar.onrender.com/images/roofs/dual_roof.avif', 'roofs', 500),
('transparent roof', 'https://boltbucket-exemplar.onrender.com/images/roofs/transparent_roof.avif', 'roofs', 1800),
('bronze forged', 'https://boltbucket-exemplar.onrender.com/images/wheels/bronze_forged.avif', 'wheels', 500),
('carbon flash spoke', 'https://boltbucket-exemplar.onrender.com/images/wheels/carbon_flash_spoke.avif', 'wheels', 500),
('carbon flash with red caliper', 'https://boltbucket-exemplar.onrender.com/images/wheels/carbon_flash_with_red_caliper.png', 'wheels', 1500),
('edge blue spoke', 'https://boltbucket-exemplar.onrender.com/images/wheels/edge_blue_spoke.avif', 'wheels', 1200),
('satin graphite with red stripe', 'https://boltbucket-exemplar.onrender.com/images/wheels/satin_graphite_with_red_stripe.png', 'wheels', 1600),
('sterling silver spoke', 'https://boltbucket-exemplar.onrender.com/images/wheels/sterling_silver_spoke.avif', 'wheels', 750),
('visible carbon spoke', 'https://boltbucket-exemplar.onrender.com/images/wheels/visible_carbon_spoke.avif', 'wheels', 875),
('convertible standard', '', 'convertible', 750);
    `);
    console.log('Seed data inserted successfully!');
  } catch (err) {
    console.error('Error inserting seed data:', err);
  } finally {
    await pool.end();
  }
}

seedData();

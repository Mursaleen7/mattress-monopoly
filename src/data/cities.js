/**
 * Central registry of all available cities
 * Update this file as new city pages are created
 */

export const AVAILABLE_CITIES = [
  { name: "Boston", slug: "boston", state: "MA", county: "Suffolk" },
  { name: "Cambridge", slug: "cambridge", state: "MA", county: "Middlesex" },
  { name: "Somerville", slug: "somerville", state: "MA", county: "Middlesex" },
  
  // Add more cities as they're created:
  // { name: "Brookline", slug: "brookline", state: "MA", county: "Norfolk" },
  // { name: "Quincy", slug: "quincy", state: "MA", county: "Norfolk" },
  // { name: "Newton", slug: "newton", state: "MA", county: "Middlesex" },
  // { name: "Waltham", slug: "waltham", state: "MA", county: "Middlesex" },
  // { name: "Watertown", slug: "watertown", state: "MA", county: "Middlesex" },
  // { name: "Medford", slug: "medford", state: "MA", county: "Middlesex" },
  // { name: "Malden", slug: "malden", state: "MA", county: "Middlesex" },
  // { name: "Everett", slug: "everett", state: "MA", county: "Middlesex" },
  // { name: "Chelsea", slug: "chelsea", state: "MA", county: "Suffolk" },
  // { name: "Revere", slug: "revere", state: "MA", county: "Suffolk" },
  // { name: "Winthrop", slug: "winthrop", state: "MA", county: "Suffolk" },
  // { name: "Arlington", slug: "arlington", state: "MA", county: "Middlesex" },
  // { name: "Belmont", slug: "belmont", state: "MA", county: "Middlesex" },
  // { name: "Lynn", slug: "lynn", state: "MA", county: "Essex" },
  // { name: "Salem", slug: "salem", state: "MA", county: "Essex" },
  // { name: "Peabody", slug: "peabody", state: "MA", county: "Essex" },
  // { name: "Beverly", slug: "beverly", state: "MA", county: "Essex" },
  // { name: "Danvers", slug: "danvers", state: "MA", county: "Essex" },
  // { name: "Marblehead", slug: "marblehead", state: "MA", county: "Essex" },
  // { name: "Swampscott", slug: "swampscott", state: "MA", county: "Essex" },
  // { name: "Nahant", slug: "nahant", state: "MA", county: "Essex" },
  // { name: "Braintree", slug: "braintree", state: "MA", county: "Norfolk" },
  // { name: "Weymouth", slug: "weymouth", state: "MA", county: "Norfolk" },
  // { name: "Milton", slug: "milton", state: "MA", county: "Norfolk" },
  // { name: "Dedham", slug: "dedham", state: "MA", county: "Norfolk" },
  // { name: "Needham", slug: "needham", state: "MA", county: "Norfolk" },
  // { name: "Wellesley", slug: "wellesley", state: "MA", county: "Norfolk" },
  // { name: "Hingham", slug: "hingham", state: "MA", county: "Plymouth" },
  // { name: "Lexington", slug: "lexington", state: "MA", county: "Middlesex" },
  // { name: "Woburn", slug: "woburn", state: "MA", county: "Middlesex" },
  // { name: "Burlington", slug: "burlington", state: "MA", county: "Middlesex" },
  // { name: "Winchester", slug: "winchester", state: "MA", county: "Middlesex" },
  // { name: "Stoneham", slug: "stoneham", state: "MA", county: "Middlesex" },
];

/**
 * Get city by slug
 */
export function getCityBySlug(slug) {
  return AVAILABLE_CITIES.find(city => city.slug === slug);
}

/**
 * Get city by name
 */
export function getCityByName(name) {
  return AVAILABLE_CITIES.find(city => 
    city.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Search cities by query
 */
export function searchCities(query) {
  const lowerQuery = query.toLowerCase();
  return AVAILABLE_CITIES.filter(city => 
    city.name.toLowerCase().includes(lowerQuery) ||
    city.slug.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all cities in a county
 */
export function getCitiesByCounty(county) {
  return AVAILABLE_CITIES.filter(city => city.county === county);
}

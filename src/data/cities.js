/**
 * Central registry of all available cities
 * Update this file as new city pages are created
 */

// Metro area definitions for grouping cities
export const METRO_AREAS = {
  GREATER_BOSTON: {
    name: "Greater Boston Area",
    heroImage: "/GreaterBostonArea_hero.png",
    counties: ["Suffolk", "Middlesex", "Norfolk", "Essex", "Plymouth"],
    cities: [
      "boston", "cambridge", "somerville", "brookline", "quincy", 
      "newton", "waltham", "watertown", "medford", "malden", 
      "everett", "chelsea", "revere", "winthrop", "arlington", 
      "belmont", "lynn", "salem", "peabody", "beverly", 
      "danvers", "marblehead", "swampscott", "nahant", "braintree", 
      "weymouth", "milton", "dedham", "needham", "wellesley", 
      "hingham", "lexington", "woburn", "burlington", "winchester", 
      "stoneham"
    ]
  }
};

export const AVAILABLE_CITIES = [
  { name: "Boston", slug: "boston", state: "MA", county: "Suffolk", metroArea: "GREATER_BOSTON" },
  { name: "Cambridge", slug: "cambridge", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  { name: "Somerville", slug: "somerville", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  
  // Add more cities as they're created:
  // { name: "Brookline", slug: "brookline", state: "MA", county: "Norfolk", metroArea: "GREATER_BOSTON" },
  // { name: "Quincy", slug: "quincy", state: "MA", county: "Norfolk", metroArea: "GREATER_BOSTON" },
  // { name: "Newton", slug: "newton", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  // { name: "Waltham", slug: "waltham", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  // { name: "Watertown", slug: "watertown", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  // { name: "Medford", slug: "medford", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  // { name: "Malden", slug: "malden", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  // { name: "Everett", slug: "everett", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  // { name: "Chelsea", slug: "chelsea", state: "MA", county: "Suffolk", metroArea: "GREATER_BOSTON" },
  // { name: "Revere", slug: "revere", state: "MA", county: "Suffolk", metroArea: "GREATER_BOSTON" },
  // { name: "Winthrop", slug: "winthrop", state: "MA", county: "Suffolk", metroArea: "GREATER_BOSTON" },
  // { name: "Arlington", slug: "arlington", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  // { name: "Belmont", slug: "belmont", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  // { name: "Lynn", slug: "lynn", state: "MA", county: "Essex", metroArea: "GREATER_BOSTON" },
  // { name: "Salem", slug: "salem", state: "MA", county: "Essex", metroArea: "GREATER_BOSTON" },
  // { name: "Peabody", slug: "peabody", state: "MA", county: "Essex", metroArea: "GREATER_BOSTON" },
  // { name: "Beverly", slug: "beverly", state: "MA", county: "Essex", metroArea: "GREATER_BOSTON" },
  // { name: "Danvers", slug: "danvers", state: "MA", county: "Essex", metroArea: "GREATER_BOSTON" },
  // { name: "Marblehead", slug: "marblehead", state: "MA", county: "Essex", metroArea: "GREATER_BOSTON" },
  // { name: "Swampscott", slug: "swampscott", state: "MA", county: "Essex", metroArea: "GREATER_BOSTON" },
  // { name: "Nahant", slug: "nahant", state: "MA", county: "Essex", metroArea: "GREATER_BOSTON" },
  // { name: "Braintree", slug: "braintree", state: "MA", county: "Norfolk", metroArea: "GREATER_BOSTON" },
  // { name: "Weymouth", slug: "weymouth", state: "MA", county: "Norfolk", metroArea: "GREATER_BOSTON" },
  // { name: "Milton", slug: "milton", state: "MA", county: "Norfolk", metroArea: "GREATER_BOSTON" },
  // { name: "Dedham", slug: "dedham", state: "MA", county: "Norfolk", metroArea: "GREATER_BOSTON" },
  // { name: "Needham", slug: "needham", state: "MA", county: "Norfolk", metroArea: "GREATER_BOSTON" },
  // { name: "Wellesley", slug: "wellesley", state: "MA", county: "Norfolk", metroArea: "GREATER_BOSTON" },
  // { name: "Hingham", slug: "hingham", state: "MA", county: "Plymouth", metroArea: "GREATER_BOSTON" },
  // { name: "Lexington", slug: "lexington", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  // { name: "Woburn", slug: "woburn", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  // { name: "Burlington", slug: "burlington", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  // { name: "Winchester", slug: "winchester", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
  // { name: "Stoneham", slug: "stoneham", state: "MA", county: "Middlesex", metroArea: "GREATER_BOSTON" },
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

/**
 * Get metro area configuration for a city
 */
export function getMetroAreaForCity(citySlug) {
  const city = getCityBySlug(citySlug);
  if (!city || !city.metroArea) return null;
  return METRO_AREAS[city.metroArea];
}

/**
 * Get hero image for a city based on its metro area
 */
export function getHeroImageForCity(citySlug) {
  const metroArea = getMetroAreaForCity(citySlug);
  return metroArea?.heroImage || null;
}

/**
 * Check if a city belongs to a specific metro area
 */
export function isCityInMetroArea(citySlug, metroAreaKey) {
  const city = getCityBySlug(citySlug);
  return city?.metroArea === metroAreaKey;
}

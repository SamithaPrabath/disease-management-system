// Google Maps configuration
export const GOOGLE_MAPS_CONFIG = {
    id: "google-map-script",
    libraries: ["places", "maps"],
    version: "weekly",
    language: "en",
    region: "US",
};

// Helper function to create the config with API key
export const getGoogleMapsConfig = (apiKey) => ({
    ...GOOGLE_MAPS_CONFIG,
    googleMapsApiKey: apiKey,
}); 
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DB_URL = process.env.DB_URL || 'mongodb://mongo/mydb';
export const EXTERNAL_API_URL =
  process.env.EXTERNAL_API_URL ||
  'https://data-sharing.tier-services.io/tier_paris/gbfs/2.2';
export const MAX_DISTANCE = Number(process.env.MAX_DISTANCE) || 1000;

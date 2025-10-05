import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// import { createClient } from '@supabase/supabase-js';
// import dotenv from 'dotenv';
// // Supabase
// dotenv.config();
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// export const supabase = createClient(supabaseUrl, supabaseKey);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, "serviceAccountKey.json"))
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

export default db;
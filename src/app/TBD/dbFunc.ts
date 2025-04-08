// import * as admin from "firebase-admin";
// import * as fs from "fs";
// import Papa from "papaparse";

// // Load Firebase credentials
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// // CSV file path
// const csvFilePath = "./csp-guru.csv"; // make sure this matches your location

// // Read and parse the CSV
// const csvData = fs.readFileSync(csvFilePath, "utf8");

// Papa.parse(csvData, {
//   header: true,
//   skipEmptyLines: true,
//   complete: async (result) => {
//     const rows = result.data as any[];
//     const collectionName = "cspGuru"; // your Firestore collection name

//     for (const row of rows) {
//       try {
//         // Create a unique ID using key fields
//         const docId = `${row.source}_${row.target}_${row.name}`.replace(/\s+/g, "_");

//         const docRef = db.collection(collectionName).doc(docId);
//         const existing = await docRef.get();

//         if (existing.exists) {
//           console.log(`Updating: ${docId}`);
//           await docRef.update(row);
//         } else {
//           console.log(`Creating: ${docId}`);
//           await docRef.set(row);
//         }
//       } catch (error) {
//         console.error("Error processing row:", row, error);
//       }
//     }

//     console.log("✅ Firestore upload complete.");
//   },
// });



import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';

// Initialize Firebase Admin SDK
const serviceAccount = require('./path-to-your-service-account-file.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Path to your CSV file
const csvFilePath = path.join(__dirname, 'csp-guru.csv');

// Read and parse the CSV file
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', async (row) => {
    const { source, target, name, value, source_name, target_name, source_type, target_type } = row;

    // Define a unique document ID, e.g., combining source and target
    const docId = `${source}_${target}`;

    const docRef = db.collection('your-collection-name').doc(docId);

    try {
      const docSnapshot = await docRef.get();
      if (docSnapshot.exists) {
        // Document exists, update it
        await docRef.update({
          name,
          value: Number(value),
          source_name,
          target_name,
          source_type,
          target_type,
        });
        console.log(`Updated document: ${docId}`);
      } else {
        // Document does not exist, create it
        await docRef.set({
          source,
          target,
          name,
          value: Number(value),
          source_name,
          target_name,
          source_type,
          target_type,
        });
        console.log(`Created document: ${docId}`);
      }
    } catch (error) {
      console.error(`Error processing document ${docId}:`, error);
    }
  })
  .on('end', () => {
    console.log('CSV file processing completed.');
  });

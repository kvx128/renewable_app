import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // make sure you have Firebase initialized

export const fetchDataFromFirestore = async (collectionName: string) => {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return data;
};

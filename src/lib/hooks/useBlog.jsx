import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";

export const useGetAllBlogs = ({ collectionName }) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy("created_at"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
      setLoading(false);
    });

    return () => unsub();
  }, [collectionName]);

  return { docs, loading };
};

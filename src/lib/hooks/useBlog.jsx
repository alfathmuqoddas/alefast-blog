import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

export const useGetAllBlogs = ({ collectionName }) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, collectionName), orderBy("created_at"));
        const querySnapshot = await getDocs(q);
        let documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [collectionName]);

  return { docs, loading };
};

export const useGetBlogById = ({ blogId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const docRef = await getDoc(doc(db, "blogPost", blogId));
        if (docRef.exists()) {
          setDocumentData(docRef.data());
        } else {
          setError("Doc not found");
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
    return () => {};
  }, [blogId]);

  return { loading, error, documentData };
};

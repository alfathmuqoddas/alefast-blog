import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import {
  collection,
  orderBy,
  query,
  getDocs,
  doc,
  getDoc,
  addDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const useGetAllBlogs = ({ collectionName }) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

export const useCreateBlog = async (collectionName, data) => {
  try {
    await addDoc(collection(db, collectionName), data);
  } catch (error) {
    console.log({ error });
  }
};

export const useDeleteBlogById = async (id) => {
  try {
    await deleteDoc(doc(db, "blogPost", id));
  } catch (error) {
    console.log({ error });
  }
};

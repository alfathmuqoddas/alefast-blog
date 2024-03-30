import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import {
  collection,
  orderBy,
  query,
  doc,
  getDoc,
  addDoc,
  onSnapshot,
  deleteDoc,
  where,
} from "firebase/firestore";

export const useGetAllBlogs = ({ collectionName }) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogPostsRef = collection(db, collectionName);

        const unsubscribe = onSnapshot(
          query(blogPostsRef, orderBy("created_at")),
          async (snapshot) => {
            const fetchedPosts = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setDocs(fetchedPosts);
            console.log({ docs });
            setLoading(false);
            setError(null);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setLoading(false);
        setError(error);
      }
    };

    fetchData();

    return () => {};
  }, [collectionName]);

  return { error, docs, loading };
};

export const useGetBlogById = ({ blogId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const docRef = await getDoc(doc(db, "blogPost", blogId));
        if (docRef.exists()) {
          setPostData(docRef.data());
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

  return { loading, error, postData };
};

export const createBlog = async (collectionName, data) => {
  try {
    await addDoc(collection(db, collectionName), data);
  } catch (error) {
    console.log({ error });
  }
};

export const deleteBlogById = async (collectionName, id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this blog post?"
  );
  if (!confirmDelete) {
    return; // If user cancels, exit function
  }
  try {
    await deleteDoc(doc(db, collectionName, id));
    console.log("Document successfully deleted!"); ////
  } catch (error) {
    console.log({ error });
  }
};

export const useGetAllCommentsByBlogId = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsRef = collection(db, "comment");

        const unsubscribe = onSnapshot(
          query(
            commentsRef,
            orderBy("created_at"),
            where("post_id", "==", postId)
          ),
          async (snapshot) => {
            const fetchedComments = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setComments(fetchedComments);
            console.log({ comments });
            setLoading(false);
            setError(null);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setLoading(false);
        setError(error);
      }
    };

    fetchData();

    return () => {};
  }, [postId]);

  return { error, comments, loading };
};

export const deleteAllCommentByBlogId = async (collectionName, blogId) => {
  try {
    const collectionRef = collection(collectionName);
    const query = collectionRef.where("post_id", "==", blogId);
    const querySnapshot = await query.get();
    for (const doc of querySnapshot.docs) {
      await doc.ref.delete();
    }

    console.log("matching document delete succesfully");
  } catch (error) {
    console.log({ error });
  }
};

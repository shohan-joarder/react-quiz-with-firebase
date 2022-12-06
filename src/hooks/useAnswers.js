import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswers(videoId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [hasMore, setHasmore] = useState(true);
  useEffect(() => {
    async function fetchAnswers() {
      // database related works
      const db = getDatabase();
      const answerRef = ref(db, "answers/" + videoId + "/questions");
      const answerQuery = query(answerRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapshot = await get(answerQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswers((prevAns) => {
            return [...prevAns, ...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
    fetchAnswers();
  }, [videoId]);
  return {
    loading,
    error,
    answers,
  };
}

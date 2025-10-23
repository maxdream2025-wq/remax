import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://api.remaxdreamuae.com/api/v1"}/newsletter/`;

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setNewsletters(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching newsletters:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Newsletter Subscriptions</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Subscribed At</th>
          </tr>
        </thead>
        <tbody>
          {newsletters.length > 0 ? (
            newsletters.map((n) => (
              <tr key={n.id}>
                <td className="border px-4 py-2">{n.id}</td>
                <td className="border px-4 py-2">{n.email}</td>
                <td className="border px-4 py-2">
                  {new Date(n.subscribed_at).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2" colSpan="3">
                No subscriptions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Newsletter;

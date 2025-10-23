"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/contact/`;

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        // sort by submitted_at descending
        const sorted = res.data.sort(
          (a, b) => new Date(b.submitted_at) - new Date(a.submitted_at)
        );
        setContacts(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Contact Submissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, index) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{c.help_category}</td>
                <td className="border px-4 py-2">
                  {c.first_name} {c.last_name}
                </td>
                <td className="border px-4 py-2">{c.email}</td>
                <td className="border px-4 py-2">
                  {c.country_code} {c.phone}
                </td>
                <td className="border px-4 py-2">{c.message}</td>
                <td className="border px-4 py-2">
                  {new Date(c.submitted_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contact;

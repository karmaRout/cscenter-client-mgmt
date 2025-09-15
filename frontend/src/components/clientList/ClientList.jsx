import React from "react";
import { Trash2, Pencil } from "lucide-react";

function ClientList({ clients, handleDelete, handleEdit }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 md:col-span-2">
      <h2 className="text-2xl font-bold mb-6 text-center">Client List</h2>
      {clients.length === 0 ? (
        <p className="text-gray-500 text-center">No clients added yet.</p>
      ) : (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-md border">
          <table className="min-w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-gray-200">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Serial</th>
                <th className="border p-2">Model</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="border p-2">{c.name}</td>
                  <td className="border p-2">{c.serial}</td>
                  <td className="border p-2">{c.model}</td>
                  <td className="border p-2">{c.date}</td>
                  <td className="border p-2">{c.phone}</td>
                  <td className="border p-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ClientList;

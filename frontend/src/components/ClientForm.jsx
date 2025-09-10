import React from "react";

function ClientForm({ clientData, handleChange, handleSubmit }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 md:col-span-1">
      <h2 className="text-2xl font-bold mb-6 text-center">Client Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={clientData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="serial"
          placeholder="Serial Number"
          value={clientData.serial}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="model"
          placeholder="Model Number"
          value={clientData.model}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="date"
          name="date"
          value={clientData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={clientData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-gray font-semibold py-2 rounded-md shadow-md hover:bg-green-700 transition"
        >
          Save Client Data
        </button>
      </form>
    </div>
  );
}

export default ClientForm;

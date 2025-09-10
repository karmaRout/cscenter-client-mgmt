import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const FILE_PATH = "./client.json";

// Helper: load clients from file
function loadClients() {
  try {
    if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, "utf8");
      console.log("Loaded clients:", JSON.parse(data));
      return JSON.parse(data);
    }
    return [];
  } catch (err) {
    console.error("Error reading clients file:", err);
    return [];
  }
}

// Helper: save clients to file
function saveClients(clients) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(clients, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving clients file:", err);
  }
}

// Load clients at startup
let clients = loadClients();

// GET /clients
app.get("/clients", (req, res) => {
  res.json(clients);
});

// POST /clients
app.post("/clients", (req, res) => {
  const newClient = { id: Date.now(), ...req.body };
  clients.push(newClient);
  saveClients(clients);
  res.status(201).json(newClient);
});

// DELETE /clients/:id
app.delete("/clients/:id", (req, res) => {
  const id = Number(req.params.id);
  clients = clients.filter((c) => c.id !== id);
  saveClients(clients);
  res.status(204).end();
});

// Start server
app.listen(4000, () => console.log("🚀 Server running at http://localhost:4000"));

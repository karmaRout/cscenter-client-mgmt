import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://karmarout_db_user:JJaRwdr7L4FQneA7@csmngmnt.lf4wjoq.mongodb.net/csmngmnt?retryWrites=true&w=majority&appName=csmngmnt"
    );
    console.log("✅ MongoDB connected!");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
}
connectDB();

// ✅ Define Client schema & model
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serial: { type: String, required: true },
  model: { type: String, required: true },
  date: { type: String, required: true }, // can be Date if you want
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Client = mongoose.model("Client", clientSchema);

// ✅ Routes

// Root
app.get("/", (req, res) => {
  res.send("🚀 Client Management API running...");
});

// GET all clients
app.get("/clients", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

// POST new client
app.post("/clients", async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (err) {
    res.status(400).json({ error: "Failed to add client" });
  }
});

// DELETE client by ID
app.delete("/clients/:id", async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: "Failed to delete client" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

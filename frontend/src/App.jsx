import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";

function App() {
  const [clients, setClients] = useState([]);
  const [clientData, setClientData] = useState({
    name: "",
    serial: "",
    model: "",
    date: "",
    phone: "",
  });

  // Login state
  const [showLogin, setShowLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Fetch clients from backend
  useEffect(() => {
    fetch("/clients")
      .then((res) => res.json())
      .then(setClients)
      .catch((err) => console.error(err));
  }, []);

  // Handle input change in client form
  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  // Save new client
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientData),
      });
      const newClient = await res.json();
      setClients([newClient, ...clients]);
      setClientData({ name: "", serial: "", model: "", date: "", phone: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // Delete client
  const handleDelete = async (id) => {
    try {
      await fetch(`/clients/${id}`, {
        method: "DELETE",
      });
      setClients(clients.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Handle login (example)
  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      setShowLogin(false);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {showLogin && !isAuthenticated && (
        <LoginModal
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}

      {isAuthenticated && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-9xl">
          <ClientForm
            clientData={clientData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <ClientList clients={clients} handleDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}

export default App;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clients: [],
    loading: false,
    error: null,
};

const clientListSlice = createSlice({
    name: "clientList",
    initialState,
    reducers: {
        setClients: (state, action) => {
            state.clients = action.payload;
        },
        addClient: (state, action) => {
            state.clients.push(action.payload);
        },
        removeClient: (state, action) => {
            state.clients = state.clients.filter((client) => client.id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setClients, addClient, removeClient, setLoading, setError } = clientListSlice.actions;

export default clientListSlice.reducer;

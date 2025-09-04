import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Problems() {
    const { token } = useAuth();
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [status, setStatus] = useState("Not Started");
    const [tags, setTags] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/problems", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProblems(res.data.problems);
            } catch (err) {
                console.error(err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchProblems();
    }, [token]);

    const resetForm = () => {
        setTitle("");
        setTags("");
        setDifficulty("Easy");
        setStatus("Not Started");
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                const res = await axios.put(
                    `http://localhost:5000/api/problems/${editId}`,
                    { title, difficulty, status, tags: tags.split(",").map(t => t.trim()) },
                    { headers: { Authorization: `Bearer ${token}`} }
                );
                setProblems(
                    problems.map(p => (p._id === editId ? res.data.problem : p))
                );
            } else {
                const res = await axios.post(
                    "http://localhost:5000/api/problems", 
                    { title, difficulty, status, tags: tags.split(",").map(t => t.trim()) },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setProblems([res.data.problem, ...problems]);
            }
            resetForm();
        } catch (err) {
            alert(err.response?.data?.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this problem?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/problems/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProblems(problems.filter(p => p._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete problem");
        }
    };

    const handleEdit = p => {
        setEditId(p._id);
        setTitle(p.title);
        setDifficulty(p.difficulty);
        setStatus(p.status);
        setTags(p.tags.join(", "));
    };

    if (loading) return <p>Loading problems...</p>;

    return (
        <div>
            <h1>Your Problems</h1>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Solved">Solved</option>
                </select>
                <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
                {editId && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>
            
            {problems.length === 0 ? (
                <p>No problems added yet.</p>
            ) : (
                <ul>
                    {problems.map(p => (
                        <li key={p._id}>
                            <strong>{p.title}</strong> - {p.difficulty} ({p.status})
                            {p.tags.length > 0 && <span> | Tags: {p.tags.join(", ")}</span>}
                            {" "}
                            <button onClick={() => handleEdit(p)}>Edit</button>
                            <button onClick={() => handleDelete(p._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Problems;
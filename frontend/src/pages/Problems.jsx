import React, { useEffect, useState } from "react";
import api from "../utils/api";

function Problems() {
    const { token } = useAuth();
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [status, setStatus] = useState("Not Started");
    const [tags, setTags] = useState("");
    const [editId, setEditId] = useState(null);

    const fetchProblems = async () => {
        try {
            const res = await api.get("/problems");
            setProblems(res.data.problems);
        } catch (err) {
            console.error(err.response?.data?.message || "Failed to fetch problems");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
                const res = await api.put(
                    `/problems/${editId}`,
                    { title, difficulty, status, tags: tags.split(",").map(t => t.trim()) }
                );
                setProblems(
                    problems.map(p => (p._id === editId ? res.data.problem : p))
                );
            } else {
                const res = await api.post(
                    "/problems", 
                    { title, difficulty, status, tags: tags.split(",").map(t => t.trim()) }
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
            await api.delete(`/problems/${id}`);
            setProblems(problems.filter(p => p._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete problem");
        }
    };

    const handleEdit = p => {
        setEditId(p._id);
        setTitle(p.title);
        setDifficulty(p.difficulty);
        setStatus(p.status);
        setTags(p.tags.join(", "));
    };

    if (loading) return <p className="text-gray-600">Loading problems...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Problems</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded"/>
                <div className="flex gap-4">
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="flex-1 p-2 border rounded">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="flex-1 p-2 border rounded">
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Solved</option>
                    </select>
                </div>
                <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-2 border rounded"/>
                <div className="flex gap-3">
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{editId ? "Update Problem" : "Add Problem"}</button>
                    {editId && (
                        <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    )}
                </div>
            </form>

            {problems.length === 0 ? (
                <p className="text-gray-500">No problems added yet.</p>
            ) : (
                <div className="grid gap-4">
                    {problems.map((p) => (
                        <div key={p._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-800">{p.title}</h3>
                                <p className="text-sm text-gray-500">
                                    Difficulty: {p.difficulty} | Status: {p.status}
                                </p>
                                {p.tags.length > 0 && (
                                    <p className="text-xs text-gray-400">
                                        Tags: {p.tags.join(", ")}
                                    </p>
                                )}
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                                <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Problems;
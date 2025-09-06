import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Dashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        setStats(res.data.stats);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p className="text-gray-600">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.username || "User"} 👋</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-gray-500 text-sm">Problems Solved</h2>
                    <p className="text-3xl font-bold text-indigo-600">
                        {stats.totalSolved}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-gray-500 text-sm">Daily Streak</h2>
                    <p className="text-3xl font-bold text-green-600">
                        {stats.dailyStreak} {stats.dailyStreak === 1 ? "day" : "days"} 🔥
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-gray-500 text-sm">Current Topic</h2>
                    <p className="text-lg font-semibold text-gray-800">
                        Heaps & Priority Queue
                    </p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-gray-700 font-semibold mb-4">Overall Progress</h2>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-indigo-600 h-4 rounded-full" style={{ width: `${stats.progressPercent}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    {stats.progressPercent}% Completed
                </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-gray-700 font-semibold mb-4">Recent Activity</h2>
                {stats.recentActivity.length === 0 ? (
                    <p className="text-sm text-gray-500">No recent activity</p>
                ) : (
                    <ul className="space-y-3">
                        {stats.recentActivity.map((activity, idx) => (
                            <li key={idx} className="flex justify-between text-sm border-b pb-2">
                                <span className="text-gray-600">
                                    {activity.status === "Solved"
                                        ? `Solved: ${activity.title}`
                                        : activity.status === "In Progress"
                                        ? `Working on: ${activity.title}`
                                        : `Not Started: ${activity.title}`}
                                </span>
                                <span className="text-gray-400 text-xs">
                                    {new Date(activity.updatedAt).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">Logout</button>
        </div>
  );
}

export default Dashboard;
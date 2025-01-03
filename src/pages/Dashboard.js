import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchAnalytics } from "../services/api";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState({
    totalAttendees: 0,
    capacityUtilization: 0,
  });

  useEffect(() => {
    fetchAnalytics(1, auth.token).then((res) => setAnalytics(res.data));
  }, );

  const data = {
    labels: ["Total Attendees", "Capacity Utilization"],
    datasets: [
      {
        label: "Event Analytics",
        data: [analytics.totalAttendees, analytics.capacityUtilization],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <Bar data={data} />
    </div>
  );
};

export default Dashboard;

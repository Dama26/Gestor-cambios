import React from 'react';
import Navbar from './Navbar';
import './Dashboard.css'

const Dashboard = () => {
    const token = localStorage.getItem("token");

    if(!token) {
        window.location.href = "/login"
    }
    
  const name = localStorage.getItem('name');

  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <aside className="sidebar">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
           
          </ul>
        </aside>
        <section className="content">
          <h1>Bienvenido {name}</h1>
          <p>Aqui puedes controlar y monitorear tu aplicación</p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

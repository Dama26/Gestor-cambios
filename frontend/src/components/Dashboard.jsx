import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Dashboard.css'

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
      const admin = localStorage.getItem("isAdmin");

      if(admin && admin === "true") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      
    }, []);
  

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
            {isAdmin ? <li><a href="/admin">Admin</a></li> : <div></div>}
           
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

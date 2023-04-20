import React from 'react'
import {Link}  from "react-router-dom";
import './home.css'

export default function Home(){
    return (
        <div className="container-home">
          <h1>Logo de l'application</h1>
          <Link to="/category"><button className="btn">Jouer</button></Link>
          <Link to="/signin"></Link><button className="btn">S'inscrire</button>
          <Link to="/signup"></Link><button className="btn">Se connecter</button>
        </div>
    )
}
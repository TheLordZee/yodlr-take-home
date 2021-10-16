import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
    <div className="container text-center">
        <h1 className="pt-3 mb-5">Welcome to Yoldr, where nothing works and no one knows why!</h1>
        <Link to="/register" className="btn btn-danger btn-lg mt-5">Register</Link>
    </div>
)

export default Home;
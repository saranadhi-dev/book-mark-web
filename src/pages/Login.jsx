import React, { useState } from "react";
import useAppStore from "../storage/storage";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const _login = useAppStore((state) => state.login);

    const submit = (e) => {
        e.preventDefault();

        if (username === "saran.mybookmark@gmail.com") {
            const data = {
                email: username
            }
            _login(data)
        }
        else {
            alert('You are not authorized contact mr.admin for this')
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <form className="card p-4" onSubmit={submit} style={{ minWidth: "400px" }}>
                <h4 className="mb-3">Login</h4>
                <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="btn btn-primary w-80" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
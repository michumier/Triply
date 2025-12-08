import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import { authService } from "../services/authService";

export const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = isLogin
                ? await authService.login({ email, password })
                : await authService.register({ email, password, fullName });

            login(data.token, { email: data.email, fullName: data.fullName });
            navigate("/welcome");
        } catch (error) {
            console.error("Auth error", error);
            setError(error instanceof Error ? error.message : "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-snow" style={{
            background: "linear-gradient(135deg, #2A6F97 0%, #1F5675 100%)"
        }}>
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                    {isLogin ? "Bienvenido de vuelta!" : "Bienvenido a Triply!"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-secondary w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-secondary w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-secondary w-5 h-5" />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            background: "linear-gradient(90deg, #2A6F97 0%, #1F5675 100%)"
                        }}
                    >
                        {loading ? "Cargando..." : (isLogin ? "Iniciar sesión" : "Registrarse")}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500">
                    {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-coral font-semibold hover:underline"
                    >
                        {isLogin ? "Registrarse" : "Iniciar sesión"}
                    </button>
                </p>
            </div>
        </div>
    );
};

import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <form method="post" className="p-2 border rounded-2xl text-2xl">
        <h1 className="text-center font-bold text-4xl my-4">Login</h1>
        <div className="flex flex-col mb-2">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            name="email"
            required
            className="border py-1 rounded w-100"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            name="password"
            required
            className="border py-1 rounded w-100"
          />
        </div>
        <button
          type="submit"
          className="border p-2 rounded bg-amber-800 w-full cursor-pointer mt-4"
        >
          Login
        </button>
        <div className="text-[1rem] text-center my-4">
          Create an account?{" "}
          <span className="text-blue-700 underline cursor-pointer">
            Register
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;

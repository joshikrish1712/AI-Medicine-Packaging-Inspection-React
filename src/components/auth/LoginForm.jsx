import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const LoginForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement actual login logic here
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 1000); // Redirect after 1 second
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-4 mx-auto">
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8zm6 8a6 6 0 10-12 0v2a2 2 0 002 2h8a2 2 0 002-2v-2z"
            />
          </svg>
        </div>

        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          value={formData.email}
          placeholder="Enter your email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            value={formData.password}
            placeholder="Enter your password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </motion.div>
  );
};

export default LoginForm;

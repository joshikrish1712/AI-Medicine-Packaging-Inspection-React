import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBMI(bmiValue.toFixed(1));
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { category: "Normal", color: "text-green-500" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500" };
    return { category: "Obese", color: "text-red-500" };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">BMI Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter your height in cm"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter your weight in kg"
            min="0"
          />
        </div>
        <Button onClick={calculateBMI} className="w-full">
          Calculate BMI
        </Button>
        {bmi && (
          <div className="mt-4 text-center">
            <p className="text-lg">
              Your BMI is: <span className="font-bold">{bmi}</span>
            </p>
            <p className={`text-lg ${getBMICategory(bmi).color}`}>
              Category: {getBMICategory(bmi).category}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BMICalculator;

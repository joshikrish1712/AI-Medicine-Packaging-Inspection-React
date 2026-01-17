
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Activity, Droplet, Save, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const HealthMetrics = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    bloodPressure: { systolic: "", diastolic: "" },
    bloodSugar: "",
    pulseRate: "",
    cholesterol: { hdl: "", ldl: "", total: "" }
  });

  const validateMetrics = () => {
    const errors = [];

    if (metrics.bloodPressure.systolic && (metrics.bloodPressure.systolic < 70 || metrics.bloodPressure.systolic > 190)) {
      errors.push("Systolic blood pressure should be between 70 and 190");
    }
    if (metrics.bloodPressure.diastolic && (metrics.bloodPressure.diastolic < 40 || metrics.bloodPressure.diastolic > 100)) {
      errors.push("Diastolic blood pressure should be between 40 and 100");
    }
    if (metrics.bloodSugar && (metrics.bloodSugar < 70 || metrics.bloodSugar > 400)) {
      errors.push("Blood sugar should be between 70 and 400 mg/dL");
    }
    if (metrics.pulseRate && (metrics.pulseRate < 40 || metrics.pulseRate > 200)) {
      errors.push("Pulse rate should be between 40 and 200 bpm");
    }

    return errors;
  };

  const getHealthStatus = () => {
    const status = {
      bloodPressure: "normal",
      bloodSugar: "normal",
      pulseRate: "normal",
      message: "",
    };

    const sys = parseInt(metrics.bloodPressure.systolic);
    const dia = parseInt(metrics.bloodPressure.diastolic);

    if (sys > 140 || dia > 90) {
      status.bloodPressure = "high";
      status.message = "Your blood pressure is high. Consider consulting a healthcare provider.";
    }

    const sugar = parseInt(metrics.bloodSugar);
    if (sugar > 140) {
      status.bloodSugar = "high";
      status.message += " Your blood sugar is elevated.";
    }

    const pulse = parseInt(metrics.pulseRate);
    if (pulse > 100) {
      status.pulseRate = "high";
      status.message += " Your pulse rate is high.";
    }

    return status;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateMetrics();
    if (errors.length > 0) {
      errors.forEach(error => {
        toast({
          title: "Validation Error",
          description: error,
          variant: "destructive",
        });
      });
      return;
    }

    setIsLoading(true);

    // Simulate saving to database
    setTimeout(() => {
      const status = getHealthStatus();
      
      setIsLoading(false);
      
      toast({
        title: "Metrics Saved Successfully",
        description: status.message || "Your health metrics have been recorded.",
        variant: status.message ? "destructive" : "default",
      });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Health Metrics</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-lg font-medium mb-2">
              <Activity className="h-5 w-5 text-primary" />
              Blood Pressure
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Systolic"
                  value={metrics.bloodPressure.systolic}
                  onChange={(e) => setMetrics({
                    ...metrics,
                    bloodPressure: { ...metrics.bloodPressure, systolic: e.target.value }
                  })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-sm text-gray-500 mt-1">mmHg (70-190)</p>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Diastolic"
                  value={metrics.bloodPressure.diastolic}
                  onChange={(e) => setMetrics({
                    ...metrics,
                    bloodPressure: { ...metrics.bloodPressure, diastolic: e.target.value }
                  })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-sm text-gray-500 mt-1">mmHg (40-100)</p>
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-lg font-medium mb-2">
              <Droplet className="h-5 w-5 text-primary" />
              Blood Sugar
            </label>
            <input
              type="number"
              value={metrics.bloodSugar}
              onChange={(e) => setMetrics({ ...metrics, bloodSugar: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50"
              placeholder="Enter blood sugar level"
            />
            <p className="text-sm text-gray-500 mt-1">mg/dL (70-400)</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-lg font-medium mb-2">
              <Heart className="h-5 w-5 text-primary" />
              Pulse Rate
            </label>
            <input
              type="number"
              value={metrics.pulseRate}
              onChange={(e) => setMetrics({ ...metrics, pulseRate: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50"
              placeholder="Enter pulse rate"
            />
            <p className="text-sm text-gray-500 mt-1">beats per minute (40-200)</p>
          </div>

          <div>
            <label className="text-lg font-medium mb-2">Cholesterol</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="number"
                  placeholder="HDL"
                  value={metrics.cholesterol.hdl}
                  onChange={(e) => setMetrics({
                    ...metrics,
                    cholesterol: { ...metrics.cholesterol, hdl: e.target.value }
                  })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-sm text-gray-500 mt-1">mg/dL</p>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="LDL"
                  value={metrics.cholesterol.ldl}
                  onChange={(e) => setMetrics({
                    ...metrics,
                    cholesterol: { ...metrics.cholesterol, ldl: e.target.value }
                  })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-sm text-gray-500 mt-1">mg/dL</p>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Total"
                  value={metrics.cholesterol.total}
                  onChange={(e) => setMetrics({
                    ...metrics,
                    cholesterol: { ...metrics.cholesterol, total: e.target.value }
                  })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-sm text-gray-500 mt-1">mg/dL</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-md">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <p className="text-blue-600 font-medium">Health Tips</p>
          </div>
          <ul className="list-disc list-inside text-blue-600 mt-2 text-sm">
            <li>Regular monitoring helps prevent health issues</li>
            <li>Consult your doctor for unusual readings</li>
            <li>Keep track of your metrics over time</li>
          </ul>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {isLoading ? "Saving..." : "Save Metrics"}
        </Button>
      </form>

      {Object.values(metrics).some(value => 
        typeof value === 'object' 
          ? Object.values(value).some(v => v !== "") 
          : value !== ""
      ) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
          <h3 className="font-medium mb-3">Current Readings</h3>
          <div className="space-y-2">
            {metrics.bloodPressure.systolic && metrics.bloodPressure.diastolic && (
              <div className="flex justify-between">
                <span>Blood Pressure:</span>
                <span className="font-medium">
                  {metrics.bloodPressure.systolic}/{metrics.bloodPressure.diastolic} mmHg
                </span>
              </div>
            )}
            {metrics.bloodSugar && (
              <div className="flex justify-between">
                <span>Blood Sugar:</span>
                <span className="font-medium">{metrics.bloodSugar} mg/dL</span>
              </div>
            )}
            {metrics.pulseRate && (
              <div className="flex justify-between">
                <span>Pulse Rate:</span>
                <span className="font-medium">{metrics.pulseRate} bpm</span>
              </div>
            )}
            {(metrics.cholesterol.hdl || metrics.cholesterol.ldl || metrics.cholesterol.total) && (
              <div className="flex justify-between">
                <span>Cholesterol:</span>
                <span className="font-medium">
                  HDL: {metrics.cholesterol.hdl || '-'} | 
                  LDL: {metrics.cholesterol.ldl || '-'} | 
                  Total: {metrics.cholesterol.total || '-'} mg/dL
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HealthMetrics;

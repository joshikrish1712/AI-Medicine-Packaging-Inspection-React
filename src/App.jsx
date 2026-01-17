
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import {
  Home,
  Pill,
  Search,
  Calendar,
  Activity,
  User,
  LogIn,
  FileText,
  List
} from "lucide-react";

// Import all components
import LoginForm from "@/components/auth/LoginForm";
import BMICalculator from "@/components/health/BMICalculator";
import PillReminder from "@/components/health/PillReminder";
import HealthMetrics from "@/components/health/HealthMetrics";
import DrugSearch from "@/components/medicine/DrugSearch";
import PillIdentifier from "@/components/medicine/PillIdentifier";
import DiseaseSearch from "@/components/medicine/DiseaseSearch";
import MedicineUploader from "@/components/MedicineUploader";
import ScanResults from "@/components/ScanResults";
import MedicineHistory from "@/components/MedicineHistory";

const App = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  
  const navigation = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Authentication", icon: LogIn, path: "/login" },
    { name: "Pill Identifier", icon: Pill, path: "/pill-identifier" },
    { name: "Drug Search", icon: Search, path: "/drug-search" },
    { name: "Disease Search", icon: FileText, path: "/disease-search" },
    { name: "Pill Reminder", icon: Calendar, path: "/pill-reminder" },
    { name: "Health Metrics", icon: Activity, path: "/health-metrics" },
    { name: "BMI Calculator", icon: User, path: "/bmi-calculator" },
    { name: "My Medicines", icon: List, path: "/my-medicines" },
  ];

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, GIF, or WebP)",
        variant: "destructive",
      });
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      processImage(file);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && validateFile(file)) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      analyzeMedicine();
    };
    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read the image file",
        variant: "destructive",
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setScanResult(null);
  };

  const analyzeMedicine = () => {
    toast({
      title: "Analyzing medicine",
      description: "Please wait while we process your image...",
    });

    // Simulate analysis delay
    setTimeout(() => {
      const result = {
        authentic: Math.random() > 0.5,
        confidence: Math.floor(Math.random() * 20 + 80),
        details: {
          manufacturer: "PharmaCorp Inc.",
          batchNumber: "BC" + Math.floor(Math.random() * 10000),
          expiryDate: "2025-12-31",
          serialNumber: "SN" + Math.floor(Math.random() * 100000)
        }
      };
      
      setScanResult(result);
      
      toast({
        title: result.authentic ? "Authentication Successful" : "Warning: Potential Counterfeit Detected",
        description: result.authentic 
          ? "The medicine appears to be genuine and from an authorized manufacturer."
          : "This medicine shows signs of being counterfeit. Please verify with your healthcare provider.",
        variant: result.authentic ? "default" : "destructive",
      });
    }, 2000);
  };

  const handleShare = () => {
    toast({
      title: "Share Results",
      description: "Sharing functionality will be available soon.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Report",
      description: "Report download feature will be available soon.",
    });
  };

  const handleReport = () => {
    toast({
      title: "Report Submitted",
      description: "Thank you for reporting this counterfeit medicine. Authorities have been notified.",
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="text-xl font-bold text-primary">MedGuard</span>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/pill-identifier" element={<PillIdentifier />} />
            <Route path="/drug-search" element={<DrugSearch />} />
            <Route path="/disease-search" element={<DiseaseSearch />} />
            <Route path="/pill-reminder" element={<PillReminder />} />
            <Route path="/health-metrics" element={<HealthMetrics />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
            <Route
              path="/"
              element={
                <div className="grid md:grid-cols-2 gap-8">
                  <MedicineUploader
                    selectedImage={selectedImage}
                    isDragging={isDragging}
                    handleDragEnter={handleDragEnter}
                    handleDragLeave={handleDragLeave}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    handleImageUpload={handleImageUpload}
                    removeImage={removeImage}
                    onCameraClick={() =>
                      toast({
                        title: "Camera feature coming soon",
                        description: "This feature will be available in the next update.",
                      })
                    }
                  />
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-4">Scan Results</h2>
                    <ScanResults
                      scanResult={scanResult}
                      onShare={handleShare}
                      onDownload={handleDownload}
                      onReport={handleReport}
                    />
                  </div>
                </div>
              }
            />
            <Route
              path="/my-medicines"
              element={
                <MedicineHistory
                  history={[
                    {
                      id: 1,
                      medicineName: "Paracetamol 500mg",
                      authentic: true,
                      scanDate: "2025-04-30 14:30",
                    },
                    {
                      id: 2,
                      medicineName: "Amoxicillin 250mg",
                      authentic: false,
                      scanDate: "2025-04-29 16:45",
                    },
                  ]}
                />
              }
            />
          </Routes>
        </main>
      </div>
      <Toaster />
    </Router>
  );
};

export default App;

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PillIdentifier = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState({
    color: "",
    shape: "",
    imprint: "",
  });
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSearch = () => {
    if (!searchParams.color && !searchParams.shape && !searchParams.imprint) {
      toast({
        title: "Missing Information",
        description: "Please provide at least one search criteria",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          name: "Medication A",
          description: "Round white tablet with imprint 'ABC123'",
          dosage: "500mg",
          manufacturer: "PharmaCorp",
        },
        {
          id: 2,
          name: "Medication B",
          description: "Oval blue tablet with imprint 'XYZ789'",
          dosage: "250mg",
          manufacturer: "MediLabs",
        },
      ];
      setResults(mockResults);
      setIsLoading(false);

      toast({
        title: "Search Complete",
        description: `Found ${mockResults.length} matching medications`,
      });
    }, 1500);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      // Simulate image analysis
      setTimeout(() => {
        setSearchParams({
          color: "White",
          shape: "Round",
          imprint: "ABC123",
        });
        setIsLoading(false);
        toast({
          title: "Image Analysis Complete",
          description: "Pill details have been extracted from the image",
        });
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Pill Identifier</h2>

      <div className="space-y-4 mb-6">
        {selectedImage && (
          <div className="mb-4">
            <img
              src={selectedImage}
              alt="Uploaded pill"
              className="w-full max-h-48 object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="text-sm text-red-500 mt-2"
            >
              Remove Image
            </button>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            type="text"
            value={searchParams.color}
            onChange={(e) =>
              setSearchParams({ ...searchParams, color: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50"
            placeholder="e.g., White, Blue, Yellow"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Shape</label>
          <select
            value={searchParams.shape}
            onChange={(e) =>
              setSearchParams({ ...searchParams, shape: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select Shape</option>
            <option value="Round">Round</option>
            <option value="Oval">Oval</option>
            <option value="Rectangle">Rectangle</option>
            <option value="Diamond">Diamond</option>
            <option value="Triangle">Triangle</option>
            <option value="Hexagon">Hexagon</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Imprint/Code</label>
          <input
            type="text"
            value={searchParams.imprint}
            onChange={(e) =>
              setSearchParams({ ...searchParams, imprint: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/50"
            placeholder="Enter any numbers or letters on the pill"
          />
        </div>

        <Button onClick={handleSearch} className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          {isLoading ? "Searching..." : "Identify Pill"}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500">- OR -</p>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              ref={fileInputRef}
            />
            <Button
              variant="outline"
              className="mt-2 w-full cursor-pointer"
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Pill Image
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium">{result.name}</h3>
            <p className="text-gray-600 mt-1">{result.description}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Dosage:</span> {result.dosage}
              </div>
              <div>
                <span className="font-medium">Manufacturer:</span>{" "}
                {result.manufacturer}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PillIdentifier;

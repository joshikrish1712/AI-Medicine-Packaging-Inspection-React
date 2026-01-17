import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Pill, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DrugSearch = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(null);

  const mockDrugDatabase = [
    {
      id: 1,
      name: "Aspirin",
      description: "Pain reliever and fever reducer",
      category: "NSAID",
      usedFor: ["Pain relief", "Fever reduction", "Anti-inflammatory"],
      sideEffects: ["Stomach upset", "Heartburn", "Nausea"],
      dosage: "325-650mg every 4-6 hours",
      warnings: ["Avoid if allergic to NSAIDs", "Consult doctor if pregnant"],
    },
    {
      id: 2,
      name: "Ibuprofen",
      description: "Anti-inflammatory medication",
      category: "NSAID",
      usedFor: ["Pain relief", "Inflammation", "Fever reduction"],
      sideEffects: ["Stomach pain", "Headache", "Dizziness"],
      dosage: "200-400mg every 4-6 hours",
      warnings: ["Do not exceed 1200mg per day", "Take with food"],
    },
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Search term required",
        description: "Please enter a medicine name to search",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSelectedDrug(null);

    // Local search first
    const localResults = mockDrugDatabase.filter((drug) =>
      drug.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (localResults.length > 0) {
      setSearchResults(localResults);
      setIsLoading(false);
      toast({
        title: "Search Complete",
        description: `Found ${localResults.length} matching medications (local)`,
      });
      return;
    }

    // If not found locally, search OpenFDA API
    try {
      const response = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${encodeURIComponent(
          searchTerm
        )}&limit=10`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setSearchResults([]);
        toast({
          title: "No results found",
          description: "Try searching with a different term",
          variant: "destructive",
        });
      } else {
        // Map API data to your UI format
        const results = data.results.map((item, idx) => ({
          id: `api-${idx}`,
          name: item.openfda?.brand_name
            ? item.openfda.brand_name[0]
            : "Unknown",
          description: item.description
            ? item.description[0]
            : "No description available.",
          category: item.openfda?.product_type
            ? item.openfda.product_type[0]
            : "Unknown",
          usedFor: item.indications_and_usage || ["No usage info."],
          sideEffects: item.adverse_reactions || ["No side effect info."],
          dosage: item.dosage_and_administration
            ? item.dosage_and_administration[0]
            : "No dosage info.",
          warnings: item.warnings || ["No warnings."],
        }));
        setSearchResults(results);
        toast({
          title: "Search Complete",
          description: `Found ${results.length} matching medications (API)`,
        });
      }
    } catch (error) {
      setSearchResults([]);
      toast({
        title: "API Error",
        description: "Could not fetch data from the API.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="flex items-center gap-2 mb-6">
        <Pill className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Drug Search</h2>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search for medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-primary/50"
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>

      <div className="space-y-4">
        {searchResults.map((drug) => (
          <motion.div
            key={drug.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedDrug?.id === drug.id
                ? "ring-2 ring-primary"
                : "hover:shadow-md"
            }`}
            onClick={() => setSelectedDrug(drug)}
          >
            <h3 className="text-lg font-medium">{drug.name}</h3>
            <p className="text-gray-600">{drug.description}</p>

            {selectedDrug?.id === drug.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 space-y-3"
              >
                <div>
                  <h4 className="font-medium">Category</h4>
                  <p className="text-gray-600">{drug.category}</p>
                </div>

                <div>
                  <h4 className="font-medium">Used For</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {Array.isArray(drug.usedFor) ? (
                      drug.usedFor.map((use, index) => (
                        <li key={index}>{use}</li>
                      ))
                    ) : (
                      <li>{drug.usedFor}</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">Side Effects</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {Array.isArray(drug.sideEffects) ? (
                      drug.sideEffects.map((effect, index) => (
                        <li key={index}>{effect}</li>
                      ))
                    ) : (
                      <li>{drug.sideEffects}</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">Dosage</h4>
                  <p className="text-gray-600">{drug.dosage}</p>
                </div>

                <div className="bg-yellow-50 p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium text-yellow-600">Warnings</h4>
                  </div>
                  <ul className="list-disc list-inside text-yellow-600 mt-1">
                    {Array.isArray(drug.warnings) ? (
                      drug.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))
                    ) : (
                      <li>{drug.warnings}</li>
                    )}
                  </ul>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DrugSearch;

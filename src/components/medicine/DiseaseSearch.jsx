import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Search,
  Info,
  Loader2,
  AlertCircle,
  ThermometerSun,
  Activity,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DiseaseSearch = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Search term required",
        description: "Please enter a disease name to search",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const wikiRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          searchTerm
        )}`
      );
      const wikiData = await wikiRes.json();
      if (wikiData.extract) {
        setResult({
          id: "wiki",
          name: wikiData.title,
          description: wikiData.extract,
          wikipediaUrl: wikiData.content_urls?.desktop?.page,
        });
        toast({
          title: "Found on Wikipedia",
          description: `Showing summary for "${wikiData.title}"`,
        });
      } else {
        setResult(null);
        toast({
          title: "No results found",
          description: "Try searching with different terms or symptoms",
          variant: "destructive",
        });
      }
    } catch (err) {
      setResult(null);
      toast({
        title: "No results found",
        description: "Try searching with different terms or symptoms",
        variant: "destructive",
      });
    }
    setIsLoading(false);
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
        <Info className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Disease Information</h2>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by disease name..."
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
        <p className="text-sm text-gray-500">
          Try searching for any disease name, e.g. "cancer", "malaria",
          "diabetes", etc.
        </p>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border rounded-lg transition-all"
        >
          <h3 className="text-lg font-medium mb-2">{result.name}</h3>
          <p className="text-gray-600 mb-2">{result.description}</p>
          {result.wikipediaUrl && (
            <a
              href={result.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Read more on Wikipedia
            </a>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DiseaseSearch;

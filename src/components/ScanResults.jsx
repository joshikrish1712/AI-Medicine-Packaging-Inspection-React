
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Share2, Download, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScanResults = ({ scanResult, onReport, onShare, onDownload }) => {
  if (!scanResult) {
    return (
      <div className="bg-white/50 rounded-lg p-6 text-center text-gray-500">
        No scan results available. Upload an image to begin analysis.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/50 rounded-lg p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {scanResult.authentic ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          ) : (
            <AlertCircle className="h-6 w-6 text-red-500" />
          )}
          <span className="text-lg font-medium">
            {scanResult.authentic ? "Authentic Medicine" : "Potential Counterfeit"}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">
            Confidence Score: {scanResult.confidence}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                scanResult.authentic ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: `${scanResult.confidence}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Manufacturer:</span>{" "}
              {scanResult.details.manufacturer}
            </p>
            <p className="text-sm">
              <span className="font-medium">Batch Number:</span>{" "}
              {scanResult.details.batchNumber}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Expiry Date:</span>{" "}
              {scanResult.details.expiryDate}
            </p>
            <p className="text-sm">
              <span className="font-medium">Serial Number:</span>{" "}
              {scanResult.details.serialNumber}
            </p>
          </div>
        </div>

        {!scanResult.authentic && (
          <div className="mt-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={onReport}
            >
              <Flag className="h-4 w-4 mr-2" />
              Report Counterfeit Medicine
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ScanResults;

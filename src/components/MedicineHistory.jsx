
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

const MedicineHistory = ({ history }) => {
  return (
    <div className="glass-morphism rounded-xl p-6 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-gray-600" />
        <h2 className="text-xl font-semibold">Recent Scans</h2>
      </div>
      <div className="space-y-4">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/50 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {item.authentic ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <div>
                <p className="font-medium">{item.medicineName}</p>
                <p className="text-sm text-gray-500">{item.scanDate}</p>
              </div>
            </div>
            <span className={`text-sm ${
              item.authentic ? 'text-green-600' : 'text-red-600'
            }`}>
              {item.authentic ? 'Authentic' : 'Counterfeit'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MedicineHistory;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell, Plus, Trash2 } from "lucide-react";

const PillReminder = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    medicine: "",
    time: "",
    frequency: "daily",
  });

  const addReminder = () => {
    if (newReminder.medicine && newReminder.time) {
      setReminders([...reminders, { ...newReminder, id: Date.now() }]);
      setNewReminder({ medicine: "", time: "", frequency: "daily" });
    }
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Pill Reminder</h2>
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Medicine name"
          value={newReminder.medicine}
          onChange={(e) => setNewReminder({ ...newReminder, medicine: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          value={newReminder.time}
          onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <select
          value={newReminder.frequency}
          onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <Button onClick={addReminder} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      <div className="space-y-2">
        {reminders.map((reminder) => (
          <motion.div
            key={reminder.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded"
          >
            <div>
              <p className="font-medium">{reminder.medicine}</p>
              <p className="text-sm text-gray-500">
                {reminder.time} - {reminder.frequency}
              </p>
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => deleteReminder(reminder.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PillReminder;

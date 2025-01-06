// src/components/SettingsPage.tsx
import React, { useState } from "react";
import { Moon, Bell, User } from "lucide-react";

const SettingPage: React.FC = () => {
  const [settings, setSettings] = useState([
    {
      label: "Dark Mode",
      description: "Enable dark mode for the app interface.",
      icon: <Moon className="h-6 w-6 text-blue-600" />,
      toggled: false,
    },
    {
      label: "Notifications",
      description: "Receive notifications for upcoming events.",
      icon: <Bell className="h-6 w-6 text-green-600" />,
      toggled: true,
    },
    {
      label: "Profile Visibility",
      description: "Allow others to view your profile information.",
      icon: <User className="h-6 w-6 text-yellow-600" />,
      toggled: true,
    },
  ]);

  const toggleSetting = (index: number) => {
    const updatedSettings = [...settings];
    updatedSettings[index].toggled = !updatedSettings[index].toggled;
    setSettings(updatedSettings);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          {settings.map((setting, index) => (
            <div key={setting.label} className="flex items-center justify-between rounded-lg bg-white p-6 shadow">
              <div className="flex items-center space-x-4">
                <div>{setting.icon}</div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{setting.label}</h2>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
              </div>
              <button
                className={`relative inline-flex h-6 w-12 items-center rounded-full ${
                  setting.toggled ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => toggleSetting(index)}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    setting.toggled ? "translate-x-6" : "translate-x-1"
                  }`}
                ></span>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SettingPage;

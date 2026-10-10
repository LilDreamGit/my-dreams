
import { useEffect, useState } from 'react';

interface SensorData {
  dht11_temp: number;
  dht11_humidity: number;
  dht22_temp: number;
  dht22_humidity: number;
}

export default function Grow() {
  const [sensors, setSensors] = useState<SensorData | null>(null);
  const [error, setError] = useState(false);

  const fetchSensors = async (): Promise<void> => {
    try {
      const response = await fetch('http://192.168.1.50');

      if (!response.ok) {
        throw new Error('Arduino response error');
      }

      const data: SensorData = await response.json();
      setSensors(data);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  useEffect(() => {
    void fetchSensors();

    const interval = setInterval(() => {
      void fetchSensors();
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        🌱 Grow Dashboard
      </h1>

      {error && (
        <div className="bg-red-900/40 border border-red-500 rounded-lg p-4 mb-6">
          ⚠️ Arduino disconnected or unreachable.
        </div>
      )}

      {!sensors && !error && (
        <div className="text-gray-400">
          Connecting to Arduino...
        </div>
      )}

      {sensors && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">
              🌡️ DHT11
            </h2>
            <p className="text-2xl">{sensors.dht11_temp} °C</p>
            <p className="text-gray-400 mt-2">
              Humidity: {sensors.dht11_humidity} %
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">
              🌡️ DHT22
            </h2>
            <p className="text-2xl">{sensors.dht22_temp} °C</p>
            <p className="text-gray-400 mt-2">
              Humidity: {sensors.dht22_humidity} %
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

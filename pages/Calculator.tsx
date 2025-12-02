import React, { useState } from 'react';
import { calculateSolarPotential } from '../services/geminiService';
import { SolarCalculationResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Loader2, IndianRupee, Sun, Leaf, Clock, AlertCircle } from 'lucide-react';

const Calculator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SolarCalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    bill: '',
    city: '',
    roofArea: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await calculateSolarPotential(
        Number(formData.bill),
        formData.city,
        Number(formData.roofArea)
      );
      setResult(data);
    } catch (err) {
      setError("Failed to generate estimate. Please check your internet connection or API key.");
    } finally {
      setLoading(false);
    }
  };

  const renderResultCard = (title: string, value: string | number, icon: any, colorClass: string, subtext?: string) => (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start space-x-4">
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
        {React.createElement(icon, { className: `w-6 h-6 ${colorClass.replace('bg-', 'text-')}` })}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h4 className="text-2xl font-bold text-slate-900 mt-1">{value}</h4>
        {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Form */}
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Solar Potential Estimator</h1>
            <p className="text-slate-600">
              Get a personalized solar report tailored to your specific location in India. 
              We use AI to account for local irradiance data and current subsidy schemes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-solar-100 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Average Monthly Bill (₹)</label>
              <input
                type="number"
                name="bill"
                required
                min="100"
                value={formData.bill}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-solar-500 focus:border-solar-500 transition-colors bg-white text-slate-900 placeholder-slate-400"
                placeholder="e.g. 3000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">City / Location</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-solar-500 focus:border-solar-500 transition-colors bg-white text-slate-900 placeholder-slate-400"
                placeholder="e.g. Jaipur, Rajasthan"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Available Roof Area (sq. ft)</label>
              <input
                type="number"
                name="roofArea"
                required
                min="50"
                value={formData.roofArea}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-solar-500 focus:border-solar-500 transition-colors bg-white text-slate-900 placeholder-slate-400"
                placeholder="e.g. 500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-solar-600 hover:bg-solar-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Analyzing Roof Data...
                </>
              ) : (
                'Calculate Savings'
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
                <AlertCircle size={20} className="mr-2" />
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Results Section */}
        <div className="flex flex-col justify-center">
          {!result && !loading && (
            <div className="text-center text-slate-400 p-12 border-2 border-dashed border-slate-200 rounded-2xl">
              <Sun size={64} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg">Enter your details to generate your solar report.</p>
            </div>
          )}

          {loading && (
            <div className="space-y-4 animate-pulse">
              <div className="h-32 bg-slate-200 rounded-xl"></div>
              <div className="h-32 bg-slate-200 rounded-xl"></div>
              <div className="h-64 bg-slate-200 rounded-xl"></div>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
              <div className="bg-solar-50 border border-solar-200 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-solar-900 mb-2">AI Recommendation</h3>
                <p className="text-solar-800">{result.recommendation}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {renderResultCard("System Size", `${result.estimatedSystemSizeKw} kW`, Sun, "text-yellow-600", "Recommended")}
                {renderResultCard("Monthly Savings", `₹${result.monthlySavingsINR.toLocaleString()}`, IndianRupee, "text-green-600", "Estimated Bill Reduction")}
                {renderResultCard("Net Cost (After Subsidy)", `₹${(result.estimatedCostINR - result.subsidyAmountINR).toLocaleString()}`, IndianRupee, "text-blue-600", `Subsidy: ₹${result.subsidyAmountINR.toLocaleString()}`)}
                {renderResultCard("Payback Period", `${result.paybackPeriodYears} Years`, Clock, "text-purple-600", "Break-even time")}
              </div>

              {/* Chart */}
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-80">
                <h3 className="font-bold text-slate-700 mb-4 flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-green-500" /> 
                  Environmental Impact (Tons CO2)
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Year 1', val: result.co2OffsetTonsPerYear },
                    { name: 'Year 5', val: result.co2OffsetTonsPerYear * 5 },
                    { name: 'Year 10', val: result.co2OffsetTonsPerYear * 10 },
                    { name: 'Year 25', val: result.co2OffsetTonsPerYear * 25 },
                  ]}>
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                    <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                      {
                        [0, 1, 2, 3].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 3 ? '#16a34a' : '#86efac'} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
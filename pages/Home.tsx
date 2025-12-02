import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Zap, TrendingUp, IndianRupee } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-solar-100 rounded-xl flex items-center justify-center text-solar-600 mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-solar-200 via-slate-50 to-slate-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-solar-50 border border-solar-200 rounded-full px-4 py-1 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-solar-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-solar-800 uppercase tracking-wide">PM Surya Ghar Compatible</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Power Your Home with <span className="text-solar-600">India's Sun</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10">
              Navigate the complexities of solar adoption in India. 
              Calculate true savings, understand subsidies, and tackle local challenges like heat and dust.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/calculator" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-solar-600 rounded-xl shadow-lg hover:bg-solar-700 hover:shadow-xl transition-all transform hover:-translate-y-1">
                <Calculator className="mr-2" size={20} />
                Calculate Savings
              </Link>
              <Link to="/assistant" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-solar-300 hover:bg-solar-50 transition-all">
                Talk to Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={IndianRupee}
              title="Accurate Subsidy Estimates"
              description="Real-time calculations based on the latest Central and State government schemes available in your city."
            />
            <FeatureCard 
              icon={TrendingUp}
              title="India-Specific ROI"
              description="We account for local irradiance, panel efficiency loss due to heat, and cleaning costs in our financial models."
            />
            <FeatureCard 
              icon={Zap}
              title="Grid & Storage Solutions"
              description="Living in an area with power cuts? Get advice on hybrid systems and battery sizing tailored to your load."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-solar-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Solar in India Now?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-4">
              <div className="text-4xl font-bold text-solar-400 mb-2">300</div>
              <div className="text-sm text-solar-100">Average Sunny Days</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-solar-400 mb-2">40%</div>
              <div className="text-sm text-solar-100">Lower Panel Costs (YoY)</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-solar-400 mb-2">₹78k</div>
              <div className="text-sm text-solar-100">Max Govt Subsidy</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-solar-400 mb-2">3-4yr</div>
              <div className="text-sm text-solar-100">Average ROI Period</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

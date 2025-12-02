import React from 'react';
import { Wind, ThermometerSun, Zap, Umbrella, CloudRain, AlertTriangle } from 'lucide-react';

const ChallengeSection = ({ icon: Icon, title, problem, solution, color }: { icon: any, title: string, problem: string, solution: string, color: string }) => (
  <div className={`relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-slate-100 group hover:shadow-lg transition-all duration-300`}>
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-100 rounded-bl-full opacity-50 transition-transform group-hover:scale-110`}></div>
    <div className="relative z-10">
      <div className={`w-14 h-14 rounded-xl bg-${color}-50 text-${color}-600 flex items-center justify-center mb-6`}>
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
      <div className="space-y-4">
        <div>
          <h4 className="flex items-center text-sm font-semibold text-red-500 uppercase tracking-wider mb-1">
            <AlertTriangle size={14} className="mr-1" /> The Challenge
          </h4>
          <p className="text-slate-600 leading-relaxed">{problem}</p>
        </div>
        <div className="pt-4 border-t border-slate-100">
          <h4 className="flex items-center text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">
            <Zap size={14} className="mr-1" /> The Solution
          </h4>
          <p className="text-slate-700 font-medium">{solution}</p>
        </div>
      </div>
    </div>
  </div>
);

const Challenges: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">India's Unique Solar Landscape</h1>
        <p className="text-xl text-slate-600">
          Adopting solar in India comes with specific environmental and infrastructural hurdles. 
          Here is how to overcome them.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <ChallengeSection 
          icon={Wind}
          title="Dust & Air Pollution"
          problem="In cities like Delhi or Jaipur, dust accumulation (soiling) can reduce panel output by 15-30% within a month, significantly extending the payback period."
          solution="Install automated sprinkler systems or subscribe to monthly professional cleaning services. Opt for frameless panels to help water runoff carry dust away."
          color="orange"
        />
        
        <ChallengeSection 
          icon={ThermometerSun}
          title="Extreme Heat Impact"
          problem="Solar panels actually lose efficiency as they get hotter. In Indian summers (45°C+), efficiency can drop by 10-15% compared to standard test conditions."
          solution="Ensure 'Module Mounting Structures' (MMS) have at least 10-15cm gap from the roof for airflow. Choose 'Bifacial' panels or those with a lower 'Temperature Coefficient'."
          color="red"
        />
        
        <ChallengeSection 
          icon={CloudRain}
          title="Monsoon Generation Dip"
          problem="During July-September, heavy cloud cover and rain reduce generation drastically. Grid dependence increases just when you expect savings."
          solution="Plan your system sizing based on annual averages, not just peak summer. Use Net Metering banking facilities to store excess credits from summer to use in monsoon."
          color="blue"
        />
        
        <ChallengeSection 
          icon={Umbrella}
          title="Grid Instability"
          problem="Standard On-Grid inverters shut down during power cuts for safety. In areas with frequent load shedding, your solar plant sits idle during outages."
          solution="Invest in a Hybrid Inverter with a Lithium-Iron-Phosphate (LFP) battery backup. This allows you to use solar energy even when the grid is down."
          color="purple"
        />
      </div>
    </div>
  );
};

export default Challenges;

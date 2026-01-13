import React, { useMemo, useState } from 'react';

interface ConversionCalculatorProps {
  theme?: 'blue' | 'green';
}

export const ConversionCalculator: React.FC<ConversionCalculatorProps> = ({ theme = 'blue' }) => {
  const [monthlyTraffic, setMonthlyTraffic] = useState<string>('50000');
  const [currentCR, setCurrentCR] = useState<string>('2.0');
  const [aov, setAov] = useState<string>('80');

  const { lostRevenue, lostOrders } = useMemo(() => {
    const traffic = Math.max(Number(monthlyTraffic) || 0, 0);
    const cr = Math.max(Number(currentCR) || 0, 0) / 100;
    const averageOrderValue = Math.max(Number(aov) || 0, 0);
    // Heuristic: assume with RetailOS, CR lifts to max(cr + 0.8%, cr*1.2), illustrative only
    const improvedCr = Math.max(cr + 0.008, cr * 1.2);
    const baseOrders = traffic * cr;
    const improvedOrders = traffic * improvedCr;
    const deltaOrders = Math.max(improvedOrders - baseOrders, 0);
    const deltaRevenue = deltaOrders * averageOrderValue;
    return { lostRevenue: Math.round(deltaRevenue), lostOrders: Math.round(deltaOrders) };
  }, [monthlyTraffic, currentCR, aov]);

  const accent = theme === 'green' ? 'text-green-600' : 'text-blue-600';
  const accentBg = theme === 'green' ? 'bg-green-600' : 'bg-blue-600';

  return (
    <div className="w-full max-w-full">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Conversion Loss Calculator</h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Estimate what stalled conversion is costing you each month.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Monthly traffic</label>
            <input value={monthlyTraffic} onChange={(e) => setMonthlyTraffic(e.target.value)} type="number" min="0" className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="50000" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Current CR %</label>
            <input value={currentCR} onChange={(e) => setCurrentCR(e.target.value)} type="number" step="0.1" min="0" className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="2.0" />
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">Average order value ($)</label>
            <input value={aov} onChange={(e) => setAov(e.target.value)} type="number" step="1" min="0" className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="80" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start md:items-center">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-xs text-gray-600 mb-1">Estimated lost revenue / month</div>
            <div className={`text-2xl sm:text-3xl font-extrabold ${accent}`}>${lostRevenue.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">≈ {lostOrders.toLocaleString()} orders</div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a href="#book" className={`inline-flex items-center justify-center px-5 py-3 ${accentBg} text-white rounded-lg font-semibold shadow hover:opacity-95 transition text-sm sm:text-base`}>Get a free audit</a>
            <span className="text-xs text-gray-500 text-center sm:text-left">We'll validate this on your store</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionCalculator;






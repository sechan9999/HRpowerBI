import React, { useState, useRef } from 'react';
import { FileText, Download, Printer, Calendar } from 'lucide-react';
import { MOCK_DATA, DEPARTMENTS } from '../data/mockData';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Reports() {
    const [reportType, setReportType] = useState('Executive Summary');
    const [timeframe, setTimeframe] = useState('Last 30 Days');
    const reportRef = useRef(null);

    // Stats
    const activeCount = MOCK_DATA.filter(e => e.status === 'Active').length;
    const termCount = MOCK_DATA.filter(e => e.status === 'Terminated').length;
    const newHires = MOCK_DATA.filter(e => e.startDate > '2023-01-01').length; // Mock simplified logic

    const handlePrint = () => {
        window.print();
    };

    const handleExportPDF = async () => {
        const element = reportRef.current;
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                logging: false
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Handle multi-page content
            if (pdfHeight > pageHeight) {
                let position = 0;
                let remainingHeight = pdfHeight;

                while (remainingHeight > 0) {
                    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                    remainingHeight -= pageHeight;
                    if (remainingHeight > 0) {
                        pdf.addPage();
                        position -= pageHeight;
                    }
                }
            } else {
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            }

            pdf.save(`${reportType.replace(/\s+/g, '_')}_Report.pdf`);
        } catch (err) {
            console.error("PDF Export failed", err);
            alert("Failed to export PDF. Please try printing to PDF instead.");
        }
    };

    const renderContent = () => {
        if (reportType === 'Executive Summary') {
            return (
                <>
                    <section>
                        <h2 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-blue-500 pl-3">Executive Overview</h2>
                        <p className="text-slate-600 leading-relaxed">
                            This report provides a comprehensive analysis of the current workforce dynamics for the <span className="font-bold text-slate-900">{timeframe.toLowerCase()}</span>.
                            As of today, the organization maintains a total headcount of <span className="font-bold text-slate-900">{activeCount}</span> active employees.
                            Over the selected period, we have observed stable retention rates, with <span className="font-bold text-slate-900">{newHires}</span> new joiners onboarding successfully.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-blue-500 pl-3">Key Performance Indicators</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div className="text-slate-500 text-sm mb-1">Active Headcount</div>
                                <div className="text-2xl font-bold text-blue-600">{activeCount}</div>
                                <div className="text-green-600 text-xs font-medium mt-1">↑ 2.4% vs last month</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div className="text-slate-500 text-sm mb-1">Total Terminations</div>
                                <div className="text-2xl font-bold text-slate-700">{termCount}</div>
                                <div className="text-red-500 text-xs font-medium mt-1">↑ 1.2% vs last month</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div className="text-slate-500 text-sm mb-1">New Hires (YTD)</div>
                                <div className="text-2xl font-bold text-slate-700">{newHires}</div>
                                <div className="text-slate-400 text-xs font-medium mt-1">Stable pipeline</div>
                            </div>
                        </div>
                    </section>
                </>
            );
        } else if (reportType === 'Full Report') {
            return (
                <>
                    <section>
                        <h2 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-blue-500 pl-3">Executive Overview</h2>
                        <p className="text-slate-600 leading-relaxed">
                            This comprehensive report provides a full analysis of the current workforce dynamics for the <span className="font-bold text-slate-900">{timeframe.toLowerCase()}</span>.
                            As of today, the organization maintains a total headcount of <span className="font-bold text-slate-900">{activeCount}</span> active employees.
                            Over the selected period, we have observed stable retention rates, with <span className="font-bold text-slate-900">{newHires}</span> new joiners onboarding successfully.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-blue-500 pl-3">Key Performance Indicators</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div className="text-slate-500 text-sm mb-1">Active Headcount</div>
                                <div className="text-2xl font-bold text-blue-600">{activeCount}</div>
                                <div className="text-green-600 text-xs font-medium mt-1">↑ 2.4% vs last month</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div className="text-slate-500 text-sm mb-1">Total Terminations</div>
                                <div className="text-2xl font-bold text-slate-700">{termCount}</div>
                                <div className="text-red-500 text-xs font-medium mt-1">↑ 1.2% vs last month</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div className="text-slate-500 text-sm mb-1">New Hires (YTD)</div>
                                <div className="text-2xl font-bold text-slate-700">{newHires}</div>
                                <div className="text-slate-400 text-xs font-medium mt-1">Stable pipeline</div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-blue-500 pl-3">Headcount Breakdown by Department</h2>
                        <table className="w-full text-left text-sm mt-4">
                            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-3">Department</th>
                                    <th className="p-3">Count</th>
                                    <th className="p-3">% of Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {DEPARTMENTS.map(dept => {
                                    const count = MOCK_DATA.filter(e => e.department === dept && e.status === 'Active').length;
                                    return (
                                        <tr key={dept} className="hover:bg-slate-50">
                                            <td className="p-3 font-medium text-slate-700">{dept}</td>
                                            <td className="p-3">{count}</td>
                                            <td className="p-3">{((count / activeCount) * 100).toFixed(1)}%</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-blue-500 pl-3">Workforce Trends</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Over the {timeframe.toLowerCase()}, the organization has maintained a healthy balance between hiring and attrition.
                            The retention rate remains strong at approximately {((activeCount / (activeCount + termCount)) * 100).toFixed(1)}%.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                <div className="text-green-700 text-sm mb-1">Retention Rate</div>
                                <div className="text-2xl font-bold text-green-600">{((activeCount / (activeCount + termCount)) * 100).toFixed(1)}%</div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <div className="text-blue-700 text-sm mb-1">New Hire Rate</div>
                                <div className="text-2xl font-bold text-blue-600">{((newHires / activeCount) * 100).toFixed(1)}%</div>
                            </div>
                        </div>
                    </section>
                </>
            );
        } else if (reportType === 'Headcount Analysis') {
            return (
                <section>
                    <h2 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-blue-500 pl-3">Headcount Breakdown</h2>
                    <table className="w-full text-left text-sm mt-4">
                        <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                            <tr>
                                <th className="p-3">Department</th>
                                <th className="p-3">Count</th>
                                <th className="p-3">% of Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {DEPARTMENTS.map(dept => {
                                const count = MOCK_DATA.filter(e => e.department === dept && e.status === 'Active').length;
                                return (
                                    <tr key={dept} className="hover:bg-slate-50">
                                        <td className="p-3 font-medium text-slate-700">{dept}</td>
                                        <td className="p-3">{count}</td>
                                        <td className="p-3">{((count / activeCount) * 100).toFixed(1)}%</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            );
        }
        return (
            <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                <h3 className="text-lg font-medium text-slate-600">Pending Data Connection</h3>
                <p>The detailed data for {reportType} is currently being aggregated.</p>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">

            {/* Toolbar */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
                        <FileText className="text-blue-500" size={18} />
                        <select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            className="bg-transparent text-white outline-none text-sm font-medium focus:ring-0 border-none cursor-pointer"
                        >
                            <option value="Executive Summary">Executive Summary</option>
                            <option value="Full Report">Full Report</option>
                            <option value="Headcount Analysis">Headcount Analysis</option>
                            <option value="Turnover Report">Turnover Report</option>
                            <option value="Diversity Audit">Diversity Audit</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
                        <Calendar className="text-slate-400" size={18} />
                        <select
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="bg-transparent text-white outline-none text-sm font-medium focus:ring-0 border-none cursor-pointer"
                        >
                            <option value="Last 30 Days">Last 30 Days</option>
                            <option value="Last 3 Months">Last 3 Months</option>
                            <option value="Last 1 Year">Last 1 Year</option>
                        </select>
                    </div>
                </div>

                <div className="flex space-x-3">
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer">
                        <Printer size={16} />
                        <span>Print</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleExportPDF}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer">
                        <Download size={16} />
                        <span>Export PDF</span>
                    </button>
                </div>
            </div>

            {/* Report Preview / Content */}
            <div ref={reportRef} className="flex-1 bg-white text-slate-900 rounded-xl shadow-2xl overflow-y-auto max-w-4xl mx-auto w-full p-12 print:p-0 print:shadow-none print:w-full print:max-w-none print:rounded-none">
                {/* Report Header */}
                <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">HR</div>
                            <span className="text-xl font-bold text-slate-800">Insight</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">{reportType}</h1>
                        <p className="text-slate-500">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-slate-900">CONFIDENTIAL</div>
                        <div className="text-xs text-slate-400">Internal Use Only</div>
                    </div>
                </div>

                {/* Dynamic Report Content */}
                <div className="space-y-8">
                    {renderContent()}

                    <div className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
                        <p>© {new Date().getFullYear()} HR Insight System. All Rights Reserved.</p>
                        <p>Generated by AdminOps AI</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

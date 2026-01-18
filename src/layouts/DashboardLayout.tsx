import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import HeaderMobile from '../components/layout/HeaderMobile';
import { useFinance } from '../contexts/FinanceContext';

export default function DashboardLayout() {
    const { loading } = useFinance();

    return (
        <div className="flex min-h-screen bg-background">
            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Sidebar - Desktop (≥1280px) */}
            <Sidebar />

            <main className="flex-1 flex flex-col transition-all duration-300">
                {/* Header Mobile (<1280px) */}
                <HeaderMobile />

                {/* Header Desktop (≥1280px) */}
                <div className="hidden lg:block">
                    <Header />
                </div>

                {/* Page Content */}
                <div className="px-4 md:px-6 lg:px-8 py-8 flex flex-col gap-10 max-w-dashboard xl:max-w-wide mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

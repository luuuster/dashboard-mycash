import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { HeaderMobile } from './HeaderMobile';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [activeSection, setActiveSection] = useState('dashboard');

    return (
        <div className="flex min-h-screen bg-[#F8F9FA] text-black selection:bg-primary-val selection:text-black overflow-x-hidden">
            {/* Sidebar - Desktop Only (≥1280px) */}
            <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />

            <div className="flex-1 flex flex-col min-w-0 w-full relative">
                {/* Header - Mobile Only (<1280px) */}
                <HeaderMobile
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                />

                {/* Main Content Area */}
                <main className="flex-1 w-full flex flex-col p-4 lg:p-12 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

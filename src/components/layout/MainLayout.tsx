import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { HeaderMobile } from './HeaderMobile';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [activeSection, setActiveSection] = useState('dashboard');

    return (
        <div className="flex min-h-screen bg-background text-white selection:bg-primary selection:text-black overflow-x-hidden">
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
                <main className="flex-1 w-full flex flex-col">
                    <div className="main-container py-6 lg:py-8 flex-1 flex flex-col">
                        <div className="content-limit w-full flex-1 flex flex-col">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

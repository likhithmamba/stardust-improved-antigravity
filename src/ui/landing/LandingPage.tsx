import React from 'react';
import {
    HeroSection,
    FeatureDeepDive,
    ComparisonSection,
    RoadmapSection,
    LandingFooter
} from './';


interface LandingPageProps {
    onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
    return (
        <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-black text-white custom-scrollbar relative">

            {/* Smooth Scroll Container */}
            <main className="relative z-10">
                <HeroSection onEnterApp={() => {
                    // Optional: Smooth scroll to footer if clicked in Hero (though we removed the button there, keep logic clean)
                    const footer = document.querySelector('footer');
                    footer?.scrollIntoView({ behavior: 'smooth' });
                }} />
                <FeatureDeepDive />
                <ComparisonSection />
                <RoadmapSection />
                <LandingFooter onEnterApp={onEnterApp} />
            </main>

        </div>
    );
};

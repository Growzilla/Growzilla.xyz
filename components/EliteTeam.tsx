import React, { useEffect, useState, useRef } from 'react';

const teamMembers = [
  {
    name: 'Albert Elmgart',
    role: 'Founder & CEO',
    bio: 'Former ecommerce operator who scaled multiple 7-figure brands. Discovered the transformative power of AI systems and built Growzilla to democratize access for fellow builders. Obsessed with leverage and efficiency.',
    image: '/team/albert.jpg',
    linkedin: 'https://linkedin.com/in/albertelmgart',
  },
  {
    name: 'Sarah Chen',
    role: 'Head of AI Systems',
    bio: 'Machine learning engineer with 10+ years building AI products at scale. Previously led AI initiatives at major ecommerce platforms. Designs the systems that power member transformations.',
    image: '/team/sarah.jpg',
    linkedin: 'https://linkedin.com/in/',
  },
  {
    name: 'Marcus Williams',
    role: 'Community Director',
    bio: 'Built and scaled multiple ecommerce communities. Expert in creating environments where operators share knowledge freely and hold each other accountable. The connective tissue of Growzilla.',
    image: '/team/marcus.jpg',
    linkedin: 'https://linkedin.com/in/',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Head of Strategy',
    bio: 'Former McKinsey consultant specializing in digital transformation. Helps members identify highest-leverage opportunities and design implementation roadmaps for AI adoption.',
    image: '/team/elena.jpg',
    linkedin: 'https://linkedin.com/in/',
  },
];

const EliteTeam: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full bg-zilla-neon/3 blur-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-zilla-neon/10 border border-zilla-neon/20 text-zilla-neon text-sm font-medium mb-6">
            Leadership
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            The Team Behind Growzilla
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Operators, engineers, and strategists united by a single mission: democratizing AI leverage
            for ambitious ecommerce builders.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="relative p-6 rounded-2xl bg-zilla-surface/50 border border-gray-800/50 hover:border-zilla-neon/20 transition-all duration-300 h-full">
                {/* Photo placeholder */}
                <div className="relative w-full aspect-square rounded-xl bg-zilla-charcoal mb-6 overflow-hidden">
                  {/* Placeholder gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zilla-charcoal to-zilla-graphite" />
                  {/* Initials */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-4xl text-zilla-neon/30">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-zilla-neon/0 group-hover:bg-zilla-neon/5 transition-colors duration-300" />
                </div>

                {/* Info */}
                <h3 className="text-lg font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-zilla-neon mb-4">{member.role}</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* LinkedIn */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-zilla-neon transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div
          className={`mt-20 grid md:grid-cols-3 gap-6 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { title: 'Operators First', description: 'We built what we wished existed when we were in the trenches.' },
            { title: 'No Gatekeeping', description: 'Breakthroughs are shared immediately. Your win is our win.' },
            { title: 'Results or Nothing', description: 'We measure success by member transformations, not vanity metrics.' },
          ].map((value) => (
            <div
              key={value.title}
              className="text-center p-6"
            >
              <h4 className="font-semibold text-white mb-2">{value.title}</h4>
              <p className="text-sm text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EliteTeam;

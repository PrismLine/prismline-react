import { useNetflixIntro } from '../hooks/useNetflixIntro';

export default function NetflixIntro() {
  useNetflixIntro();

  return (
    <div id="netflix-intro-overlay" role="dialog" aria-label="PrismLine Cinematic Intro">
      <div className="intro-brand-container">
        <div className="intro-back-glow"></div>
        <svg className="intro-svg-emblem" viewBox="0 0 500 360" fill="none">
          <defs>
            <linearGradient id="introGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF5722"/>
              <stop offset="45%" stopColor="#D50000"/>
              <stop offset="100%" stopColor="#6A000A"/>
            </linearGradient>
            <linearGradient id="introGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6D00"/>
              <stop offset="50%" stopColor="#E51829"/>
              <stop offset="100%" stopColor="#7B020B"/>
            </linearGradient>
            <linearGradient id="introCenter" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FF3D00"/>
              <stop offset="100%" stopColor="#800000"/>
            </linearGradient>
            <filter id="introGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <polygon className="intro-facet" points="215,115 285,115 250,150" fill="url(#introCenter)" filter="url(#introGlow)" />
          <path className="intro-wing-fill" d="M 70,45 C 135,65 195,120 250,230 C 210,155 160,115 105,95 C 90,85 78,65 70,45 Z" fill="url(#introGrad1)" />
          <path className="intro-wing-fill" d="M 430,45 C 365,65 305,120 250,230 C 290,155 340,115 395,95 C 410,85 422,65 430,45 Z" fill="url(#introGrad2)" />
          <path className="intro-wing-fill" d="M 125,125 C 175,155 220,195 250,250 C 280,195 325,155 375,125 C 315,185 270,235 250,285 C 230,235 185,185 125,125 Z" fill="url(#introGrad1)" />
          <path className="intro-wing-fill" d="M 115,135 C 135,160 160,185 190,205 C 155,185 130,165 115,135 Z" fill="url(#introGrad1)" />
          <path className="intro-wing-fill" d="M 385,135 C 365,160 340,185 310,205 C 345,185 370,165 385,135 Z" fill="url(#introGrad2)" />
        </svg>
        <div className="intro-title">PRIS<span className="intro-m">M</span>LINE</div>
      </div>
    </div>
  );
}

import React, { useRef, useEffect, useState } from 'react';

interface BackgroundVideoProps {
  src: string;
  showOverlay?: boolean;
  opacity?: number;
  zIndex?: string;
}

export default function BackgroundVideo({ 
  src,
  showOverlay = true,
  opacity = 0.7,
  zIndex = "z-0"
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-resolve video assets dynamically based on requested page source
  const lowercaseSrc = src.toLowerCase();
  
  // Extract query parameters if any (e.g., ?cb=...) to preserve cache busting
  const queryIndex = src.indexOf('?');
  const queryStr = queryIndex !== -1 ? src.substring(queryIndex) : '';

  let initialResolvedSrc = src;
  
  if (lowercaseSrc.includes('why.mp4') || lowercaseSrc.includes('whyus') || lowercaseSrc.includes('why')) {
    initialResolvedSrc = '/assets/why.mp4';
  } else if (lowercaseSrc.includes('engagement') || lowercaseSrc.includes('engagementmodel')) {
    initialResolvedSrc = '/assets/engagement.mp4';
  } else if (lowercaseSrc.includes('industries')) {
    initialResolvedSrc = '/assets/industries.mp4';
  } else if (lowercaseSrc.includes('contact') || lowercaseSrc.includes('contactus') || lowercaseSrc.includes('contac')) {
    initialResolvedSrc = '/assets/contact.mp4';
  } else if (lowercaseSrc.includes('home')) {
    initialResolvedSrc = '/assets/home.mp4';
  } else if (lowercaseSrc.includes('about')) {
    initialResolvedSrc = '/assets/about.mp4';
  } else if (lowercaseSrc.includes('services') || lowercaseSrc.includes('download') || lowercaseSrc.includes('downoad')) {
    initialResolvedSrc = '/assets/download.mp4';
  }

  // Preserve cache buster query string if present
  if (queryStr && !initialResolvedSrc.includes('?')) {
    initialResolvedSrc += queryStr;
  }

  // State to track current active source (starts as resolvedSrc, can fall back if load fails)
  const [currentSrc, setCurrentSrc] = useState(initialResolvedSrc);

  // Keep a set of tried fallbacks to prevent infinite loops
  const [attemptedFallbacks, setAttemptedFallbacks] = useState<string[]>([]);

  // Sync state if initialResolvedSrc changes
  useEffect(() => {
    setCurrentSrc(initialResolvedSrc);
    setAttemptedFallbacks([]);
  }, [initialResolvedSrc]);

  // Dynamic list of known-good fallback files in the system with valid contents
  const fallbackVideos = [
    '/assets/why.mp4',
    '/assets/industries.mp4',
    '/assets/engagement.mp4'
  ];

  const handleVideoError = () => {
    console.warn(`[Video Error] Failed to stream file: "${currentSrc}". File may be empty (0 bytes) or corrupted.`);
    
    // Find a fallback that has not been tried yet
    const nextFallback = fallbackVideos.find(f => {
      const formatted = f + (queryStr && !f.includes('?') ? queryStr : '');
      return !attemptedFallbacks.includes(formatted) && formatted !== currentSrc && formatted !== initialResolvedSrc;
    });

    if (nextFallback) {
      const nextFallbackWithQuery = nextFallback + (queryStr && !nextFallback.includes('?') ? queryStr : '');
      console.log(`[Video Fallback] Activating auto-recovery. Switching from "${currentSrc}" to working fallback: "${nextFallbackWithQuery}"`);
      setAttemptedFallbacks(prev => [...prev, currentSrc]);
      setCurrentSrc(nextFallbackWithQuery);
    } else {
      console.error('[Video Error] All background video fallbacks exhausted.');
    }
  };

  // Diagnostic logging to prove proper path routing to the user
  console.log(`[Video Route Audit] Requested: "${src}" -> Solved: "${initialResolvedSrc}" -> Playing: "${currentSrc}"`);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.setAttribute('muted', '');
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      
      // Force reload the new video source
      video.load();
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay video prevented by browser, retrying on user click/touch:", err);
          const forcePlay = () => {
            video.play().catch(() => {});
            document.removeEventListener('click', forcePlay);
            document.removeEventListener('touchstart', forcePlay);
          };
          document.addEventListener('click', forcePlay);
          document.addEventListener('touchstart', forcePlay);
        });
      }
    }
  }, [currentSrc]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-transparent ${zIndex}`}>
      <video
        ref={videoRef}
        key={currentSrc}
        src={currentSrc}
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
        onError={handleVideoError}
        style={{ opacity }}
        className="w-full h-full object-cover scale-[1.01]"
      />

      {showOverlay && (
        <div className="absolute inset-0 bg-[#000000]/60 pointer-events-none" />
      )}
    </div>
  );
}



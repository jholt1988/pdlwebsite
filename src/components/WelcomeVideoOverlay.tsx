/**
 * Welcome Video Overlay Component
 * 
 * A fully accessible, responsive video overlay that displays for first-time visitors.
 * Implements WCAG 2.1 Level AA guidelines with comprehensive keyboard navigation,
 * screen reader support, and performance optimizations.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, SkipForward } from 'lucide-react';
import { VideoOverlayProps, VideoState, AccessibilityConfig } from '../types/video';
import { isFirstTimeVisitor, markVisitAsSeen, prefersReducedMotion } from '../utils/browserStorage';
import styles from './WelcomeVideoOverlay.module.css';

const DEFAULT_ACCESSIBILITY_CONFIG: AccessibilityConfig = {
  enableFocusTrap: true,
  announceStateChanges: true,
  respectMotionPreferences: true,
  pauseOnBlur: true
};

const WelcomeVideoOverlay: React.FC<VideoOverlayProps> = ({
  videoSrc,
  posterSrc,
  captionsSrc,
  videoTitle,
  videoDescription,
  maxWidth = '90%',
  autoCloseOnEnd = true,
  showProgress = true,
  captionsEnabled = false,
  onClose,
  onPlay,
  onEnd
}) => {
  // Refs for DOM elements
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  // State management
  const [isVisible, setIsVisible] = useState(false);
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    isLoading: true,
    hasEnded: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
    isMuted: true, // Start muted for auto-play compliance
    captionsVisible: captionsEnabled,
    volume: 0.8
  });

  /**
   * Announce state changes to screen readers
   */
  const announceToScreenReader = useCallback((message: string) => {
    if (announcementRef.current && DEFAULT_ACCESSIBILITY_CONFIG.announceStateChanges) {
      announcementRef.current.textContent = message;
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);

  /**
   * Get all focusable elements within the overlay
   */
  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!overlayRef.current) return [];
    
    const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const elements = overlayRef.current.querySelectorAll<HTMLElement>(selector);
    return Array.from(elements).filter(el => !el.hasAttribute('disabled'));
  }, []);

  /**
   * Handle focus trap within overlay
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Close on Escape key
    if (event.key === 'Escape') {
      handleClose();
      return;
    }

    // Space or Enter to toggle play/pause
    if ((event.key === ' ' || event.key === 'Enter') && event.target === overlayRef.current) {
      event.preventDefault();
      togglePlayPause();
      return;
    }

    // Focus trap implementation
    if (event.key === 'Tab' && DEFAULT_ACCESSIBILITY_CONFIG.enableFocusTrap) {
      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab: move to previous element
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab: move to next element
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }
  }, []);

  /**
   * Handle video time updates
   */
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;
    const duration = video.duration || 0;
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    setVideoState(prev => ({
      ...prev,
      currentTime,
      duration,
      progress
    }));
  }, []);

  /**
   * Handle video loading states
   */
  const handleLoadStart = useCallback(() => {
    setVideoState(prev => ({ ...prev, isLoading: true }));
  }, []);

  const handleCanPlay = useCallback(() => {
    setVideoState(prev => ({ ...prev, isLoading: false }));
    announceToScreenReader('Video is ready to play');
  }, [announceToScreenReader]);

  /**
   * Handle video play event
   */
  const handlePlay = useCallback(() => {
    setVideoState(prev => ({ ...prev, isPlaying: true, hasEnded: false }));
    announceToScreenReader('Video is playing');
    onPlay?.();
  }, [announceToScreenReader, onPlay]);

  /**
   * Handle video pause event
   */
  const handlePause = useCallback(() => {
    setVideoState(prev => ({ ...prev, isPlaying: false }));
    announceToScreenReader('Video is paused');
  }, [announceToScreenReader]);

  /**
   * Handle video end event
   */
  const handleEnded = useCallback(() => {
    setVideoState(prev => ({ ...prev, isPlaying: false, hasEnded: true }));
    announceToScreenReader('Video has ended');
    onEnd?.();
    
    if (autoCloseOnEnd) {
      setTimeout(() => {
        handleClose();
      }, 2000); // Wait 2 seconds before auto-closing
    }
  }, [announceToScreenReader, onEnd, autoCloseOnEnd]);

  /**
   * Toggle play/pause
   */
  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(error => {
        console.warn('Video play failed:', error);
        announceToScreenReader('Unable to play video');
      });
    } else {
      video.pause();
    }
  }, [announceToScreenReader]);

  /**
   * Toggle mute/unmute
   */
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setVideoState(prev => ({ ...prev, isMuted: video.muted }));
    announceToScreenReader(video.muted ? 'Video muted' : 'Video unmuted');
  }, [announceToScreenReader]);

  /**
   * Toggle captions
   */
  const toggleCaptions = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.textTracks.length) return;

    const track = video.textTracks[0];
    const newVisibility = !videoState.captionsVisible;
    
    track.mode = newVisibility ? 'showing' : 'hidden';
    setVideoState(prev => ({ ...prev, captionsVisible: newVisibility }));
    announceToScreenReader(newVisibility ? 'Captions enabled' : 'Captions disabled');
  }, [videoState.captionsVisible, announceToScreenReader]);

  /**
   * Handle progress bar click
   */
  const handleProgressClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressContainer = progressRef.current;
    if (!video || !progressContainer) return;

    const rect = progressContainer.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * video.duration;

    video.currentTime = newTime;
    announceToScreenReader(`Seeking to ${Math.round(percentage * 100)}% of video`);
  }, [announceToScreenReader]);

  /**
   * Handle overlay close
   */
  const handleClose = useCallback(() => {
    const video = videoRef.current;
    
    // Pause video
    if (video && !video.paused) {
      video.pause();
    }

    // Mark visit as seen
    markVisitAsSeen();

    // Restore focus to previously focused element
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }

    // Remove event listeners
    document.removeEventListener('keydown', handleKeyDown);
    
    // Close overlay
    setIsVisible(false);
    
    // Call onClose callback after animation completes
    setTimeout(() => {
      onClose?.();
    }, 400);

    announceToScreenReader('Welcome video closed');
  }, [handleKeyDown, onClose, announceToScreenReader]);

  /**
   * Handle window focus/blur for auto-pause functionality
   */
  const handleWindowFocus = useCallback(() => {
    const video = videoRef.current;
    if (video && DEFAULT_ACCESSIBILITY_CONFIG.pauseOnBlur && !video.paused) {
      video.play().catch(console.warn);
    }
  }, []);

  const handleWindowBlur = useCallback(() => {
    const video = videoRef.current;
    if (video && DEFAULT_ACCESSIBILITY_CONFIG.pauseOnBlur && !video.paused) {
      video.pause();
    }
  }, []);

  /**
   * Format time for display (MM:SS)
   */
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  /**
   * Initialize overlay on mount
   */
  useEffect(() => {
    // Check if user is visiting for the first time
    if (isFirstTimeVisitor()) {
      // Store currently focused element
      lastFocusedElementRef.current = document.activeElement as HTMLElement;
      
      // Show overlay
      setIsVisible(true);
      
      // Add event listeners
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('focus', handleWindowFocus);
      window.addEventListener('blur', handleWindowBlur);
      
      // Focus overlay after animation
      setTimeout(() => {
        overlayRef.current?.focus();
      }, 500);

      announceToScreenReader('Welcome video overlay opened. Press Escape to close or Tab to navigate controls.');
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [handleKeyDown, handleWindowFocus, handleWindowBlur, announceToScreenReader]);

  /**
   * Setup video event listeners
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [handleLoadStart, handleCanPlay, handlePlay, handlePause, handleEnded, handleTimeUpdate]);

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-title"
      aria-describedby="video-description"
      tabIndex={-1}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      {/* Screen reader announcements */}
      <div
        ref={announcementRef}
        className={styles.srOnly}
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Hidden video title and description for screen readers */}
      <h2 id="video-title" className={styles.srOnly}>
        {videoTitle}
      </h2>
      <p id="video-description" className={styles.srOnly}>
        {videoDescription}
      </p>

      {/* Video container */}
      <div
        className={styles.videoContainer}
        style={{ maxWidth }}
      >
        {/* Skip button */}
        <button
          className={styles.skipButton}
          onClick={handleClose}
          aria-label="Skip welcome video"
          title="Skip video (Esc)"
        >
          <SkipForward size={16} />
          Skip
        </button>

        {/* Close button */}
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close welcome video"
          title="Close video (Esc)"
        >
          <X size={20} />
        </button>

        {/* Loading overlay */}
        {videoState.isLoading && (
          <div className={styles.loading} aria-label="Video loading">
            <div className={styles.loadingSpinner} />
            <div className={styles.loadingText}>Loading video...</div>
          </div>
        )}

        {/* Video element */}
        <video
          ref={videoRef}
          className={styles.video}
          src={videoSrc}
          poster={posterSrc}
          muted={videoState.isMuted}
          autoPlay
          playsInline
          preload="auto"
          aria-label={videoTitle}
          aria-describedby="video-description"
        >
          {/* Captions track */}
          {captionsSrc && (
            <track
              kind="subtitles"
              src={captionsSrc}
              srcLang="en"
              label="English"
              default={captionsEnabled}
            />
          )}
          
          {/* Fallback for browsers without video support */}
          <p>
            Your browser doesn't support HTML5 video. 
            <a href={videoSrc} target="_blank" rel="noopener noreferrer">
              Download the video
            </a> instead.
          </p>
        </video>

        {/* Video controls */}
        {showProgress && (
          <div className={styles.controls} role="group" aria-label="Video controls">
            {/* Play/Pause button */}
            <button
              className={styles.controlButton}
              onClick={togglePlayPause}
              aria-label={videoState.isPlaying ? 'Pause video' : 'Play video'}
              title={videoState.isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {videoState.isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            {/* Mute/Unmute button */}
            <button
              className={styles.controlButton}
              onClick={toggleMute}
              aria-label={videoState.isMuted ? 'Unmute video' : 'Mute video'}
              title={videoState.isMuted ? 'Unmute' : 'Mute'}
            >
              {videoState.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* Progress bar */}
            <div
              ref={progressRef}
              className={styles.progressContainer}
              onClick={handleProgressClick}
              role="slider"
              aria-label="Video progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(videoState.progress)}
              aria-valuetext={`${Math.round(videoState.progress)}% played`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                  e.preventDefault();
                  const video = videoRef.current;
                  if (video) {
                    const step = e.key === 'ArrowLeft' ? -10 : 10;
                    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + step));
                  }
                }
              }}
            >
              <div
                className={styles.progressBar}
                style={{ width: `${videoState.progress}%` }}
              />
              <div className={styles.progressHandle} />
            </div>

            {/* Time display */}
            <div className={styles.timeDisplay} aria-label="Video time">
              {formatTime(videoState.currentTime)} / {formatTime(videoState.duration)}
            </div>

            {/* Captions toggle (if captions available) */}
            {captionsSrc && (
              <button
                className={styles.controlButton}
                onClick={toggleCaptions}
                aria-label={videoState.captionsVisible ? 'Hide captions' : 'Show captions'}
                title={videoState.captionsVisible ? 'Hide captions' : 'Show captions'}
              >
                CC
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeVideoOverlay;
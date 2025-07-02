/**
 * TypeScript interfaces for Welcome Video Overlay
 * Provides type safety for video overlay components
 */

export interface VideoOverlayProps {
  /** Video source URL */
  videoSrc: string;
  /** Video poster image URL */
  posterSrc?: string;
  /** Video captions file URL (.vtt format) */
  captionsSrc?: string;
  /** Video title for accessibility */
  videoTitle: string;
  /** Video description for screen readers */
  videoDescription: string;
  /** Maximum width on desktop (default: 90%) */
  maxWidth?: string;
  /** Auto-close after video ends (default: true) */
  autoCloseOnEnd?: boolean;
  /** Show progress bar (default: true) */
  showProgress?: boolean;
  /** Enable captions by default (default: false) */
  captionsEnabled?: boolean;
  /** Callback when overlay is closed */
  onClose?: () => void;
  /** Callback when video starts playing */
  onPlay?: () => void;
  /** Callback when video ends */
  onEnd?: () => void;
}

export interface VideoState {
  /** Video is currently playing */
  isPlaying: boolean;
  /** Video is loading/buffering */
  isLoading: boolean;
  /** Video has ended */
  hasEnded: boolean;
  /** Current playback time in seconds */
  currentTime: number;
  /** Total video duration in seconds */
  duration: number;
  /** Video progress as percentage (0-100) */
  progress: number;
  /** Video is muted */
  isMuted: boolean;
  /** Captions are visible */
  captionsVisible: boolean;
  /** Volume level (0-1) */
  volume: number;
}

export interface VisitTrackingConfig {
  /** Storage key for tracking visits */
  storageKey: string;
  /** Number of days to remember the visit */
  expirationDays: number;
  /** Enable session storage fallback */
  useSessionFallback: boolean;
}

export interface AccessibilityConfig {
  /** Focus trap within overlay */
  enableFocusTrap: boolean;
  /** Announce state changes to screen readers */
  announceStateChanges: boolean;
  /** Respect user's motion preferences */
  respectMotionPreferences: boolean;
  /** Auto-pause when tab loses focus */
  pauseOnBlur: boolean;
}
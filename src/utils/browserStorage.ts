/**
 * Browser Storage Utilities for Visit Tracking
 * Handles first-time visit detection with privacy-conscious approach
 */

import { VisitTrackingConfig } from '../types/video';

const DEFAULT_CONFIG: VisitTrackingConfig = {
  storageKey: 'pdl_first_visit_seen',
  expirationDays: 30,
  useSessionFallback: true
};

/**
 * Check if user is visiting for the first time
 * Uses localStorage with sessionStorage fallback
 */
export function isFirstTimeVisitor(config: Partial<VisitTrackingConfig> = {}): boolean {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  
  try {
    // Check localStorage first
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(mergedConfig.storageKey);
      
      if (stored) {
        const data = JSON.parse(stored);
        const now = new Date().getTime();
        const expirationTime = data.timestamp + (mergedConfig.expirationDays * 24 * 60 * 60 * 1000);
        
        // Check if entry has expired
        if (now > expirationTime) {
          localStorage.removeItem(mergedConfig.storageKey);
          return true;
        }
        
        return false;
      }
      
      return true;
    }
    
    // Fallback to sessionStorage if localStorage is not available
    if (mergedConfig.useSessionFallback && typeof window !== 'undefined' && window.sessionStorage) {
      const sessionStored = sessionStorage.getItem(mergedConfig.storageKey + '_session');
      return !sessionStored;
    }
    
    // If no storage is available, assume first visit
    return true;
    
  } catch (error) {
    console.warn('Storage access failed, assuming first visit:', error);
    return true;
  }
}

/**
 * Mark that the user has seen the welcome video
 */
export function markVisitAsSeen(config: Partial<VisitTrackingConfig> = {}): void {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  
  try {
    const timestamp = new Date().getTime();
    const data = {
      timestamp,
      version: '1.0',
      userAgent: navigator.userAgent.substring(0, 100) // Limited UA string for basic tracking
    };
    
    // Store in localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(mergedConfig.storageKey, JSON.stringify(data));
    }
    
    // Also store in sessionStorage as backup
    if (mergedConfig.useSessionFallback && typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(mergedConfig.storageKey + '_session', 'true');
    }
    
  } catch (error) {
    console.warn('Failed to store visit data:', error);
  }
}

/**
 * Clear visit tracking data (for testing purposes)
 */
export function clearVisitData(config: Partial<VisitTrackingConfig> = {}): void {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  
  try {
    if (typeof window !== 'undefined') {
      if (window.localStorage) {
        localStorage.removeItem(mergedConfig.storageKey);
      }
      if (window.sessionStorage) {
        sessionStorage.removeItem(mergedConfig.storageKey + '_session');
      }
    }
  } catch (error) {
    console.warn('Failed to clear visit data:', error);
  }
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user is on a slow connection
 */
export function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false;
  }
  
  const connection = (navigator as any).connection;
  return connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
}

/**
 * Get user's preferred language for captions
 */
export function getPreferredLanguage(): string {
  if (typeof navigator === 'undefined') return 'en';
  
  return navigator.language.split('-')[0] || 'en';
}


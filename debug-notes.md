// Add this to browserStorage.ts for production use

/**
 * Reset first time visitor status (useful for testing or re-showing video)
 */
export function resetFirstTimeVisitor(): void {
  clearVisitData();
}

/**
 * Check if we should show welcome video (considering user preferences)
 */
export function shouldShowWelcomeVideo(): boolean {
  // Add any additional logic here (e.g., user preferences, A/B testing)
  return isFirstTimeVisitor();
}

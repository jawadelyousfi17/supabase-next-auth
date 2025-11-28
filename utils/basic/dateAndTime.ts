/**
 * Calculates progress percentage from start date to deadline
 * @param startDate - The start date
 * @param deadlineDate - The deadline date
 * @param currentDate - Current date (optional, defaults to now)
 * @returns Progress percentage (0-100)
 */
export function calculateProgress(
  startDate: Date,
  deadlineDate: Date,
  currentDate: Date = new Date()
): number {
  // Convert dates to timestamps
  const start = startDate.getTime();
  const deadline = deadlineDate.getTime();
  const now = currentDate.getTime();

  // Validate dates
  if (start >= deadline) {
    throw new Error('Start date must be before deadline');
  }

  // If current date is before start, return 0
  if (now <= start) {
    return 0;
  }

  // If current date is after deadline, return 100
  if (now >= deadline) {
    return 100;
  }

  // Calculate progress
  const totalDuration = deadline - start;
  const elapsedTime = now - start;
  const progress = (elapsedTime / totalDuration) * 100;

  // Round to 2 decimal places
  return Math.round(progress * 100) / 100;
}

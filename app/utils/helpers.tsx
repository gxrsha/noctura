export function formatDateAdded(dateAdded: string): string {
  try {
    // First try to parse the date directly
    let postDate = new Date(dateAdded);
    
    // If the date is invalid, try to handle different date formats
    if (isNaN(postDate.getTime())) {
      // Try parsing ISO format with timezone
      if (dateAdded.includes('T')) {
        postDate = new Date(dateAdded.split('T')[0]);
      } else {
        // Try parsing different date formats
        const parts = dateAdded.split(/[-/]/);
        if (parts.length === 3) {
          // Assume YYYY-MM-DD or MM-DD-YYYY format
          const year = parts[0].length === 4 ? parts[0] : parts[2];
          const month = parts[0].length === 4 ? parts[1] : parts[0];
          const day = parts[0].length === 4 ? parts[2] : parts[1];
          postDate = new Date(`${year}-${month}-${day}`);
        }
      }
    }

    // If we still have an invalid date, return a fallback
    if (isNaN(postDate.getTime())) {
      console.error('Invalid date:', dateAdded);
      return 'New';
    }

    const today = new Date();
    
    // Reset time to midnight for accurate day comparison
    today.setHours(0, 0, 0, 0);
    postDate.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "1d";
    } else {
      return `${diffDays}d`;
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'New';
  }
}


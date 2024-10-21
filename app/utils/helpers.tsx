export function formatDateAdded(dateAdded: string): string {
  const today = new Date();
  const postDate = new Date(dateAdded);
  
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
}


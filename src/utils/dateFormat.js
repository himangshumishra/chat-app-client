export function formatDistanceToNow(date) {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInSeconds = Math.floor((now - messageDate) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return 'yesterday';
    }
    
    if (diffInDays < 7) {
      return `${diffInDays}d`;
    }
    
    // For older messages, show the date
    const options = { month: 'short', day: 'numeric' };
    return messageDate.toLocaleDateString(undefined, options);
  }
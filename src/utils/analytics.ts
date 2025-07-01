// Hidden analytics utility - works silently in background
export const trackEvent = async (eventName: string): Promise<void> => {
  try {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString()
    };

    // Silent POST request - no await to avoid blocking UI
    fetch('https://hook.eu2.make.com/94yyxzrayhdn49v5j7vrtcy0hp34x7fg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }).catch(() => {
      // Silently handle any errors - no logs or notifications
    });
  } catch {
    // Silently handle any errors - no logs or notifications
  }
};
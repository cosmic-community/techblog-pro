(function() {
  // Only run in iframe (dashboard preview)
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  // Function to capture and send logs
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, (key, value) => {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');
    
    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };
    
    // Store log
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    // Send to parent dashboard
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {
      // Silently fail if postMessage is not available
    }
  }
  
  // Override console methods
  ['log', 'warn', 'error', 'info', 'debug'].forEach(level => {
    console[level] = function(...args) {
      originalConsole[level].apply(console, args);
      captureLog(level, args);
    };
  });
  
  // Capture unhandled errors
  window.addEventListener('error', (event) => {
    captureLog('error', [`Uncaught Error: ${event.message}`, `at ${event.filename}:${event.lineno}:${event.colno}`]);
  });
  
  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    captureLog('error', [`Unhandled Promise Rejection:`, event.reason]);
  });
  
  // Send ready signal
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  // Send route change updates
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  // Monitor route changes
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(...args) {
    originalPushState.apply(history, args);
    sendRouteChange();
  };
  
  history.replaceState = function(...args) {
    originalReplaceState.apply(history, args);
    sendRouteChange();
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
  
  // Send ready when loaded
  if (document.readyState === 'loading') {
    window.addEventListener('load', sendReady);
  } else {
    sendReady();
  }
  
  // Send initial route
  sendRouteChange();
})();
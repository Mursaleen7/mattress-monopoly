"""Rate limiting for API calls."""
import asyncio
from datetime import datetime, timedelta


class RateLimiter:
    """Centralized rate limiter for API calls."""
    
    def __init__(self, calls_per_second: float = 0.5):
        """
        Initialize rate limiter.
        
        Args:
            calls_per_second: Maximum calls per second (default 0.5 = 1 call per 2 seconds)
        """
        self.min_interval = 1.0 / calls_per_second
        self.last_call = datetime.min
        self._lock = asyncio.Lock()
    
    async def acquire(self):
        """Wait if necessary to respect rate limit."""
        async with self._lock:
            now = datetime.now()
            wait = self.min_interval - (now - self.last_call).total_seconds()
            if wait > 0:
                await asyncio.sleep(wait)
            self.last_call = datetime.now()
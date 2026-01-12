import Logger from '../utils/Logger.js';

/**
 * Global teardown for Playwright tests
 */
async function globalTeardown() {
  const logger = Logger.child({ module: 'GlobalTeardown' });
  
  try {
    logger.info('Starting global teardown');
    
    // Cleanup test artifacts if needed
    const fs = await import('fs');
    const path = await import('path');
    
    // Generate test summary
    const testResultsDir = path.resolve('test-results');
    if (fs.existsSync(testResultsDir)) {
      logger.info('Test results available in:', { path: testResultsDir });
    }
    
    logger.info('Global teardown completed successfully');
    
  } catch (error) {
    logger.error('Global teardown failed', { error: error.message });
  }
}

export default globalTeardown;
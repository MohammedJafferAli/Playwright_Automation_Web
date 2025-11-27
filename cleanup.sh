#!/bin/bash

echo "🧹 Cleaning up Playwright test artifacts..."

# Remove test results directory
if [ -d "test-results" ]; then
    rm -rf test-results/
    echo "✅ Removed test-results/"
fi

# Remove playwright reports
if [ -d "playwright-report" ]; then
    rm -rf playwright-report/
    echo "✅ Removed playwright-report/"
fi

# Remove allure reports
if [ -d "allure-report" ]; then
    rm -rf allure-report/
    echo "✅ Removed allure-report/"
fi

if [ -d "allure-results" ]; then
    rm -rf allure-results/
    echo "✅ Removed allure-results/"
fi

# Remove any .DS_Store files (macOS)
find . -name ".DS_Store" -delete 2>/dev/null
echo "✅ Removed .DS_Store files"

echo "🎉 Cleanup completed! Ready for new test run."
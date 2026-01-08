#!/usr/bin/env node
import { IntelligentAnalyzer } from './intelligent-analyzer.js';
import { UnifiedGenerator } from './unified-generator.js';
import { program } from 'commander';
import dotenv from 'dotenv';

dotenv.config();

const analyzer = new IntelligentAnalyzer();
const generator = new UnifiedGenerator();

program
  .name('playwright-ai')
  .description('Intelligent AI-Powered Playwright Generator')
  .version('4.0.0');

program
  .command('analyze <url>')
  .description('Analyze URL and auto-generate/update all test artifacts')
  .action(async (url) => {
    try {
      await analyzer.analyze(url);
      console.log('🎉 Analysis and generation completed!');
    } catch (error) {
      console.error('❌ Analysis failed:', error.message);
      process.exit(1);
    }
  });

program
  .command('batch <urls...>')
  .description('Analyze multiple URLs')
  .action(async (urls) => {
    try {
      console.log(`🚀 Analyzing ${urls.length} URLs...`);
      
      for (const url of urls) {
        console.log(`\n--- Analyzing ${url} ---`);
        await analyzer.analyze(url);
      }
      
      console.log('\n🎉 All URLs analyzed!');
      
    } catch (error) {
      console.error('❌ Batch analysis failed:', error.message);
      process.exit(1);
    }
  });

program
  .command('generate <type>')
  .description('Generate specific artifact (test|page|feature|steps)')
  .option('-f, --feature <desc>', 'Feature description')
  .option('-u, --url <url>', 'Target URL')
  .option('-e, --elements <elements>', 'UI elements')
  .option('-a, --actions <actions>', 'Page actions')
  .option('-s, --scenarios <scenarios>', 'Test scenarios')
  .option('-o, --output <path>', 'Output file path')
  .action(async (type, options) => {
    try {
      console.log(`🤖 Generating ${type}...`);
      
      let result;
      switch (type) {
        case 'test':
          result = await generator.generateTest({
            featureDescription: options.feature,
            url: options.url,
            elements: options.elements
          });
          break;
        case 'page':
          result = await generator.generatePageObject({
            url: options.url,
            elements: options.elements,
            actions: options.actions
          });
          break;
        case 'feature':
          result = await generator.generateFeature({
            feature: options.feature,
            scenarios: options.scenarios,
            userStory: options.feature
          });
          break;
        case 'steps':
          result = await generator.generateStepDefinition({
            feature: options.feature,
            scenarios: options.scenarios
          });
          break;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
      
      if (options.output) {
        await generator.saveArtifact(result.code, options.output);
        console.log(`✅ Saved to: ${options.output}`);
      } else {
        console.log(result.code);
      }
      
    } catch (error) {
      console.error('❌ Generation failed:', error.message);
      process.exit(1);
    }
  });

program.parse();
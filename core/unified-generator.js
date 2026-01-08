import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export class UnifiedGenerator {
  constructor(config = {}) {
    this.apiKey = config.apiKey || process.env.OPENAI_API_KEY;
    this.model = config.model || 'gpt-4';
    this.temperature = config.temperature || 0.1;
    
    if (!this.apiKey) throw new Error('OpenAI API key required');
    
    this.llm = new ChatOpenAI({
      openAIApiKey: this.apiKey,
      modelName: this.model,
      temperature: this.temperature
    });
    
    this.outputParser = new StringOutputParser();
    this.initializeChains();
  }

  initializeChains() {
    const basePrompt = `Generate {type} with these requirements:
- Use Page Object Model patterns
- Follow naming conventions (btn, input, dropdown)
- Include proper error handling and logging
- Add comprehensive assertions and validations
- Use existing BasePage and PageObjectManager patterns

Input: {input}
Generate ONLY the complete {type} content.`;

    this.chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(basePrompt),
      this.llm,
      this.outputParser
    ]);
  }

  async generate(type, input) {
    try {
      const result = await this.chain.invoke({ type, input: JSON.stringify(input) });
      const cleanCode = result.replace(/```(?:javascript|gherkin)?/g, '').trim();
      
      this.validateCode(cleanCode, type);
      
      return {
        code: cleanCode,
        timestamp: new Date().toISOString(),
        hash: this.generateHash(cleanCode)
      };
    } catch (error) {
      throw new Error(`${type} generation failed: ${error.message}`);
    }
  }

  async generateTest(config) {
    return this.generate('Playwright test file', config);
  }

  async generatePageObject(config) {
    return this.generate('Page Object class', config);
  }

  async generateFeature(config) {
    return this.generate('Gherkin feature file', config);
  }

  async generateStepDefinition(config) {
    return this.generate('Cucumber step definitions', config);
  }

  async analyzeAndGenerate(taskNumber, url) {
    console.log(`🚀 Task ${taskNumber}: Analyzing ${url}`);
    
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      
      const analysis = await this.analyzePage(page);
      const artifacts = await this.generateAllArtifacts(analysis, taskNumber);
      
      await browser.close();
      
      return { taskNumber, url, analysis, artifacts };
    } catch (error) {
      await browser.close();
      throw error;
    }
  }

  async analyzePage(page) {
    const elements = await page.evaluate(() => {
      const found = [];
      
      document.querySelectorAll('button, input[type="button"], input[type="submit"]').forEach(el => {
        found.push({
          type: 'button',
          name: `btn${(el.textContent || el.value || 'Button').replace(/[^a-zA-Z0-9]/g, '').substring(0, 15)}`,
          selector: el.id ? `#${el.id}` : `button:has-text("${el.textContent?.trim()}")`
        });
      });
      
      document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea').forEach(el => {
        found.push({
          type: 'input',
          name: `input${(el.name || el.placeholder || 'Input').replace(/[^a-zA-Z0-9]/g, '').substring(0, 15)}`,
          selector: el.id ? `#${el.id}` : `[name="${el.name}"]`
        });
      });
      
      document.querySelectorAll('select').forEach(el => {
        found.push({
          type: 'dropdown',
          name: `dropdown${(el.name || 'Select').replace(/[^a-zA-Z0-9]/g, '').substring(0, 15)}`,
          selector: el.id ? `#${el.id}` : `select[name="${el.name}"]`
        });
      });
      
      return found;
    });

    const title = await page.title();
    const url = page.url();
    
    return {
      url,
      title,
      elements,
      elementNames: elements.map(el => el.name).join(','),
      actions: this.deriveActions(elements),
      scenarios: this.deriveScenarios(elements)
    };
  }

  async generateAllArtifacts(analysis, taskNumber) {
    const className = `Task${taskNumber}Page`;
    
    const [pageObject, stepDefinitions, featureFile, testFile] = await Promise.all([
      this.generatePageObject({
        className,
        url: analysis.url,
        elements: analysis.elementNames,
        actions: analysis.actions
      }),
      this.generateStepDefinition({
        feature: `Task ${taskNumber} - ${analysis.title}`,
        scenarios: analysis.scenarios.join(', ')
      }),
      this.generateFeature({
        feature: `Task ${taskNumber} - ${analysis.title}`,
        scenarios: analysis.scenarios.join(', '),
        userStory: `Test ${analysis.title} functionality`
      }),
      this.generateTest({
        featureDescription: `Task ${taskNumber} - ${analysis.title}`,
        url: analysis.url,
        elements: analysis.elementNames
      })
    ]);

    const artifacts = {
      pageObject: await this.saveArtifact(pageObject.code, `pageObjects/${className}.js`),
      stepDefinitions: await this.saveArtifact(stepDefinitions.code, `Features/step_definitions/task${taskNumber}.step.js`),
      featureFile: await this.saveArtifact(featureFile.code, `Features/task${taskNumber}.feature`),
      testFile: await this.saveArtifact(testFile.code, `tests/task${taskNumber}.spec.js`)
    };

    console.log('✅ All artifacts generated successfully');
    return artifacts;
  }

  async saveArtifact(content, filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`📁 ${filePath}`);
    
    return { path: filePath, code: content };
  }

  deriveActions(elements) {
    const actions = ['navigate', 'validate'];
    
    if (elements.some(el => el.type === 'input' && el.name.toLowerCase().includes('email'))) {
      actions.push('login', 'authenticate');
    }
    if (elements.some(el => el.type === 'button')) {
      actions.push('submit', 'click');
    }
    if (elements.some(el => el.type === 'dropdown')) {
      actions.push('select', 'choose');
    }
    
    return actions.join(',');
  }

  deriveScenarios(elements) {
    const scenarios = ['Page load verification', 'Element visibility validation'];
    
    if (elements.some(el => el.type === 'input')) {
      scenarios.push('Valid input testing', 'Invalid input validation');
    }
    if (elements.some(el => el.type === 'button')) {
      scenarios.push('Button functionality', 'Form submission');
    }
    if (elements.some(el => el.type === 'dropdown')) {
      scenarios.push('Dropdown selection', 'Option validation');
    }
    
    return scenarios;
  }

  validateCode(code, type) {
    if (!code?.trim()) throw new Error('Generated code is empty');
    
    const validations = {
      'Playwright test file': ['import', 'test('],
      'Page Object class': ['class', 'constructor'],
      'Gherkin feature file': ['Feature:', 'Scenario'],
      'Cucumber step definitions': ['Given', 'When', 'Then']
    };
    
    const required = validations[type] || [];
    const missing = required.filter(keyword => !code.includes(keyword));
    
    if (missing.length > 0) {
      throw new Error(`Generated ${type} missing: ${missing.join(', ')}`);
    }
  }

  generateHash(content) {
    return crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);
  }
}
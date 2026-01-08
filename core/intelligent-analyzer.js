import { UnifiedGenerator } from './unified-generator.js';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

export class IntelligentAnalyzer {
  constructor(config = {}) {
    this.generator = new UnifiedGenerator(config);
    this.existingPages = this.scanExistingPages();
  }

  async analyze(url) {
    console.log(`🔍 Analyzing ${url}...`);
    
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      
      const analysis = await this.deepAnalyze(page);
      const existingPage = this.findExistingPage(analysis);
      
      if (existingPage) {
        console.log(`📝 Updating existing page: ${existingPage.name}`);
        await this.updateExistingPage(existingPage, analysis);
      } else {
        console.log(`🆕 Creating new page for: ${analysis.title}`);
        await this.createNewPage(analysis);
      }
      
      await browser.close();
      
      return analysis;
    } catch (error) {
      await browser.close();
      throw error;
    }
  }

  async deepAnalyze(page) {
    const elements = await page.evaluate(() => {
      const found = [];
      
      function getBestSelector(el) {
        if (el.id) return `#${el.id}`;
        if (el.name) return `[name="${el.name}"]`;
        if (el.className) return `.${el.className.split(' ')[0]}`;
        return el.tagName.toLowerCase();
      }
      
      function deriveAction(text) {
        const lower = text.toLowerCase();
        if (lower.includes('login') || lower.includes('sign in')) return 'login';
        if (lower.includes('submit') || lower.includes('send')) return 'submit';
        if (lower.includes('search')) return 'search';
        return 'click';
      }
      
      function deriveValidation(el) {
        if (el.type === 'email') return 'email format';
        if (el.type === 'password') return 'password strength';
        if (el.required) return 'required field';
        return 'standard validation';
      }
      
      // Buttons
      document.querySelectorAll('button, input[type="button"], input[type="submit"], [role="button"]').forEach(el => {
        const text = el.textContent?.trim() || el.value || el.getAttribute('aria-label') || '';
        found.push({
          type: 'button',
          name: `btn${text.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20) || 'Button'}`,
          selector: getBestSelector(el),
          text,
          action: deriveAction(text)
        });
      });
      
      // Inputs
      document.querySelectorAll('input, textarea').forEach(el => {
        const name = el.name || el.placeholder || el.id || el.getAttribute('aria-label') || 'Input';
        found.push({
          type: 'input',
          name: `input${name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)}`,
          selector: getBestSelector(el),
          inputType: el.type,
          validation: deriveValidation(el)
        });
      });
      
      // Dropdowns
      document.querySelectorAll('select, [role="combobox"], [role="listbox"]').forEach(el => {
        const name = el.name || el.id || el.getAttribute('aria-label') || 'Select';
        found.push({
          type: 'dropdown',
          name: `dropdown${name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)}`,
          selector: getBestSelector(el),
          options: Array.from(el.options || []).map(opt => opt.text)
        });
      });
      
      // Links
      document.querySelectorAll('a[href]').forEach(el => {
        const text = el.textContent?.trim() || '';
        if (text && !text.includes('javascript:')) {
          found.push({
            type: 'link',
            name: `lnk${text.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)}`,
            selector: getBestSelector(el),
            text,
            href: el.href
          });
        }
      });
      
      // Tables
      document.querySelectorAll('table, [role="table"]').forEach(el => {
        found.push({
          type: 'table',
          name: `tbl${(el.id || 'Data').replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)}`,
          selector: getBestSelector(el),
          headers: Array.from(el.querySelectorAll('th')).map(th => th.textContent?.trim())
        });
      });
      
      return found;
    });

    const title = await page.title();
    const url = page.url();
    const platform = await this.detectPlatform(page);
    const businessLogic = await this.analyzeBusinessLogic(elements, page);
    const workflows = await this.identifyWorkflows(elements, page);
    
    return {
      url,
      title,
      platform,
      elements,
      businessLogic,
      workflows,
      pageName: this.generatePageName(title, url)
    };
  }

  async detectPlatform(page) {
    const platform = await page.evaluate(() => {
      // Detect frameworks and platforms
      const indicators = {
        react: window.React || document.querySelector('[data-reactroot]'),
        angular: window.angular || document.querySelector('[ng-app]'),
        vue: window.Vue || document.querySelector('[data-v-]'),
        jquery: window.jQuery || window.$,
        bootstrap: document.querySelector('.container, .row, .col-'),
        material: document.querySelector('.mat-', '.mdc-'),
        ecommerce: document.querySelector('.cart, .checkout, .product'),
        form: document.querySelector('form'),
        dashboard: document.querySelector('.dashboard, .sidebar, .nav')
      };
      
      return Object.entries(indicators)
        .filter(([key, value]) => value)
        .map(([key]) => key);
    });
    
    return platform;
  }

  async analyzeBusinessLogic(elements, page) {
    const logic = {
      authentication: elements.some(el => 
        el.name.toLowerCase().includes('login') || 
        el.name.toLowerCase().includes('password') ||
        el.name.toLowerCase().includes('email')
      ),
      ecommerce: elements.some(el => 
        el.name.toLowerCase().includes('cart') || 
        el.name.toLowerCase().includes('buy') ||
        el.name.toLowerCase().includes('checkout')
      ),
      forms: elements.filter(el => el.type === 'input').length > 2,
      navigation: elements.filter(el => el.type === 'link').length > 3,
      dataDisplay: elements.some(el => el.type === 'table'),
      search: elements.some(el => 
        el.name.toLowerCase().includes('search') ||
        el.inputType === 'search'
      )
    };
    
    return Object.entries(logic).filter(([key, value]) => value).map(([key]) => key);
  }

  async identifyWorkflows(elements, page) {
    const workflows = [];
    
    // Login workflow
    if (elements.some(el => el.name.toLowerCase().includes('email')) &&
        elements.some(el => el.name.toLowerCase().includes('password'))) {
      workflows.push({
        name: 'Authentication',
        steps: ['Enter credentials', 'Submit form', 'Verify redirect'],
        positiveCase: 'Valid login with correct credentials',
        negativeCase: 'Invalid credentials, empty fields, SQL injection'
      });
    }
    
    // Form submission workflow
    const formInputs = elements.filter(el => el.type === 'input');
    if (formInputs.length > 0) {
      workflows.push({
        name: 'Form Submission',
        steps: ['Fill required fields', 'Validate inputs', 'Submit form'],
        positiveCase: 'Valid data submission',
        negativeCase: 'Invalid data, missing required fields, boundary values'
      });
    }
    
    // E-commerce workflow
    if (elements.some(el => el.name.toLowerCase().includes('cart'))) {
      workflows.push({
        name: 'Shopping',
        steps: ['Add to cart', 'View cart', 'Checkout', 'Payment'],
        positiveCase: 'Complete purchase flow',
        negativeCase: 'Empty cart, invalid payment, out of stock'
      });
    }
    
    return workflows;
  }

  scanExistingPages() {
    const pageObjectsDir = 'pageObjects';
    if (!fs.existsSync(pageObjectsDir)) return [];
    
    return fs.readdirSync(pageObjectsDir)
      .filter(file => file.endsWith('.js') && !file.includes('Task'))
      .map(file => ({
        name: file.replace('.js', ''),
        path: path.join(pageObjectsDir, file),
        content: fs.readFileSync(path.join(pageObjectsDir, file), 'utf8')
      }));
  }

  findExistingPage(analysis) {
    return this.existingPages.find(page => {
      const urlMatch = page.content.includes(analysis.url) || 
                     page.content.includes(new URL(analysis.url).pathname);
      const titleMatch = page.name.toLowerCase().includes(analysis.title.toLowerCase().split(' ')[0]);
      
      return urlMatch || titleMatch;
    });
  }

  async updateExistingPage(existingPage, analysis) {
    // Read existing page and merge with new elements
    const newElements = analysis.elements.filter(newEl => 
      !existingPage.content.includes(newEl.name)
    );
    
    if (newElements.length > 0) {
      console.log(`🔄 Adding ${newElements.length} new elements to ${existingPage.name}`);
      
      // Generate updated page object
      const updatedPage = await this.generator.generatePageObject({
        className: existingPage.name,
        url: analysis.url,
        elements: analysis.elements.map(el => el.name).join(','),
        actions: this.derivePageActions(analysis.elements),
        existingContent: existingPage.content
      });
      
      await this.generator.saveArtifact(updatedPage.code, existingPage.path);
    }
    
    // Always update/create tests and features
    await this.generateTestArtifacts(analysis, existingPage.name);
  }

  async createNewPage(analysis) {
    const className = analysis.pageName;
    
    // Generate all artifacts
    const [pageObject, testFile, featureFile, stepDefinitions] = await Promise.all([
      this.generator.generatePageObject({
        className,
        url: analysis.url,
        elements: analysis.elements.map(el => el.name).join(','),
        actions: this.derivePageActions(analysis.elements),
        platform: analysis.platform.join(','),
        businessLogic: analysis.businessLogic.join(',')
      }),
      this.generator.generateTest({
        featureDescription: `Complete testing of ${analysis.title}`,
        url: analysis.url,
        elements: analysis.elements.map(el => el.name).join(','),
        workflows: analysis.workflows,
        platform: analysis.platform.join(',')
      }),
      this.generator.generateFeature({
        feature: analysis.title,
        workflows: analysis.workflows,
        userStory: `As a user, I want to interact with ${analysis.title}`,
        scenarios: this.generateScenarios(analysis.workflows)
      }),
      this.generator.generateStepDefinition({
        feature: analysis.title,
        workflows: analysis.workflows,
        scenarios: this.generateScenarios(analysis.workflows)
      })
    ]);

    // Save all artifacts
    await Promise.all([
      this.saveArtifact(pageObject.code, `pageObjects/${className}.js`),
      this.saveArtifact(testFile.code, `tests/${className.toLowerCase()}.spec.js`),
      this.saveArtifact(featureFile.code, `Features/${className.toLowerCase()}.feature`),
      this.saveArtifact(stepDefinitions.code, `Features/step_definitions/${className.toLowerCase()}.step.js`)
    ]);

    console.log('✅ All artifacts created successfully');
  }

  async generateTestArtifacts(analysis, pageName) {
    const [testFile, featureFile, stepDefinitions] = await Promise.all([
      this.generator.generateTest({
        featureDescription: `Testing ${analysis.title}`,
        url: analysis.url,
        elements: analysis.elements.map(el => el.name).join(','),
        workflows: analysis.workflows
      }),
      this.generator.generateFeature({
        feature: analysis.title,
        workflows: analysis.workflows,
        scenarios: this.generateScenarios(analysis.workflows)
      }),
      this.generator.generateStepDefinition({
        feature: analysis.title,
        workflows: analysis.workflows
      })
    ]);

    await Promise.all([
      this.saveArtifact(testFile.code, `tests/${pageName.toLowerCase()}.spec.js`),
      this.saveArtifact(featureFile.code, `Features/${pageName.toLowerCase()}.feature`),
      this.saveArtifact(stepDefinitions.code, `Features/step_definitions/${pageName.toLowerCase()}.step.js`)
    ]);
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

  generatePageName(title, url) {
    const titlePart = title.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '');
    const pathPart = new URL(url).pathname.split('/').filter(p => p)[0] || 'Home';
    return `${titlePart || pathPart}Page`;
  }

  derivePageActions(elements) {
    const actions = ['navigate', 'waitForLoad'];
    
    elements.forEach(el => {
      switch (el.type) {
        case 'button':
          actions.push(`click${el.name.substring(3)}`);
          break;
        case 'input':
          actions.push(`fill${el.name.substring(5)}`);
          break;
        case 'dropdown':
          actions.push(`select${el.name.substring(8)}`);
          break;
      }
    });
    
    return actions.join(',');
  }

  generateScenarios(workflows) {
    const scenarios = [];
    
    workflows.forEach(workflow => {
      scenarios.push(workflow.positiveCase);
      scenarios.push(workflow.negativeCase);
    });
    
    return scenarios.join(', ');
  }
}
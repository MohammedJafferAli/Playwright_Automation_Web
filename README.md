# 🎭 Playwright Web Automation Framework

<div align="center">

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

**🚀 Modern End-to-End Testing Framework with Playwright & JavaScript**

*Robust • Scalable • Fast • Reliable*

</div>

---

## 📋 Table of Contents

- [📖 How to Use This File](#-how-to-use-this-file)
- [✨ Features](#-features)
- [🛠️ Prerequisites](#️-prerequisites)
- [⚡ Quick Start](#-quick-start)
- [🎯 Test Structure](#-test-structure)
- [📝 Element Naming Standards](#-element-naming-standards)
- [🔧 Configuration](#-configuration)
- [🧹 Cleanup](#-cleanup)
- [🚀 Running Tests](#-running-tests)
- [📊 Reporting](#-reporting)
- [🤝 Contributing](#-contributing)

---

## 📖 How to Use This File

### 🎯 For New Users
1. **Start Here**: Read [Prerequisites](#️-prerequisites) and [Quick Start](#-quick-start)
2. **Understand Structure**: Review [Test Structure](#-test-structure) to understand the codebase
3. **Follow Standards**: Use [Element Naming Standards](#-element-naming-standards) for consistent code
4. **Run Tests**: Execute your first test using [Running Tests](#-running-tests)

### 🔧 For Developers
- **Configuration**: Modify settings in [Configuration](#-configuration) section
- **Standards**: Follow [Element Naming Standards](#-element-naming-standards) for maintainable code
- **Cleanup**: Use [Cleanup](#-cleanup) commands before test execution
- **Reporting**: Generate and view reports using [Reporting](#-reporting) section

### 📚 Additional Resources
- **AI Instructions**: Check `Learnings/AI_Instructions.md` for enterprise code generation
- **OneStop Guide**: See `PLAYWRIGHT_ONESTOP.md` for comprehensive learning material
- **Feature Files**: Review `Features/` directory for BDD test scenarios

---

## ✨ Features

🎯 **Cross-Browser Testing** - Chrome, Firefox, Safari, Edge  
⚡ **Fast Execution** - Parallel test execution  
🔍 **Auto-Wait** - Smart waiting for elements  
📱 **Mobile Testing** - Device emulation support  
🎥 **Video Recording** - Test execution videos  
📸 **Screenshots** - Automatic failure screenshots  
🔧 **CI/CD Ready** - GitHub Actions integration  
📊 **Rich Reports** - HTML test reports  

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Download Link |
|------|---------|---------------|
| **Node.js** | Latest LTS | [Download](https://nodejs.org/) |
| **npm/yarn** | Latest | Comes with Node.js |
| **Git** | Latest | [Download](https://git-scm.com/) |

---

## ⚡ Quick Start

### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd Playwright_Automation_Web
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Install Playwright Browsers
```bash
npx playwright install
```

### 4️⃣ Run Your First Test
```bash
npx playwright test
```

🎉 **That's it!** Your tests are now running!

---

## 🎯 Test Structure

```
tests/
├── 🧪 baseTest.spec.js          # Basic browser setup tests
├── 🔐 loginTest.spec.js         # Authentication tests
├── 🎨 UserInterfaceTest.spec.js # UI component tests
├── 🪟 windowHandleTest.spec.js  # Window handling tests
└── 🔄 endToEndTest.spec.js      # Complete user journeys
```

---

## 📝 Element Naming Standards

Follow these conventions for consistent and maintainable test code:

| Element Type | Prefix | Example |
|--------------|--------|---------|
| 🔘 **Button** | `btn` | `btnLogin`, `btnSubmit` |
| 📝 **Input/Textbox** | `input`/`txt` | `inputUsername`, `txtEmail` |
| 📋 **Dropdown** | `dropdown` | `dropdownCountry` |
| ☑️ **Checkbox** | `chk` | `chkTerms`, `chkSubscribe` |
| 🔘 **Radio Button** | `radio` | `radioGenderMale` |
| 🔗 **Link** | `lnk` | `lnkForgotPassword` |
| 🏷️ **Label** | `lbl` | `lblWelcomeMessage` |
| 📊 **Table** | `tbl` | `tblUserList` |
| 📱 **Modal** | `modal` | `modalConfirmation` |
| 🖼️ **Image** | `img` | `imgProfilePicture` |

---

## 🔧 Configuration

The framework uses `playwright.config.js` for configuration:

- 🌐 **Multiple Browsers**: Chrome, Firefox, Safari
- 📱 **Device Emulation**: Mobile and tablet testing
- 🎥 **Video Recording**: On failure
- 📸 **Screenshots**: Automatic capture
- 📊 **Reporting**: HTML reports

---

## 🧹 Cleanup

### Before Running Tests
```bash
# Clean test artifacts
./cleanup.sh
```

---

## 🚀 Running Tests

### Basic Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `npm test` | Run all tests | `npx playwright test` |
| `npm run test:headed` | Run with browser UI | `npx playwright test --headed` |
| `npm run test:debug` | Debug mode | `npx playwright test --debug` |
| `npm run test:specific` | Run specific test | `npx playwright test tests/loginTest.spec.js` |

### Advanced Commands

```bash
# 🎯 Run tests by tag
npx playwright test --grep "@smoke"

# 🌐 Run on specific browser
npx playwright test --project=chromium

# 📱 Run mobile tests
npx playwright test --project="Mobile Chrome"

# 🎥 Record test execution
npx playwright codegen https://example.com
```

---

## 📊 Reporting

### View Test Reports
```bash
# 📈 Open HTML report
npx playwright show-report

# 📋 Generate custom report
npx playwright test --reporter=html
```

### Screenshots & Videos
- 📸 **Screenshots**: Saved in `test-results/`
- 🎥 **Videos**: Saved in `test-results/`
- 📊 **Reports**: Available in `playwright-report/`

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch
3. ✅ Add tests for new features
4. 🧪 Run the test suite
5. 📝 Submit a pull request

---

## 📚 Resources

- 📖 [Playwright Documentation](https://playwright.dev/docs/intro)
- 🎓 [Best Practices Guide](https://playwright.dev/docs/best-practices)
- 💬 [Community Forum](https://github.com/microsoft/playwright/discussions)
- 🐛 [Issue Tracker](https://github.com/microsoft/playwright/issues)

---

<div align="center">

**Made with ❤️ using Playwright**

*Happy Testing! 🎭*

</div>
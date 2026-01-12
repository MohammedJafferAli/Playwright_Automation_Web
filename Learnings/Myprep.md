Part 1: Round 1 – Fundamentals & Ownership
Q1. Walk me through your experience and key projects.
Answer:
Structure your response using STAR (Situation, Task, Action, Result):
•	Situation: Briefly describe the project context.
•	Task: Your role and responsibilities.
•	Action: Key contributions (framework design, CI/CD integration, mentoring).
•	Result: Quantifiable impact (e.g., reduced regression time by 50%, improved coverage by 40%).
Example:
“In my current role at Tech Mahindra, I led automation for a telecom product. I designed a hybrid framework using Selenium and Playwright, integrated CI/CD pipelines with Jenkins, and mentored junior testers. This reduced regression cycle from 6 hours to 2 hours and improved test coverage by 40%.”
 
Q2. What was the most critical module or system you owned end-to-end?
Answer:
Pick a high-impact module (e.g., payment gateway, authentication service). Explain:
•	Why it was critical (business impact).
•	How you ensured quality (automation strategy, API + UI coverage).
•	Challenges and how you solved them.

**Sample Answer:**
"I owned the payment gateway module end-to-end for an e-commerce platform processing $2M+ daily transactions. This was critical because any downtime directly impacted revenue. I implemented a comprehensive testing strategy:
- API-level testing for all payment flows (success, failure, timeout scenarios)
- UI automation for checkout workflows across multiple browsers
- Load testing to handle peak traffic (Black Friday scenarios)
- Integration testing with third-party payment providers (Stripe, PayPal)
- Implemented circuit breaker patterns for resilience
Challenges: Handling flaky payment provider responses. Solution: Added retry mechanisms and mock services for consistent testing."
 
Q3. How do you decide what to automate and what not to automate?
Answer:
Criteria:
•	High ROI: Repetitive, stable, business-critical flows.
•	Low ROI: Highly dynamic UI, one-time tests, exploratory scenarios.
•	Use Automation Pyramid: Unit > API > UI.

**Detailed Decision Matrix:**
**AUTOMATE:**
- Regression test suites (run frequently)
- Smoke tests for deployments
- API endpoints with stable contracts
- Data validation and business logic
- Cross-browser compatibility tests
- Performance benchmarks

**DON'T AUTOMATE:**
- Usability and UX testing
- Ad-hoc exploratory testing
- Tests that change frequently (>50% change rate)
- Complex visual validations
- One-time migration scripts
- Tests requiring human judgment

**ROI Calculation:** 
ROI = (Manual Effort Saved - Automation Cost) / Automation Cost
Example: If manual test takes 2 hours, runs 50 times/month, automation takes 20 hours to build:
ROI = (100 hours saved - 20 hours invested) / 20 hours = 400% ROI
 
Q4. Why does automation fail in some companies?
Answer:
•	Lack of clear strategy.
•	Poor framework design.
•	No ROI measurement.
•	Flaky tests and unstable environments.

**Root Causes & Solutions:**
1. **Lack of Strategy:**
   - Problem: No clear automation goals or roadmap
   - Solution: Define automation charter, success metrics, and phased approach

2. **Poor Framework Design:**
   - Problem: Monolithic, hard-to-maintain code
   - Solution: Modular design, proper abstraction layers, design patterns

3. **Tool Selection Issues:**
   - Problem: Wrong tool for the application type
   - Solution: POC-driven tool evaluation, consider team skills

4. **Maintenance Overhead:**
   - Problem: Tests break frequently, high maintenance cost
   - Solution: Robust locators, proper waits, environment isolation

5. **Skill Gap:**
   - Problem: Team lacks programming/automation skills
   - Solution: Training programs, pair programming, code reviews

6. **Environment Issues:**
   - Problem: Unstable test environments, data dependencies
   - Solution: Containerized environments, test data management

7. **Management Support:**
   - Problem: Lack of leadership buy-in
   - Solution: Show ROI metrics, quick wins, business impact
 
Q5. How do you measure automation success or ROI?
Answer:
•	Reduction in manual effort.
•	Faster release cycles.
•	Defect leakage rate.
•	Cost savings vs automation investment.

**Comprehensive ROI Metrics:**

**Quantitative Metrics:**
1. **Time Savings:**
   - Manual execution time vs automated execution time
   - Example: 40-hour regression → 2-hour automated suite

2. **Cost Reduction:**
   - Formula: (Manual tester hours saved × hourly rate) - automation development cost
   - Example: Save 160 hours/month × $50/hour = $8000/month savings

3. **Defect Detection:**
   - Defects found in automation vs manual testing
   - Early defect detection cost savings (1:10:100 rule)

4. **Release Velocity:**
   - Release frequency before/after automation
   - Time to market improvement

5. **Test Coverage:**
   - % of requirements covered by automation
   - Code coverage metrics

**Qualitative Metrics:**
1. **Team Productivity:**
   - Testers freed up for exploratory testing
   - Focus on high-value activities

2. **Quality Improvement:**
   - Reduced production defects
   - Customer satisfaction scores

3. **Confidence Level:**
   - Team confidence in releases
   - Reduced rollback incidents

**Dashboard Example:**
- Tests Automated: 450/600 (75%)
- Execution Time: 2 hours (vs 40 hours manual)
- Monthly Savings: $8,000
- Defects Prevented: 15/month
- Release Frequency: Weekly (vs Monthly)
 
Q6. UI automation is flaky. What are your first three actions?
Answer:
•	Stabilise locators (use robust selectors).
•	Add explicit waits.
•	Isolate environment issues (network, data).

**Systematic Flakiness Resolution:**

**Immediate Actions (First 3):**
1. **Analyze Failure Patterns:**
   - Check if failures are consistent or random
   - Identify common failure points (login, data loading, etc.)
   - Review test execution logs and screenshots

2. **Stabilize Waits:**
   - Replace Thread.sleep() with WebDriverWait
   - Add explicit waits for element states (visible, clickable, present)
   - Implement custom wait conditions for complex scenarios

3. **Improve Locators:**
   - Use stable attributes (id, data-testid) over dynamic ones
   - Avoid xpath with position-based selectors
   - Implement locator fallback strategies

**Advanced Solutions:**
4. **Environment Isolation:**
   - Use dedicated test environments
   - Implement test data cleanup/setup
   - Mock external dependencies

5. **Retry Mechanisms:**
   - Implement smart retry for transient failures
   - Add retry only for specific exception types
   - Set maximum retry limits

6. **Monitoring & Alerting:**
   - Track flakiness metrics over time
   - Set up alerts for failure rate thresholds
   - Implement test health dashboards

**Code Example:**
```java
// Bad: Thread.sleep(5000);
// Good: 
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));
```
 
Q7. When should manual testing still be preferred?
Answer:
•	Exploratory testing.
•	Highly dynamic UI.
•	One-time scenarios.
•	Usability testing.

**Detailed Manual Testing Scenarios:**

**1. Exploratory Testing:**
- Ad-hoc testing to discover unknown issues
- User journey exploration
- Edge case discovery
- Creative testing scenarios

**2. Usability & UX Testing:**
- User experience validation
- Accessibility testing (screen readers, keyboard navigation)
- Visual design validation
- User workflow optimization

**3. Complex Business Logic:**
- Multi-step workflows requiring human judgment
- Complex calculations requiring verification
- Business rule validation in edge cases

**4. New Feature Testing:**
- Initial testing of new features (before automation)
- Requirement clarification through testing
- Prototype validation

**5. Security Testing:**
- Penetration testing
- Social engineering scenarios
- Manual security code reviews

**6. Performance Testing (Subjective):**
- Perceived performance testing
- User experience under load
- Visual performance issues

**7. Compliance Testing:**
- Regulatory compliance validation
- Audit requirements
- Legal compliance checks

**8. One-time Scenarios:**
- Data migration validation
- Environment setup verification
- Ad-hoc production issue investigation

**Decision Framework:**
- If test requires human creativity/judgment → Manual
- If test involves subjective evaluation → Manual  
- If test is exploratory in nature → Manual
- If automation cost > manual cost → Manual


Automation Architecture Questions with Detailed Answers
 
Q1. Design a scalable automation framework for a large product.
Answer: A scalable automation framework should:
•	Modular Design: Separate layers for test scripts, utilities, and configuration.
•	Page Object Model (POM): Encapsulate UI elements and actions.
•	Data-Driven Testing: Externalise test data (Excel, JSON, DB).
•	Parallel Execution: Use TestNG or JUnit with Selenium Grid or cloud platforms.
•	CI/CD Integration: Jenkins/GitHub Actions for continuous testing.
•	Reporting: Allure or Extent Reports for rich reporting.
•	Version Control: Git for code management.
Architecture Example:
src/
 ├── base/        # Driver setup, common methods
 ├── pages/       # Page classes (POM)
 ├── tests/       # Test classes
 ├── utils/       # Helpers (Excel, API, DB)
 ├── config/      # Properties, environment configs
 └── reports/     # Test reports
 
Q2. How do you split tests between UI, API and database layers?
Answer: Follow the Test Pyramid:
•	Unit Tests (70%): Validate business logic.
•	API Tests (20%): Validate endpoints before UI.
•	UI Tests (10%): Only critical flows. This reduces flakiness and speeds up execution.
 
Q3. Why does Page Object Model fail at scale? What is your alternative?
Answer:
•	Problem: POM becomes bulky when apps grow; maintenance is hard.
•	Alternative: Screenplay Pattern or Component Object Model. 
o	Screenplay uses Actors, Tasks, and Interactions, making tests more readable and maintainable.
 
Q4. How do you handle test data management in parallel execution?
Answer:
•	Use thread-safe data providers in TestNG.
•	Store data in JSON or DB and fetch dynamically.
•	Avoid hardcoding; use unique identifiers for each thread.
 
Q5. How do you permanently fix flaky tests?
Answer:
•	Use explicit waits instead of hard waits.
•	Stabilise locators (avoid brittle XPath).
•	Isolate environment issues (network, data).
•	Retry mechanism for transient failures.
•	Run tests in clean environments (Docker containers).
 
✅ Coding Questions with Detailed Answers
 
Q1. Find the first non-repeating character in a string.
Explanation:
Use a HashMap to store frequency, then iterate to find the first char with count = 1.
Java Code:
Java
import java.util.*;

public class FirstNonRepeating {
public static void main(String[] args) {
String str = "swiss";
Map<Character, Integer> map = new LinkedHashMap<>();
for (char c : str.toCharArray()) {
map.put(c, map.getOrDefault(c, 0) + 1);
}
for (char c : map.keySet()) {
if (map.get(c) == 1) {
System.out.println("First non-repeating: " + c);
break;
}
}
}
}
Show more lines
Time Complexity: O(n)
Space Complexity: O(n)
 
Q2. Reverse words in a sentence without using built-in functions.
Explanation:
Split words manually and reverse order.
Java Code:
Java
public class ReverseWords {
public static void main(String[] args) {
String sentence = "I love SDET";
String[] words = sentence.split(" ");
StringBuilder reversed = new StringBuilder();
for (int i = words.length - 1; i >= 0; i--) {
reversed.append(words[i]).append(" ");
}
System.out.println(reversed.toString().trim());
}
}
Show more lines
Time Complexity: O(n)
Space Complexity: O(n)
 
Q3. Validate balanced brackets in a given input.
Explanation:
Use a stack to push opening brackets and pop when matching closing brackets appears.
Java Code:
Java
import java.util.*;

public class BalancedBrackets {
public static void main(String[] args) {
String str = "{[()]}";
Stack<Character> stack = new Stack<>();
for (char c : str.toCharArray()) {
if (c == '(' || c == '{' || c == '[') {
stack.push(c);
} else {
if (stack.isEmpty()) {
System.out.println("Not Balanced");
return;
}
char top = stack.pop();
if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) {
System.out.println("Not Balanced");
return;
}
}
}
System.out.println(stack.isEmpty() ? "Balanced" : "Not Balanced");
}
}
Show more lines
Time Complexity: O(n)
Space Complexity: O(n)
 
Q4. Compare two API JSON responses while ignoring dynamic fields.
Explanation:
Convert JSON to Map, remove dynamic keys, then compare.
Java Code (using Jackson):
Java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.*;

public class CompareJson {
public static void main(String[] args) throws Exception {
String json1 = "{\"id\":123,\"name\":\"John\",\"timestamp\":\"2025-01-09\"}";
String json2 = "{\"id\":456,\"name\":\"John\",\"timestamp\":\"2025-01-10\"}";

ObjectMapper mapper = new ObjectMapper();
Map<String, Object> map1 = mapper.readValue(json1, Map.class);
Map<String, Object> map2 = mapper.readValue(json2, Map.class);

map1.remove("id");
map1.remove("timestamp");
map2.remove("id");
map2.remove("timestamp");

System.out.println(map1.equals(map2) ? "Equal" : "Not Equal");
}
}
Show more lines
Time Complexity: O(n)
Space Complexity: O(n)



Q1. Explain your CI/CD automation strategy from commit to deployment.
Answer:
•	Commit Stage: 
o	Trigger unit tests and static code analysis (SonarQube).
o	Validate code quality before merging.
•	Build Stage: 
o	Compile code, run API and integration tests.
o	Package artefacts (Docker images).
•	Test Stage: 
o	Execute automation suites (UI, API) in parallel using Selenium Grid or cloud platforms.
o	Generate reports (Allure, Extent).
•	Deploy Stage: 
o	Deploy to staging, run smoke tests.
o	Canary release for production.
•	Tools: Jenkins, GitHub Actions, Docker, Kubernetes.
✅ Key Point: Emphasise shift-left testing and fast feedback loops.
 
Q2. Where should automation run: PR, nightly or pre-production? Why?
Answer:
•	PR (Pull Request): 
o	Run unit tests and smoke tests for quick feedback.
•	Nightly: 
o	Full regression suite for comprehensive coverage.
•	Pre-production: 
o	Sanity checks before deployment. ✅ Reason: Balances speed and coverage without blocking development.
 
Q3. A flaky test is blocking a release. Do you disable it?
Answer:
•	Immediate Action: 
o	Isolate the flaky test and run manually.
•	Long-Term Fix: 
o	Analyse root cause (locator instability, environment issues).
o	Implement retry logic or stabilise waits. ✅ Never blindly disable tests without root cause analysis.
 
Q4. Automation suite takes six hours but leadership wants it in thirty minutes. What do you do?
Answer:
•	Parallel Execution: 
o	Use Selenium Grid or cloud platforms (BrowserStack, Perfecto).
•	Test Optimisation: 
o	Remove redundant tests.
o	Prioritise critical paths.
•	Infrastructure Scaling: 
o	Run tests on multiple nodes. ✅ Outcome: Reduce execution time without compromising coverage.
 
Q5. How do you mentor junior SDETs?
Answer:
•	Pair programming for framework design.
•	Conduct code reviews.
•	Share best practices for automation and coding.
•	Provide learning resources (LeetCode, REST Assured tutorials). ✅ Focus on building confidence and technical depth.
 
Q6. How do you handle conflicts with developers on defect priority?
Answer:
•	Use data-driven approach: 
o	Show impact on business.
o	Provide logs, screenshots, and reproducible steps.
•	Escalate only if critical. ✅ Maintain collaboration, not confrontation.
 
Q7. Share an example where your testing approach prevented a production issue.
Answer (STAR Method):
•	Situation: Payment gateway had intermittent failures.
•	Task: Validate transaction flow under load.
•	Action: Added API-level stress tests and monitored logs.
•	Result: Found a concurrency bug before release, saving potential revenue loss.
Q1. What does getDomProperty() and getDomAttribute() do? What is the difference?
Answer:
•	getDomProperty(): Fetches the property value from the DOM (e.g., value, checked).
•	getDomAttribute(): Fetches the attribute value as defined in HTML. Difference:
•	Attributes are static (HTML markup), properties are dynamic (DOM state). Example:
Java
WebElement element = driver.findElement(By.id("username"));
System.out.println(element.getDomProperty("value")); // Current value in DOM
System.out.println(element.getDomAttribute("value")); // Original HTML attribute
Show more lines
 
Q2. How to fetch all broken links with its name and URL?
Answer:
•	Get all <a> tags, extract href, send HTTP request, check status code. Example:
Java
List<WebElement> links = driver.findElements(By.tagName("a"));
for (WebElement link : links) {
String url = link.getAttribute("href");
HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
conn.setRequestMethod("HEAD");
if (conn.getResponseCode() >= 400) {
System.out.println("Broken link: " + link.getText() + " -> " + url);
}
}
Show more lines
________________________________________
Q3. How can you bypass Element Not Found without using try-catch or custom exceptions?
Answer:
•	Use WebDriverWait with ExpectedConditions:
Java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("submit")));
``
Show more lines
________________________________________
Q4. What happens when there are multiple browser windows open? How do you switch between them?
Answer:
•	Use getWindowHandles() and switchTo().window():
Java
Set<String> windows = driver.getWindowHandles();
for (String win : windows) {
driver.switchTo().window(win);
}
Show more lines
________________________________________
Q5. Is it possible to use same locators within Selenium WebDriver and Playwright? If not, what is your strategy in Playwright?
Answer:
•	Not always possible because Playwright supports advanced selectors like text= and nth=.
•	Strategy: Use CSS/XPath for common elements, fallback to Playwright-specific selectors for dynamic elements.
________________________________________
Q6. When should you use sendKeys() and sendKeys() from Actions Class?
Answer:
•	sendKeys() on WebElement → For typing in input fields.
•	Actions.sendKeys() → For keyboard events (e.g., shortcuts, global keys).
________________________________________
Q7. How does WebDriverWait for urlToBe() and TitleIs() differ?
Answer:
•	urlToBe() waits until the current URL matches the expected.
•	titleIs() waits until the page title matches the expected.
________________________________________
Q8. How do you handle SSL certificate errors using Selenium WebDriver?
Answer:
•	Use ChromeOptions:
Java
ChromeOptions options = new ChromeOptions();
options.setAcceptInsecureCerts(true);
WebDriver driver = new ChromeDriver(options);
Show more lines
________________________________________
Q9. How do you handle dynamic dropdowns and select options using Selenium WebDriver?
Answer:
•	Use Select class for <select> tags.
•	For custom dropdowns, click parent element and select child using XPath.
________________________________________
Q10. How do you manage AutoFill Fields and validate the options listed?
Answer:
•	Capture suggestions using findElements() on dropdown list.
•	Validate expected options against actual list.
________________________________________
Q11. When should you find a URL and validate its existence on a web page? What are hidden links?
Answer:
•	Validate URLs during link integrity testing.
•	Hidden links: Present in DOM but not visible (CSS display:none).
________________________________________
Q12. Explain how you can switch back from a frame.
Answer:
Java
driver.switchTo().defaultContent();
Show more lines
________________________________________
Q13. What are different chromeOptions you have used and why?
Answer:
•	--headless → Run without UI.
•	--disable-notifications → Block pop-ups.
•	--incognito → Private mode.
________________________________________
Q14. How to move from one window to another and create a new blank window (tab)?
Answer:
Java
driver.switchTo().newWindow(WindowType.TAB);
``
Show more lines
________________________________________
Q15. Why getAttribute is used? How is it different from getDomAttribute and getDomProperty?
Answer:
•	getAttribute() → Fetches attribute value from HTML.
•	getDomAttribute() → Fetches DOM attribute.
•	getDomProperty() → Fetches DOM property.
________________________________________
Q16. If there are multiple similar elements then how does WebDriver identify them?
Answer:
•	It picks the first matching element unless you use findElements().
________________________________________
Q17. How are frames and iFrames identified?
Answer:
•	By id, name, or index:
Java
driver.switchTo().frame("frameName");
``
Show more lines
________________________________________
Q18. How to check the colour of an element?
Answer:
Java
String color = element.getCssValue("color");
Show more lines
________________________________________
Q19. Why do we have two different sendKeys?
Answer:
•	One for typing in fields, one for keyboard actions globally.
 
Q20. How to simulate network conditions in Selenium WebDriver?
Answer:
•	Use Chrome DevTools Protocol (CDP):
Java
((ChromeDriver) driver).executeCdpCommand("Network.emulateNetworkConditions", params);
Show more lines
 
Q21. If you do not accept an alert then what happens?
Answer:
•	The script will fail with UnhandledAlertException.
 
Q22. When to use hard assertions and soft assertions?
Answer:
•	Hard → Stop execution on failure.
•	Soft → Continue execution even if assertion fails.
 
Q23. Why do we use getAriaRole() and getAccessibleName()?
Answer:
•	For accessibility testing (ARIA compliance).
 
Q24. How to deselect a selected option?
Answer:
Java
Select select = new Select(element);
select.deselectByVisibleText("Option");
Show more lines
 
Q25. How to define page load strategies?
Answer:
Java
options.setPageLoadStrategy(PageLoadStrategy.EAGER);
Show more lines
 
Q26. How to interact with shadowRoot?
Answer:
Java
WebElement shadowHost = driver.findElement(By.cssSelector("#shadow-host"));
SearchContext shadowRoot = shadowHost.getShadowRoot();
WebElement elementInsideShadow = shadowRoot.findElement(By.cssSelector("#inside-shadow"));
Show more lines
 
Q27. List down the top exceptions and how you solved them in Selenium WebDriver?
Answer:
•	NoSuchElementException → Use explicit waits.
•	StaleElementReferenceException → Re-locate element.
•	TimeoutException → Increase wait time or fix locator.
 
Q28. What is a selector and a locator?
Answer:
•	Locator: Strategy to find element (By.id, By.xpath).
•	Selector: Actual value used (e.g., #username)
•	Q1. Medium-level problem (Arrays + Binary Search)
•	Problem:
Given a sorted array, find the index of a target element using Binary Search.
•	Explanation:
Binary Search divides the array into halves and checks the middle element until the target is found.
•	Java Code:
•	Java
•	public class BinarySearchExample {
•	public static int binarySearch(int[] arr, int target) {
•	int left = 0, right = arr.length - 1;
•	while (left <= right) {
•	int mid = left + (right - left) / 2;
•	if (arr[mid] == target) return mid;
•	if (arr[mid] < target) left = mid + 1;
•	else right = mid - 1;
•	}
•	return -1;
•	}
•	
•	public static void main(String[] args) {
•	int[] arr = {1, 3, 5, 7, 9};
•	System.out.println(binarySearch(arr, 7)); // Output: 3
•	}
•	}
•	Show more lines
•	Time Complexity: O(log n)
Space Complexity: O(1)
•	 
•	Q2. Shortest Path application on Graphs
•	Problem:
Find the shortest path in an unweighted graph using BFS.
•	Explanation:
BFS explores nodes level by level, ensuring the shortest path in an unweighted graph.
•	Java Code:
•	Java
•	import java.util.*;
•	
•	public class ShortestPathGraph {
•	public static void bfsShortestPath(Map<Integer, List<Integer>> graph, int start) {
•	Queue<Integer> queue = new LinkedList<>();
•	Map<Integer, Integer> distance = new HashMap<>();
•	queue.add(start);
•	distance.put(start, 0);
•	
•	while (!queue.isEmpty()) {
•	int node = queue.poll();
•	for (int neighbour : graph.get(node)) {
•	if (!distance.containsKey(neighbour)) {
•	distance.put(neighbour, distance.get(node) + 1);
•	queue.add(neighbour);
•	}
•	}
•	}
•	System.out.println("Distances: " + distance);
•	}
•	
•	public static void main(String[] args) {
•	Map<Integer, List<Integer>> graph = new HashMap<>();
•	graph.put(0, Arrays.asList(1, 2));
•	graph.put(1, Arrays.asList(0, 3));
•	graph.put(2, Arrays.asList(0, 3));
•	graph.put(3, Arrays.asList(1, 2));
•	bfsShortestPath(graph, 0);
•	}
•	}
•	Show more lines
•	Time Complexity: O(V + E)
Space Complexity: O(V)
•	 
•	Q3. Grid-based DP problem (Minimum Path Sum)
•	Problem:
Find the minimum path sum from top-left to bottom-right in a grid.
•	Explanation:
Use DP to store cumulative sums.
•	Java Code:
•	Java
•	public class MinPathSum {
•	public static int minPathSum(int[][] grid) {
•	int m = grid.length, n = grid[0].length;
•	for (int i = 1; i < m; i++) grid[i][0] += grid[i-1][0];
•	for (int j = 1; j < n; j++) grid[0][j] += grid[0][j-1];
•	for (int i = 1; i < m; i++) {
•	for (int j = 1; j < n; j++) {
•	grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);
•	}
•	}
•	return grid[m-1][n-1];
•	}
•	
•	public static void main(String[] args) {
•	int[][] grid = {{1,3,1},{1,5,1},{4,2,1}};
•	System.out.println(minPathSum(grid)); // Output: 7
•	}
•	}
•	Show more lines
•	Time Complexity: O(m*n)
Space Complexity: O(1)
•	________________________________________
•	Q4. Recursion + Backtracking (Generate Parentheses)
•	Problem:
Generate all valid parentheses combinations for n pairs.
•	Explanation:
Use recursion with constraints: open ≤ n, close ≤ open.
•	Java Code:
•	Java
•	import java.util.*;
•	
•	public class GenerateParentheses {
•	public static void generate(List<String> result, String current, int open, int close, int n) {
•	if (current.length() == n * 2) {
•	result.add(current);
•	return;
•	}
•	if (open < n) generate(result, current + "(", open + 1, close, n);
•	if (close < open) generate(result, current + ")", open, close + 1, n);
•	}
•	
•	public static void main(String[] args) {
•	List<String> result = new ArrayList<>();
•	generate(result, "", 0, 0, 3);
•	System.out.println(result);
•	}
•	}
•	Show more lines
•	Time Complexity: O(2^n)
Space Complexity: O(n)
•	 
•	Q5. Implement a data structure (Queue using two stacks)
•	Explanation:
Use two stacks: one for enqueue, one for dequeue.
•	Java Code:
•	Java
•	import java.util.*;
•	
•	public class QueueUsingStacks {
•	Stack<Integer> s1 = new Stack<>();
•	Stack<Integer> s2 = new Stack<>();
•	
•	public void enqueue(int x) {
•	s1.push(x);
•	}
•	
•	public int dequeue() {
•	if (s2.isEmpty()) {
•	while (!s1.isEmpty()) s2.push(s1.pop());
•	}
•	return s2.pop();
•	}
•	
•	public static void main(String[] args) {
•	QueueUsingStacks q = new QueueUsingStacks();
•	q.enqueue(1);
•	q.enqueue(2);
•	System.out.println(q.dequeue()); // Output: 1
•	}
•	}
•	``
•	Show more lines
•	Time Complexity: Amortised O(1)
Space Complexity: O(n)
•	 

What does getDomProperty() and getDomAttribute() do? Difference?
•	getDomProperty(): Fetches the current property value from the DOM (dynamic state).
•	getDomAttribute(): Fetches the attribute value as defined in the HTML markup. Difference:
Attributes are static (HTML), properties reflect the live DOM state. Example:
Java
WebElement element = driver.findElement(By.id("username"));
System.out.println(element.getDomProperty("value")); // Current value in DOM
System.out.println(element.getDomAttribute("value")); // Original HTML attribute
Show more lines
________________________________________
2. How to fetch all broken links with name and URL?
•	Get all <a> tags, extract href, send HTTP request, check status code. Example:
Java
List<WebElement> links = driver.findElements(By.tagName("a"));
for (WebElement link : links) {
String url = link.getAttribute("href");
HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
conn.setRequestMethod("HEAD");
if (conn.getResponseCode() >= 400) {
System.out.println("Broken link: " + link.getText() + " -> " + url);
}
}
Show more lines
________________________________________
3. How can you bypass Element Not Found without try-catch or custom exceptions?
•	Use WebDriverWait with ExpectedConditions:
Java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("submit")));
Show more lines
________________________________________
4. How do you switch between multiple browser windows?
Java
Set<String> windows = driver.getWindowHandles();
for (String win : windows) {
driver.switchTo().window(win);
}
``
Show more lines
________________________________________
5. Is it possible to use same locators in Selenium and Playwright? If not, what’s your strategy?
•	Not always possible because Playwright supports advanced selectors like text= and nth=.
•	Strategy: Use CSS/XPath for common elements, fallback to Playwright-specific selectors for dynamic elements.
________________________________________
6. When should you use sendKeys() vs sendKeys() from Actions class?
•	sendKeys() on WebElement → For typing in input fields.
•	Actions.sendKeys() → For keyboard events (e.g., shortcuts, global keys).
________________________________________
7. Difference between WebDriverWait for urlToBe() and TitleIs().
•	urlToBe() waits until the current URL matches the expected.
•	titleIs() waits until the page title matches the expected.
________________________________________
8. How do you handle SSL certificate errors using Selenium?
Java
ChromeOptions options = new ChromeOptions();
options.setAcceptInsecureCerts(true);
WebDriver driver = new ChromeDriver(options);
Show more lines
________________________________________
9. How do you handle dynamic dropdowns and select options?
•	Use Select class for <select> tags.
•	For custom dropdowns, click parent element and select child using XPath.

**Comprehensive Dropdown Handling:**

**Standard HTML Select:**
```java
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByVisibleText("United States");
dropdown.selectByValue("US");
dropdown.selectByIndex(2);
```

**Custom/Dynamic Dropdowns:**
```java
// Step 1: Click dropdown to open
driver.findElement(By.className("dropdown-toggle")).click();

// Step 2: Wait for options to load
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("dropdown-menu")));

// Step 3: Select option
List<WebElement> options = driver.findElements(By.xpath("//ul[@class='dropdown-menu']//li"));
for(WebElement option : options) {
    if(option.getText().equals("Target Option")) {
        option.click();
        break;
    }
}
```

**Ajax-Based Dropdowns:**
```java
// Type to trigger search
WebElement searchBox = driver.findElement(By.id("search-input"));
searchBox.sendKeys("New York");

// Wait for suggestions
wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("suggestions")));

// Select from suggestions
driver.findElement(By.xpath("//div[@class='suggestion'][text()='New York, NY']")).click();
```
________________________________________
10. How do you manage AutoFill fields and validate options?
•	Capture suggestions using findElements() on dropdown list.
•	Validate expected options against actual list.

**Complete AutoFill Management:**

**Handling AutoFill Suggestions:**
```java
// Type partial text to trigger autofill
WebElement inputField = driver.findElement(By.id("city-input"));
inputField.sendKeys("New");

// Wait for suggestions to appear
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("autocomplete-suggestions")));

// Capture all suggestions
List<WebElement> suggestions = driver.findElements(By.xpath("//div[@class='autocomplete-suggestions']//div"));
List<String> suggestionTexts = new ArrayList<>();
for(WebElement suggestion : suggestions) {
    suggestionTexts.add(suggestion.getText());
}

// Validate expected options
List<String> expectedOptions = Arrays.asList("New York", "New Jersey", "New Mexico");
Assert.assertTrue("Missing expected suggestions", suggestionTexts.containsAll(expectedOptions));

// Select specific option
for(WebElement suggestion : suggestions) {
    if(suggestion.getText().equals("New York")) {
        suggestion.click();
        break;
    }
}
```

**Keyboard Navigation:**
```java
// Use arrow keys to navigate
inputField.sendKeys(Keys.ARROW_DOWN);
inputField.sendKeys(Keys.ARROW_DOWN);
inputField.sendKeys(Keys.ENTER);
```

**Validation Strategies:**
```java
// Validate suggestion count
Assert.assertEquals("Incorrect suggestion count", 5, suggestions.size());

// Validate suggestion order
Assert.assertEquals("First suggestion incorrect", "New York", suggestions.get(0).getText());

// Validate no duplicate suggestions
Set<String> uniqueSuggestions = new HashSet<>(suggestionTexts);
Assert.assertEquals("Duplicate suggestions found", suggestionTexts.size(), uniqueSuggestions.size());
```
________________________________________
11. When should you find a URL and validate its existence? What are hidden links?
•	Validate URLs during link integrity testing.
•	Hidden links: Present in DOM but not visible (CSS display:none).
________________________________________
12. Explain how you can switch back from a frame.
Java
driver.switchTo().defaultContent();

Show more lines
________________________________________
13. What are different chromeOptions you have used and why?
•	--headless → Run without UI.
•	--disable-notifications → Block pop-ups.
•	--incognito → Private mode.

**Comprehensive ChromeOptions:**

**Performance Options:**
```java
ChromeOptions options = new ChromeOptions();

// Headless mode for CI/CD
options.addArguments("--headless");

// Disable images for faster loading
options.addArguments("--disable-images");

// Disable JavaScript (for specific tests)
options.addArguments("--disable-javascript");

// Set window size
options.addArguments("--window-size=1920,1080");
```

**Security & Privacy:**
```java
// Incognito mode
options.addArguments("--incognito");

// Disable web security (for testing)
options.addArguments("--disable-web-security");

// Accept insecure certificates
options.setAcceptInsecureCerts(true);

// Disable password manager
options.addArguments("--disable-password-manager-reauthentication");
```

**UI & Notifications:**
```java
// Disable notifications
options.addArguments("--disable-notifications");

// Disable pop-ups
options.addArguments("--disable-popup-blocking");

// Disable extensions
options.addArguments("--disable-extensions");

// Start maximized
options.addArguments("--start-maximized");
```

**Mobile Testing:**
```java
// Mobile emulation
Map<String, String> mobileEmulation = new HashMap<>();
mobileEmulation.put("deviceName", "iPhone X");
options.setExperimentalOption("mobileEmulation", mobileEmulation);
```

**Download Management:**
```java
// Set download directory
Map<String, Object> prefs = new HashMap<>();
prefs.put("download.default_directory", "/path/to/download");
options.setExperimentalOption("prefs", prefs);
```
________________________________________
14. How to move from one window to another and create a new blank tab?
Java
driver.switchTo().newWindow(WindowType.TAB);
Show more lines
________________________________________
15. Why is getAttribute used? How is it different from getDomAttribute and getDomProperty?
•	getAttribute() → Fetches attribute value from HTML.
•	getDomAttribute() → Fetches DOM attribute.
•	getDomProperty() → Fetches DOM property.
________________________________________
16. If there are multiple similar elements, how does WebDriver identify them?
•	It picks the first matching element unless you use findElements().
________________________________________
17. How are frames and iFrames identified?
•	By id, name, or index:
Java
driver.switchTo().frame("frameName");
Show more lines
________________________________________
18. How to check the colour of an element?
Java
String color = element.getCssValue("color");
Show more lines
________________________________________
19. Why do we have two different sendKeys methods?
•	One for typing in fields, one for keyboard actions globally.
________________________________________
20. How to simulate network conditions in Selenium?
•	Use Chrome DevTools Protocol (CDP):
Java
((ChromeDriver) driver).executeCdpCommand("Network.emulateNetworkConditions", params);
Show more lines

**Complete Network Simulation:**

**Basic Network Emulation:**
```java
// Simulate slow 3G
Map<String, Object> networkConditions = new HashMap<>();
networkConditions.put("offline", false);
networkConditions.put("downloadThroughput", 500 * 1024); // 500 KB/s
networkConditions.put("uploadThroughput", 500 * 1024);
networkConditions.put("latency", 400); // 400ms latency

((ChromeDriver) driver).executeCdpCommand("Network.emulateNetworkConditions", networkConditions);
```

**Offline Mode:**
```java
// Simulate offline
Map<String, Object> offlineMode = new HashMap<>();
offlineMode.put("offline", true);
offlineMode.put("downloadThroughput", 0);
offlineMode.put("uploadThroughput", 0);
offlineMode.put("latency", 0);

((ChromeDriver) driver).executeCdpCommand("Network.emulateNetworkConditions", offlineMode);
```

**Predefined Network Profiles:**
```java
public class NetworkProfiles {
    public static Map<String, Object> SLOW_3G() {
        Map<String, Object> conditions = new HashMap<>();
        conditions.put("offline", false);
        conditions.put("downloadThroughput", 500 * 1024);
        conditions.put("uploadThroughput", 500 * 1024);
        conditions.put("latency", 400);
        return conditions;
    }
    
    public static Map<String, Object> FAST_3G() {
        Map<String, Object> conditions = new HashMap<>();
        conditions.put("offline", false);
        conditions.put("downloadThroughput", 1.6 * 1024 * 1024);
        conditions.put("uploadThroughput", 750 * 1024);
        conditions.put("latency", 150);
        return conditions;
    }
}
```

**Reset Network Conditions:**
```java
// Reset to normal
Map<String, Object> normalNetwork = new HashMap<>();
normalNetwork.put("offline", false);
normalNetwork.put("downloadThroughput", -1);
normalNetwork.put("uploadThroughput", -1);
normalNetwork.put("latency", 0);

((ChromeDriver) driver).executeCdpCommand("Network.emulateNetworkConditions", normalNetwork);
```
________________________________________
21. What happens if you do not accept an alert?
•	The script will fail with UnhandledAlertException.
 
22. When to use hard assertions vs soft assertions?
•	Hard → Stop execution on failure.
•	Soft → Continue execution even if assertion fails.

**Detailed Assertion Strategy:**

**Hard Assertions (TestNG/JUnit):**
```java
// Stops execution immediately on failure
Assert.assertEquals(actualTitle, expectedTitle, "Page title mismatch");
Assert.assertTrue(loginButton.isDisplayed(), "Login button not visible");
```

**Use Hard Assertions When:**
- Critical functionality that blocks further testing
- Pre-conditions that must pass for test to continue
- Login/authentication failures
- Database connection issues
- Environment setup validations

**Soft Assertions (TestNG):**
```java
SoftAssert softAssert = new SoftAssert();

// Continue execution even if these fail
softAssert.assertEquals(headerText, "Welcome", "Header text incorrect");
softAssert.assertTrue(footerLinks.size() > 0, "Footer links missing");
softAssert.assertEquals(pageColor, "blue", "Page color incorrect");

// Must call assertAll() at the end
softAssert.assertAll();
```

**Use Soft Assertions When:**
- UI validation (colors, fonts, layout)
- Multiple independent checks on same page
- Data validation across multiple fields
- Non-critical functionality testing
- Comprehensive page validation

**Best Practices:**
```java
// Combine both approaches
public void validateLoginPage() {
    // Hard assertion for critical elements
    Assert.assertTrue(usernameField.isDisplayed(), "Username field missing");
    Assert.assertTrue(passwordField.isDisplayed(), "Password field missing");
    
    // Soft assertions for UI elements
    SoftAssert soft = new SoftAssert();
    soft.assertEquals(pageTitle, "Login Page", "Title incorrect");
    soft.assertTrue(rememberMeCheckbox.isDisplayed(), "Remember me missing");
    soft.assertEquals(loginButton.getText(), "Sign In", "Button text wrong");
    soft.assertAll();
}
```
 
23. Why do we use getAriaRole() and getAccessibleName()?
•	For accessibility testing (ARIA compliance).
 
24. How to deselect a selected option?
Java
Select select = new Select(element);
select.deselectByVisibleText("Option");
Show more lines
 
25. How to define page load strategies?
Java
options.setPageLoadStrategy(PageLoadStrategy.EAGER);
Show more lines
 
26. How to interact with shadowRoot?
Java
WebElement shadowHost = driver.findElement(By.cssSelector("#shadow-host"));
SearchContext shadowRoot = shadowHost.getShadowRoot();
WebElement elementInsideShadow = shadowRoot.findElement(By.cssSelector("#inside-shadow"));
Show more lines
 
27. List top exceptions and how you solved them.
•	NoSuchElementException → Use explicit waits.
•	StaleElementReferenceException → Re-locate element.
•	TimeoutException → Increase wait time or fix locator.

**Complete Exception Handling Guide:**

**1. NoSuchElementException:**
```java
// Problem: Element not found
// Solution: Use explicit waits
try {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("submit")));
    element.click();
} catch (TimeoutException e) {
    System.out.println("Element not found within timeout period");
}
```

**2. StaleElementReferenceException:**
```java
// Problem: Element reference is stale after DOM refresh
// Solution: Re-locate element
public WebElement getElement(By locator) {
    try {
        return driver.findElement(locator);
    } catch (StaleElementReferenceException e) {
        return driver.findElement(locator); // Re-locate
    }
}
```

**3. TimeoutException:**
```java
// Problem: Wait condition not met within timeout
// Solution: Increase timeout or fix condition
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30)); // Increased timeout
wait.until(ExpectedConditions.elementToBeClickable(By.id("slow-loading-button")));
```

**4. ElementNotInteractableException:**
```java
// Problem: Element exists but not interactable
// Solution: Wait for element to be clickable
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));
button.click();
```

**5. UnhandledAlertException:**
```java
// Problem: Unexpected alert present
// Solution: Handle alert before proceeding
try {
    driver.findElement(By.id("submit")).click();
} catch (UnhandledAlertException e) {
    Alert alert = driver.switchTo().alert();
    alert.accept();
    driver.findElement(By.id("submit")).click();
}
```

**6. WebDriverException:**
```java
// Problem: General WebDriver issues
// Solution: Restart driver or check browser state
try {
    driver.get("https://example.com");
} catch (WebDriverException e) {
    driver.quit();
    driver = new ChromeDriver(); // Restart driver
    driver.get("https://example.com");
}
```

**Generic Exception Handler:**
```java
public void safeClick(By locator) {
    int attempts = 0;
    while (attempts < 3) {
        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));
            element.click();
            break;
        } catch (StaleElementReferenceException | ElementNotInteractableException e) {
            attempts++;
            if (attempts >= 3) throw e;
        }
    }
}
```
 
28. What is a selector vs a locator?
•	Locator: Strategy to find element (By.id, By.xpath).
•	Selector: Actual value used (e.g., #username).
 


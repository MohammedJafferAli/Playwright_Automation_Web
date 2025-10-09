import { test, expect } from "@playwright/test";

test("Handle Calendar", async ({ page }) => {
    const dateToSelect = "01-March-2024";
    const [day, month, year] = dateToSelect.split('-');

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    
    // Navigate to decade view
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    // Navigate to target year
    while (true) {
        const yearExists = await page.locator(".react-calendar__decade-view button", { hasText: year }).count();
        if (yearExists > 0) {
            await page.locator(".react-calendar__decade-view button", { hasText: year }).click();
            break;
        }
        
        const decadeLabel = await page.locator('.react-calendar__navigation__label__labelText').textContent();
        const startYear = parseInt(decadeLabel.split(' – ')[0]);
        
        if (parseInt(year) < startYear) {
            await page.locator('.react-calendar__navigation__prev-button').click();
        } else {
            await page.locator('.react-calendar__navigation__next-button').click();
        }
    }

    // Select month and date
    await page.locator(".react-calendar__year-view button", { hasText: month }).click();
    await page.getByRole('button', { name: `${month} ${parseInt(day)},` }).click();

    // Validate date selection
    const monthNum = new Date(`${month} 1, 2024`).getMonth() + 1;
    const expectedFormat = `${year}-${monthNum.toString().padStart(2, '0')}-${day.padStart(2, '0')}`;
    
    await expect(page.locator('input[name="date"]')).toHaveValue(expectedFormat);
})
import { test, expect } from "@playwright/test";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

test.describe("Web Table Excel Operations - TDD", () => {
    
    test("should download table file successfully", async ({ page }) => {
        const downloadPath = path.join(process.cwd(), "downloads");
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        
        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        
        const filePath = await downloadTable(page, downloadPath);
        
        expect(fs.existsSync(filePath)).toBeTruthy();
        expect(filePath).toContain('.xlsx');
        
        // Cleanup
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    test("should find fruit by name in Excel", async ({ page }) => {
        const downloadPath = path.join(process.cwd(), "downloads");
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        
        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        const filePath = await downloadTable(page, downloadPath);
        
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(1);
        
        const columnMap = getColumnMapping(worksheet);
        const mangoRow = findFruitByName(worksheet, "Mango", columnMap.name);
        
        expect(mangoRow).toBeGreaterThan(0);
        expect(columnMap.name).toBeDefined();
        
        // Cleanup
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    test("should update single fruit property", async ({ page }) => {
        const downloadPath = path.join(process.cwd(), "downloads");
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        
        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        const filePath = await downloadTable(page, downloadPath);
        
        await updateFruitData(filePath, "Mango", { price: "350" });
        
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(1);
        const columnMap = getColumnMapping(worksheet);
        const mangoRow = findFruitByName(worksheet, "Mango", columnMap.name);
        
        const priceCell = worksheet.getCell(mangoRow, columnMap.price);
        expect(priceCell.value).toBe(350);
        
        // Cleanup
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    test("should update multiple fruit properties", async ({ page }) => {
        const downloadPath = path.join(process.cwd(), "downloads");
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        
        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        const filePath = await downloadTable(page, downloadPath);
        
        await updateFruitData(filePath, "Apple", { 
            price: "400", 
            color: "Green", 
            season: "All Year" 
        });
        
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(1);
        const columnMap = getColumnMapping(worksheet);
        const appleRow = findFruitByName(worksheet, "Apple", columnMap.name);
        
        expect(worksheet.getCell(appleRow, columnMap.price).value).toBe(400);
        expect(worksheet.getCell(appleRow, columnMap.color).value).toBe("Green");
        expect(worksheet.getCell(appleRow, columnMap.season).value).toBe("All Year");
        
        // Cleanup
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    test("should throw error for non-existent fruit", async ({ page }) => {
        const downloadPath = path.join(process.cwd(), "downloads");
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        
        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        const filePath = await downloadTable(page, downloadPath);
        
        await expect(async () => {
            await updateFruitData(filePath, "NonExistentFruit", { price: "100" });
        }).rejects.toThrow("Fruit 'NonExistentFruit' not found in the Excel file");
        
        // Cleanup
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    test("should upload and verify updated data on website", async ({ page }) => {
        const downloadPath = path.join(process.cwd(), "downloads");
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        
        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        const filePath = await downloadTable(page, downloadPath);
        
        await updateFruitData(filePath, "Banana", { price: "150" });
        await uploadFile(page, filePath);
        await verifyUpdatedPrice(page, "Banana", "150");
        
        // Cleanup
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    test("should handle case-insensitive fruit search", async ({ page }) => {
        const downloadPath = path.join(process.cwd(), "downloads");
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        
        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        const filePath = await downloadTable(page, downloadPath);
        
        await updateFruitData(filePath, "MANGO", { price: "275" });
        await updateFruitData(filePath, "mango", { color: "Orange" });
        
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(1);
        const columnMap = getColumnMapping(worksheet);
        const mangoRow = findFruitByName(worksheet, "Mango", columnMap.name);
        
        expect(worksheet.getCell(mangoRow, columnMap.price).value).toBe(275);
        expect(worksheet.getCell(mangoRow, columnMap.color).value).toBe("Orange");
        
        // Cleanup
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
});

// Helper functions (same as main test)
async function downloadTable(page, downloadPath) {
    const downloadPromise = page.waitForEvent('download');
    await page.click('#downloadButton');
    const download = await downloadPromise;
    
    const fileName = download.suggestedFilename() || 'download.xlsx';
    const filePath = path.join(downloadPath, fileName);
    await download.saveAs(filePath);
    
    return filePath;
}

async function updateFruitData(filePath, fruitName, updates) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    
    const columnMap = getColumnMapping(worksheet);
    const fruitRow = findFruitByName(worksheet, fruitName, columnMap.name);
    
    if (fruitRow === -1) {
        throw new Error(`Fruit '${fruitName}' not found in the Excel file`);
    }
    
    Object.entries(updates).forEach(([field, value]) => {
        const columnIndex = columnMap[field.toLowerCase()];
        if (columnIndex) {
            const cell = worksheet.getCell(fruitRow, columnIndex);
            cell.value = isNaN(value) ? value : parseInt(value);
        }
    });
    
    await workbook.xlsx.writeFile(filePath);
}

function getColumnMapping(worksheet) {
    const headerRow = worksheet.getRow(1);
    const mapping = {};
    
    headerRow.eachCell((cell, colNumber) => {
        const header = cell.value?.toString().toLowerCase();
        if (header === 'fruit name') mapping.name = colNumber;
        else if (header === 'price') mapping.price = colNumber;
        else if (header === 'color') mapping.color = colNumber;
        else if (header === 'season') mapping.season = colNumber;
    });
    
    return mapping;
}

function findFruitByName(worksheet, fruitName, nameColumn) {
    let foundRow = -1;
    
    if (!nameColumn) {
        return foundRow;
    }
    
    worksheet.eachRow((row, rowNumber) => {
        if (row.hasValues) {
            const cell = row.getCell(nameColumn);
            if (cell.value?.toString().toLowerCase() === fruitName.toLowerCase()) {
                foundRow = rowNumber;
            }
        }
    });
    
    return foundRow;
}

async function uploadFile(page, filePath) {
    await page.setInputFiles('#fileinput', filePath);
    await page.waitForTimeout(2000);
}

async function verifyUpdatedPrice(page, fruitName, expectedPrice) {
    const fruitRow = page.locator('.rdt_TableRow').filter({ 
        has: page.locator('.rdt_TableCell').filter({ hasText: fruitName })
    });
    
    const priceCell = fruitRow.locator('.rdt_TableCell').nth(3);
    await expect(priceCell).toContainText(expectedPrice);
}
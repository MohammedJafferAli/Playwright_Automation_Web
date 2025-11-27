import { test, expect } from "@playwright/test";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";


class FileManager {
    static ensureDirectory(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    static cleanup(filePath) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
}

class ExcelHandler {
    static async readWorkbook(filePath) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        return workbook.getWorksheet(1);
    }

    static getColumnMapping(worksheet) {
        const headerRow = worksheet.getRow(1);
        const mapping = {};

        headerRow.eachCell((cell, colNumber) => {
            const header = cell.value?.toString().toLowerCase().trim();
            if (header.includes('fruit') || header.includes('name')) mapping.name = colNumber;
            else if (header.includes('price')) mapping.price = colNumber;
            else if (header.includes('color')) mapping.color = colNumber;
            else if (header.includes('season')) mapping.season = colNumber;
        });

        return mapping;
    }

    static findFirstFruit(worksheet, columnMap) {
        let firstFruit = null;
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1 && row.hasValues && !firstFruit) {
                const nameCol = columnMap.name || 1;
                const cell = row.getCell(nameCol);
                if (cell.value) {
                    firstFruit = cell.value.toString();
                }
            }
        });
        return firstFruit;
    }

    static findFruitByName(worksheet, fruitName, nameColumn) {
        let foundRow = -1;
        if (!nameColumn) return foundRow;

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
}

class TestSetup {
    static async setupTest(page) {
        const downloadPath = path.join(process.cwd(), "downloads");
        FileManager.ensureDirectory(downloadPath);
        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        return downloadPath;
    }

    static async downloadAndGetFirstFruit(page, downloadPath) {
        const filePath = await downloadTable(page, downloadPath);
        const worksheet = await ExcelHandler.readWorkbook(filePath);
        const columnMap = ExcelHandler.getColumnMapping(worksheet);
        const firstFruit = ExcelHandler.findFirstFruit(worksheet, columnMap);
        return { filePath, firstFruit, worksheet, columnMap };
    }
}

test.describe("Web Table Excel Operations - TDD", () => {

    test("should download table file successfully", async ({ page }) => {
        const downloadPath = await TestSetup.setupTest(page);
        const filePath = await downloadTable(page, downloadPath);

        expect(fs.existsSync(filePath)).toBeTruthy();
        expect(filePath).toContain('.xlsx');

        FileManager.cleanup(filePath);
    });

    test("should find fruit by name in Excel", async ({ page }) => {
        const downloadPath = await TestSetup.setupTest(page);
        const { filePath, firstFruit, worksheet } = await TestSetup.downloadAndGetFirstFruit(page, downloadPath);

        expect(worksheet.rowCount).toBeGreaterThan(1);
        expect(firstFruit).toBeTruthy();

        FileManager.cleanup(filePath);
    });

    test("should update single fruit property", async ({ page }) => {
        const downloadPath = await TestSetup.setupTest(page);
        const { filePath, firstFruit } = await TestSetup.downloadAndGetFirstFruit(page, downloadPath);

        await updateFruitData(filePath, firstFruit, { price: "350" });

        const worksheet = await ExcelHandler.readWorkbook(filePath);
        const columnMap = ExcelHandler.getColumnMapping(worksheet);
        const fruitRow = ExcelHandler.findFruitByName(worksheet, firstFruit, columnMap.name || 1);
        const priceCol = columnMap.price || 2;
        const priceCell = worksheet.getCell(fruitRow, priceCol);
        
        expect(priceCell.value).toBe(350);
        FileManager.cleanup(filePath);
    });

    test("should update multiple fruit properties", async ({ page }) => {
        const downloadPath = await TestSetup.setupTest(page);
        const { filePath, firstFruit } = await TestSetup.downloadAndGetFirstFruit(page, downloadPath);

        await updateFruitData(filePath, firstFruit, { price: "400" });

        const worksheet = await ExcelHandler.readWorkbook(filePath);
        const columnMap = ExcelHandler.getColumnMapping(worksheet);
        const fruitRow = ExcelHandler.findFruitByName(worksheet, firstFruit, columnMap.name || 1);
        const priceCol = columnMap.price || 2;
        
        expect(worksheet.getCell(fruitRow, priceCol).value).toBe(400);
        FileManager.cleanup(filePath);
    });

    test("should throw error for non-existent fruit", async ({ page }) => {
        const downloadPath = await TestSetup.setupTest(page);
        const filePath = await downloadTable(page, downloadPath);

        await expect(async () => {
            await updateFruitData(filePath, "NonExistentFruit", { price: "100" });
        }).rejects.toThrow("Fruit 'NonExistentFruit' not found in the Excel file");

        FileManager.cleanup(filePath);
    });

    test("should upload and verify updated data on website", async ({ page }) => {
        const downloadPath = await TestSetup.setupTest(page);
        const { filePath, firstFruit } = await TestSetup.downloadAndGetFirstFruit(page, downloadPath);

        await updateFruitData(filePath, firstFruit, { price: "150" });
        await uploadFile(page, filePath);
        await verifyUpdatedPrice(page, firstFruit, "150");

        FileManager.cleanup(filePath);
    });
});

// Utility functions
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

    const columnMap = ExcelHandler.getColumnMapping(worksheet);
    const fruitRow = ExcelHandler.findFruitByName(worksheet, fruitName, columnMap.name);

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

async function uploadFile(page, filePath) {
    await page.setInputFiles('#fileinput', filePath);
    await page.waitForTimeout(2000);
}

async function verifyUpdatedPrice(page, fruitName, expectedPrice) {
    await page.waitForTimeout(1000);
    
    const rows = await page.locator('table tr');
    const rowCount = await rows.count();
    
    for (let i = 1; i < rowCount; i++) {
        const row = rows.nth(i);
        const nameCell = await row.locator('td').first().textContent();
        
        if (nameCell?.toLowerCase().includes(fruitName.toLowerCase())) {
            const priceCell = await row.locator('td').nth(1).textContent();
            expect(priceCell).toContain(expectedPrice);
            return;
        }
    }
    
    throw new Error(`Fruit ${fruitName} not found in web table`);
}

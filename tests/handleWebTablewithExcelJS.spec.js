import { test, expect } from "@playwright/test";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

test("Handle web table with ExcelJS", async ({ page }) => {
    const searchFruit = "Mango";
    const newPrice = "350";
    const downloadPath = path.join(process.cwd(), "downloads");
    
    // Ensure download directory exists
    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath, { recursive: true });
    }
    
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    
    // Download the table
    const filePath = await downloadTable(page, downloadPath);
    
    // Verify downloaded file exists
    expect(fs.existsSync(filePath)).toBeTruthy();
    
    // Update Mango price to 350 in Excel
    await updateFruitData(filePath, searchFruit, { price: newPrice });
    
    // Upload the modified file
    await uploadFile(page, filePath);
    
    // Verify the updated value is reflected on the website
    await verifyUpdatedPrice(page, searchFruit, newPrice);
    
    // Cleanup
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
});

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
    
    // Update specified fields
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
    // Wait for upload to complete
    await page.waitForTimeout(2000);
}

async function verifyUpdatedPrice(page, fruitName, expectedPrice) {
    // Find the row containing the fruit
    const fruitRow = page.locator('.rdt_TableRow').filter({ 
        has: page.locator('.rdt_TableCell').filter({ hasText: fruitName })
    });
    
    // Get the price cell from that row (4th column)
    const priceCell = fruitRow.locator('.rdt_TableCell').nth(3);
    
    await expect(priceCell).toContainText(expectedPrice);
}


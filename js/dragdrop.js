// drag-drop.spec.js
// Playwright tests for all 5 drag-and-drop patterns in drag-drop-playground.html
// Run: npx playwright test drag-drop.spec.js
// Docs: https://playwright.dev/docs/input#drag-and-drop

import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGE_URL = `file://${path.resolve(__dirname, 'drag-drop-playground.html')}`;

test.describe('Pattern 01 — Basic Drag Between Zones', () => {

    test('drag item from Zone A to Zone B using dragTo()', async ({ page }) => {
        await page.goto(PAGE_URL);

        const item = page.getByTestId('item-alpha');
        const zoneB = page.getByTestId('drop-zone-b');

        await item.dragTo(zoneB);

        // Alpha should now be inside Zone B
        await expect(zoneB.getByTestId('item-alpha')).toBeVisible();
    });

    test('drag item using manual mouse events (hover → down → move → up)', async ({ page }) => {
        await page.goto(PAGE_URL);

        const item = page.getByTestId('item-beta');
        const zoneB = page.getByTestId('drop-zone-b');

        const srcBox = await item.boundingBox();
        const dstBox = await zoneB.boundingBox();

        await page.mouse.move(srcBox.x + srcBox.width / 2, srcBox.y + srcBox.height / 2);
        await page.mouse.down();

        // Move in small increments to simulate real user drag
        const steps = 20;
        const startX = srcBox.x + srcBox.width / 2;
        const startY = srcBox.y + srcBox.height / 2;
        const endX = dstBox.x + dstBox.width / 2;
        const endY = dstBox.y + dstBox.height / 2;

        for (let i = 1; i <= steps; i++) {
            await page.mouse.move(
                startX + (endX - startX) * (i / steps),
                startY + (endY - startY) * (i / steps),
            );
        }

        await page.mouse.up();

        await expect(zoneB.getByTestId('item-beta')).toBeVisible();
    });

    test('drag multiple items to Zone B sequentially', async ({ page }) => {
        await page.goto(PAGE_URL);

        const zoneB = page.getByTestId('drop-zone-b');

        for (const id of ['item-alpha', 'item-beta', 'item-gamma']) {
            await page.getByTestId(id).dragTo(zoneB);
        }

        await expect(zoneB.getByTestId('item-alpha')).toBeVisible();
        await expect(zoneB.getByTestId('item-beta')).toBeVisible();
        await expect(zoneB.getByTestId('item-gamma')).toBeVisible();

        // Zone A should be empty
        const zoneA = page.getByTestId('drop-zone-a');
        await expect(zoneA.getByTestId('item-alpha')).toHaveCount(0);
    });

    test('drag item back from Zone B to Zone A', async ({ page }) => {
        await page.goto(PAGE_URL);

        const item = page.getByTestId('item-alpha');
        const zoneA = page.getByTestId('drop-zone-a');
        const zoneB = page.getByTestId('drop-zone-b');

        await item.dragTo(zoneB);
        await expect(zoneB.getByTestId('item-alpha')).toBeVisible();

        await zoneB.getByTestId('item-alpha').dragTo(zoneA);
        await expect(zoneA.getByTestId('item-alpha')).toBeVisible();
    });

});


test.describe('Pattern 02 — Sortable List Reorder', () => {

    test('drag first item to last position', async ({ page }) => {
        await page.goto(PAGE_URL);

        const item1 = page.getByTestId('sort-item-1');
        const item5 = page.getByTestId('sort-item-5');

        await item1.dragTo(item5);

        // After drag, item1 should appear after item5 (below it)
        // Verify by checking DOM order via evaluate
        const order = await page.evaluate(() => {
            return Array.from(
                document.getElementById('sortable-list').querySelectorAll('[data-testid]')
            ).map(el => el.dataset.testid);
        });

        expect(order.indexOf('sort-item-1')).toBeGreaterThan(order.indexOf('sort-item-5'));
    });

    test('drag middle item to top', async ({ page }) => {
        await page.goto(PAGE_URL);

        const item3 = page.getByTestId('sort-item-3');
        const item1 = page.getByTestId('sort-item-1');

        // Drag above item1 by targeting its top edge
        const box = await item1.boundingBox();
        await item3.dragTo(item1, {
            targetPosition: { x: box.width / 2, y: 2 }, // top edge
        });

        const order = await page.evaluate(() =>
            Array.from(
                document.getElementById('sortable-list').querySelectorAll('[data-testid]')
            ).map(el => el.dataset.testid)
        );

        expect(order.indexOf('sort-item-3')).toBeLessThan(order.indexOf('sort-item-1'));
    });

});


test.describe('Pattern 03 — Kanban Board', () => {

    test('move card from Todo to In Progress', async ({ page }) => {
        await page.goto(PAGE_URL);

        const card = page.getByTestId('kanban-card-1');
        const wip = page.getByTestId('kanban-col-wip');

        await card.dragTo(wip);

        await expect(wip.getByTestId('kanban-card-1')).toBeVisible();

        // Count badge should update
        await expect(page.getByTestId('kanban-todo-count')).toHaveText('2');
        await expect(page.getByTestId('kanban-wip-count')).toHaveText('2');
    });

    test('move card from Todo to Done', async ({ page }) => {
        await page.goto(PAGE_URL);

        const card = page.getByTestId('kanban-card-2');
        const done = page.getByTestId('kanban-col-done');

        await card.dragTo(done);

        await expect(done.getByTestId('kanban-card-2')).toBeVisible();
        await expect(page.getByTestId('kanban-done-count')).toHaveText('1');
    });

    test('move all Todo cards to Done', async ({ page }) => {
        await page.goto(PAGE_URL);

        const done = page.getByTestId('kanban-col-done');

        for (const id of ['kanban-card-1', 'kanban-card-2', 'kanban-card-3']) {
            await page.getByTestId(id).dragTo(done);
        }

        await expect(page.getByTestId('kanban-todo-count')).toHaveText('0');
        await expect(page.getByTestId('kanban-done-count')).toHaveText('3');
    });

    test('move wip card back to todo', async ({ page }) => {
        await page.goto(PAGE_URL);

        const card = page.getByTestId('kanban-card-4'); // starts in wip
        const todo = page.getByTestId('kanban-col-todo');

        await card.dragTo(todo);

        await expect(todo.getByTestId('kanban-card-4')).toBeVisible();
        await expect(page.getByTestId('kanban-wip-count')).toHaveText('0');
    });

});


test.describe('Pattern 04 — File Drop Zone', () => {

    test('simulate file drop with DataTransfer API', async ({ page }) => {
        await page.goto(PAGE_URL);

        const dropZone = page.getByTestId('file-drop-zone');

        // Playwright approach: dispatch dragover + drop with a DataTransfer object
        await dropZone.dispatchEvent('dragover', {
            dataTransfer: await page.evaluateHandle(() => {
                const dt = new DataTransfer();
                return dt;
            }),
        });

        await dropZone.dispatchEvent('drop', {
            dataTransfer: await page.evaluateHandle(() => {
                const dt = new DataTransfer();
                // Simulate empty files list — the page handles this case gracefully
                return dt;
            }),
        });

        // The page adds a simulated file entry when files.length === 0
        await expect(page.getByTestId('file-list').locator('.file-entry')).toBeVisible();
    });

    test('click drop zone adds a fake file entry', async ({ page }) => {
        await page.goto(PAGE_URL);

        await page.getByTestId('file-drop-zone').click();

        const entries = page.getByTestId('file-list').locator('.file-entry');
        await expect(entries).toHaveCount(1);
    });

    test('multiple clicks accumulate file entries', async ({ page }) => {
        await page.goto(PAGE_URL);

        const zone = page.getByTestId('file-drop-zone');
        await zone.click();
        await zone.click();
        await zone.click();

        const entries = page.getByTestId('file-list').locator('.file-entry');
        await expect(entries).toHaveCount(3);
    });

    test('simulate real file drop using page.evaluate + createObjectURL', async ({ page }) => {
        await page.goto(PAGE_URL);

        // Inject a real File into the drop event
        await page.evaluate(() => {
            const zone = document.getElementById('file-drop');
            const file = new File(['hello world'], 'playwright-test.txt', { type: 'text/plain' });
            const dt = new DataTransfer();
            dt.items.add(file);
            const event = new DragEvent('drop', { bubbles: true, dataTransfer: dt });
            zone.dispatchEvent(event);
        });

        const entry = page.locator('[data-testid^="file-entry-playwright"]');
        await expect(entry).toBeVisible();
    });

});


test.describe('Pattern 05 — Grid Tile Reorder', () => {

    test('swap two adjacent tiles using dragTo()', async ({ page }) => {
        await page.goto(PAGE_URL);

        const cell0 = page.getByTestId('grid-cell-0');
        const cell1 = page.getByTestId('grid-cell-1');

        const before0 = await cell0.textContent();
        const before1 = await cell1.textContent();

        await cell0.dragTo(cell1);

        const after0 = await cell0.textContent();
        const after1 = await cell1.textContent();

        // Content should be swapped
        expect(after0?.trim()).toBe(before1?.trim());
        expect(after1?.trim()).toBe(before0?.trim());
    });

    test('swap two non-adjacent tiles', async ({ page }) => {
        await page.goto(PAGE_URL);

        const cell0 = page.getByTestId('grid-cell-0');
        const cell15 = page.getByTestId('grid-cell-15');

        const before0 = await cell0.textContent();
        const before15 = await cell15.textContent();

        await cell0.dragTo(cell15);

        expect((await cell0.textContent())?.trim()).toBe(before15?.trim());
        expect((await cell15.textContent())?.trim()).toBe(before0?.trim());
    });

    test('chain swaps — three sequential drags', async ({ page }) => {
        await page.goto(PAGE_URL);

        await page.getByTestId('grid-cell-0').dragTo(page.getByTestId('grid-cell-3'));
        await page.getByTestId('grid-cell-3').dragTo(page.getByTestId('grid-cell-7'));
        await page.getByTestId('grid-cell-7').dragTo(page.getByTestId('grid-cell-15'));

        // At least verify none of the cells are empty after chained swaps
        for (let i = 0; i < 16; i++) {
            const cell = page.getByTestId(`grid-cell-${i}`);
            await expect(cell).not.toBeEmpty();
        }
    });

});


test.describe('Event Log', () => {

    test('log entries appear after drag', async ({ page }) => {
        await page.goto(PAGE_URL);

        await page.getByTestId('item-alpha').dragTo(page.getByTestId('drop-zone-b'));

        const log = page.getByTestId('log-entries');
        await expect(log.locator('.log-entry')).toHaveCount({ greaterThan: 0 });
    });

    test('clear button empties the log', async ({ page }) => {
        await page.goto(PAGE_URL);

        await page.getByTestId('item-alpha').dragTo(page.getByTestId('drop-zone-b'));
        await page.getByTestId('log-clear').click();

        await expect(page.getByTestId('log-entries').locator('.log-entry')).toHaveCount(0);
    });

});
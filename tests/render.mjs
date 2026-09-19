import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, readdir } from 'node:fs/promises';
import { createServer } from 'node:net';
import { join } from 'node:path';
import { chromium } from 'playwright';

const previewPort = await new Promise((resolve, reject) => {
  const server = createServer();
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => {
    const address = server.address();
    server.close((error) => error ? reject(error) : resolve(address.port));
  });
});
const origin = `http://127.0.0.1:${previewPort}`;
const prototypePages = ['synthese', 'exercices', 'formulaire', 'examens'].map(
  (document) => `prototype/test101/${document}`,
);
const courseDocuments = ['synthese.md', 'exercices.md', 'formulaire.md', 'examens.md'];
const courses = ['mathematiques', 'microeconomie', 'chimie', 'statistiques', 'allemand'];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablette', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

for (const course of courses) {
  const files = await readdir(join('src/content/docs/cours', course));
  assert.deepEqual(
    files.sort(),
    ['index.md', ...courseDocuments].sort(),
    `${course} doit contenir une page d’entrée et exactement quatre documents académiques`,
  );
}

const preview = spawn(
  process.execPath,
  ['./node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', String(previewPort)],
  {
    env: { ...process.env, ASTRO_PREVIEW_BACKGROUND: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

let previewError = '';
preview.stderr.on('data', (chunk) => {
  previewError += chunk;
});

const waitForPreview = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(origin, { redirect: 'manual' });
      if (response.status < 500) return;
    } catch {
      // Le serveur n'écoute pas encore.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Le serveur Astro preview ne répond pas.\n${previewError}`);
};

let browser;
try {
  await waitForPreview();
  browser = await chromium.launch({ headless: true });

  await mkdir('test-results/direction-a', { recursive: true });

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();

    for (const slug of prototypePages) {
      const response = await page.goto(`${origin}/${slug}/`, { waitUntil: 'networkidle' });
      assert.equal(response?.status(), 200, `${slug} doit répondre en HTTP 200`);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
        true,
        `${slug} ne doit pas provoquer de débordement global en largeur ${viewport.name}`,
      );
    }

    const realPages = [
      '',
      'cours/mathematiques',
      ...courseDocuments.map((file) => `cours/mathematiques/${file.slice(0, -3)}`),
    ];
    for (const slug of realPages) {
      const response = await page.goto(`${origin}/${slug}`, { waitUntil: 'networkidle' });
      assert.equal(response?.status(), 200, `${slug || 'accueil'} doit répondre en HTTP 200`);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
        true,
        `${slug || 'accueil'} ne doit pas provoquer de débordement global en largeur ${viewport.name}`,
      );
    }

    await page.goto(`${origin}/prototype/test101/synthese/`, { waitUntil: 'networkidle' });
    await page.locator('.mermaid svg').waitFor();
    assert.ok(await page.locator('.katex').count(), 'KaTeX doit rendre les mathématiques');
    assert.equal(await page.locator('pre code.language-mermaid').count(), 0, 'Mermaid ne doit pas rester du code brut');
    assert.equal(
      await page.locator('.right-sidebar-panel a', { hasText: 'Vue d’ensemble' }).count(),
      1,
      'La table des matières ne doit contenir qu’une seule vue d’ensemble',
    );
    assert.equal(
      await page.locator('#starlight__sidebar').getByText('TEST101').count(),
      0,
      'TEST101 ne doit pas apparaître dans la navigation publique',
    );

    for (const theme of ['light', 'dark']) {
      await page.evaluate((theme) => {
        localStorage.setItem('starlight-theme', theme);
        document.documentElement.dataset.theme = theme;
      }, theme);
      for (const type of ['definition', 'theorem', 'example', 'pitfall', 'method', 'memorize']) {
        const block = page.locator(`.academic-block--${type}`).first();
        assert.equal(await block.isVisible(), true, `${type} visible en ${theme}`);
        assert.ok(await block.locator('.academic-block__title').textContent());
      }
      assert.equal(await page.locator('.academic-block .katex').count() > 0, true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
      await page.screenshot({ path: `test-results/direction-a/${viewport.name}-${theme}-open.png`, fullPage: true });
      if (viewport.name === 'desktop') {
        await page.getByRole('button', { name: 'Masquer la barre latérale' }).click();
        assert.equal(await page.locator('.right-sidebar-container').isVisible(), true);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
        await page.screenshot({ path: `test-results/direction-a/desktop-${theme}-closed.png`, fullPage: true });
        await page.getByRole('button', { name: 'Afficher la barre latérale' }).click();
      }
    }
    await page.evaluate(() => {
      let calls = 0;
      window.print = () => { document.documentElement.dataset.printCalls = String(++calls); };
    });
    await page.getByRole('button', { name: 'Exporter en PDF' }).click();
    assert.equal(await page.locator('html').getAttribute('data-print-calls'), '1');

    await page.goto(`${origin}/prototype/test101/exercices/`, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.academic-block--statement').count(), 3);
    assert.equal(await page.locator('.academic-block--correction').count(), 3);
    assert.equal(await page.getByRole('button', { name: 'Exporter en PDF' }).isVisible(), true);
    await page.screenshot({ path: `test-results/direction-a/${viewport.name}-exercices.png`, fullPage: true });
    const correctionLink = page.getByRole('link', { name: /Voir la correction/ }).first();
    assert.equal(await correctionLink.isVisible(), true, 'Le CTA vers la correction doit être visible');
    await correctionLink.click();
    assert.equal(new URL(page.url()).hash, '#correction-tp1-exercice-2');
    const correction = page.locator('#correction-tp1-exercice-2');
    assert.equal(await correction.count(), 1, 'La correction doit posséder une ancre stable');
    assert.equal(
      await page.getByRole('heading', { name: 'Correction — TP1, exercice 2' }).isVisible(),
      true,
      'Le contenu de la correction doit être directement visible',
    );
    assert.equal(
      await page.locator('details #correction-tp1-exercice-2').count(),
      0,
      'La correction ne doit pas être contenue dans un bloc details',
    );
    await page.getByRole('link', { name: /Retour à l’exercice/ }).first().click();
    assert.equal(new URL(page.url()).hash, '#tp1-exercice-2');

    if (viewport.name === 'desktop') {
      await page.goto(`${origin}/prototype/test101/synthese/`, { waitUntil: 'networkidle' });
      const sidebar = page.locator('#starlight__sidebar');
      const collapseButton = page.getByRole('button', { name: 'Masquer la barre latérale' });
      const expandButton = page.getByRole('button', { name: 'Afficher la barre latérale' });

      assert.equal(await sidebar.isVisible(), true, 'La sidebar desktop doit être visible initialement');
      assert.equal(await collapseButton.isVisible(), true, 'Le contrôle de fermeture doit être accessible');
      await collapseButton.click();
      assert.equal(await sidebar.isHidden(), true, 'La sidebar doit être réellement masquée');
      assert.equal(await page.locator('main').isVisible(), true, 'Le document doit rester visible');
      assert.equal(
        await page.locator('.right-sidebar-container').isVisible(),
        true,
        'La table des matières droite doit rester visible',
      );
      assert.equal(await expandButton.isVisible(), true, 'Le contrôle de réouverture doit être accessible');

      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await sidebar.isHidden(), true, 'La préférence doit persister après rechargement');
      await page.goto(`${origin}/prototype/test101/formulaire/`, { waitUntil: 'networkidle' });
      assert.equal(await sidebar.isHidden(), true, 'La préférence doit persister entre les pages');
      await expandButton.click();
      assert.equal(await sidebar.isVisible(), true, 'La sidebar doit pouvoir être rouverte');
      assert.equal(
        await page.evaluate(() => localStorage.getItem('study-library-sidebar-collapsed')),
        null,
        'Le test doit réinitialiser la préférence',
      );
    }

    await page.goto(origin, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `test-results/direction-a/${viewport.name}-home.png`, fullPage: true });

    if (viewport.name !== 'tablette') {
      const searchButton = page.getByRole('button', { name: 'Rechercher dans les cours' });
      assert.equal(await searchButton.isVisible(), true, 'La recherche doit être visible');
      await searchButton.click();
      const searchInput = page.locator('.pagefind-ui__search-input');
      assert.equal(
        await searchInput.evaluate((input) => input === document.activeElement),
        true,
        'Le champ doit recevoir le focus à l’ouverture',
      );
      await searchInput.fill('Mathématiques / Analyse');
      const synthesisResult = page.getByRole('link', { name: 'Mathématiques / Analyse · Synthèse', exact: true });
      await synthesisResult.waitFor();
      assert.equal(await synthesisResult.isVisible(), true, 'Le nom du cours doit retrouver ses documents');
      assert.deepEqual(
        (await page.locator('.pagefind-ui__filter-name').allTextContents()).sort(),
        ['Cours', 'Type'],
        'Les deux filtres académiques doivent être disponibles',
      );
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        true,
        `La recherche ne doit pas déborder en ${viewport.name}`,
      );
      await page.screenshot({ path: `test-results/direction-a/${viewport.name}-search-results.png` });
      if (viewport.name === 'desktop') {
        await page.locator('.pagefind-ui__filter-name', { hasText: 'Type' }).click();
        await page.locator('.pagefind-ui__filter-label', { hasText: 'Synthèse' }).click();
        await page.waitForFunction(
          () => document.querySelectorAll('.pagefind-ui__result').length === 1,
        );
        assert.equal(
          await page.locator('.pagefind-ui__result-link').first().textContent(),
          'Mathématiques / Analyse · Synthèse',
          'Le filtre Type doit restreindre les résultats',
        );
      }
      await synthesisResult.click();
      assert.equal(new URL(page.url()).pathname, '/cours/mathematiques/synthese/');

      await page.goto(origin, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => !document.querySelector('button[data-open-modal]')?.hasAttribute('disabled'));
      await page.keyboard.press('Control+k');
      await page.locator('site-search dialog[open]').waitFor();
      assert.equal(await page.locator('site-search dialog').isVisible(), true, 'Ctrl+K doit ouvrir la recherche');
      await page.locator('.pagefind-ui__search-input').fill('TEST101');
      await page.waitForFunction(() => document.querySelector('.pagefind-ui__message')?.textContent?.includes('TEST101'));
      const prototypeResults = await page.locator('.pagefind-ui__result-link').evaluateAll((links) =>
        links.filter((link) => new URL(link.href).pathname.startsWith('/prototype/test101/')).map((link) => link.href),
      );
      assert.deepEqual(prototypeResults, [], 'TEST101 doit rester hors de l’index public');
      await page.screenshot({ path: `test-results/direction-a/${viewport.name}-search-exclusion.png` });
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('site-search dialog').getAttribute('open'), null, 'Échap doit fermer la recherche');
    }

    await page.getByRole('link', { name: 'Mathématiques / Analyse', exact: true }).click();
    assert.equal(new URL(page.url()).pathname, '/cours/mathematiques/');
    await page.screenshot({ path: `test-results/direction-a/${viewport.name}-course.png`, fullPage: true });
    await page.getByRole('link', { name: 'Synthèse', exact: true }).first().click();
    assert.equal(new URL(page.url()).pathname, '/cours/mathematiques/synthese/');

    if (viewport.name === 'mobile') {
      await page.getByRole('button', { name: /Menu/i }).click();
      assert.equal(await page.locator('#starlight__sidebar').isVisible(), true);
      await page.screenshot({ path: 'test-results/direction-a/mobile-menu.png', fullPage: true });
      await page.getByRole('button', { name: /Menu/i }).click();
      assert.ok(await page.getByRole('button', { name: /Menu/i }).count(), 'La navigation mobile Starlight doit être disponible');
      assert.equal(
        await page.getByRole('button', { name: 'Masquer la barre latérale' }).isHidden(),
        true,
        'Le contrôle desktop ne doit pas interférer avec le menu mobile',
      );
      assert.equal(
        await page.getByRole('button', { name: 'Afficher la barre latérale' }).isHidden(),
        true,
        'Le contrôle de réouverture desktop doit rester masqué sur mobile',
      );
    }

    await context.close();
  }

  console.log('Rendu validé sur desktop, tablette et mobile.');
} finally {
  await browser?.close();
  preview.kill('SIGTERM');
}

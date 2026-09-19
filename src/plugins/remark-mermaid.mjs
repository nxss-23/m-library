import { visit } from 'unist-util-visit';

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character],
  );

export default function remarkMermaid() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang !== 'mermaid') return;

      node.type = 'html';
      node.value = `<div class="mermaid" role="img" aria-label="Diagramme Mermaid">${escapeHtml(node.value)}</div>`;
      delete node.lang;
      delete node.meta;
    });
  };
}

export interface SFCBlock {
  type: 'template' | 'script' | 'style' | 'custom';
  content: string;
  start: number;
  end: number;
  startLine: number;
  endLine: number;
  attrs: Record<string, string>;
}

export interface SpatialNode {
  tag: string;
  isSelfClosing: boolean;
  start: number;
  end: number;
  line: number;
  attrs: Record<string, string>;
}

export interface ZauParsedDocument {
  template: SFCBlock | null;
  script: SFCBlock | null;
  style: SFCBlock | null;
  spatialNodes: SpatialNode[];
  rawText: string;
}

export function parseZauSFC(text: string): ZauParsedDocument {
  const lines = text.split('\n');
  const getLineNumber = (index: number): number => {
    let count = 0;
    let curr = 0;
    for (let i = 0; i < lines.length; i++) {
      curr += lines[i].length + 1;
      if (curr > index) return i;
      count++;
    }
    return count;
  };

  const doc: ZauParsedDocument = {
    template: null,
    script: null,
    style: null,
    spatialNodes: [],
    rawText: text
  };

  // Extract <template>, <script>, <style>
  const blockRegex = /<([a-zA-Z0-9_-]+)(\s*[^>]*)?>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;

  while ((match = blockRegex.exec(text)) !== null) {
    const tagName = match[1].toLowerCase();
    const rawAttrs = match[2] || '';
    const content = match[3];
    const start = match.index;
    const end = start + match[0].length;

    const attrs: Record<string, string> = {};
    const attrRegex = /([:@a-zA-Z0-9_.-]+)(?:=(['"])(.*?)\2)?/g;
    let attrMatch: RegExpExecArray | null;
    while ((attrMatch = attrRegex.exec(rawAttrs)) !== null) {
      attrs[attrMatch[1]] = attrMatch[3] !== undefined ? attrMatch[3] : 'true';
    }

    const block: SFCBlock = {
      type: tagName as any,
      content,
      start,
      end,
      startLine: getLineNumber(start),
      endLine: getLineNumber(end),
      attrs
    };

    if (tagName === 'template') doc.template = block;
    else if (tagName === 'script') doc.script = block;
    else if (tagName === 'style') doc.style = block;
  }

  // Extract spatial nodes: zau-* or Viewer3D
  const spatialRegex = /<(zau-[a-zA-Z0-9-]+|Viewer3D|SceneControls)(\s*[^>]*?)(\/?)>/gi;
  while ((match = spatialRegex.exec(text)) !== null) {
    const tag = match[1];
    const rawAttrs = match[2] || '';
    const isSelfClosing = match[3] === '/' || rawAttrs.trim().endsWith('/');
    const start = match.index;
    const end = start + match[0].length;
    const line = getLineNumber(start);

    const attrs: Record<string, string> = {};
    const attrRegex = /([:@a-zA-Z0-9_.-]+)(?:=(['"])(.*?)\2)?/g;
    let attrMatch: RegExpExecArray | null;
    while ((attrMatch = attrRegex.exec(rawAttrs)) !== null) {
      attrs[attrMatch[1]] = attrMatch[3] !== undefined ? attrMatch[3] : 'true';
    }

    doc.spatialNodes.push({
      tag,
      isSelfClosing,
      start,
      end,
      line,
      attrs
    });
  }

  return doc;
}

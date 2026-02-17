import * as fs from 'fs';
import * as path from 'path';

const SVG_DIR = path.join(__dirname, '..', 'assets', 'svgs');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'components', 'svgs');

interface SvgAttributes {
  width?: string;
  height?: string;
  viewBox?: string;
  fill?: string;
}

function parseSvgAttributes(svgContent: string): SvgAttributes {
  const widthMatch = svgContent.match(/width="([^"]*)"/);
  const heightMatch = svgContent.match(/height="([^"]*)"/);
  const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
  const fillMatch = svgContent.match(/fill="([^"]*)"/);

  return {
    width: widthMatch ? widthMatch[1] : undefined,
    height: heightMatch ? heightMatch[1] : undefined,
    viewBox: viewBoxMatch ? viewBoxMatch[1] : undefined,
    fill: fillMatch ? fillMatch[1] : undefined,
  };
}

function extractSvgContent(svgContent: string): string {
  // Extraire le contenu entre les balises <svg> et </svg>
  const match = svgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  if (!match) return '';
  
  let content = match[1].trim();
  
  // Convertir les balises SVG en composants React Native SVG (majuscules)
  content = content.replace(/<(\/?)(path|circle|rect|line|polyline|polygon|ellipse|g|defs|clipPath|linearGradient|radialGradient|stop|text|tspan)/g, 
    (match, slash, tagName) => `<${slash}${tagName.charAt(0).toUpperCase()}${tagName.slice(1)}`);
  
  // Convertir fill-rule et clip-rule en fillRule et clipRule
  content = content.replace(/fill-rule=/g, 'fillRule=');
  content = content.replace(/clip-rule=/g, 'clipRule=');
  
  return content;
}

function toPascalCase(str: string): string {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (char) => char.toUpperCase())
    .replace(/\.svg$/i, '');
}

function getUsedSvgComponents(svgContent: string): string[] {
  const components = new Set<string>();
  const componentMap: Record<string, string> = {
    'path': 'Path',
    'circle': 'Circle',
    'rect': 'Rect',
    'line': 'Line',
    'polyline': 'Polyline',
    'polygon': 'Polygon',
    'ellipse': 'Ellipse',
    'g': 'G',
    'defs': 'Defs',
    'clippath': 'ClipPath',
    'lineargradient': 'LinearGradient',
    'radialgradient': 'RadialGradient',
    'stop': 'Stop',
    'text': 'Text',
    'tspan': 'TSpan',
  };

  Object.keys(componentMap).forEach(tag => {
    const regex = new RegExp(`<${tag}[\\s>]`, 'i');
    if (regex.test(svgContent)) {
      components.add(componentMap[tag]);
    }
  });

  return Array.from(components).sort();
}

function convertSvgToComponent(svgContent: string, componentName: string): string {
  const attrs = parseSvgAttributes(svgContent);
  const innerContent = extractSvgContent(svgContent);
  const usedComponents = getUsedSvgComponents(svgContent);

  const defaultViewBox = attrs.viewBox || `0 0 ${attrs.width || '24'} ${attrs.height || '24'}`;
  const imports = usedComponents.length > 0 ? `, { ${usedComponents.join(', ')}, SvgProps }` : ', { SvgProps }';

  return `import React from 'react';
import Svg${imports} from 'react-native-svg';

interface ${componentName}Props extends SvgProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  width = ${attrs.width || '24'},
  height = ${attrs.height || '24'},
  color,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="${defaultViewBox}"
      fill={color || "none"}
      {...props}
    >
      ${innerContent}
    </Svg>
  );
};
`;
}

function main() {
  console.log('🚀 Conversion des SVGs en composants React...\n');

  // Créer le dossier de sortie s'il n'existe pas
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Dossier créé: ${OUTPUT_DIR}\n`);
  }

  // Lire tous les fichiers SVG
  const files = fs.readdirSync(SVG_DIR);
  const svgFiles = files.filter(file => file.endsWith('.svg') && file !== '.gitkeep');

  if (svgFiles.length === 0) {
    console.log('⚠️  Aucun fichier SVG trouvé dans', SVG_DIR);
    return;
  }

  const exportStatements: string[] = [];

  svgFiles.forEach(file => {
    const componentName = toPascalCase(file);
    const svgPath = path.join(SVG_DIR, file);
    const svgContent = fs.readFileSync(svgPath, 'utf-8');

    const componentContent = convertSvgToComponent(svgContent, componentName);
    const outputPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);

    fs.writeFileSync(outputPath, componentContent);
    console.log(`✅ ${file} → ${componentName}.tsx`);

    exportStatements.push(`export { ${componentName} } from './${componentName}';`);
  });

  // Créer le fichier index.ts
  const indexContent = exportStatements.join('\n') + '\n';
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
  console.log(`\n✅ Fichier index.ts créé avec ${exportStatements.length} exports`);

  console.log(`\n🎉 Conversion terminée! ${svgFiles.length} composant(s) créé(s).`);
}

main();

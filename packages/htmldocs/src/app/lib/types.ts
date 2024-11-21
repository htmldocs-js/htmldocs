export const standardSizes = ["A3", "A4", "A5", "letter", "legal"] as const;
export const orientations = ["portrait", "landscape"] as const;

type StandardSize = typeof standardSizes[number];
type Orientation = typeof orientations[number];
type Unit = 'in' | 'cm' | 'mm' | 'px';
type CustomSize = `${number}${Unit} ${number}${Unit}`;
export type DocumentSize = StandardSize | CustomSize;

export interface PageConfig {
  size: DocumentSize;
  orientation: Orientation;
}

export const isStandardSize = (size: string): size is StandardSize => {
  return standardSizes.includes(size as StandardSize);
};

export const parseCustomSize = (size: string) => {
  const [width, height] = size.split(' ');
  return { width, height };
}; 
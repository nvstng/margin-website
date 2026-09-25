import type { CollectionEntry } from 'astro:content';

type Guide = CollectionEntry<'guide'>;

export const STAGE_ORDER = [
  'Get your records in',
  'Research and value a stock',
  'Decide what to buy and sell',
  'Track the portfolio',
];

export const stageBlurbs: Record<string, string> = {
  'Get your records in':
    'Four files come out of your broker, and every figure Margin shows is worked out from them. Start here, and finish with the consistency check.',
  'Research and value a stock':
    'Read the business before the numbers, keep the ones worth owning, and put a value on them you can defend.',
  'Decide what to buy and sell':
    'Turn that value into the prices you will act at, and a size for the position you want to end up with.',
  'Track the portfolio':
    'What the dashboard is computing on each row, and what a sale today would cost you in tax.',
};

export const stageAnchor = (stage: string) => stage.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export function stageSequence(guides: Guide[]) {
  const extras = [...new Set(guides.map((guide) => guide.data.stage))]
    .filter((stage) => !STAGE_ORDER.includes(stage))
    .sort();
  return [...STAGE_ORDER, ...extras];
}

export function groupByStage(guides: Guide[]) {
  return stageSequence(guides)
    .map((stage) => ({
      stage,
      blurb: stageBlurbs[stage],
      items: guides
        .filter((guide) => guide.data.stage === stage)
        .sort((a, b) => a.data.order - b.data.order),
    }))
    .filter((group) => group.items.length > 0);
}

export function inReadingOrder(guides: Guide[]) {
  return groupByStage(guides).flatMap((group) => group.items);
}

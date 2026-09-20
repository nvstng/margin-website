import type { CollectionEntry } from 'astro:content';

type Recipe = CollectionEntry<'recipe'>;

const TASK_ORDER = ['Get your records in', 'Value a stock', 'Act on what Margin computes'];

export function taskSequence(recipes: Recipe[]) {
  const extras = [...new Set(recipes.map((recipe) => recipe.data.task))]
    .filter((task) => !TASK_ORDER.includes(task))
    .sort();
  return [...TASK_ORDER, ...extras];
}

export function groupByTask(recipes: Recipe[]) {
  return taskSequence(recipes)
    .map((task) => ({
      task,
      items: recipes
        .filter((recipe) => recipe.data.task === task)
        .sort((a, b) => a.data.order - b.data.order),
    }))
    .filter((group) => group.items.length > 0);
}

export function inReadingOrder(recipes: Recipe[]) {
  return groupByTask(recipes).flatMap((group) => group.items);
}

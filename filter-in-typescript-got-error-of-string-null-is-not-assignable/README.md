## Solution:

Using `filter` won't narrow down types for you. `map` transforms the data into an array of `string | null` data, and TypeScript doesn't know that `d2` won't contain `null` after filtering (TypeScript isn't exceptionally bright, I guess…).

There are a couple of solutions — one of them is complicated, and the other is complicated (though not _as_ complicated) compared to your original code.

## Use type guarding

We can explicitly use types in the filter function itself so that TypeScript knows the output will not contain null:

```ts
const data = [{ id: "123" }, { id: "456" }, { id: null }];

// Type guard to filter out null values
const d2: string[] = data
  .map((d) => d.id)
  .filter((o): o is string => o !== null);

console.log(d2);
```

[Link to code](https://www.typescriptlang.org/play/?#code/MYewdgzgLgBAJgQygmBeGBtAUDGBvGASzgC4YAiARgCYBmcmAXwBod8jSKAWAVgDYGLNgWJkwAVwA2kplgC6AbixYA9CpgAVAJ4AHAKYwA5uIQAnODCggYAM0KSoe0zBDjYE6TABuCSeL0QWKCQsHDUZNCmhGCGGHJo8EgIAHQAtgg6ABSZcACUaAB88MnEucl2Dk7ZILlk1oQQMJHRhoUuMACEqOgekrlKQeAQIJJ6yZIghjnU-UA)

## Cast the result, after filtering

We can also just cast the result after the filter is run instead of assigning the type beforehand. Just add `as string[]` to the end of your line:

```ts
const data = [
  {
    id: "123",
  },
  {
    id: "456",
  },
  {
    id: null,
  },
];

const d2 = data.map((d) => d.id).filter((o) => o) as string[];

console.log(d2);
```

Note: It would be a good practice to include `!== null` as well, like this:

```ts
const d2 = data.map((d) => d.id).filter((o) => o !== null) as string[];
```

But it isn't necessary, and I was going for simplicity in the second solution…

[Link to code](https://www.typescriptlang.org/play/?#code/MYewdgzgLgBAJgQygmBeGBtAUDGBvHXGASzgC4YAiARgCYBmSwgXwBpCCiTyqAWAVgBsTXGw6FcpCmACuAGzkssAXQDcWLKEiw4tNPCQIAdAFsEABwAUluAEo0APnhHStowDNicqAFMATtYg9qhOQTAIEDDQfsRgAOYYalgA9MkwAPJ+MDIQPhRa0PB66IjIphbWdo7Orh5evgGWYSEwIDAAhKjosgr2EVFQMfGJ6prgECByPkZyIHE2tLbqQA)

const data = [{ id: "123" }, { id: "456" }, { id: null }];

// Type guard to filter out null values
const d2: string[] = data
  .map((d) => d.id)
  .filter((o): o is string => o !== null);

console.log(d2);

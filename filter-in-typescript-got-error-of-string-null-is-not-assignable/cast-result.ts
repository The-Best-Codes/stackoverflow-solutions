const data = [{ id: "123" }, { id: "456" }, { id: null }];

const d2 = data.map((d) => d.id).filter((o) => o /* !== null */) as string[];

console.log(d2);

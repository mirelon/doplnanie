import { korpus } from "./korpus.js";

export function createModel() {
    let slova = []
    let bigramy = []
    let trigramy = []
    const eachCons = (array, num) => {
        return Array.from({ length: array.length - num + 1 },
            (_, i) => array.slice(i, i + num))
    }
    const vety = korpus().toLowerCase().split(/\.\s*/)
    for (const veta of vety) {
        const s = veta.split(/[\s,()]+/)
        slova.push(s);
        bigramy.push(eachCons(s, 2));
        trigramy.push(eachCons(s, 3));
    }
    return {
        slova: slova,
        bigramy: bigramy.flat(),
        trigramy: trigramy.flat()
    }
}
import { korpus } from "./korpus.js";

export function createModel() {
    console.log('createModel')
    let slova = {}
    let bigramy = []
    let trigramy = []
    const eachCons = (array, num) => {
        return Array.from({ length: array.length - num + 1 },
            (_, i) => array.slice(i, i + num))
    }
    const vety = korpus().toLowerCase().split(/\.\s*/)
    for (const veta of vety) {
        const s = veta.split(/[\s,():„“]+/)
        for (const slovo of s) {
            if (slovo.length > 2 && slovo.match(/[a-záäčďéíĺľňóôŕřšťúýž]/)) {
                slova[slovo] = (slova[slovo] || 0) + 1;
            }
        }
        bigramy.push(eachCons(s, 2));
        trigramy.push(eachCons(s, 3));
    }
    return {
        slova: slova,
        bigramy: bigramy.flat(),
        trigramy: trigramy.flat()
    }
}
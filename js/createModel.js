import { korpus } from "./korpus.js";

export function createModel() {
    console.log('createModel')
    let unigramy = {}
    let bigramy = {}
    let trigramy = {}
    const eachCons = (array, num) => {
        return Array.from({ length: array.length - num + 1 },
            (_, i) => array.slice(i, i + num));
    }
    const vety = korpus().toLowerCase().split(/[.()]\s*/);
    for (const veta of vety) {
        const slovaVoVete = veta.split(/[\s,():„“]+/).filter(s => s.length);
        for (const unigram of slovaVoVete) {
            if (unigram.length > 2 && unigram.match(/[a-záäčďéíĺľňóôŕřšťúýž]/)) {
                unigramy[unigram] = (unigramy[unigram] || 0) + 1;
            }
        }
        for (const bigram of eachCons(slovaVoVete, 2)) {
            bigramy[bigram] = (bigramy[bigram] || 0) + 1;
        }
        for (const trigram of eachCons(slovaVoVete, 3)) {
            trigramy[trigram] = (trigramy[trigram] || 0) + 1;
        }
    }
    return {
        unigramy: unigramy,
        bigramy: bigramy,
        trigramy: trigramy
    }
}
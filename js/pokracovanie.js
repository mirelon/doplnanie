import { createModel } from "./createModel.js";

const model = createModel();

function skus(slova) {
    if (slova.length === 3) {
        for (const trigram of model.trigramy) {
            if (slova[0] === trigram[0] && slova[1] === trigram[1] && trigram[2].startsWith(slova[3])) {
                return trigram[2].slice(slova[3].length);
            }
        }
        return skus(slova.slice(1));
    }
    if (slova.length === 2) {
        for (const trigram of model.trigramy) {
            if (slova[0] === trigram[0] && trigram[1].startsWith(slova[1])) {
                return `${trigram[1].slice(slova[1].length)} ${trigram[2]}`;
            }
        }
        for (const bigram of model.bigramy) {
            if (slova[0] === bigram[0] && bigram[1].startsWith(slova[1])) {
                return bigram[1].slice(slova[1].length);
            }
        }
    }
    if (slova.length === 1) {
        for (const trigram of model.trigramy) {
            console.log(model.trigramy)
            if (trigram[0].startsWith(slova[0])) {
                return `${trigram[0].slice(slova[0].length)} ${trigram[1]} ${trigram[2]}`;
            }
        }
        for (const bigram of model.bigramy) {
            if (bigram[0].startsWith(slova[0])) {
                return `${bigram[0].slice(slova[0].length)} ${bigram[1]}`;
            }
        }
        for (const slovo of model.slova) {
            if (slovo[0].startsWith(slova[0])) {
                return slovo[0].slice(slova[0].length);
            }
        }
    }
    return null;
}

export function pokracovanie(text) {
    const posledna_veta = text.toLowerCase().split(/[.\n]\s*/).slice(-1).pop()
    console.log(`Posledna_veta: ${posledna_veta}`)
    const slova_poslednej_vety = posledna_veta.split(/[\s,()]+/).filter(Boolean)
    console.log(`Slova poslednej vety: ${slova_poslednej_vety}`)
    if (slova_poslednej_vety.length === 0) {
        return null;
    }
    return skus(slova_poslednej_vety.slice(-3)) || skus(slova_poslednej_vety.slice(-2)) || skus(slova_poslednej_vety.slice(-1));
}
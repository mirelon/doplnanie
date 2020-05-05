import { createModel } from "./createModel.js";

const model = createModel();

function skus(slova) {
    console.log(`skus(${slova})`)
    if (slova.length === 3) {
        for (const trigram of model.trigramy) {
            if (slova[0] === trigram[0] && slova[1] === trigram[1] && trigram[2].slice(0,-1).startsWith(slova[3])) {
                console.log('Found trigram from 3 words!')
                return trigram[2].slice(slova[3].length);
            }
        }
        console.log('Not found from 3 words...')
        return skus(slova.slice(1));
    }
    if (slova.length === 2) {
        for (const trigram of model.trigramy) {
            if (slova[0] === trigram[0] && trigram[1].startsWith(slova[1])) {
                console.log('Found trigram from 2 words!')
                return `${trigram[1].slice(slova[1].length)} ${trigram[2]}`;
            }
        }
        for (const bigram of model.bigramy) {
            if (slova[0] === bigram[0] && bigram[1].slice(0,-1).startsWith(slova[1])) {
                console.log('Found bigram from 2 words!')
                return bigram[1].slice(slova[1].length);
            }
        }
        console.log('Not found from 2 words...')
        return skus(slova.slice(1));
    }
    if (slova.length === 1) {
        for (const trigram of model.trigramy) {
            if (trigram[0].startsWith(slova[0])) {
                console.log('Found trigram from 1 word!')
                return `${trigram[0].slice(slova[0].length)} ${trigram[1]} ${trigram[2]}`;
            }
        }
        for (const bigram of model.bigramy) {
            if (bigram[0].startsWith(slova[0])) {
                console.log('Found bigram from 1 word!')
                return `${bigram[0].slice(slova[0].length)} ${bigram[1]}`;
            }
        }
        let maxScore = 0;
        let maxSlovo;
        for (const slovo in model.slova) {
            if (slovo.slice(0,-1).startsWith(slova[0]) && model.slova[slovo] > maxScore) {
                maxScore = model.slova[slovo];
                maxSlovo = slovo;
            }
        }
        if (maxSlovo) {
            console.log('Found unigram from 1 word, with score maxScore!')
            return maxSlovo.slice(slova[0].length);
        }
    }
    console.log('Not found...')
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
    return skus(slova_poslednej_vety.slice(-3));
}
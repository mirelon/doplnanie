import { createModel } from "./createModel.js";

const model = createModel();

function skus(slova) {
    console.log(`skus(${slova})`);
    let maxes = {}
    if (slova.length === 3) {
        let maxTrigramScore = 0;
        let maxTrigram;
        for (const trigramString in model.trigramy) {
            const trigram = trigramString.split(',');
            if (slova[0] === trigram[0] && slova[1] === trigram[1] && trigram[2].slice(0,-1).startsWith(slova[2]) && model.trigramy[trigram] > maxTrigramScore) {
                maxTrigramScore = model.trigramy[trigram];
                maxTrigram = trigram;
            }
        }
        if (maxTrigram) {
            console.log(`Found trigram ${maxTrigram} from 3 words, with score ${maxTrigramScore}!`);
            return `${maxTrigram[2].slice(slova[2].length)}`;
        }
        console.log('Not found from 3 words...');
        return skus(slova.slice(1));
    }
    if (slova.length === 2) {
        let maxTrigramScore = 0;
        let maxTrigram;
        for (const trigramString in model.trigramy) {
            const trigram = trigramString.split(',');
            if (slova[0] === trigram[0] && trigram[1].startsWith(slova[1]) && model.trigramy[trigram] > maxTrigramScore) {
                maxTrigramScore = model.trigramy[trigram];
                maxTrigram = trigram;
            }
        }
        if (maxTrigram) {
            console.log(`Found trigram ${maxTrigram} from 2 words, with score ${maxTrigramScore}!`);
            return `${maxTrigram[1].slice(slova[1].length)} ${maxTrigram[2]}`;
        }
        let maxBigramScore = 0;
        let maxBigram;
        for (const bigramString in model.bigramy) {
            const bigram = bigramString.split(',');
            if (slova[0] === bigram[0] && bigram[1].slice(0,-1).startsWith(slova[1]) && model.bigramy[bigram] > maxBigramScore) {
                maxBigramScore = model.bigramy[bigram];
                maxBigram = bigram;
            }
        }
        if (maxBigram) {
            console.log(`Found bigram ${maxBigram} from 2 words, with score ${maxBigramScore}!`);
            return `${maxBigram[1].slice(slova[1].length)}`;
        }
        console.log('Not found from 2 words...')
        return skus(slova.slice(1));
    }
    if (slova.length === 1) {
        let maxTrigramScore = 0;
        let maxTrigram;
        for (const trigramString in model.trigramy) {
            const trigram = trigramString.split(',');
            if (trigram[0].startsWith(slova[0]) && model.trigramy[trigram] > maxTrigramScore) {
                maxTrigramScore = model.trigramy[trigram];
                maxTrigram = trigram;
            }
        }
        if (maxTrigram) {
            console.log(`Found trigram ${maxTrigram} from 1 word, with score ${maxTrigramScore}!`);
            maxes[`${maxTrigram[0].slice(slova[0].length)} ${maxTrigram[1]} ${maxTrigram[2]}`] = 3 * maxTrigramScore;
        }
        let maxBigramScore = 0;
        let maxBigram;
        for (const bigramString in model.bigramy) {
            const bigram = bigramString.split(',');
            if (bigram[0].startsWith(slova[0]) && model.bigramy[bigram] > maxBigramScore) {
                maxBigramScore = model.bigramy[bigram];
                maxBigram = bigram;
            }
        }
        if (maxBigram) {
            console.log(`Found bigram ${maxBigram} from 1 word, with score ${maxBigramScore}!`);
            maxes[`${maxBigram[0].slice(slova[0].length)} ${maxBigram[1]}`] = 2 * maxBigramScore;
        }
        let maxUnigramScore = 0;
        let maxUnigram;
        for (const unigram in model.unigramy) {
            if (unigram.slice(0,-1).startsWith(slova[0]) && model.unigramy[unigram] > maxUnigramScore) {
                maxUnigramScore = model.unigramy[unigram];
                maxUnigram = unigram;
            }
        }
        if (maxUnigram) {
            console.log(`Found unigram ${maxUnigram} from 1 word, with score ${maxUnigramScore}!`)
            maxes[maxUnigram.slice(slova[0].length)] = maxUnigramScore;
        }
    }
    if (Object.keys(maxes).length) {
        console.log(maxes);
        return Object.keys(maxes).reduce((a, b) => maxes[a] > maxes[b] ? a : b);
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
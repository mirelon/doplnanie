import { pokracovanie } from './pokracovanie.js'
import { createModel } from "./createModel.js";

$(function () {
    console.log(createModel())
    const suggest = $('#suggest');
    $('textarea').focus().on('keydown', function (e) {
        const code = e.keyCode || e.which;
        console.log(code);
        if (code === 9) {
            const caretPos = $(this).prop('selectionStart');
            const textAreaTxt = $(this).val();
            const newText = suggest.text();
            suggest.text('');
            console.log(`${textAreaTxt}.slice(${caretPos}) = ${textAreaTxt.slice(caretPos)}`)
            console.log(`Spajam ${textAreaTxt.slice(0, caretPos)} + ${newText} + ${textAreaTxt.slice(caretPos)}`)
            $(this).val(textAreaTxt.slice(0, caretPos) + newText + textAreaTxt.slice(caretPos) );
            return false;
        }
    }).on('keyup paste cut mouseup', function(e){
        console.log('keyup')
        console.log(suggest.text())
        suggest.text('').css(
            $(this).textareaHelper('caretPos')
        );
        const caretPos = $(this).prop('selectionStart');
        console.log(caretPos)
        const text = $(this).val().slice(0, caretPos)
        if (text !== null) {
            console.log(text);
            const pok = pokracovanie(text);
            console.log(`Doplnam ${pok}`);
            suggest.text(pok);
        }
    })
})
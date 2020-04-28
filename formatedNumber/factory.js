"use strict";
/// <reference path='../../Libraries/bobril/library.d.ts'/>
/// <reference path='../../Libraries/number-format/library.d.ts'/>

var formattedNumberComponent = {
    id: "formattedNumberComponent",
    render: function (ctx, me) {
        var d = ctx.data;
        var dataCtx = d.dataCtx;
        var value = dataCtx.getNumber();
        me.tag = "span";
        me.children = numberFormatLibrary.formatNumber(d.numberFormat, value);
    }
};
function FormattedNumberFactory(numberFormat, dataCtx) {
    return {
        data: {
            numberFormat: numberFormat,
            dataCtx: dataCtx
        },
        component: formattedNumberComponent
    };
}
exports.FormattedNumberFactory = FormattedNumberFactory;

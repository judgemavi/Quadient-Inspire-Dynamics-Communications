"use strict";
/// <reference path='../../Libraries/bobril/library.d.ts'/>
/// <reference path='../../Libraries/bobril-mouse/library.d.ts'/>
/// <reference path='../../Libraries/number-format/library.d.ts'/>
/// <reference path='../../Libraries/validation/library.ts'/>
/// <reference path='../../Libraries/dc-helpers/library.ts'/>
Object.defineProperty(exports, "__esModule", { value: true });
var RatingComponent = {
    id: "RatingComponent",
    render: function (ctx, me) {
        var d = ctx.data;
        var dataCtx = d.dataCtx;
        var icons = [];
        var _loop_1 = function (i) {
            icons.push(b.style({
                data: {
                    class: ctx.data.ratingIcon,
                    id: i,
                    dataCtx: {
                        updateRating: function () { return dataCtx.setValue(i); }
                    }
                }, component: IconComponent
            }, iconStyle, i <= d.dataCtx.getValue() && selectedStyle));
        };
        for (var i = d.minValue; i <= d.maxValue; i++) {
            _loop_1(i);
        }
        me.tag = "div";
        me.children = icons;
    }
};
var IconComponent = {
    render: function (ctx, me) {
        var d = ctx.data;
        me.tag = "div";
        me.children = {
            tag: "i", attrs: {
                "class": d.class,
                "id": String(d.id)
            }
        };
    },
    onClick: function (ctx, event) {
        ctx.data.dataCtx.updateRating();
        return false;
    }
};
function RatingFactory(ratingIcon, minValue, maxValue, dataCtx) {
    return {
        data: {
            ratingIcon: ratingIcon,
            minValue: minValue,
            maxValue: maxValue,
            dataCtx: dataCtx
        },
        component: RatingComponent
    };
}
exports.RatingFactory = RatingFactory;

/// <reference path='../../Libraries/bobril/library.d.ts'/>
/// <reference path='../../Libraries/bobril-mouse/library.d.ts'/>
/// <reference path='../../Libraries/number-format/library.d.ts'/>
/// <reference path='../../Libraries/validation/library.ts'/>
/// <reference path='../../Libraries/dc-helpers/library.ts'/>

declare let iconStyle: IBobrilStyles;
declare let selectedStyle: IBobrilStyles;

interface IData {
    dataCtx: IDataCtx;
    minValue: number;
    maxValue: number;
    ratingIcon: string;
}

interface ICtx extends IBobrilCtx {
    data: IData;
}

interface IDataCtx {
    setValue(value: number): void;
    getValue(): number;
}


const RatingComponent: IBobrilComponent = {

    id: "RatingComponent",

    render(ctx: ICtx, me: IBobrilNode): void {
        const d = ctx.data;
        const dataCtx = d.dataCtx;
        const icons: IBobrilNode[] = [];
        for (let i = d.minValue; i <= d.maxValue; i++) {
            icons.push(b.style!(
                {
                    data: {
                        class: ctx.data.ratingIcon,
                        id: i,
                        dataCtx : {
                            updateRating: () => dataCtx.setValue(i)
                        }
                    }, component: IconComponent
                }, iconStyle, i <= d.dataCtx.getValue() && selectedStyle)
            );
        }
        me.tag = "div";
        me.children = icons;
    }
};

interface IIconData {
    class: string;
    id: number;
    currentRating: number,
    dataCtx: IIconDataCtx
}

interface IIconCtx {
    data: IIconData;
}

interface IIconDataCtx {
    updateRating: () => void;
}

const IconComponent: IBobrilComponent = {
    render(ctx: IIconCtx, me: IBobrilNode): void {
        const d = ctx.data;
        me.tag = "div";
        me.children = {
            tag: "i", attrs: {
                "class": d.class,
                "id": String(d.id)
            }
        };
    },
    onClick(ctx: IIconCtx, event: IBobrilMouseEvent):boolean{
        ctx.data.dataCtx.updateRating();
        return false;
    }
}

export function RatingFactory(
    ratingIcon: string,
    minValue: number,
    maxValue: number,
    dataCtx: IDataCtx
): IBobrilNode {
    return {
        data: <IData>{
            ratingIcon,
            minValue,
            maxValue,
            dataCtx
        },
        component: RatingComponent
    };
}

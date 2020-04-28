/// <reference path='../../Libraries/bobril/library.d.ts'/>
/// <reference path='../../Libraries/number-format/library.d.ts'/>

interface IData {
    numberFormat: string;
    dataCtx: IDataCtx;
}

interface ICtx {
    data: IData;
}

interface IDataCtx {
    getNumber(): number;
}

const formattedNumberComponent: IBobrilComponent = {

    id: "formattedNumberComponent",

    render(ctx: ICtx, me: IBobrilNode): void {
        const d = ctx.data;
        const dataCtx = d.dataCtx;
        const value = dataCtx.getNumber();
        me.tag = "span";
        me.children = numberFormatLibrary.formatNumber(d.numberFormat, value);
    }
};

export function FormattedNumberFactory(
    numberFormat: string,
    dataCtx: IDataCtx
): IBobrilNode {
    return {
        data: <IData>{
            numberFormat,
            dataCtx
        },
        component: formattedNumberComponent
    };
}

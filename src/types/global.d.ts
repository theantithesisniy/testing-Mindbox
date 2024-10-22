// declaration.d.ts
declare module '*.scss' {
    interface ClassNames {
        [className: string]: string
    }

    const classNames: ClassNames;
    export = classNames;
}

declare module "*.png" {
    const value: string;
    export default value;
}

declare module 'redux-mock-store';
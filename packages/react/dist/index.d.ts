import * as React$1 from 'react';
import React__default, { ComponentPropsWithoutRef } from 'react';

declare const sizes: readonly ["A3", "A4", "A5", "letter", "legal"];
declare const orientations: readonly ["portrait", "landscape"];
type Unit = 'in' | 'cm' | 'mm' | 'px';
type SizeType = (typeof sizes)[number] | `${number}${Unit} ${number}${Unit}`;
interface Props$1 {
    size: SizeType;
    orientation: (typeof orientations)[number];
    margin?: React__default.CSSProperties["margin"];
    children: React__default.ReactNode;
}
declare const Document: React__default.FC<Props$1>;

interface Props extends React.ComponentProps<"div"> {
}
declare const Page: React.FC<Props>;

declare const Head: React$1.ForwardRefExoticComponent<Readonly<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>, "ref">> & React$1.RefAttributes<HTMLHeadElement>>;

interface SpacerProps extends ComponentPropsWithoutRef<"div"> {
    /**
     * horizontal space the spacer takes up. Defaults to `100%` when `width` is set, otherwise 0
     */
    width?: number | string | boolean;
    /**
     * vertical space the spacer takes up. Defaults to `100%` when `height` is set, otherwise 0
     */
    height?: number | string | boolean;
    /**
     * display of the spacer. Defaults to `block`
     */
    display?: string;
}
type SpacerType = React.FC<SpacerProps>;
declare const Spacer: SpacerType;

type MarginBoxPosition = 'top-left-corner' | 'top-left' | 'top-center' | 'top-right' | 'top-right-corner' | 'left-top' | 'left-middle' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom' | 'bottom-left-corner' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'bottom-right-corner';
interface MarginBoxProps {
    children: React__default.ReactNode;
    position: MarginBoxPosition;
    pageType?: 'all' | 'even' | 'odd' | 'blank';
    className?: string;
    style?: React__default.CSSProperties;
    marginBoxStyles?: React__default.CSSProperties;
    runningName: string;
}
declare const MarginBox: React__default.FC<MarginBoxProps>;

interface FooterProps {
    /**
     * Content to render in the footer.
     * Can be either:
     * - A function that receives current page and total pages
     * - A ReactNode for static content
     */
    children?: ((params: {
        currentPage: React__default.ReactElement;
        totalPages: React__default.ReactElement;
    }) => React__default.ReactNode) | React__default.ReactNode;
    /**
     * Footer position. Defaults to 'bottom-center'
     */
    position?: MarginBoxPosition;
    /**
     * Whether to show footer on even/odd/blank pages
     */
    pageType?: 'all' | 'even' | 'odd' | 'blank';
    /**
     * Custom CSS classes
     */
    className?: string;
    /**
     * Custom styles
     */
    style?: React__default.CSSProperties;
    /**
     * Optional styling for the position element
     */
    marginBoxStyles?: React__default.CSSProperties;
}
declare const Footer: React__default.FC<FooterProps>;

type JSONPrimitive = string | number | boolean | Date | null;
type JSONObject<T> = {
    [key: string]: JSONValue<T>;
};
type JSONInterface<T> = {
    [P in keyof T]: JSONValue<T[P]>;
};
type JSONArray<T> = JSONValue<T>[];
type JSONValue<T> = JSONPrimitive | JSONObject<T> | JSONInterface<T> | JSONArray<T>;
declare function useValue<T extends JSONValue<T>>(name: string): T | undefined;

export { Document, Footer, Head, type JSONArray, type JSONInterface, type JSONObject, type JSONPrimitive, type JSONValue, MarginBox, type MarginBoxPosition, Page, Spacer, useValue };

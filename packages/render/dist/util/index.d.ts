import { OutputFile } from "esbuild";
import { RawSourceMap } from "source-map-js";
import { DocumentComponent, ErrorObject } from "../types";
import { RenderAsyncFunction } from "../renderAsync";
export { improveErrorWithSourceMap } from "./improve-error-with-sourcemap";
export declare function createFakeContext(documentPath: string): {
    console: Console;
    Buffer: BufferConstructor;
    TextDecoder: {
        new (label?: string, options?: TextDecoderOptions): TextDecoder;
        prototype: TextDecoder;
    };
    TextDecoderStream: {
        new (label?: string, options?: TextDecoderOptions): TextDecoderStream;
        prototype: TextDecoderStream;
    };
    TextEncoder: {
        new (): TextEncoder;
        prototype: TextEncoder;
    };
    TextEncoderStream: {
        new (): TextEncoderStream;
        prototype: TextEncoderStream;
    };
    ReadableStream: {
        new (underlyingSource: UnderlyingByteSource, strategy?: {
            highWaterMark?: number;
        }): ReadableStream<Uint8Array>;
        new <R = any>(underlyingSource: UnderlyingDefaultSource<R>, strategy?: QueuingStrategy<R>): ReadableStream<R>;
        new <R = any>(underlyingSource?: UnderlyingSource<R>, strategy?: QueuingStrategy<R>): ReadableStream<R>;
        prototype: ReadableStream;
    };
    URL: {
        new (url: string | URL, base?: string | URL): URL;
        prototype: URL;
        canParse(url: string | URL, base?: string | URL): boolean;
        createObjectURL(obj: Blob | MediaSource): string;
        parse(url: string | URL, base?: string | URL): URL | null;
        revokeObjectURL(url: string): void;
    };
    URLSearchParams: {
        new (init?: string[][] | Record<string, string> | string | URLSearchParams): URLSearchParams;
        prototype: URLSearchParams;
    };
    Headers: {
        new (init?: HeadersInit): Headers;
        prototype: Headers;
    };
    module: {
        exports: {
            default: unknown;
            renderAsync: unknown;
        };
    };
    __filename: string;
    __dirname: string;
    require: (module: string) => any;
    process: NodeJS.Process;
    globalThis: typeof globalThis;
    eval(x: string): any;
    parseInt(string: string, radix?: number): number;
    parseFloat(string: string): number;
    isNaN(number: number): boolean;
    isFinite(number: number): boolean;
    decodeURI(encodedURI: string): string;
    decodeURIComponent(encodedURIComponent: string): string;
    encodeURI(uri: string): string;
    encodeURIComponent(uriComponent: string | number | boolean): string;
    escape(string: string): string;
    unescape(string: string): string;
    NaN: number;
    Infinity: number;
    Symbol: SymbolConstructor;
    Object: ObjectConstructor;
    Function: FunctionConstructor;
    String: StringConstructor;
    Boolean: BooleanConstructor;
    Number: NumberConstructor;
    Math: Math;
    Date: DateConstructor;
    RegExp: RegExpConstructor;
    Error: ErrorConstructor;
    EvalError: EvalErrorConstructor;
    RangeError: RangeErrorConstructor;
    ReferenceError: ReferenceErrorConstructor;
    SyntaxError: SyntaxErrorConstructor;
    TypeError: TypeErrorConstructor;
    URIError: URIErrorConstructor;
    JSON: JSON;
    Array: ArrayConstructor;
    Promise: PromiseConstructor;
    ArrayBuffer: ArrayBufferConstructor;
    DataView: DataViewConstructor;
    Int8Array: Int8ArrayConstructor;
    Uint8Array: Uint8ArrayConstructor;
    Uint8ClampedArray: Uint8ClampedArrayConstructor;
    Int16Array: Int16ArrayConstructor;
    Uint16Array: Uint16ArrayConstructor;
    Int32Array: Int32ArrayConstructor;
    Uint32Array: Uint32ArrayConstructor;
    Float32Array: Float32ArrayConstructor;
    Float64Array: Float64ArrayConstructor;
    Intl: typeof Intl;
    alert(message?: any): void;
    blur(): void;
    cancelIdleCallback(handle: number): void;
    captureEvents(): void;
    close(): void;
    confirm(message?: string): boolean;
    focus(): void;
    getComputedStyle(elt: Element, pseudoElt?: string | null): CSSStyleDeclaration;
    getSelection(): Selection | null;
    matchMedia(query: string): MediaQueryList;
    moveBy(x: number, y: number): void;
    moveTo(x: number, y: number): void;
    open(url?: string | URL, target?: string, features?: string): WindowProxy | null;
    postMessage(message: any, targetOrigin: string, transfer?: Transferable[]): void;
    postMessage(message: any, options?: WindowPostMessageOptions): void;
    print(): void;
    prompt(message?: string, _default?: string): string | null;
    releaseEvents(): void;
    requestIdleCallback(callback: IdleRequestCallback, options?: IdleRequestOptions): number;
    resizeBy(x: number, y: number): void;
    resizeTo(width: number, height: number): void;
    scroll(options?: ScrollToOptions): void;
    scroll(x: number, y: number): void;
    scrollBy(options?: ScrollToOptions): void;
    scrollBy(x: number, y: number): void;
    scrollTo(options?: ScrollToOptions): void;
    scrollTo(x: number, y: number): void;
    stop(): void;
    toString(): string;
    dispatchEvent(event: Event): boolean;
    cancelAnimationFrame(handle: number): void;
    requestAnimationFrame(callback: FrameRequestCallback): number;
    atob(data: string): string;
    atob(data: string): string;
    btoa(data: string): string;
    btoa(data: string): string;
    clearInterval(id: number | undefined): void;
    clearInterval(intervalId: NodeJS.Timeout | string | number | undefined): void;
    clearTimeout(id: number | undefined): void;
    clearTimeout(timeoutId: NodeJS.Timeout | string | number | undefined): void;
    createImageBitmap(image: ImageBitmapSource, options?: ImageBitmapOptions): Promise<ImageBitmap>;
    createImageBitmap(image: ImageBitmapSource, sx: number, sy: number, sw: number, sh: number, options?: ImageBitmapOptions): Promise<ImageBitmap>;
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    fetch(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
    queueMicrotask(callback: VoidFunction): void;
    queueMicrotask(callback: () => void): void;
    reportError(e: any): void;
    setInterval: typeof setInterval;
    setTimeout: typeof setTimeout;
    structuredClone<T = any>(value: T, options?: StructuredSerializeOptions): T;
    structuredClone<T>(value: T, transfer?: {
        transfer: ReadonlyArray<import("worker_threads").TransferListItem>;
    }): T;
    addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    NodeFilter: {
        readonly FILTER_ACCEPT: 1;
        readonly FILTER_REJECT: 2;
        readonly FILTER_SKIP: 3;
        readonly SHOW_ALL: 4294967295;
        readonly SHOW_ELEMENT: 1;
        readonly SHOW_ATTRIBUTE: 2;
        readonly SHOW_TEXT: 4;
        readonly SHOW_CDATA_SECTION: 8;
        readonly SHOW_ENTITY_REFERENCE: 16;
        readonly SHOW_ENTITY: 32;
        readonly SHOW_PROCESSING_INSTRUCTION: 64;
        readonly SHOW_COMMENT: 128;
        readonly SHOW_DOCUMENT: 256;
        readonly SHOW_DOCUMENT_TYPE: 512;
        readonly SHOW_DOCUMENT_FRAGMENT: 1024;
        readonly SHOW_NOTATION: 2048;
    };
    AbortController: {
        prototype: AbortController;
        new (): AbortController;
    };
    AbortSignal: {
        prototype: AbortSignal;
        new (): AbortSignal;
        abort(reason?: any): AbortSignal;
        any(signals: AbortSignal[]): AbortSignal;
        timeout(milliseconds: number): AbortSignal;
    };
    AbstractRange: {
        prototype: AbstractRange;
        new (): AbstractRange;
    };
    AnalyserNode: {
        prototype: AnalyserNode;
        new (context: BaseAudioContext, options?: AnalyserOptions): AnalyserNode;
    };
    Animation: {
        prototype: Animation;
        new (effect?: AnimationEffect | null, timeline?: AnimationTimeline | null): Animation;
    };
    AnimationEffect: {
        prototype: AnimationEffect;
        new (): AnimationEffect;
    };
    AnimationEvent: {
        prototype: AnimationEvent;
        new (type: string, animationEventInitDict?: AnimationEventInit): AnimationEvent;
    };
    AnimationPlaybackEvent: {
        prototype: AnimationPlaybackEvent;
        new (type: string, eventInitDict?: AnimationPlaybackEventInit): AnimationPlaybackEvent;
    };
    AnimationTimeline: {
        prototype: AnimationTimeline;
        new (): AnimationTimeline;
    };
    Attr: {
        prototype: Attr;
        new (): Attr;
    };
    AudioBuffer: {
        prototype: AudioBuffer;
        new (options: AudioBufferOptions): AudioBuffer;
    };
    AudioBufferSourceNode: {
        prototype: AudioBufferSourceNode;
        new (context: BaseAudioContext, options?: AudioBufferSourceOptions): AudioBufferSourceNode;
    };
    AudioContext: {
        prototype: AudioContext;
        new (contextOptions?: AudioContextOptions): AudioContext;
    };
    AudioData: {
        prototype: AudioData;
        new (init: AudioDataInit): AudioData;
    };
    AudioDecoder: {
        prototype: AudioDecoder;
        new (init: AudioDecoderInit): AudioDecoder;
        isConfigSupported(config: AudioDecoderConfig): Promise<AudioDecoderSupport>;
    };
    AudioDestinationNode: {
        prototype: AudioDestinationNode;
        new (): AudioDestinationNode;
    };
    AudioEncoder: {
        prototype: AudioEncoder;
        new (init: AudioEncoderInit): AudioEncoder;
        isConfigSupported(config: AudioEncoderConfig): Promise<AudioEncoderSupport>;
    };
    AudioListener: {
        prototype: AudioListener;
        new (): AudioListener;
    };
    AudioNode: {
        prototype: AudioNode;
        new (): AudioNode;
    };
    AudioParam: {
        prototype: AudioParam;
        new (): AudioParam;
    };
    AudioParamMap: {
        prototype: AudioParamMap;
        new (): AudioParamMap;
    };
    AudioProcessingEvent: {
        prototype: AudioProcessingEvent;
        new (type: string, eventInitDict: AudioProcessingEventInit): AudioProcessingEvent;
    };
    AudioScheduledSourceNode: {
        prototype: AudioScheduledSourceNode;
        new (): AudioScheduledSourceNode;
    };
    AudioWorklet: {
        prototype: AudioWorklet;
        new (): AudioWorklet;
    };
    AudioWorkletNode: {
        prototype: AudioWorkletNode;
        new (context: BaseAudioContext, name: string, options?: AudioWorkletNodeOptions): AudioWorkletNode;
    };
    AuthenticatorAssertionResponse: {
        prototype: AuthenticatorAssertionResponse;
        new (): AuthenticatorAssertionResponse;
    };
    AuthenticatorAttestationResponse: {
        prototype: AuthenticatorAttestationResponse;
        new (): AuthenticatorAttestationResponse;
    };
    AuthenticatorResponse: {
        prototype: AuthenticatorResponse;
        new (): AuthenticatorResponse;
    };
    BarProp: {
        prototype: BarProp;
        new (): BarProp;
    };
    BaseAudioContext: {
        prototype: BaseAudioContext;
        new (): BaseAudioContext;
    };
    BeforeUnloadEvent: {
        prototype: BeforeUnloadEvent;
        new (): BeforeUnloadEvent;
    };
    BiquadFilterNode: {
        prototype: BiquadFilterNode;
        new (context: BaseAudioContext, options?: BiquadFilterOptions): BiquadFilterNode;
    };
    Blob: {
        prototype: Blob;
        new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
    };
    BlobEvent: {
        prototype: BlobEvent;
        new (type: string, eventInitDict: BlobEventInit): BlobEvent;
    };
    BroadcastChannel: {
        prototype: BroadcastChannel;
        new (name: string): BroadcastChannel;
    };
    ByteLengthQueuingStrategy: {
        prototype: ByteLengthQueuingStrategy;
        new (init: QueuingStrategyInit): ByteLengthQueuingStrategy;
    };
    CDATASection: {
        prototype: CDATASection;
        new (): CDATASection;
    };
    CSSAnimation: {
        prototype: CSSAnimation;
        new (): CSSAnimation;
    };
    CSSConditionRule: {
        prototype: CSSConditionRule;
        new (): CSSConditionRule;
    };
    CSSContainerRule: {
        prototype: CSSContainerRule;
        new (): CSSContainerRule;
    };
    CSSCounterStyleRule: {
        prototype: CSSCounterStyleRule;
        new (): CSSCounterStyleRule;
    };
    CSSFontFaceRule: {
        prototype: CSSFontFaceRule;
        new (): CSSFontFaceRule;
    };
    CSSFontFeatureValuesRule: {
        prototype: CSSFontFeatureValuesRule;
        new (): CSSFontFeatureValuesRule;
    };
    CSSFontPaletteValuesRule: {
        prototype: CSSFontPaletteValuesRule;
        new (): CSSFontPaletteValuesRule;
    };
    CSSGroupingRule: {
        prototype: CSSGroupingRule;
        new (): CSSGroupingRule;
    };
    CSSImageValue: {
        prototype: CSSImageValue;
        new (): CSSImageValue;
    };
    CSSImportRule: {
        prototype: CSSImportRule;
        new (): CSSImportRule;
    };
    CSSKeyframeRule: {
        prototype: CSSKeyframeRule;
        new (): CSSKeyframeRule;
    };
    CSSKeyframesRule: {
        prototype: CSSKeyframesRule;
        new (): CSSKeyframesRule;
    };
    CSSKeywordValue: {
        prototype: CSSKeywordValue;
        new (value: string): CSSKeywordValue;
    };
    CSSLayerBlockRule: {
        prototype: CSSLayerBlockRule;
        new (): CSSLayerBlockRule;
    };
    CSSLayerStatementRule: {
        prototype: CSSLayerStatementRule;
        new (): CSSLayerStatementRule;
    };
    CSSMathClamp: {
        prototype: CSSMathClamp;
        new (lower: CSSNumberish, value: CSSNumberish, upper: CSSNumberish): CSSMathClamp;
    };
    CSSMathInvert: {
        prototype: CSSMathInvert;
        new (arg: CSSNumberish): CSSMathInvert;
    };
    CSSMathMax: {
        prototype: CSSMathMax;
        new (...args: CSSNumberish[]): CSSMathMax;
    };
    CSSMathMin: {
        prototype: CSSMathMin;
        new (...args: CSSNumberish[]): CSSMathMin;
    };
    CSSMathNegate: {
        prototype: CSSMathNegate;
        new (arg: CSSNumberish): CSSMathNegate;
    };
    CSSMathProduct: {
        prototype: CSSMathProduct;
        new (...args: CSSNumberish[]): CSSMathProduct;
    };
    CSSMathSum: {
        prototype: CSSMathSum;
        new (...args: CSSNumberish[]): CSSMathSum;
    };
    CSSMathValue: {
        prototype: CSSMathValue;
        new (): CSSMathValue;
    };
    CSSMatrixComponent: {
        prototype: CSSMatrixComponent;
        new (matrix: DOMMatrixReadOnly, options?: CSSMatrixComponentOptions): CSSMatrixComponent;
    };
    CSSMediaRule: {
        prototype: CSSMediaRule;
        new (): CSSMediaRule;
    };
    CSSNamespaceRule: {
        prototype: CSSNamespaceRule;
        new (): CSSNamespaceRule;
    };
    CSSNumericArray: {
        prototype: CSSNumericArray;
        new (): CSSNumericArray;
    };
    CSSNumericValue: {
        prototype: CSSNumericValue;
        new (): CSSNumericValue;
        parse(cssText: string): CSSNumericValue;
    };
    CSSPageRule: {
        prototype: CSSPageRule;
        new (): CSSPageRule;
    };
    CSSPerspective: {
        prototype: CSSPerspective;
        new (length: CSSPerspectiveValue): CSSPerspective;
    };
    CSSPropertyRule: {
        prototype: CSSPropertyRule;
        new (): CSSPropertyRule;
    };
    CSSRotate: {
        prototype: CSSRotate;
        new (angle: CSSNumericValue): CSSRotate;
        new (x: CSSNumberish, y: CSSNumberish, z: CSSNumberish, angle: CSSNumericValue): CSSRotate;
    };
    CSSRule: {
        prototype: CSSRule;
        new (): CSSRule;
        readonly STYLE_RULE: 1;
        readonly CHARSET_RULE: 2;
        readonly IMPORT_RULE: 3;
        readonly MEDIA_RULE: 4;
        readonly FONT_FACE_RULE: 5;
        readonly PAGE_RULE: 6;
        readonly NAMESPACE_RULE: 10;
        readonly KEYFRAMES_RULE: 7;
        readonly KEYFRAME_RULE: 8;
        readonly SUPPORTS_RULE: 12;
        readonly COUNTER_STYLE_RULE: 11;
        readonly FONT_FEATURE_VALUES_RULE: 14;
    };
    CSSRuleList: {
        prototype: CSSRuleList;
        new (): CSSRuleList;
    };
    CSSScale: {
        prototype: CSSScale;
        new (x: CSSNumberish, y: CSSNumberish, z?: CSSNumberish): CSSScale;
    };
    CSSScopeRule: {
        prototype: CSSScopeRule;
        new (): CSSScopeRule;
    };
    CSSSkew: {
        prototype: CSSSkew;
        new (ax: CSSNumericValue, ay: CSSNumericValue): CSSSkew;
    };
    CSSSkewX: {
        prototype: CSSSkewX;
        new (ax: CSSNumericValue): CSSSkewX;
    };
    CSSSkewY: {
        prototype: CSSSkewY;
        new (ay: CSSNumericValue): CSSSkewY;
    };
    CSSStartingStyleRule: {
        prototype: CSSStartingStyleRule;
        new (): CSSStartingStyleRule;
    };
    CSSStyleDeclaration: {
        prototype: CSSStyleDeclaration;
        new (): CSSStyleDeclaration;
    };
    CSSStyleRule: {
        prototype: CSSStyleRule;
        new (): CSSStyleRule;
    };
    CSSStyleSheet: {
        prototype: CSSStyleSheet;
        new (options?: CSSStyleSheetInit): CSSStyleSheet;
    };
    CSSStyleValue: {
        prototype: CSSStyleValue;
        new (): CSSStyleValue;
        parse(property: string, cssText: string): CSSStyleValue;
        parseAll(property: string, cssText: string): CSSStyleValue[];
    };
    CSSSupportsRule: {
        prototype: CSSSupportsRule;
        new (): CSSSupportsRule;
    };
    CSSTransformComponent: {
        prototype: CSSTransformComponent;
        new (): CSSTransformComponent;
    };
    CSSTransformValue: {
        prototype: CSSTransformValue;
        new (transforms: CSSTransformComponent[]): CSSTransformValue;
    };
    CSSTransition: {
        prototype: CSSTransition;
        new (): CSSTransition;
    };
    CSSTranslate: {
        prototype: CSSTranslate;
        new (x: CSSNumericValue, y: CSSNumericValue, z?: CSSNumericValue): CSSTranslate;
    };
    CSSUnitValue: {
        prototype: CSSUnitValue;
        new (value: number, unit: string): CSSUnitValue;
    };
    CSSUnparsedValue: {
        prototype: CSSUnparsedValue;
        new (members: CSSUnparsedSegment[]): CSSUnparsedValue;
    };
    CSSVariableReferenceValue: {
        prototype: CSSVariableReferenceValue;
        new (variable: string, fallback?: CSSUnparsedValue | null): CSSVariableReferenceValue;
    };
    Cache: {
        prototype: Cache;
        new (): Cache;
    };
    CacheStorage: {
        prototype: CacheStorage;
        new (): CacheStorage;
    };
    CanvasCaptureMediaStreamTrack: {
        prototype: CanvasCaptureMediaStreamTrack;
        new (): CanvasCaptureMediaStreamTrack;
    };
    CanvasGradient: {
        prototype: CanvasGradient;
        new (): CanvasGradient;
    };
    CanvasPattern: {
        prototype: CanvasPattern;
        new (): CanvasPattern;
    };
    CanvasRenderingContext2D: {
        prototype: CanvasRenderingContext2D;
        new (): CanvasRenderingContext2D;
    };
    CaretPosition: {
        prototype: CaretPosition;
        new (): CaretPosition;
    };
    ChannelMergerNode: {
        prototype: ChannelMergerNode;
        new (context: BaseAudioContext, options?: ChannelMergerOptions): ChannelMergerNode;
    };
    ChannelSplitterNode: {
        prototype: ChannelSplitterNode;
        new (context: BaseAudioContext, options?: ChannelSplitterOptions): ChannelSplitterNode;
    };
    CharacterData: {
        prototype: CharacterData;
        new (): CharacterData;
    };
    Clipboard: {
        prototype: Clipboard;
        new (): Clipboard;
    };
    ClipboardEvent: {
        prototype: ClipboardEvent;
        new (type: string, eventInitDict?: ClipboardEventInit): ClipboardEvent;
    };
    ClipboardItem: {
        prototype: ClipboardItem;
        new (items: Record<string, string | Blob | PromiseLike<string | Blob>>, options?: ClipboardItemOptions): ClipboardItem;
        supports(type: string): boolean;
    };
    CloseEvent: {
        prototype: CloseEvent;
        new (type: string, eventInitDict?: CloseEventInit): CloseEvent;
    };
    Comment: {
        prototype: Comment;
        new (data?: string): Comment;
    };
    CompositionEvent: {
        prototype: CompositionEvent;
        new (type: string, eventInitDict?: CompositionEventInit): CompositionEvent;
    };
    CompressionStream: {
        prototype: CompressionStream;
        new (format: CompressionFormat): CompressionStream;
    };
    ConstantSourceNode: {
        prototype: ConstantSourceNode;
        new (context: BaseAudioContext, options?: ConstantSourceOptions): ConstantSourceNode;
    };
    ContentVisibilityAutoStateChangeEvent: {
        prototype: ContentVisibilityAutoStateChangeEvent;
        new (type: string, eventInitDict?: ContentVisibilityAutoStateChangeEventInit): ContentVisibilityAutoStateChangeEvent;
    };
    ConvolverNode: {
        prototype: ConvolverNode;
        new (context: BaseAudioContext, options?: ConvolverOptions): ConvolverNode;
    };
    CountQueuingStrategy: {
        prototype: CountQueuingStrategy;
        new (init: QueuingStrategyInit): CountQueuingStrategy;
    };
    Credential: {
        prototype: Credential;
        new (): Credential;
    };
    CredentialsContainer: {
        prototype: CredentialsContainer;
        new (): CredentialsContainer;
    };
    Crypto: {
        prototype: Crypto;
        new (): Crypto;
    };
    CryptoKey: {
        prototype: CryptoKey;
        new (): CryptoKey;
    };
    CustomElementRegistry: {
        prototype: CustomElementRegistry;
        new (): CustomElementRegistry;
    };
    CustomEvent: {
        prototype: CustomEvent;
        new <T>(type: string, eventInitDict?: CustomEventInit<T>): CustomEvent<T>;
    };
    CustomStateSet: {
        prototype: CustomStateSet;
        new (): CustomStateSet;
    };
    DOMException: {
        prototype: DOMException;
        new (message?: string, name?: string): DOMException;
        readonly INDEX_SIZE_ERR: 1;
        readonly DOMSTRING_SIZE_ERR: 2;
        readonly HIERARCHY_REQUEST_ERR: 3;
        readonly WRONG_DOCUMENT_ERR: 4;
        readonly INVALID_CHARACTER_ERR: 5;
        readonly NO_DATA_ALLOWED_ERR: 6;
        readonly NO_MODIFICATION_ALLOWED_ERR: 7;
        readonly NOT_FOUND_ERR: 8;
        readonly NOT_SUPPORTED_ERR: 9;
        readonly INUSE_ATTRIBUTE_ERR: 10;
        readonly INVALID_STATE_ERR: 11;
        readonly SYNTAX_ERR: 12;
        readonly INVALID_MODIFICATION_ERR: 13;
        readonly NAMESPACE_ERR: 14;
        readonly INVALID_ACCESS_ERR: 15;
        readonly VALIDATION_ERR: 16;
        readonly TYPE_MISMATCH_ERR: 17;
        readonly SECURITY_ERR: 18;
        readonly NETWORK_ERR: 19;
        readonly ABORT_ERR: 20;
        readonly URL_MISMATCH_ERR: 21;
        readonly QUOTA_EXCEEDED_ERR: 22;
        readonly TIMEOUT_ERR: 23;
        readonly INVALID_NODE_TYPE_ERR: 24;
        readonly DATA_CLONE_ERR: 25;
    };
    DOMImplementation: {
        prototype: DOMImplementation;
        new (): DOMImplementation;
    };
    DOMMatrix: {
        prototype: DOMMatrix;
        new (init?: string | number[]): DOMMatrix;
        fromFloat32Array(array32: Float32Array): DOMMatrix;
        fromFloat64Array(array64: Float64Array): DOMMatrix;
        fromMatrix(other?: DOMMatrixInit): DOMMatrix;
    };
    SVGMatrix: typeof DOMMatrix;
    WebKitCSSMatrix: typeof DOMMatrix;
    DOMMatrixReadOnly: {
        prototype: DOMMatrixReadOnly;
        new (init?: string | number[]): DOMMatrixReadOnly;
        fromFloat32Array(array32: Float32Array): DOMMatrixReadOnly;
        fromFloat64Array(array64: Float64Array): DOMMatrixReadOnly;
        fromMatrix(other?: DOMMatrixInit): DOMMatrixReadOnly;
    };
    DOMParser: {
        prototype: DOMParser;
        new (): DOMParser;
    };
    DOMPoint: {
        prototype: DOMPoint;
        new (x?: number, y?: number, z?: number, w?: number): DOMPoint;
        fromPoint(other?: DOMPointInit): DOMPoint;
    };
    SVGPoint: typeof DOMPoint;
    DOMPointReadOnly: {
        prototype: DOMPointReadOnly;
        new (x?: number, y?: number, z?: number, w?: number): DOMPointReadOnly;
        fromPoint(other?: DOMPointInit): DOMPointReadOnly;
    };
    DOMQuad: {
        prototype: DOMQuad;
        new (p1?: DOMPointInit, p2?: DOMPointInit, p3?: DOMPointInit, p4?: DOMPointInit): DOMQuad;
        fromQuad(other?: DOMQuadInit): DOMQuad;
        fromRect(other?: DOMRectInit): DOMQuad;
    };
    DOMRect: {
        prototype: DOMRect;
        new (x?: number, y?: number, width?: number, height?: number): DOMRect;
        fromRect(other?: DOMRectInit): DOMRect;
    };
    SVGRect: typeof DOMRect;
    DOMRectList: {
        prototype: DOMRectList;
        new (): DOMRectList;
    };
    DOMRectReadOnly: {
        prototype: DOMRectReadOnly;
        new (x?: number, y?: number, width?: number, height?: number): DOMRectReadOnly;
        fromRect(other?: DOMRectInit): DOMRectReadOnly;
    };
    DOMStringList: {
        prototype: DOMStringList;
        new (): DOMStringList;
    };
    DOMStringMap: {
        prototype: DOMStringMap;
        new (): DOMStringMap;
    };
    DOMTokenList: {
        prototype: DOMTokenList;
        new (): DOMTokenList;
    };
    DataTransfer: {
        prototype: DataTransfer;
        new (): DataTransfer;
    };
    DataTransferItem: {
        prototype: DataTransferItem;
        new (): DataTransferItem;
    };
    DataTransferItemList: {
        prototype: DataTransferItemList;
        new (): DataTransferItemList;
    };
    DecompressionStream: {
        prototype: DecompressionStream;
        new (format: CompressionFormat): DecompressionStream;
    };
    DelayNode: {
        prototype: DelayNode;
        new (context: BaseAudioContext, options?: DelayOptions): DelayNode;
    };
    DeviceMotionEvent: {
        prototype: DeviceMotionEvent;
        new (type: string, eventInitDict?: DeviceMotionEventInit): DeviceMotionEvent;
    };
    DeviceOrientationEvent: {
        prototype: DeviceOrientationEvent;
        new (type: string, eventInitDict?: DeviceOrientationEventInit): DeviceOrientationEvent;
    };
    Document: {
        prototype: Document;
        new (): Document;
        parseHTMLUnsafe(html: string): Document;
    };
    DocumentFragment: {
        prototype: DocumentFragment;
        new (): DocumentFragment;
    };
    DocumentTimeline: {
        prototype: DocumentTimeline;
        new (options?: DocumentTimelineOptions): DocumentTimeline;
    };
    DocumentType: {
        prototype: DocumentType;
        new (): DocumentType;
    };
    DragEvent: {
        prototype: DragEvent;
        new (type: string, eventInitDict?: DragEventInit): DragEvent;
    };
    DynamicsCompressorNode: {
        prototype: DynamicsCompressorNode;
        new (context: BaseAudioContext, options?: DynamicsCompressorOptions): DynamicsCompressorNode;
    };
    Element: {
        prototype: Element;
        new (): Element;
    };
    ElementInternals: {
        prototype: ElementInternals;
        new (): ElementInternals;
    };
    EncodedAudioChunk: {
        prototype: EncodedAudioChunk;
        new (init: EncodedAudioChunkInit): EncodedAudioChunk;
    };
    EncodedVideoChunk: {
        prototype: EncodedVideoChunk;
        new (init: EncodedVideoChunkInit): EncodedVideoChunk;
    };
    ErrorEvent: {
        prototype: ErrorEvent;
        new (type: string, eventInitDict?: ErrorEventInit): ErrorEvent;
    };
    Event: {
        prototype: Event;
        new (type: string, eventInitDict?: EventInit): Event;
        readonly NONE: 0;
        readonly CAPTURING_PHASE: 1;
        readonly AT_TARGET: 2;
        readonly BUBBLING_PHASE: 3;
    };
    EventCounts: {
        prototype: EventCounts;
        new (): EventCounts;
    };
    EventSource: {
        prototype: EventSource;
        new (url: string | URL, eventSourceInitDict?: EventSourceInit): EventSource;
        readonly CONNECTING: 0;
        readonly OPEN: 1;
        readonly CLOSED: 2;
    };
    EventTarget: {
        prototype: EventTarget;
        new (): EventTarget;
    };
    External: {
        prototype: External;
        new (): External;
    };
    File: {
        prototype: File;
        new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
    };
    FileList: {
        prototype: FileList;
        new (): FileList;
    };
    FileReader: {
        prototype: FileReader;
        new (): FileReader;
        readonly EMPTY: 0;
        readonly LOADING: 1;
        readonly DONE: 2;
    };
    FileSystem: {
        prototype: FileSystem;
        new (): FileSystem;
    };
    FileSystemDirectoryEntry: {
        prototype: FileSystemDirectoryEntry;
        new (): FileSystemDirectoryEntry;
    };
    FileSystemDirectoryHandle: {
        prototype: FileSystemDirectoryHandle;
        new (): FileSystemDirectoryHandle;
    };
    FileSystemDirectoryReader: {
        prototype: FileSystemDirectoryReader;
        new (): FileSystemDirectoryReader;
    };
    FileSystemEntry: {
        prototype: FileSystemEntry;
        new (): FileSystemEntry;
    };
    FileSystemFileEntry: {
        prototype: FileSystemFileEntry;
        new (): FileSystemFileEntry;
    };
    FileSystemFileHandle: {
        prototype: FileSystemFileHandle;
        new (): FileSystemFileHandle;
    };
    FileSystemHandle: {
        prototype: FileSystemHandle;
        new (): FileSystemHandle;
    };
    FileSystemWritableFileStream: {
        prototype: FileSystemWritableFileStream;
        new (): FileSystemWritableFileStream;
    };
    FocusEvent: {
        prototype: FocusEvent;
        new (type: string, eventInitDict?: FocusEventInit): FocusEvent;
    };
    FontFace: {
        prototype: FontFace;
        new (family: string, source: string | BufferSource, descriptors?: FontFaceDescriptors): FontFace;
    };
    FontFaceSet: {
        prototype: FontFaceSet;
        new (): FontFaceSet;
    };
    FontFaceSetLoadEvent: {
        prototype: FontFaceSetLoadEvent;
        new (type: string, eventInitDict?: FontFaceSetLoadEventInit): FontFaceSetLoadEvent;
    };
    FormData: {
        prototype: FormData;
        new (form?: HTMLFormElement, submitter?: HTMLElement | null): FormData;
    };
    FormDataEvent: {
        prototype: FormDataEvent;
        new (type: string, eventInitDict: FormDataEventInit): FormDataEvent;
    };
    FragmentDirective: {
        prototype: FragmentDirective;
        new (): FragmentDirective;
    };
    GainNode: {
        prototype: GainNode;
        new (context: BaseAudioContext, options?: GainOptions): GainNode;
    };
    Gamepad: {
        prototype: Gamepad;
        new (): Gamepad;
    };
    GamepadButton: {
        prototype: GamepadButton;
        new (): GamepadButton;
    };
    GamepadEvent: {
        prototype: GamepadEvent;
        new (type: string, eventInitDict: GamepadEventInit): GamepadEvent;
    };
    GamepadHapticActuator: {
        prototype: GamepadHapticActuator;
        new (): GamepadHapticActuator;
    };
    Geolocation: {
        prototype: Geolocation;
        new (): Geolocation;
    };
    GeolocationCoordinates: {
        prototype: GeolocationCoordinates;
        new (): GeolocationCoordinates;
    };
    GeolocationPosition: {
        prototype: GeolocationPosition;
        new (): GeolocationPosition;
    };
    GeolocationPositionError: {
        prototype: GeolocationPositionError;
        new (): GeolocationPositionError;
        readonly PERMISSION_DENIED: 1;
        readonly POSITION_UNAVAILABLE: 2;
        readonly TIMEOUT: 3;
    };
    HTMLAllCollection: {
        prototype: HTMLAllCollection;
        new (): HTMLAllCollection;
    };
    HTMLAnchorElement: {
        prototype: HTMLAnchorElement;
        new (): HTMLAnchorElement;
    };
    HTMLAreaElement: {
        prototype: HTMLAreaElement;
        new (): HTMLAreaElement;
    };
    HTMLAudioElement: {
        prototype: HTMLAudioElement;
        new (): HTMLAudioElement;
    };
    HTMLBRElement: {
        prototype: HTMLBRElement;
        new (): HTMLBRElement;
    };
    HTMLBaseElement: {
        prototype: HTMLBaseElement;
        new (): HTMLBaseElement;
    };
    HTMLBodyElement: {
        prototype: HTMLBodyElement;
        new (): HTMLBodyElement;
    };
    HTMLButtonElement: {
        prototype: HTMLButtonElement;
        new (): HTMLButtonElement;
    };
    HTMLCanvasElement: {
        prototype: HTMLCanvasElement;
        new (): HTMLCanvasElement;
    };
    HTMLCollection: {
        prototype: HTMLCollection;
        new (): HTMLCollection;
    };
    HTMLDListElement: {
        prototype: HTMLDListElement;
        new (): HTMLDListElement;
    };
    HTMLDataElement: {
        prototype: HTMLDataElement;
        new (): HTMLDataElement;
    };
    HTMLDataListElement: {
        prototype: HTMLDataListElement;
        new (): HTMLDataListElement;
    };
    HTMLDetailsElement: {
        prototype: HTMLDetailsElement;
        new (): HTMLDetailsElement;
    };
    HTMLDialogElement: {
        prototype: HTMLDialogElement;
        new (): HTMLDialogElement;
    };
    HTMLDirectoryElement: {
        prototype: HTMLDirectoryElement;
        new (): HTMLDirectoryElement;
    };
    HTMLDivElement: {
        prototype: HTMLDivElement;
        new (): HTMLDivElement;
    };
    HTMLDocument: {
        prototype: HTMLDocument;
        new (): HTMLDocument;
    };
    HTMLElement: {
        prototype: HTMLElement;
        new (): HTMLElement;
    };
    HTMLEmbedElement: {
        prototype: HTMLEmbedElement;
        new (): HTMLEmbedElement;
    };
    HTMLFieldSetElement: {
        prototype: HTMLFieldSetElement;
        new (): HTMLFieldSetElement;
    };
    HTMLFontElement: {
        prototype: HTMLFontElement;
        new (): HTMLFontElement;
    };
    HTMLFormControlsCollection: {
        prototype: HTMLFormControlsCollection;
        new (): HTMLFormControlsCollection;
    };
    HTMLFormElement: {
        prototype: HTMLFormElement;
        new (): HTMLFormElement;
    };
    HTMLFrameElement: {
        prototype: HTMLFrameElement;
        new (): HTMLFrameElement;
    };
    HTMLFrameSetElement: {
        prototype: HTMLFrameSetElement;
        new (): HTMLFrameSetElement;
    };
    HTMLHRElement: {
        prototype: HTMLHRElement;
        new (): HTMLHRElement;
    };
    HTMLHeadElement: {
        prototype: HTMLHeadElement;
        new (): HTMLHeadElement;
    };
    HTMLHeadingElement: {
        prototype: HTMLHeadingElement;
        new (): HTMLHeadingElement;
    };
    HTMLHtmlElement: {
        prototype: HTMLHtmlElement;
        new (): HTMLHtmlElement;
    };
    HTMLIFrameElement: {
        prototype: HTMLIFrameElement;
        new (): HTMLIFrameElement;
    };
    HTMLImageElement: {
        prototype: HTMLImageElement;
        new (): HTMLImageElement;
    };
    HTMLInputElement: {
        prototype: HTMLInputElement;
        new (): HTMLInputElement;
    };
    HTMLLIElement: {
        prototype: HTMLLIElement;
        new (): HTMLLIElement;
    };
    HTMLLabelElement: {
        prototype: HTMLLabelElement;
        new (): HTMLLabelElement;
    };
    HTMLLegendElement: {
        prototype: HTMLLegendElement;
        new (): HTMLLegendElement;
    };
    HTMLLinkElement: {
        prototype: HTMLLinkElement;
        new (): HTMLLinkElement;
    };
    HTMLMapElement: {
        prototype: HTMLMapElement;
        new (): HTMLMapElement;
    };
    HTMLMarqueeElement: {
        prototype: HTMLMarqueeElement;
        new (): HTMLMarqueeElement;
    };
    HTMLMediaElement: {
        prototype: HTMLMediaElement;
        new (): HTMLMediaElement;
        readonly NETWORK_EMPTY: 0;
        readonly NETWORK_IDLE: 1;
        readonly NETWORK_LOADING: 2;
        readonly NETWORK_NO_SOURCE: 3;
        readonly HAVE_NOTHING: 0;
        readonly HAVE_METADATA: 1;
        readonly HAVE_CURRENT_DATA: 2;
        readonly HAVE_FUTURE_DATA: 3;
        readonly HAVE_ENOUGH_DATA: 4;
    };
    HTMLMenuElement: {
        prototype: HTMLMenuElement;
        new (): HTMLMenuElement;
    };
    HTMLMetaElement: {
        prototype: HTMLMetaElement;
        new (): HTMLMetaElement;
    };
    HTMLMeterElement: {
        prototype: HTMLMeterElement;
        new (): HTMLMeterElement;
    };
    HTMLModElement: {
        prototype: HTMLModElement;
        new (): HTMLModElement;
    };
    HTMLOListElement: {
        prototype: HTMLOListElement;
        new (): HTMLOListElement;
    };
    HTMLObjectElement: {
        prototype: HTMLObjectElement;
        new (): HTMLObjectElement;
    };
    HTMLOptGroupElement: {
        prototype: HTMLOptGroupElement;
        new (): HTMLOptGroupElement;
    };
    HTMLOptionElement: {
        prototype: HTMLOptionElement;
        new (): HTMLOptionElement;
    };
    HTMLOptionsCollection: {
        prototype: HTMLOptionsCollection;
        new (): HTMLOptionsCollection;
    };
    HTMLOutputElement: {
        prototype: HTMLOutputElement;
        new (): HTMLOutputElement;
    };
    HTMLParagraphElement: {
        prototype: HTMLParagraphElement;
        new (): HTMLParagraphElement;
    };
    HTMLParamElement: {
        prototype: HTMLParamElement;
        new (): HTMLParamElement;
    };
    HTMLPictureElement: {
        prototype: HTMLPictureElement;
        new (): HTMLPictureElement;
    };
    HTMLPreElement: {
        prototype: HTMLPreElement;
        new (): HTMLPreElement;
    };
    HTMLProgressElement: {
        prototype: HTMLProgressElement;
        new (): HTMLProgressElement;
    };
    HTMLQuoteElement: {
        prototype: HTMLQuoteElement;
        new (): HTMLQuoteElement;
    };
    HTMLScriptElement: {
        prototype: HTMLScriptElement;
        new (): HTMLScriptElement;
        supports(type: string): boolean;
    };
    HTMLSelectElement: {
        prototype: HTMLSelectElement;
        new (): HTMLSelectElement;
    };
    HTMLSlotElement: {
        prototype: HTMLSlotElement;
        new (): HTMLSlotElement;
    };
    HTMLSourceElement: {
        prototype: HTMLSourceElement;
        new (): HTMLSourceElement;
    };
    HTMLSpanElement: {
        prototype: HTMLSpanElement;
        new (): HTMLSpanElement;
    };
    HTMLStyleElement: {
        prototype: HTMLStyleElement;
        new (): HTMLStyleElement;
    };
    HTMLTableCaptionElement: {
        prototype: HTMLTableCaptionElement;
        new (): HTMLTableCaptionElement;
    };
    HTMLTableCellElement: {
        prototype: HTMLTableCellElement;
        new (): HTMLTableCellElement;
    };
    HTMLTableColElement: {
        prototype: HTMLTableColElement;
        new (): HTMLTableColElement;
    };
    HTMLTableElement: {
        prototype: HTMLTableElement;
        new (): HTMLTableElement;
    };
    HTMLTableRowElement: {
        prototype: HTMLTableRowElement;
        new (): HTMLTableRowElement;
    };
    HTMLTableSectionElement: {
        prototype: HTMLTableSectionElement;
        new (): HTMLTableSectionElement;
    };
    HTMLTemplateElement: {
        prototype: HTMLTemplateElement;
        new (): HTMLTemplateElement;
    };
    HTMLTextAreaElement: {
        prototype: HTMLTextAreaElement;
        new (): HTMLTextAreaElement;
    };
    HTMLTimeElement: {
        prototype: HTMLTimeElement;
        new (): HTMLTimeElement;
    };
    HTMLTitleElement: {
        prototype: HTMLTitleElement;
        new (): HTMLTitleElement;
    };
    HTMLTrackElement: {
        prototype: HTMLTrackElement;
        new (): HTMLTrackElement;
        readonly NONE: 0;
        readonly LOADING: 1;
        readonly LOADED: 2;
        readonly ERROR: 3;
    };
    HTMLUListElement: {
        prototype: HTMLUListElement;
        new (): HTMLUListElement;
    };
    HTMLUnknownElement: {
        prototype: HTMLUnknownElement;
        new (): HTMLUnknownElement;
    };
    HTMLVideoElement: {
        prototype: HTMLVideoElement;
        new (): HTMLVideoElement;
    };
    HashChangeEvent: {
        prototype: HashChangeEvent;
        new (type: string, eventInitDict?: HashChangeEventInit): HashChangeEvent;
    };
    Highlight: {
        prototype: Highlight;
        new (...initialRanges: AbstractRange[]): Highlight;
    };
    HighlightRegistry: {
        prototype: HighlightRegistry;
        new (): HighlightRegistry;
    };
    History: {
        prototype: History;
        new (): History;
    };
    IDBCursor: {
        prototype: IDBCursor;
        new (): IDBCursor;
    };
    IDBCursorWithValue: {
        prototype: IDBCursorWithValue;
        new (): IDBCursorWithValue;
    };
    IDBDatabase: {
        prototype: IDBDatabase;
        new (): IDBDatabase;
    };
    IDBFactory: {
        prototype: IDBFactory;
        new (): IDBFactory;
    };
    IDBIndex: {
        prototype: IDBIndex;
        new (): IDBIndex;
    };
    IDBKeyRange: {
        prototype: IDBKeyRange;
        new (): IDBKeyRange;
        bound(lower: any, upper: any, lowerOpen?: boolean, upperOpen?: boolean): IDBKeyRange;
        lowerBound(lower: any, open?: boolean): IDBKeyRange;
        only(value: any): IDBKeyRange;
        upperBound(upper: any, open?: boolean): IDBKeyRange;
    };
    IDBObjectStore: {
        prototype: IDBObjectStore;
        new (): IDBObjectStore;
    };
    IDBOpenDBRequest: {
        prototype: IDBOpenDBRequest;
        new (): IDBOpenDBRequest;
    };
    IDBRequest: {
        prototype: IDBRequest;
        new (): IDBRequest;
    };
    IDBTransaction: {
        prototype: IDBTransaction;
        new (): IDBTransaction;
    };
    IDBVersionChangeEvent: {
        prototype: IDBVersionChangeEvent;
        new (type: string, eventInitDict?: IDBVersionChangeEventInit): IDBVersionChangeEvent;
    };
    IIRFilterNode: {
        prototype: IIRFilterNode;
        new (context: BaseAudioContext, options: IIRFilterOptions): IIRFilterNode;
    };
    IdleDeadline: {
        prototype: IdleDeadline;
        new (): IdleDeadline;
    };
    ImageBitmap: {
        prototype: ImageBitmap;
        new (): ImageBitmap;
    };
    ImageBitmapRenderingContext: {
        prototype: ImageBitmapRenderingContext;
        new (): ImageBitmapRenderingContext;
    };
    ImageData: {
        prototype: ImageData;
        new (sw: number, sh: number, settings?: ImageDataSettings): ImageData;
        new (data: Uint8ClampedArray, sw: number, sh?: number, settings?: ImageDataSettings): ImageData;
    };
    InputDeviceInfo: {
        prototype: InputDeviceInfo;
        new (): InputDeviceInfo;
    };
    InputEvent: {
        prototype: InputEvent;
        new (type: string, eventInitDict?: InputEventInit): InputEvent;
    };
    IntersectionObserver: {
        prototype: IntersectionObserver;
        new (callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver;
    };
    IntersectionObserverEntry: {
        prototype: IntersectionObserverEntry;
        new (): IntersectionObserverEntry;
    };
    KeyboardEvent: {
        prototype: KeyboardEvent;
        new (type: string, eventInitDict?: KeyboardEventInit): KeyboardEvent;
        readonly DOM_KEY_LOCATION_STANDARD: 0;
        readonly DOM_KEY_LOCATION_LEFT: 1;
        readonly DOM_KEY_LOCATION_RIGHT: 2;
        readonly DOM_KEY_LOCATION_NUMPAD: 3;
    };
    KeyframeEffect: {
        prototype: KeyframeEffect;
        new (target: Element | null, keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeEffectOptions): KeyframeEffect;
        new (source: KeyframeEffect): KeyframeEffect;
    };
    LargestContentfulPaint: {
        prototype: LargestContentfulPaint;
        new (): LargestContentfulPaint;
    };
    Location: {
        prototype: Location;
        new (): Location;
    };
    Lock: {
        prototype: Lock;
        new (): Lock;
    };
    LockManager: {
        prototype: LockManager;
        new (): LockManager;
    };
    MIDIAccess: {
        prototype: MIDIAccess;
        new (): MIDIAccess;
    };
    MIDIConnectionEvent: {
        prototype: MIDIConnectionEvent;
        new (type: string, eventInitDict?: MIDIConnectionEventInit): MIDIConnectionEvent;
    };
    MIDIInput: {
        prototype: MIDIInput;
        new (): MIDIInput;
    };
    MIDIInputMap: {
        prototype: MIDIInputMap;
        new (): MIDIInputMap;
    };
    MIDIMessageEvent: {
        prototype: MIDIMessageEvent;
        new (type: string, eventInitDict?: MIDIMessageEventInit): MIDIMessageEvent;
    };
    MIDIOutput: {
        prototype: MIDIOutput;
        new (): MIDIOutput;
    };
    MIDIOutputMap: {
        prototype: MIDIOutputMap;
        new (): MIDIOutputMap;
    };
    MIDIPort: {
        prototype: MIDIPort;
        new (): MIDIPort;
    };
    MathMLElement: {
        prototype: MathMLElement;
        new (): MathMLElement;
    };
    MediaCapabilities: {
        prototype: MediaCapabilities;
        new (): MediaCapabilities;
    };
    MediaDeviceInfo: {
        prototype: MediaDeviceInfo;
        new (): MediaDeviceInfo;
    };
    MediaDevices: {
        prototype: MediaDevices;
        new (): MediaDevices;
    };
    MediaElementAudioSourceNode: {
        prototype: MediaElementAudioSourceNode;
        new (context: AudioContext, options: MediaElementAudioSourceOptions): MediaElementAudioSourceNode;
    };
    MediaEncryptedEvent: {
        prototype: MediaEncryptedEvent;
        new (type: string, eventInitDict?: MediaEncryptedEventInit): MediaEncryptedEvent;
    };
    MediaError: {
        prototype: MediaError;
        new (): MediaError;
        readonly MEDIA_ERR_ABORTED: 1;
        readonly MEDIA_ERR_NETWORK: 2;
        readonly MEDIA_ERR_DECODE: 3;
        readonly MEDIA_ERR_SRC_NOT_SUPPORTED: 4;
    };
    MediaKeyMessageEvent: {
        prototype: MediaKeyMessageEvent;
        new (type: string, eventInitDict: MediaKeyMessageEventInit): MediaKeyMessageEvent;
    };
    MediaKeySession: {
        prototype: MediaKeySession;
        new (): MediaKeySession;
    };
    MediaKeyStatusMap: {
        prototype: MediaKeyStatusMap;
        new (): MediaKeyStatusMap;
    };
    MediaKeySystemAccess: {
        prototype: MediaKeySystemAccess;
        new (): MediaKeySystemAccess;
    };
    MediaKeys: {
        prototype: MediaKeys;
        new (): MediaKeys;
    };
    MediaList: {
        prototype: MediaList;
        new (): MediaList;
    };
    MediaMetadata: {
        prototype: MediaMetadata;
        new (init?: MediaMetadataInit): MediaMetadata;
    };
    MediaQueryList: {
        prototype: MediaQueryList;
        new (): MediaQueryList;
    };
    MediaQueryListEvent: {
        prototype: MediaQueryListEvent;
        new (type: string, eventInitDict?: MediaQueryListEventInit): MediaQueryListEvent;
    };
    MediaRecorder: {
        prototype: MediaRecorder;
        new (stream: MediaStream, options?: MediaRecorderOptions): MediaRecorder;
        isTypeSupported(type: string): boolean;
    };
    MediaSession: {
        prototype: MediaSession;
        new (): MediaSession;
    };
    MediaSource: {
        prototype: MediaSource;
        new (): MediaSource;
        readonly canConstructInDedicatedWorker: boolean;
        isTypeSupported(type: string): boolean;
    };
    MediaSourceHandle: {
        prototype: MediaSourceHandle;
        new (): MediaSourceHandle;
    };
    MediaStream: {
        prototype: MediaStream;
        new (): MediaStream;
        new (stream: MediaStream): MediaStream;
        new (tracks: MediaStreamTrack[]): MediaStream;
    };
    MediaStreamAudioDestinationNode: {
        prototype: MediaStreamAudioDestinationNode;
        new (context: AudioContext, options?: AudioNodeOptions): MediaStreamAudioDestinationNode;
    };
    MediaStreamAudioSourceNode: {
        prototype: MediaStreamAudioSourceNode;
        new (context: AudioContext, options: MediaStreamAudioSourceOptions): MediaStreamAudioSourceNode;
    };
    MediaStreamTrack: {
        prototype: MediaStreamTrack;
        new (): MediaStreamTrack;
    };
    MediaStreamTrackEvent: {
        prototype: MediaStreamTrackEvent;
        new (type: string, eventInitDict: MediaStreamTrackEventInit): MediaStreamTrackEvent;
    };
    MessageChannel: {
        prototype: MessageChannel;
        new (): MessageChannel;
    };
    MessageEvent: {
        prototype: MessageEvent;
        new <T>(type: string, eventInitDict?: MessageEventInit<T>): MessageEvent<T>;
    };
    MessagePort: {
        prototype: MessagePort;
        new (): MessagePort;
    };
    MimeType: {
        prototype: MimeType;
        new (): MimeType;
    };
    MimeTypeArray: {
        prototype: MimeTypeArray;
        new (): MimeTypeArray;
    };
    MouseEvent: {
        prototype: MouseEvent;
        new (type: string, eventInitDict?: MouseEventInit): MouseEvent;
    };
    MutationObserver: {
        prototype: MutationObserver;
        new (callback: MutationCallback): MutationObserver;
    };
    MutationRecord: {
        prototype: MutationRecord;
        new (): MutationRecord;
    };
    NamedNodeMap: {
        prototype: NamedNodeMap;
        new (): NamedNodeMap;
    };
    NavigationPreloadManager: {
        prototype: NavigationPreloadManager;
        new (): NavigationPreloadManager;
    };
    Navigator: {
        prototype: Navigator;
        new (): Navigator;
    };
    Node: {
        prototype: Node;
        new (): Node;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
    };
    NodeIterator: {
        prototype: NodeIterator;
        new (): NodeIterator;
    };
    NodeList: {
        prototype: NodeList;
        new (): NodeList;
    };
    Notification: {
        prototype: Notification;
        new (title: string, options?: NotificationOptions): Notification;
        readonly permission: NotificationPermission;
        requestPermission(deprecatedCallback?: NotificationPermissionCallback): Promise<NotificationPermission>;
    };
    OfflineAudioCompletionEvent: {
        prototype: OfflineAudioCompletionEvent;
        new (type: string, eventInitDict: OfflineAudioCompletionEventInit): OfflineAudioCompletionEvent;
    };
    OfflineAudioContext: {
        prototype: OfflineAudioContext;
        new (contextOptions: OfflineAudioContextOptions): OfflineAudioContext;
        new (numberOfChannels: number, length: number, sampleRate: number): OfflineAudioContext;
    };
    OffscreenCanvas: {
        prototype: OffscreenCanvas;
        new (width: number, height: number): OffscreenCanvas;
    };
    OffscreenCanvasRenderingContext2D: {
        prototype: OffscreenCanvasRenderingContext2D;
        new (): OffscreenCanvasRenderingContext2D;
    };
    OscillatorNode: {
        prototype: OscillatorNode;
        new (context: BaseAudioContext, options?: OscillatorOptions): OscillatorNode;
    };
    OverconstrainedError: {
        prototype: OverconstrainedError;
        new (constraint: string, message?: string): OverconstrainedError;
    };
    PageTransitionEvent: {
        prototype: PageTransitionEvent;
        new (type: string, eventInitDict?: PageTransitionEventInit): PageTransitionEvent;
    };
    PannerNode: {
        prototype: PannerNode;
        new (context: BaseAudioContext, options?: PannerOptions): PannerNode;
    };
    Path2D: {
        prototype: Path2D;
        new (path?: Path2D | string): Path2D;
    };
    PaymentAddress: {
        prototype: PaymentAddress;
        new (): PaymentAddress;
    };
    PaymentMethodChangeEvent: {
        prototype: PaymentMethodChangeEvent;
        new (type: string, eventInitDict?: PaymentMethodChangeEventInit): PaymentMethodChangeEvent;
    };
    PaymentRequest: {
        prototype: PaymentRequest;
        new (methodData: PaymentMethodData[], details: PaymentDetailsInit, options?: PaymentOptions): PaymentRequest;
    };
    PaymentRequestUpdateEvent: {
        prototype: PaymentRequestUpdateEvent;
        new (type: string, eventInitDict?: PaymentRequestUpdateEventInit): PaymentRequestUpdateEvent;
    };
    PaymentResponse: {
        prototype: PaymentResponse;
        new (): PaymentResponse;
    };
    Performance: {
        prototype: Performance;
        new (): Performance;
    };
    PerformanceEntry: {
        prototype: PerformanceEntry;
        new (): PerformanceEntry;
    };
    PerformanceEventTiming: {
        prototype: PerformanceEventTiming;
        new (): PerformanceEventTiming;
    };
    PerformanceMark: {
        prototype: PerformanceMark;
        new (markName: string, markOptions?: PerformanceMarkOptions): PerformanceMark;
    };
    PerformanceMeasure: {
        prototype: PerformanceMeasure;
        new (): PerformanceMeasure;
    };
    PerformanceNavigation: {
        prototype: PerformanceNavigation;
        new (): PerformanceNavigation;
        readonly TYPE_NAVIGATE: 0;
        readonly TYPE_RELOAD: 1;
        readonly TYPE_BACK_FORWARD: 2;
        readonly TYPE_RESERVED: 255;
    };
    PerformanceNavigationTiming: {
        prototype: PerformanceNavigationTiming;
        new (): PerformanceNavigationTiming;
    };
    PerformanceObserver: {
        prototype: PerformanceObserver;
        new (callback: PerformanceObserverCallback): PerformanceObserver;
        readonly supportedEntryTypes: ReadonlyArray<string>;
    };
    PerformanceObserverEntryList: {
        prototype: PerformanceObserverEntryList;
        new (): PerformanceObserverEntryList;
    };
    PerformancePaintTiming: {
        prototype: PerformancePaintTiming;
        new (): PerformancePaintTiming;
    };
    PerformanceResourceTiming: {
        prototype: PerformanceResourceTiming;
        new (): PerformanceResourceTiming;
    };
    PerformanceServerTiming: {
        prototype: PerformanceServerTiming;
        new (): PerformanceServerTiming;
    };
    PerformanceTiming: {
        prototype: PerformanceTiming;
        new (): PerformanceTiming;
    };
    PeriodicWave: {
        prototype: PeriodicWave;
        new (context: BaseAudioContext, options?: PeriodicWaveOptions): PeriodicWave;
    };
    PermissionStatus: {
        prototype: PermissionStatus;
        new (): PermissionStatus;
    };
    Permissions: {
        prototype: Permissions;
        new (): Permissions;
    };
    PictureInPictureEvent: {
        prototype: PictureInPictureEvent;
        new (type: string, eventInitDict: PictureInPictureEventInit): PictureInPictureEvent;
    };
    PictureInPictureWindow: {
        prototype: PictureInPictureWindow;
        new (): PictureInPictureWindow;
    };
    Plugin: {
        prototype: Plugin;
        new (): Plugin;
    };
    PluginArray: {
        prototype: PluginArray;
        new (): PluginArray;
    };
    PointerEvent: {
        prototype: PointerEvent;
        new (type: string, eventInitDict?: PointerEventInit): PointerEvent;
    };
    PopStateEvent: {
        prototype: PopStateEvent;
        new (type: string, eventInitDict?: PopStateEventInit): PopStateEvent;
    };
    ProcessingInstruction: {
        prototype: ProcessingInstruction;
        new (): ProcessingInstruction;
    };
    ProgressEvent: {
        prototype: ProgressEvent;
        new (type: string, eventInitDict?: ProgressEventInit): ProgressEvent;
    };
    PromiseRejectionEvent: {
        prototype: PromiseRejectionEvent;
        new (type: string, eventInitDict: PromiseRejectionEventInit): PromiseRejectionEvent;
    };
    PublicKeyCredential: {
        prototype: PublicKeyCredential;
        new (): PublicKeyCredential;
        isConditionalMediationAvailable(): Promise<boolean>;
        isUserVerifyingPlatformAuthenticatorAvailable(): Promise<boolean>;
        parseCreationOptionsFromJSON(options: PublicKeyCredentialCreationOptionsJSON): PublicKeyCredentialCreationOptions;
        parseRequestOptionsFromJSON(options: PublicKeyCredentialRequestOptionsJSON): PublicKeyCredentialRequestOptions;
    };
    PushManager: {
        prototype: PushManager;
        new (): PushManager;
        readonly supportedContentEncodings: ReadonlyArray<string>;
    };
    PushSubscription: {
        prototype: PushSubscription;
        new (): PushSubscription;
    };
    PushSubscriptionOptions: {
        prototype: PushSubscriptionOptions;
        new (): PushSubscriptionOptions;
    };
    RTCCertificate: {
        prototype: RTCCertificate;
        new (): RTCCertificate;
    };
    RTCDTMFSender: {
        prototype: RTCDTMFSender;
        new (): RTCDTMFSender;
    };
    RTCDTMFToneChangeEvent: {
        prototype: RTCDTMFToneChangeEvent;
        new (type: string, eventInitDict?: RTCDTMFToneChangeEventInit): RTCDTMFToneChangeEvent;
    };
    RTCDataChannel: {
        prototype: RTCDataChannel;
        new (): RTCDataChannel;
    };
    RTCDataChannelEvent: {
        prototype: RTCDataChannelEvent;
        new (type: string, eventInitDict: RTCDataChannelEventInit): RTCDataChannelEvent;
    };
    RTCDtlsTransport: {
        prototype: RTCDtlsTransport;
        new (): RTCDtlsTransport;
    };
    RTCEncodedAudioFrame: {
        prototype: RTCEncodedAudioFrame;
        new (): RTCEncodedAudioFrame;
    };
    RTCEncodedVideoFrame: {
        prototype: RTCEncodedVideoFrame;
        new (): RTCEncodedVideoFrame;
    };
    RTCError: {
        prototype: RTCError;
        new (init: RTCErrorInit, message?: string): RTCError;
    };
    RTCErrorEvent: {
        prototype: RTCErrorEvent;
        new (type: string, eventInitDict: RTCErrorEventInit): RTCErrorEvent;
    };
    RTCIceCandidate: {
        prototype: RTCIceCandidate;
        new (candidateInitDict?: RTCIceCandidateInit): RTCIceCandidate;
    };
    RTCIceTransport: {
        prototype: RTCIceTransport;
        new (): RTCIceTransport;
    };
    RTCPeerConnection: {
        prototype: RTCPeerConnection;
        new (configuration?: RTCConfiguration): RTCPeerConnection;
        generateCertificate(keygenAlgorithm: AlgorithmIdentifier): Promise<RTCCertificate>;
    };
    RTCPeerConnectionIceErrorEvent: {
        prototype: RTCPeerConnectionIceErrorEvent;
        new (type: string, eventInitDict: RTCPeerConnectionIceErrorEventInit): RTCPeerConnectionIceErrorEvent;
    };
    RTCPeerConnectionIceEvent: {
        prototype: RTCPeerConnectionIceEvent;
        new (type: string, eventInitDict?: RTCPeerConnectionIceEventInit): RTCPeerConnectionIceEvent;
    };
    RTCRtpReceiver: {
        prototype: RTCRtpReceiver;
        new (): RTCRtpReceiver;
        getCapabilities(kind: string): RTCRtpCapabilities | null;
    };
    RTCRtpScriptTransform: {
        prototype: RTCRtpScriptTransform;
        new (worker: Worker, options?: any, transfer?: any[]): RTCRtpScriptTransform;
    };
    RTCRtpSender: {
        prototype: RTCRtpSender;
        new (): RTCRtpSender;
        getCapabilities(kind: string): RTCRtpCapabilities | null;
    };
    RTCRtpTransceiver: {
        prototype: RTCRtpTransceiver;
        new (): RTCRtpTransceiver;
    };
    RTCSctpTransport: {
        prototype: RTCSctpTransport;
        new (): RTCSctpTransport;
    };
    RTCSessionDescription: {
        prototype: RTCSessionDescription;
        new (descriptionInitDict: RTCSessionDescriptionInit): RTCSessionDescription;
    };
    RTCStatsReport: {
        prototype: RTCStatsReport;
        new (): RTCStatsReport;
    };
    RTCTrackEvent: {
        prototype: RTCTrackEvent;
        new (type: string, eventInitDict: RTCTrackEventInit): RTCTrackEvent;
    };
    RadioNodeList: {
        prototype: RadioNodeList;
        new (): RadioNodeList;
    };
    Range: {
        prototype: Range;
        new (): Range;
        readonly START_TO_START: 0;
        readonly START_TO_END: 1;
        readonly END_TO_END: 2;
        readonly END_TO_START: 3;
    };
    ReadableByteStreamController: {
        prototype: ReadableByteStreamController;
        new (): ReadableByteStreamController;
    };
    ReadableStreamBYOBReader: {
        prototype: ReadableStreamBYOBReader;
        new (stream: ReadableStream<Uint8Array>): ReadableStreamBYOBReader;
    };
    ReadableStreamBYOBRequest: {
        prototype: ReadableStreamBYOBRequest;
        new (): ReadableStreamBYOBRequest;
    };
    ReadableStreamDefaultController: {
        prototype: ReadableStreamDefaultController;
        new (): ReadableStreamDefaultController;
    };
    ReadableStreamDefaultReader: {
        prototype: ReadableStreamDefaultReader;
        new <R = any>(stream: ReadableStream<R>): ReadableStreamDefaultReader<R>;
    };
    RemotePlayback: {
        prototype: RemotePlayback;
        new (): RemotePlayback;
    };
    Report: {
        prototype: Report;
        new (): Report;
    };
    ReportBody: {
        prototype: ReportBody;
        new (): ReportBody;
    };
    ReportingObserver: {
        prototype: ReportingObserver;
        new (callback: ReportingObserverCallback, options?: ReportingObserverOptions): ReportingObserver;
    };
    Request: {
        prototype: Request;
        new (input: RequestInfo | URL, init?: RequestInit): Request;
    };
    ResizeObserver: {
        prototype: ResizeObserver;
        new (callback: ResizeObserverCallback): ResizeObserver;
    };
    ResizeObserverEntry: {
        prototype: ResizeObserverEntry;
        new (): ResizeObserverEntry;
    };
    ResizeObserverSize: {
        prototype: ResizeObserverSize;
        new (): ResizeObserverSize;
    };
    Response: {
        prototype: Response;
        new (body?: BodyInit | null, init?: ResponseInit): Response;
        error(): Response;
        json(data: any, init?: ResponseInit): Response;
        redirect(url: string | URL, status?: number): Response;
    };
    SVGAElement: {
        prototype: SVGAElement;
        new (): SVGAElement;
    };
    SVGAngle: {
        prototype: SVGAngle;
        new (): SVGAngle;
        readonly SVG_ANGLETYPE_UNKNOWN: 0;
        readonly SVG_ANGLETYPE_UNSPECIFIED: 1;
        readonly SVG_ANGLETYPE_DEG: 2;
        readonly SVG_ANGLETYPE_RAD: 3;
        readonly SVG_ANGLETYPE_GRAD: 4;
    };
    SVGAnimateElement: {
        prototype: SVGAnimateElement;
        new (): SVGAnimateElement;
    };
    SVGAnimateMotionElement: {
        prototype: SVGAnimateMotionElement;
        new (): SVGAnimateMotionElement;
    };
    SVGAnimateTransformElement: {
        prototype: SVGAnimateTransformElement;
        new (): SVGAnimateTransformElement;
    };
    SVGAnimatedAngle: {
        prototype: SVGAnimatedAngle;
        new (): SVGAnimatedAngle;
    };
    SVGAnimatedBoolean: {
        prototype: SVGAnimatedBoolean;
        new (): SVGAnimatedBoolean;
    };
    SVGAnimatedEnumeration: {
        prototype: SVGAnimatedEnumeration;
        new (): SVGAnimatedEnumeration;
    };
    SVGAnimatedInteger: {
        prototype: SVGAnimatedInteger;
        new (): SVGAnimatedInteger;
    };
    SVGAnimatedLength: {
        prototype: SVGAnimatedLength;
        new (): SVGAnimatedLength;
    };
    SVGAnimatedLengthList: {
        prototype: SVGAnimatedLengthList;
        new (): SVGAnimatedLengthList;
    };
    SVGAnimatedNumber: {
        prototype: SVGAnimatedNumber;
        new (): SVGAnimatedNumber;
    };
    SVGAnimatedNumberList: {
        prototype: SVGAnimatedNumberList;
        new (): SVGAnimatedNumberList;
    };
    SVGAnimatedPreserveAspectRatio: {
        prototype: SVGAnimatedPreserveAspectRatio;
        new (): SVGAnimatedPreserveAspectRatio;
    };
    SVGAnimatedRect: {
        prototype: SVGAnimatedRect;
        new (): SVGAnimatedRect;
    };
    SVGAnimatedString: {
        prototype: SVGAnimatedString;
        new (): SVGAnimatedString;
    };
    SVGAnimatedTransformList: {
        prototype: SVGAnimatedTransformList;
        new (): SVGAnimatedTransformList;
    };
    SVGAnimationElement: {
        prototype: SVGAnimationElement;
        new (): SVGAnimationElement;
    };
    SVGCircleElement: {
        prototype: SVGCircleElement;
        new (): SVGCircleElement;
    };
    SVGClipPathElement: {
        prototype: SVGClipPathElement;
        new (): SVGClipPathElement;
    };
    SVGComponentTransferFunctionElement: {
        prototype: SVGComponentTransferFunctionElement;
        new (): SVGComponentTransferFunctionElement;
        readonly SVG_FECOMPONENTTRANSFER_TYPE_UNKNOWN: 0;
        readonly SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY: 1;
        readonly SVG_FECOMPONENTTRANSFER_TYPE_TABLE: 2;
        readonly SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE: 3;
        readonly SVG_FECOMPONENTTRANSFER_TYPE_LINEAR: 4;
        readonly SVG_FECOMPONENTTRANSFER_TYPE_GAMMA: 5;
    };
    SVGDefsElement: {
        prototype: SVGDefsElement;
        new (): SVGDefsElement;
    };
    SVGDescElement: {
        prototype: SVGDescElement;
        new (): SVGDescElement;
    };
    SVGElement: {
        prototype: SVGElement;
        new (): SVGElement;
    };
    SVGEllipseElement: {
        prototype: SVGEllipseElement;
        new (): SVGEllipseElement;
    };
    SVGFEBlendElement: {
        prototype: SVGFEBlendElement;
        new (): SVGFEBlendElement;
        readonly SVG_FEBLEND_MODE_UNKNOWN: 0;
        readonly SVG_FEBLEND_MODE_NORMAL: 1;
        readonly SVG_FEBLEND_MODE_MULTIPLY: 2;
        readonly SVG_FEBLEND_MODE_SCREEN: 3;
        readonly SVG_FEBLEND_MODE_DARKEN: 4;
        readonly SVG_FEBLEND_MODE_LIGHTEN: 5;
        readonly SVG_FEBLEND_MODE_OVERLAY: 6;
        readonly SVG_FEBLEND_MODE_COLOR_DODGE: 7;
        readonly SVG_FEBLEND_MODE_COLOR_BURN: 8;
        readonly SVG_FEBLEND_MODE_HARD_LIGHT: 9;
        readonly SVG_FEBLEND_MODE_SOFT_LIGHT: 10;
        readonly SVG_FEBLEND_MODE_DIFFERENCE: 11;
        readonly SVG_FEBLEND_MODE_EXCLUSION: 12;
        readonly SVG_FEBLEND_MODE_HUE: 13;
        readonly SVG_FEBLEND_MODE_SATURATION: 14;
        readonly SVG_FEBLEND_MODE_COLOR: 15;
        readonly SVG_FEBLEND_MODE_LUMINOSITY: 16;
    };
    SVGFEColorMatrixElement: {
        prototype: SVGFEColorMatrixElement;
        new (): SVGFEColorMatrixElement;
        readonly SVG_FECOLORMATRIX_TYPE_UNKNOWN: 0;
        readonly SVG_FECOLORMATRIX_TYPE_MATRIX: 1;
        readonly SVG_FECOLORMATRIX_TYPE_SATURATE: 2;
        readonly SVG_FECOLORMATRIX_TYPE_HUEROTATE: 3;
        readonly SVG_FECOLORMATRIX_TYPE_LUMINANCETOALPHA: 4;
    };
    SVGFEComponentTransferElement: {
        prototype: SVGFEComponentTransferElement;
        new (): SVGFEComponentTransferElement;
    };
    SVGFECompositeElement: {
        prototype: SVGFECompositeElement;
        new (): SVGFECompositeElement;
        readonly SVG_FECOMPOSITE_OPERATOR_UNKNOWN: 0;
        readonly SVG_FECOMPOSITE_OPERATOR_OVER: 1;
        readonly SVG_FECOMPOSITE_OPERATOR_IN: 2;
        readonly SVG_FECOMPOSITE_OPERATOR_OUT: 3;
        readonly SVG_FECOMPOSITE_OPERATOR_ATOP: 4;
        readonly SVG_FECOMPOSITE_OPERATOR_XOR: 5;
        readonly SVG_FECOMPOSITE_OPERATOR_ARITHMETIC: 6;
    };
    SVGFEConvolveMatrixElement: {
        prototype: SVGFEConvolveMatrixElement;
        new (): SVGFEConvolveMatrixElement;
        readonly SVG_EDGEMODE_UNKNOWN: 0;
        readonly SVG_EDGEMODE_DUPLICATE: 1;
        readonly SVG_EDGEMODE_WRAP: 2;
        readonly SVG_EDGEMODE_NONE: 3;
    };
    SVGFEDiffuseLightingElement: {
        prototype: SVGFEDiffuseLightingElement;
        new (): SVGFEDiffuseLightingElement;
    };
    SVGFEDisplacementMapElement: {
        prototype: SVGFEDisplacementMapElement;
        new (): SVGFEDisplacementMapElement;
        readonly SVG_CHANNEL_UNKNOWN: 0;
        readonly SVG_CHANNEL_R: 1;
        readonly SVG_CHANNEL_G: 2;
        readonly SVG_CHANNEL_B: 3;
        readonly SVG_CHANNEL_A: 4;
    };
    SVGFEDistantLightElement: {
        prototype: SVGFEDistantLightElement;
        new (): SVGFEDistantLightElement;
    };
    SVGFEDropShadowElement: {
        prototype: SVGFEDropShadowElement;
        new (): SVGFEDropShadowElement;
    };
    SVGFEFloodElement: {
        prototype: SVGFEFloodElement;
        new (): SVGFEFloodElement;
    };
    SVGFEFuncAElement: {
        prototype: SVGFEFuncAElement;
        new (): SVGFEFuncAElement;
    };
    SVGFEFuncBElement: {
        prototype: SVGFEFuncBElement;
        new (): SVGFEFuncBElement;
    };
    SVGFEFuncGElement: {
        prototype: SVGFEFuncGElement;
        new (): SVGFEFuncGElement;
    };
    SVGFEFuncRElement: {
        prototype: SVGFEFuncRElement;
        new (): SVGFEFuncRElement;
    };
    SVGFEGaussianBlurElement: {
        prototype: SVGFEGaussianBlurElement;
        new (): SVGFEGaussianBlurElement;
    };
    SVGFEImageElement: {
        prototype: SVGFEImageElement;
        new (): SVGFEImageElement;
    };
    SVGFEMergeElement: {
        prototype: SVGFEMergeElement;
        new (): SVGFEMergeElement;
    };
    SVGFEMergeNodeElement: {
        prototype: SVGFEMergeNodeElement;
        new (): SVGFEMergeNodeElement;
    };
    SVGFEMorphologyElement: {
        prototype: SVGFEMorphologyElement;
        new (): SVGFEMorphologyElement;
        readonly SVG_MORPHOLOGY_OPERATOR_UNKNOWN: 0;
        readonly SVG_MORPHOLOGY_OPERATOR_ERODE: 1;
        readonly SVG_MORPHOLOGY_OPERATOR_DILATE: 2;
    };
    SVGFEOffsetElement: {
        prototype: SVGFEOffsetElement;
        new (): SVGFEOffsetElement;
    };
    SVGFEPointLightElement: {
        prototype: SVGFEPointLightElement;
        new (): SVGFEPointLightElement;
    };
    SVGFESpecularLightingElement: {
        prototype: SVGFESpecularLightingElement;
        new (): SVGFESpecularLightingElement;
    };
    SVGFESpotLightElement: {
        prototype: SVGFESpotLightElement;
        new (): SVGFESpotLightElement;
    };
    SVGFETileElement: {
        prototype: SVGFETileElement;
        new (): SVGFETileElement;
    };
    SVGFETurbulenceElement: {
        prototype: SVGFETurbulenceElement;
        new (): SVGFETurbulenceElement;
        readonly SVG_TURBULENCE_TYPE_UNKNOWN: 0;
        readonly SVG_TURBULENCE_TYPE_FRACTALNOISE: 1;
        readonly SVG_TURBULENCE_TYPE_TURBULENCE: 2;
        readonly SVG_STITCHTYPE_UNKNOWN: 0;
        readonly SVG_STITCHTYPE_STITCH: 1;
        readonly SVG_STITCHTYPE_NOSTITCH: 2;
    };
    SVGFilterElement: {
        prototype: SVGFilterElement;
        new (): SVGFilterElement;
    };
    SVGForeignObjectElement: {
        prototype: SVGForeignObjectElement;
        new (): SVGForeignObjectElement;
    };
    SVGGElement: {
        prototype: SVGGElement;
        new (): SVGGElement;
    };
    SVGGeometryElement: {
        prototype: SVGGeometryElement;
        new (): SVGGeometryElement;
    };
    SVGGradientElement: {
        prototype: SVGGradientElement;
        new (): SVGGradientElement;
        readonly SVG_SPREADMETHOD_UNKNOWN: 0;
        readonly SVG_SPREADMETHOD_PAD: 1;
        readonly SVG_SPREADMETHOD_REFLECT: 2;
        readonly SVG_SPREADMETHOD_REPEAT: 3;
    };
    SVGGraphicsElement: {
        prototype: SVGGraphicsElement;
        new (): SVGGraphicsElement;
    };
    SVGImageElement: {
        prototype: SVGImageElement;
        new (): SVGImageElement;
    };
    SVGLength: {
        prototype: SVGLength;
        new (): SVGLength;
        readonly SVG_LENGTHTYPE_UNKNOWN: 0;
        readonly SVG_LENGTHTYPE_NUMBER: 1;
        readonly SVG_LENGTHTYPE_PERCENTAGE: 2;
        readonly SVG_LENGTHTYPE_EMS: 3;
        readonly SVG_LENGTHTYPE_EXS: 4;
        readonly SVG_LENGTHTYPE_PX: 5;
        readonly SVG_LENGTHTYPE_CM: 6;
        readonly SVG_LENGTHTYPE_MM: 7;
        readonly SVG_LENGTHTYPE_IN: 8;
        readonly SVG_LENGTHTYPE_PT: 9;
        readonly SVG_LENGTHTYPE_PC: 10;
    };
    SVGLengthList: {
        prototype: SVGLengthList;
        new (): SVGLengthList;
    };
    SVGLineElement: {
        prototype: SVGLineElement;
        new (): SVGLineElement;
    };
    SVGLinearGradientElement: {
        prototype: SVGLinearGradientElement;
        new (): SVGLinearGradientElement;
    };
    SVGMPathElement: {
        prototype: SVGMPathElement;
        new (): SVGMPathElement;
    };
    SVGMarkerElement: {
        prototype: SVGMarkerElement;
        new (): SVGMarkerElement;
        readonly SVG_MARKERUNITS_UNKNOWN: 0;
        readonly SVG_MARKERUNITS_USERSPACEONUSE: 1;
        readonly SVG_MARKERUNITS_STROKEWIDTH: 2;
        readonly SVG_MARKER_ORIENT_UNKNOWN: 0;
        readonly SVG_MARKER_ORIENT_AUTO: 1;
        readonly SVG_MARKER_ORIENT_ANGLE: 2;
    };
    SVGMaskElement: {
        prototype: SVGMaskElement;
        new (): SVGMaskElement;
    };
    SVGMetadataElement: {
        prototype: SVGMetadataElement;
        new (): SVGMetadataElement;
    };
    SVGNumber: {
        prototype: SVGNumber;
        new (): SVGNumber;
    };
    SVGNumberList: {
        prototype: SVGNumberList;
        new (): SVGNumberList;
    };
    SVGPathElement: {
        prototype: SVGPathElement;
        new (): SVGPathElement;
    };
    SVGPatternElement: {
        prototype: SVGPatternElement;
        new (): SVGPatternElement;
    };
    SVGPointList: {
        prototype: SVGPointList;
        new (): SVGPointList;
    };
    SVGPolygonElement: {
        prototype: SVGPolygonElement;
        new (): SVGPolygonElement;
    };
    SVGPolylineElement: {
        prototype: SVGPolylineElement;
        new (): SVGPolylineElement;
    };
    SVGPreserveAspectRatio: {
        prototype: SVGPreserveAspectRatio;
        new (): SVGPreserveAspectRatio;
        readonly SVG_PRESERVEASPECTRATIO_UNKNOWN: 0;
        readonly SVG_PRESERVEASPECTRATIO_NONE: 1;
        readonly SVG_PRESERVEASPECTRATIO_XMINYMIN: 2;
        readonly SVG_PRESERVEASPECTRATIO_XMIDYMIN: 3;
        readonly SVG_PRESERVEASPECTRATIO_XMAXYMIN: 4;
        readonly SVG_PRESERVEASPECTRATIO_XMINYMID: 5;
        readonly SVG_PRESERVEASPECTRATIO_XMIDYMID: 6;
        readonly SVG_PRESERVEASPECTRATIO_XMAXYMID: 7;
        readonly SVG_PRESERVEASPECTRATIO_XMINYMAX: 8;
        readonly SVG_PRESERVEASPECTRATIO_XMIDYMAX: 9;
        readonly SVG_PRESERVEASPECTRATIO_XMAXYMAX: 10;
        readonly SVG_MEETORSLICE_UNKNOWN: 0;
        readonly SVG_MEETORSLICE_MEET: 1;
        readonly SVG_MEETORSLICE_SLICE: 2;
    };
    SVGRadialGradientElement: {
        prototype: SVGRadialGradientElement;
        new (): SVGRadialGradientElement;
    };
    SVGRectElement: {
        prototype: SVGRectElement;
        new (): SVGRectElement;
    };
    SVGSVGElement: {
        prototype: SVGSVGElement;
        new (): SVGSVGElement;
    };
    SVGScriptElement: {
        prototype: SVGScriptElement;
        new (): SVGScriptElement;
    };
    SVGSetElement: {
        prototype: SVGSetElement;
        new (): SVGSetElement;
    };
    SVGStopElement: {
        prototype: SVGStopElement;
        new (): SVGStopElement;
    };
    SVGStringList: {
        prototype: SVGStringList;
        new (): SVGStringList;
    };
    SVGStyleElement: {
        prototype: SVGStyleElement;
        new (): SVGStyleElement;
    };
    SVGSwitchElement: {
        prototype: SVGSwitchElement;
        new (): SVGSwitchElement;
    };
    SVGSymbolElement: {
        prototype: SVGSymbolElement;
        new (): SVGSymbolElement;
    };
    SVGTSpanElement: {
        prototype: SVGTSpanElement;
        new (): SVGTSpanElement;
    };
    SVGTextContentElement: {
        prototype: SVGTextContentElement;
        new (): SVGTextContentElement;
        readonly LENGTHADJUST_UNKNOWN: 0;
        readonly LENGTHADJUST_SPACING: 1;
        readonly LENGTHADJUST_SPACINGANDGLYPHS: 2;
    };
    SVGTextElement: {
        prototype: SVGTextElement;
        new (): SVGTextElement;
    };
    SVGTextPathElement: {
        prototype: SVGTextPathElement;
        new (): SVGTextPathElement;
        readonly TEXTPATH_METHODTYPE_UNKNOWN: 0;
        readonly TEXTPATH_METHODTYPE_ALIGN: 1;
        readonly TEXTPATH_METHODTYPE_STRETCH: 2;
        readonly TEXTPATH_SPACINGTYPE_UNKNOWN: 0;
        readonly TEXTPATH_SPACINGTYPE_AUTO: 1;
        readonly TEXTPATH_SPACINGTYPE_EXACT: 2;
    };
    SVGTextPositioningElement: {
        prototype: SVGTextPositioningElement;
        new (): SVGTextPositioningElement;
    };
    SVGTitleElement: {
        prototype: SVGTitleElement;
        new (): SVGTitleElement;
    };
    SVGTransform: {
        prototype: SVGTransform;
        new (): SVGTransform;
        readonly SVG_TRANSFORM_UNKNOWN: 0;
        readonly SVG_TRANSFORM_MATRIX: 1;
        readonly SVG_TRANSFORM_TRANSLATE: 2;
        readonly SVG_TRANSFORM_SCALE: 3;
        readonly SVG_TRANSFORM_ROTATE: 4;
        readonly SVG_TRANSFORM_SKEWX: 5;
        readonly SVG_TRANSFORM_SKEWY: 6;
    };
    SVGTransformList: {
        prototype: SVGTransformList;
        new (): SVGTransformList;
    };
    SVGUnitTypes: {
        prototype: SVGUnitTypes;
        new (): SVGUnitTypes;
        readonly SVG_UNIT_TYPE_UNKNOWN: 0;
        readonly SVG_UNIT_TYPE_USERSPACEONUSE: 1;
        readonly SVG_UNIT_TYPE_OBJECTBOUNDINGBOX: 2;
    };
    SVGUseElement: {
        prototype: SVGUseElement;
        new (): SVGUseElement;
    };
    SVGViewElement: {
        prototype: SVGViewElement;
        new (): SVGViewElement;
    };
    Screen: {
        prototype: Screen;
        new (): Screen;
    };
    ScreenOrientation: {
        prototype: ScreenOrientation;
        new (): ScreenOrientation;
    };
    ScriptProcessorNode: {
        prototype: ScriptProcessorNode;
        new (): ScriptProcessorNode;
    };
    SecurityPolicyViolationEvent: {
        prototype: SecurityPolicyViolationEvent;
        new (type: string, eventInitDict?: SecurityPolicyViolationEventInit): SecurityPolicyViolationEvent;
    };
    Selection: {
        prototype: Selection;
        new (): Selection;
    };
    ServiceWorker: {
        prototype: ServiceWorker;
        new (): ServiceWorker;
    };
    ServiceWorkerContainer: {
        prototype: ServiceWorkerContainer;
        new (): ServiceWorkerContainer;
    };
    ServiceWorkerRegistration: {
        prototype: ServiceWorkerRegistration;
        new (): ServiceWorkerRegistration;
    };
    ShadowRoot: {
        prototype: ShadowRoot;
        new (): ShadowRoot;
    };
    SharedWorker: {
        prototype: SharedWorker;
        new (scriptURL: string | URL, options?: string | WorkerOptions): SharedWorker;
    };
    SourceBuffer: {
        prototype: SourceBuffer;
        new (): SourceBuffer;
    };
    SourceBufferList: {
        prototype: SourceBufferList;
        new (): SourceBufferList;
    };
    SpeechRecognitionAlternative: {
        prototype: SpeechRecognitionAlternative;
        new (): SpeechRecognitionAlternative;
    };
    SpeechRecognitionResult: {
        prototype: SpeechRecognitionResult;
        new (): SpeechRecognitionResult;
    };
    SpeechRecognitionResultList: {
        prototype: SpeechRecognitionResultList;
        new (): SpeechRecognitionResultList;
    };
    SpeechSynthesis: {
        prototype: SpeechSynthesis;
        new (): SpeechSynthesis;
    };
    SpeechSynthesisErrorEvent: {
        prototype: SpeechSynthesisErrorEvent;
        new (type: string, eventInitDict: SpeechSynthesisErrorEventInit): SpeechSynthesisErrorEvent;
    };
    SpeechSynthesisEvent: {
        prototype: SpeechSynthesisEvent;
        new (type: string, eventInitDict: SpeechSynthesisEventInit): SpeechSynthesisEvent;
    };
    SpeechSynthesisUtterance: {
        prototype: SpeechSynthesisUtterance;
        new (text?: string): SpeechSynthesisUtterance;
    };
    SpeechSynthesisVoice: {
        prototype: SpeechSynthesisVoice;
        new (): SpeechSynthesisVoice;
    };
    StaticRange: {
        prototype: StaticRange;
        new (init: StaticRangeInit): StaticRange;
    };
    StereoPannerNode: {
        prototype: StereoPannerNode;
        new (context: BaseAudioContext, options?: StereoPannerOptions): StereoPannerNode;
    };
    Storage: {
        prototype: Storage;
        new (): Storage;
    };
    StorageEvent: {
        prototype: StorageEvent;
        new (type: string, eventInitDict?: StorageEventInit): StorageEvent;
    };
    StorageManager: {
        prototype: StorageManager;
        new (): StorageManager;
    };
    StylePropertyMap: {
        prototype: StylePropertyMap;
        new (): StylePropertyMap;
    };
    StylePropertyMapReadOnly: {
        prototype: StylePropertyMapReadOnly;
        new (): StylePropertyMapReadOnly;
    };
    StyleSheet: {
        prototype: StyleSheet;
        new (): StyleSheet;
    };
    StyleSheetList: {
        prototype: StyleSheetList;
        new (): StyleSheetList;
    };
    SubmitEvent: {
        prototype: SubmitEvent;
        new (type: string, eventInitDict?: SubmitEventInit): SubmitEvent;
    };
    SubtleCrypto: {
        prototype: SubtleCrypto;
        new (): SubtleCrypto;
    };
    Text: {
        prototype: Text;
        new (data?: string): Text;
    };
    TextEvent: {
        prototype: TextEvent;
        new (): TextEvent;
    };
    TextMetrics: {
        prototype: TextMetrics;
        new (): TextMetrics;
    };
    TextTrack: {
        prototype: TextTrack;
        new (): TextTrack;
    };
    TextTrackCue: {
        prototype: TextTrackCue;
        new (): TextTrackCue;
    };
    TextTrackCueList: {
        prototype: TextTrackCueList;
        new (): TextTrackCueList;
    };
    TextTrackList: {
        prototype: TextTrackList;
        new (): TextTrackList;
    };
    TimeRanges: {
        prototype: TimeRanges;
        new (): TimeRanges;
    };
    ToggleEvent: {
        prototype: ToggleEvent;
        new (type: string, eventInitDict?: ToggleEventInit): ToggleEvent;
    };
    Touch: {
        prototype: Touch;
        new (touchInitDict: TouchInit): Touch;
    };
    TouchEvent: {
        prototype: TouchEvent;
        new (type: string, eventInitDict?: TouchEventInit): TouchEvent;
    };
    TouchList: {
        prototype: TouchList;
        new (): TouchList;
    };
    TrackEvent: {
        prototype: TrackEvent;
        new (type: string, eventInitDict?: TrackEventInit): TrackEvent;
    };
    TransformStream: {
        prototype: TransformStream;
        new <I = any, O = any>(transformer?: Transformer<I, O>, writableStrategy?: QueuingStrategy<I>, readableStrategy?: QueuingStrategy<O>): TransformStream<I, O>;
    };
    TransformStreamDefaultController: {
        prototype: TransformStreamDefaultController;
        new (): TransformStreamDefaultController;
    };
    TransitionEvent: {
        prototype: TransitionEvent;
        new (type: string, transitionEventInitDict?: TransitionEventInit): TransitionEvent;
    };
    TreeWalker: {
        prototype: TreeWalker;
        new (): TreeWalker;
    };
    UIEvent: {
        prototype: UIEvent;
        new (type: string, eventInitDict?: UIEventInit): UIEvent;
    };
    webkitURL: typeof URL;
    UserActivation: {
        prototype: UserActivation;
        new (): UserActivation;
    };
    VTTCue: {
        prototype: VTTCue;
        new (startTime: number, endTime: number, text: string): VTTCue;
    };
    VTTRegion: {
        prototype: VTTRegion;
        new (): VTTRegion;
    };
    ValidityState: {
        prototype: ValidityState;
        new (): ValidityState;
    };
    VideoColorSpace: {
        prototype: VideoColorSpace;
        new (init?: VideoColorSpaceInit): VideoColorSpace;
    };
    VideoDecoder: {
        prototype: VideoDecoder;
        new (init: VideoDecoderInit): VideoDecoder;
        isConfigSupported(config: VideoDecoderConfig): Promise<VideoDecoderSupport>;
    };
    VideoEncoder: {
        prototype: VideoEncoder;
        new (init: VideoEncoderInit): VideoEncoder;
        isConfigSupported(config: VideoEncoderConfig): Promise<VideoEncoderSupport>;
    };
    VideoFrame: {
        prototype: VideoFrame;
        new (image: CanvasImageSource, init?: VideoFrameInit): VideoFrame;
        new (data: AllowSharedBufferSource, init: VideoFrameBufferInit): VideoFrame;
    };
    VideoPlaybackQuality: {
        prototype: VideoPlaybackQuality;
        new (): VideoPlaybackQuality;
    };
    ViewTransition: {
        prototype: ViewTransition;
        new (): ViewTransition;
    };
    VisualViewport: {
        prototype: VisualViewport;
        new (): VisualViewport;
    };
    WakeLock: {
        prototype: WakeLock;
        new (): WakeLock;
    };
    WakeLockSentinel: {
        prototype: WakeLockSentinel;
        new (): WakeLockSentinel;
    };
    WaveShaperNode: {
        prototype: WaveShaperNode;
        new (context: BaseAudioContext, options?: WaveShaperOptions): WaveShaperNode;
    };
    WebGL2RenderingContext: {
        prototype: WebGL2RenderingContext;
        new (): WebGL2RenderingContext;
        readonly READ_BUFFER: 3074;
        readonly UNPACK_ROW_LENGTH: 3314;
        readonly UNPACK_SKIP_ROWS: 3315;
        readonly UNPACK_SKIP_PIXELS: 3316;
        readonly PACK_ROW_LENGTH: 3330;
        readonly PACK_SKIP_ROWS: 3331;
        readonly PACK_SKIP_PIXELS: 3332;
        readonly COLOR: 6144;
        readonly DEPTH: 6145;
        readonly STENCIL: 6146;
        readonly RED: 6403;
        readonly RGB8: 32849;
        readonly RGB10_A2: 32857;
        readonly TEXTURE_BINDING_3D: 32874;
        readonly UNPACK_SKIP_IMAGES: 32877;
        readonly UNPACK_IMAGE_HEIGHT: 32878;
        readonly TEXTURE_3D: 32879;
        readonly TEXTURE_WRAP_R: 32882;
        readonly MAX_3D_TEXTURE_SIZE: 32883;
        readonly UNSIGNED_INT_2_10_10_10_REV: 33640;
        readonly MAX_ELEMENTS_VERTICES: 33000;
        readonly MAX_ELEMENTS_INDICES: 33001;
        readonly TEXTURE_MIN_LOD: 33082;
        readonly TEXTURE_MAX_LOD: 33083;
        readonly TEXTURE_BASE_LEVEL: 33084;
        readonly TEXTURE_MAX_LEVEL: 33085;
        readonly MIN: 32775;
        readonly MAX: 32776;
        readonly DEPTH_COMPONENT24: 33190;
        readonly MAX_TEXTURE_LOD_BIAS: 34045;
        readonly TEXTURE_COMPARE_MODE: 34892;
        readonly TEXTURE_COMPARE_FUNC: 34893;
        readonly CURRENT_QUERY: 34917;
        readonly QUERY_RESULT: 34918;
        readonly QUERY_RESULT_AVAILABLE: 34919;
        readonly STREAM_READ: 35041;
        readonly STREAM_COPY: 35042;
        readonly STATIC_READ: 35045;
        readonly STATIC_COPY: 35046;
        readonly DYNAMIC_READ: 35049;
        readonly DYNAMIC_COPY: 35050;
        readonly MAX_DRAW_BUFFERS: 34852;
        readonly DRAW_BUFFER0: 34853;
        readonly DRAW_BUFFER1: 34854;
        readonly DRAW_BUFFER2: 34855;
        readonly DRAW_BUFFER3: 34856;
        readonly DRAW_BUFFER4: 34857;
        readonly DRAW_BUFFER5: 34858;
        readonly DRAW_BUFFER6: 34859;
        readonly DRAW_BUFFER7: 34860;
        readonly DRAW_BUFFER8: 34861;
        readonly DRAW_BUFFER9: 34862;
        readonly DRAW_BUFFER10: 34863;
        readonly DRAW_BUFFER11: 34864;
        readonly DRAW_BUFFER12: 34865;
        readonly DRAW_BUFFER13: 34866;
        readonly DRAW_BUFFER14: 34867;
        readonly DRAW_BUFFER15: 34868;
        readonly MAX_FRAGMENT_UNIFORM_COMPONENTS: 35657;
        readonly MAX_VERTEX_UNIFORM_COMPONENTS: 35658;
        readonly SAMPLER_3D: 35679;
        readonly SAMPLER_2D_SHADOW: 35682;
        readonly FRAGMENT_SHADER_DERIVATIVE_HINT: 35723;
        readonly PIXEL_PACK_BUFFER: 35051;
        readonly PIXEL_UNPACK_BUFFER: 35052;
        readonly PIXEL_PACK_BUFFER_BINDING: 35053;
        readonly PIXEL_UNPACK_BUFFER_BINDING: 35055;
        readonly FLOAT_MAT2x3: 35685;
        readonly FLOAT_MAT2x4: 35686;
        readonly FLOAT_MAT3x2: 35687;
        readonly FLOAT_MAT3x4: 35688;
        readonly FLOAT_MAT4x2: 35689;
        readonly FLOAT_MAT4x3: 35690;
        readonly SRGB: 35904;
        readonly SRGB8: 35905;
        readonly SRGB8_ALPHA8: 35907;
        readonly COMPARE_REF_TO_TEXTURE: 34894;
        readonly RGBA32F: 34836;
        readonly RGB32F: 34837;
        readonly RGBA16F: 34842;
        readonly RGB16F: 34843;
        readonly VERTEX_ATTRIB_ARRAY_INTEGER: 35069;
        readonly MAX_ARRAY_TEXTURE_LAYERS: 35071;
        readonly MIN_PROGRAM_TEXEL_OFFSET: 35076;
        readonly MAX_PROGRAM_TEXEL_OFFSET: 35077;
        readonly MAX_VARYING_COMPONENTS: 35659;
        readonly TEXTURE_2D_ARRAY: 35866;
        readonly TEXTURE_BINDING_2D_ARRAY: 35869;
        readonly R11F_G11F_B10F: 35898;
        readonly UNSIGNED_INT_10F_11F_11F_REV: 35899;
        readonly RGB9_E5: 35901;
        readonly UNSIGNED_INT_5_9_9_9_REV: 35902;
        readonly TRANSFORM_FEEDBACK_BUFFER_MODE: 35967;
        readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 35968;
        readonly TRANSFORM_FEEDBACK_VARYINGS: 35971;
        readonly TRANSFORM_FEEDBACK_BUFFER_START: 35972;
        readonly TRANSFORM_FEEDBACK_BUFFER_SIZE: 35973;
        readonly TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: 35976;
        readonly RASTERIZER_DISCARD: 35977;
        readonly MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 35978;
        readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 35979;
        readonly INTERLEAVED_ATTRIBS: 35980;
        readonly SEPARATE_ATTRIBS: 35981;
        readonly TRANSFORM_FEEDBACK_BUFFER: 35982;
        readonly TRANSFORM_FEEDBACK_BUFFER_BINDING: 35983;
        readonly RGBA32UI: 36208;
        readonly RGB32UI: 36209;
        readonly RGBA16UI: 36214;
        readonly RGB16UI: 36215;
        readonly RGBA8UI: 36220;
        readonly RGB8UI: 36221;
        readonly RGBA32I: 36226;
        readonly RGB32I: 36227;
        readonly RGBA16I: 36232;
        readonly RGB16I: 36233;
        readonly RGBA8I: 36238;
        readonly RGB8I: 36239;
        readonly RED_INTEGER: 36244;
        readonly RGB_INTEGER: 36248;
        readonly RGBA_INTEGER: 36249;
        readonly SAMPLER_2D_ARRAY: 36289;
        readonly SAMPLER_2D_ARRAY_SHADOW: 36292;
        readonly SAMPLER_CUBE_SHADOW: 36293;
        readonly UNSIGNED_INT_VEC2: 36294;
        readonly UNSIGNED_INT_VEC3: 36295;
        readonly UNSIGNED_INT_VEC4: 36296;
        readonly INT_SAMPLER_2D: 36298;
        readonly INT_SAMPLER_3D: 36299;
        readonly INT_SAMPLER_CUBE: 36300;
        readonly INT_SAMPLER_2D_ARRAY: 36303;
        readonly UNSIGNED_INT_SAMPLER_2D: 36306;
        readonly UNSIGNED_INT_SAMPLER_3D: 36307;
        readonly UNSIGNED_INT_SAMPLER_CUBE: 36308;
        readonly UNSIGNED_INT_SAMPLER_2D_ARRAY: 36311;
        readonly DEPTH_COMPONENT32F: 36012;
        readonly DEPTH32F_STENCIL8: 36013;
        readonly FLOAT_32_UNSIGNED_INT_24_8_REV: 36269;
        readonly FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: 33296;
        readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 33297;
        readonly FRAMEBUFFER_ATTACHMENT_RED_SIZE: 33298;
        readonly FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: 33299;
        readonly FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: 33300;
        readonly FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: 33301;
        readonly FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: 33302;
        readonly FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: 33303;
        readonly FRAMEBUFFER_DEFAULT: 33304;
        readonly UNSIGNED_INT_24_8: 34042;
        readonly DEPTH24_STENCIL8: 35056;
        readonly UNSIGNED_NORMALIZED: 35863;
        readonly DRAW_FRAMEBUFFER_BINDING: 36006;
        readonly READ_FRAMEBUFFER: 36008;
        readonly DRAW_FRAMEBUFFER: 36009;
        readonly READ_FRAMEBUFFER_BINDING: 36010;
        readonly RENDERBUFFER_SAMPLES: 36011;
        readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: 36052;
        readonly MAX_COLOR_ATTACHMENTS: 36063;
        readonly COLOR_ATTACHMENT1: 36065;
        readonly COLOR_ATTACHMENT2: 36066;
        readonly COLOR_ATTACHMENT3: 36067;
        readonly COLOR_ATTACHMENT4: 36068;
        readonly COLOR_ATTACHMENT5: 36069;
        readonly COLOR_ATTACHMENT6: 36070;
        readonly COLOR_ATTACHMENT7: 36071;
        readonly COLOR_ATTACHMENT8: 36072;
        readonly COLOR_ATTACHMENT9: 36073;
        readonly COLOR_ATTACHMENT10: 36074;
        readonly COLOR_ATTACHMENT11: 36075;
        readonly COLOR_ATTACHMENT12: 36076;
        readonly COLOR_ATTACHMENT13: 36077;
        readonly COLOR_ATTACHMENT14: 36078;
        readonly COLOR_ATTACHMENT15: 36079;
        readonly FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: 36182;
        readonly MAX_SAMPLES: 36183;
        readonly HALF_FLOAT: 5131;
        readonly RG: 33319;
        readonly RG_INTEGER: 33320;
        readonly R8: 33321;
        readonly RG8: 33323;
        readonly R16F: 33325;
        readonly R32F: 33326;
        readonly RG16F: 33327;
        readonly RG32F: 33328;
        readonly R8I: 33329;
        readonly R8UI: 33330;
        readonly R16I: 33331;
        readonly R16UI: 33332;
        readonly R32I: 33333;
        readonly R32UI: 33334;
        readonly RG8I: 33335;
        readonly RG8UI: 33336;
        readonly RG16I: 33337;
        readonly RG16UI: 33338;
        readonly RG32I: 33339;
        readonly RG32UI: 33340;
        readonly VERTEX_ARRAY_BINDING: 34229;
        readonly R8_SNORM: 36756;
        readonly RG8_SNORM: 36757;
        readonly RGB8_SNORM: 36758;
        readonly RGBA8_SNORM: 36759;
        readonly SIGNED_NORMALIZED: 36764;
        readonly COPY_READ_BUFFER: 36662;
        readonly COPY_WRITE_BUFFER: 36663;
        readonly COPY_READ_BUFFER_BINDING: 36662;
        readonly COPY_WRITE_BUFFER_BINDING: 36663;
        readonly UNIFORM_BUFFER: 35345;
        readonly UNIFORM_BUFFER_BINDING: 35368;
        readonly UNIFORM_BUFFER_START: 35369;
        readonly UNIFORM_BUFFER_SIZE: 35370;
        readonly MAX_VERTEX_UNIFORM_BLOCKS: 35371;
        readonly MAX_FRAGMENT_UNIFORM_BLOCKS: 35373;
        readonly MAX_COMBINED_UNIFORM_BLOCKS: 35374;
        readonly MAX_UNIFORM_BUFFER_BINDINGS: 35375;
        readonly MAX_UNIFORM_BLOCK_SIZE: 35376;
        readonly MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 35377;
        readonly MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 35379;
        readonly UNIFORM_BUFFER_OFFSET_ALIGNMENT: 35380;
        readonly ACTIVE_UNIFORM_BLOCKS: 35382;
        readonly UNIFORM_TYPE: 35383;
        readonly UNIFORM_SIZE: 35384;
        readonly UNIFORM_BLOCK_INDEX: 35386;
        readonly UNIFORM_OFFSET: 35387;
        readonly UNIFORM_ARRAY_STRIDE: 35388;
        readonly UNIFORM_MATRIX_STRIDE: 35389;
        readonly UNIFORM_IS_ROW_MAJOR: 35390;
        readonly UNIFORM_BLOCK_BINDING: 35391;
        readonly UNIFORM_BLOCK_DATA_SIZE: 35392;
        readonly UNIFORM_BLOCK_ACTIVE_UNIFORMS: 35394;
        readonly UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: 35395;
        readonly UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: 35396;
        readonly UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: 35398;
        readonly INVALID_INDEX: 4294967295;
        readonly MAX_VERTEX_OUTPUT_COMPONENTS: 37154;
        readonly MAX_FRAGMENT_INPUT_COMPONENTS: 37157;
        readonly MAX_SERVER_WAIT_TIMEOUT: 37137;
        readonly OBJECT_TYPE: 37138;
        readonly SYNC_CONDITION: 37139;
        readonly SYNC_STATUS: 37140;
        readonly SYNC_FLAGS: 37141;
        readonly SYNC_FENCE: 37142;
        readonly SYNC_GPU_COMMANDS_COMPLETE: 37143;
        readonly UNSIGNALED: 37144;
        readonly SIGNALED: 37145;
        readonly ALREADY_SIGNALED: 37146;
        readonly TIMEOUT_EXPIRED: 37147;
        readonly CONDITION_SATISFIED: 37148;
        readonly WAIT_FAILED: 37149;
        readonly SYNC_FLUSH_COMMANDS_BIT: 1;
        readonly VERTEX_ATTRIB_ARRAY_DIVISOR: 35070;
        readonly ANY_SAMPLES_PASSED: 35887;
        readonly ANY_SAMPLES_PASSED_CONSERVATIVE: 36202;
        readonly SAMPLER_BINDING: 35097;
        readonly RGB10_A2UI: 36975;
        readonly INT_2_10_10_10_REV: 36255;
        readonly TRANSFORM_FEEDBACK: 36386;
        readonly TRANSFORM_FEEDBACK_PAUSED: 36387;
        readonly TRANSFORM_FEEDBACK_ACTIVE: 36388;
        readonly TRANSFORM_FEEDBACK_BINDING: 36389;
        readonly TEXTURE_IMMUTABLE_FORMAT: 37167;
        readonly MAX_ELEMENT_INDEX: 36203;
        readonly TEXTURE_IMMUTABLE_LEVELS: 33503;
        readonly TIMEOUT_IGNORED: -1;
        readonly MAX_CLIENT_WAIT_TIMEOUT_WEBGL: 37447;
        readonly DEPTH_BUFFER_BIT: 256;
        readonly STENCIL_BUFFER_BIT: 1024;
        readonly COLOR_BUFFER_BIT: 16384;
        readonly POINTS: 0;
        readonly LINES: 1;
        readonly LINE_LOOP: 2;
        readonly LINE_STRIP: 3;
        readonly TRIANGLES: 4;
        readonly TRIANGLE_STRIP: 5;
        readonly TRIANGLE_FAN: 6;
        readonly ZERO: 0;
        readonly ONE: 1;
        readonly SRC_COLOR: 768;
        readonly ONE_MINUS_SRC_COLOR: 769;
        readonly SRC_ALPHA: 770;
        readonly ONE_MINUS_SRC_ALPHA: 771;
        readonly DST_ALPHA: 772;
        readonly ONE_MINUS_DST_ALPHA: 773;
        readonly DST_COLOR: 774;
        readonly ONE_MINUS_DST_COLOR: 775;
        readonly SRC_ALPHA_SATURATE: 776;
        readonly FUNC_ADD: 32774;
        readonly BLEND_EQUATION: 32777;
        readonly BLEND_EQUATION_RGB: 32777;
        readonly BLEND_EQUATION_ALPHA: 34877;
        readonly FUNC_SUBTRACT: 32778;
        readonly FUNC_REVERSE_SUBTRACT: 32779;
        readonly BLEND_DST_RGB: 32968;
        readonly BLEND_SRC_RGB: 32969;
        readonly BLEND_DST_ALPHA: 32970;
        readonly BLEND_SRC_ALPHA: 32971;
        readonly CONSTANT_COLOR: 32769;
        readonly ONE_MINUS_CONSTANT_COLOR: 32770;
        readonly CONSTANT_ALPHA: 32771;
        readonly ONE_MINUS_CONSTANT_ALPHA: 32772;
        readonly BLEND_COLOR: 32773;
        readonly ARRAY_BUFFER: 34962;
        readonly ELEMENT_ARRAY_BUFFER: 34963;
        readonly ARRAY_BUFFER_BINDING: 34964;
        readonly ELEMENT_ARRAY_BUFFER_BINDING: 34965;
        readonly STREAM_DRAW: 35040;
        readonly STATIC_DRAW: 35044;
        readonly DYNAMIC_DRAW: 35048;
        readonly BUFFER_SIZE: 34660;
        readonly BUFFER_USAGE: 34661;
        readonly CURRENT_VERTEX_ATTRIB: 34342;
        readonly FRONT: 1028;
        readonly BACK: 1029;
        readonly FRONT_AND_BACK: 1032;
        readonly CULL_FACE: 2884;
        readonly BLEND: 3042;
        readonly DITHER: 3024;
        readonly STENCIL_TEST: 2960;
        readonly DEPTH_TEST: 2929;
        readonly SCISSOR_TEST: 3089;
        readonly POLYGON_OFFSET_FILL: 32823;
        readonly SAMPLE_ALPHA_TO_COVERAGE: 32926;
        readonly SAMPLE_COVERAGE: 32928;
        readonly NO_ERROR: 0;
        readonly INVALID_ENUM: 1280;
        readonly INVALID_VALUE: 1281;
        readonly INVALID_OPERATION: 1282;
        readonly OUT_OF_MEMORY: 1285;
        readonly CW: 2304;
        readonly CCW: 2305;
        readonly LINE_WIDTH: 2849;
        readonly ALIASED_POINT_SIZE_RANGE: 33901;
        readonly ALIASED_LINE_WIDTH_RANGE: 33902;
        readonly CULL_FACE_MODE: 2885;
        readonly FRONT_FACE: 2886;
        readonly DEPTH_RANGE: 2928;
        readonly DEPTH_WRITEMASK: 2930;
        readonly DEPTH_CLEAR_VALUE: 2931;
        readonly DEPTH_FUNC: 2932;
        readonly STENCIL_CLEAR_VALUE: 2961;
        readonly STENCIL_FUNC: 2962;
        readonly STENCIL_FAIL: 2964;
        readonly STENCIL_PASS_DEPTH_FAIL: 2965;
        readonly STENCIL_PASS_DEPTH_PASS: 2966;
        readonly STENCIL_REF: 2967;
        readonly STENCIL_VALUE_MASK: 2963;
        readonly STENCIL_WRITEMASK: 2968;
        readonly STENCIL_BACK_FUNC: 34816;
        readonly STENCIL_BACK_FAIL: 34817;
        readonly STENCIL_BACK_PASS_DEPTH_FAIL: 34818;
        readonly STENCIL_BACK_PASS_DEPTH_PASS: 34819;
        readonly STENCIL_BACK_REF: 36003;
        readonly STENCIL_BACK_VALUE_MASK: 36004;
        readonly STENCIL_BACK_WRITEMASK: 36005;
        readonly VIEWPORT: 2978;
        readonly SCISSOR_BOX: 3088;
        readonly COLOR_CLEAR_VALUE: 3106;
        readonly COLOR_WRITEMASK: 3107;
        readonly UNPACK_ALIGNMENT: 3317;
        readonly PACK_ALIGNMENT: 3333;
        readonly MAX_TEXTURE_SIZE: 3379;
        readonly MAX_VIEWPORT_DIMS: 3386;
        readonly SUBPIXEL_BITS: 3408;
        readonly RED_BITS: 3410;
        readonly GREEN_BITS: 3411;
        readonly BLUE_BITS: 3412;
        readonly ALPHA_BITS: 3413;
        readonly DEPTH_BITS: 3414;
        readonly STENCIL_BITS: 3415;
        readonly POLYGON_OFFSET_UNITS: 10752;
        readonly POLYGON_OFFSET_FACTOR: 32824;
        readonly TEXTURE_BINDING_2D: 32873;
        readonly SAMPLE_BUFFERS: 32936;
        readonly SAMPLES: 32937;
        readonly SAMPLE_COVERAGE_VALUE: 32938;
        readonly SAMPLE_COVERAGE_INVERT: 32939;
        readonly COMPRESSED_TEXTURE_FORMATS: 34467;
        readonly DONT_CARE: 4352;
        readonly FASTEST: 4353;
        readonly NICEST: 4354;
        readonly GENERATE_MIPMAP_HINT: 33170;
        readonly BYTE: 5120;
        readonly UNSIGNED_BYTE: 5121;
        readonly SHORT: 5122;
        readonly UNSIGNED_SHORT: 5123;
        readonly INT: 5124;
        readonly UNSIGNED_INT: 5125;
        readonly FLOAT: 5126;
        readonly DEPTH_COMPONENT: 6402;
        readonly ALPHA: 6406;
        readonly RGB: 6407;
        readonly RGBA: 6408;
        readonly LUMINANCE: 6409;
        readonly LUMINANCE_ALPHA: 6410;
        readonly UNSIGNED_SHORT_4_4_4_4: 32819;
        readonly UNSIGNED_SHORT_5_5_5_1: 32820;
        readonly UNSIGNED_SHORT_5_6_5: 33635;
        readonly FRAGMENT_SHADER: 35632;
        readonly VERTEX_SHADER: 35633;
        readonly MAX_VERTEX_ATTRIBS: 34921;
        readonly MAX_VERTEX_UNIFORM_VECTORS: 36347;
        readonly MAX_VARYING_VECTORS: 36348;
        readonly MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661;
        readonly MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660;
        readonly MAX_TEXTURE_IMAGE_UNITS: 34930;
        readonly MAX_FRAGMENT_UNIFORM_VECTORS: 36349;
        readonly SHADER_TYPE: 35663;
        readonly DELETE_STATUS: 35712;
        readonly LINK_STATUS: 35714;
        readonly VALIDATE_STATUS: 35715;
        readonly ATTACHED_SHADERS: 35717;
        readonly ACTIVE_UNIFORMS: 35718;
        readonly ACTIVE_ATTRIBUTES: 35721;
        readonly SHADING_LANGUAGE_VERSION: 35724;
        readonly CURRENT_PROGRAM: 35725;
        readonly NEVER: 512;
        readonly LESS: 513;
        readonly EQUAL: 514;
        readonly LEQUAL: 515;
        readonly GREATER: 516;
        readonly NOTEQUAL: 517;
        readonly GEQUAL: 518;
        readonly ALWAYS: 519;
        readonly KEEP: 7680;
        readonly REPLACE: 7681;
        readonly INCR: 7682;
        readonly DECR: 7683;
        readonly INVERT: 5386;
        readonly INCR_WRAP: 34055;
        readonly DECR_WRAP: 34056;
        readonly VENDOR: 7936;
        readonly RENDERER: 7937;
        readonly VERSION: 7938;
        readonly NEAREST: 9728;
        readonly LINEAR: 9729;
        readonly NEAREST_MIPMAP_NEAREST: 9984;
        readonly LINEAR_MIPMAP_NEAREST: 9985;
        readonly NEAREST_MIPMAP_LINEAR: 9986;
        readonly LINEAR_MIPMAP_LINEAR: 9987;
        readonly TEXTURE_MAG_FILTER: 10240;
        readonly TEXTURE_MIN_FILTER: 10241;
        readonly TEXTURE_WRAP_S: 10242;
        readonly TEXTURE_WRAP_T: 10243;
        readonly TEXTURE_2D: 3553;
        readonly TEXTURE: 5890;
        readonly TEXTURE_CUBE_MAP: 34067;
        readonly TEXTURE_BINDING_CUBE_MAP: 34068;
        readonly TEXTURE_CUBE_MAP_POSITIVE_X: 34069;
        readonly TEXTURE_CUBE_MAP_NEGATIVE_X: 34070;
        readonly TEXTURE_CUBE_MAP_POSITIVE_Y: 34071;
        readonly TEXTURE_CUBE_MAP_NEGATIVE_Y: 34072;
        readonly TEXTURE_CUBE_MAP_POSITIVE_Z: 34073;
        readonly TEXTURE_CUBE_MAP_NEGATIVE_Z: 34074;
        readonly MAX_CUBE_MAP_TEXTURE_SIZE: 34076;
        readonly TEXTURE0: 33984;
        readonly TEXTURE1: 33985;
        readonly TEXTURE2: 33986;
        readonly TEXTURE3: 33987;
        readonly TEXTURE4: 33988;
        readonly TEXTURE5: 33989;
        readonly TEXTURE6: 33990;
        readonly TEXTURE7: 33991;
        readonly TEXTURE8: 33992;
        readonly TEXTURE9: 33993;
        readonly TEXTURE10: 33994;
        readonly TEXTURE11: 33995;
        readonly TEXTURE12: 33996;
        readonly TEXTURE13: 33997;
        readonly TEXTURE14: 33998;
        readonly TEXTURE15: 33999;
        readonly TEXTURE16: 34000;
        readonly TEXTURE17: 34001;
        readonly TEXTURE18: 34002;
        readonly TEXTURE19: 34003;
        readonly TEXTURE20: 34004;
        readonly TEXTURE21: 34005;
        readonly TEXTURE22: 34006;
        readonly TEXTURE23: 34007;
        readonly TEXTURE24: 34008;
        readonly TEXTURE25: 34009;
        readonly TEXTURE26: 34010;
        readonly TEXTURE27: 34011;
        readonly TEXTURE28: 34012;
        readonly TEXTURE29: 34013;
        readonly TEXTURE30: 34014;
        readonly TEXTURE31: 34015;
        readonly ACTIVE_TEXTURE: 34016;
        readonly REPEAT: 10497;
        readonly CLAMP_TO_EDGE: 33071;
        readonly MIRRORED_REPEAT: 33648;
        readonly FLOAT_VEC2: 35664;
        readonly FLOAT_VEC3: 35665;
        readonly FLOAT_VEC4: 35666;
        readonly INT_VEC2: 35667;
        readonly INT_VEC3: 35668;
        readonly INT_VEC4: 35669;
        readonly BOOL: 35670;
        readonly BOOL_VEC2: 35671;
        readonly BOOL_VEC3: 35672;
        readonly BOOL_VEC4: 35673;
        readonly FLOAT_MAT2: 35674;
        readonly FLOAT_MAT3: 35675;
        readonly FLOAT_MAT4: 35676;
        readonly SAMPLER_2D: 35678;
        readonly SAMPLER_CUBE: 35680;
        readonly VERTEX_ATTRIB_ARRAY_ENABLED: 34338;
        readonly VERTEX_ATTRIB_ARRAY_SIZE: 34339;
        readonly VERTEX_ATTRIB_ARRAY_STRIDE: 34340;
        readonly VERTEX_ATTRIB_ARRAY_TYPE: 34341;
        readonly VERTEX_ATTRIB_ARRAY_NORMALIZED: 34922;
        readonly VERTEX_ATTRIB_ARRAY_POINTER: 34373;
        readonly VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 34975;
        readonly IMPLEMENTATION_COLOR_READ_TYPE: 35738;
        readonly IMPLEMENTATION_COLOR_READ_FORMAT: 35739;
        readonly COMPILE_STATUS: 35713;
        readonly LOW_FLOAT: 36336;
        readonly MEDIUM_FLOAT: 36337;
        readonly HIGH_FLOAT: 36338;
        readonly LOW_INT: 36339;
        readonly MEDIUM_INT: 36340;
        readonly HIGH_INT: 36341;
        readonly FRAMEBUFFER: 36160;
        readonly RENDERBUFFER: 36161;
        readonly RGBA4: 32854;
        readonly RGB5_A1: 32855;
        readonly RGBA8: 32856;
        readonly RGB565: 36194;
        readonly DEPTH_COMPONENT16: 33189;
        readonly STENCIL_INDEX8: 36168;
        readonly DEPTH_STENCIL: 34041;
        readonly RENDERBUFFER_WIDTH: 36162;
        readonly RENDERBUFFER_HEIGHT: 36163;
        readonly RENDERBUFFER_INTERNAL_FORMAT: 36164;
        readonly RENDERBUFFER_RED_SIZE: 36176;
        readonly RENDERBUFFER_GREEN_SIZE: 36177;
        readonly RENDERBUFFER_BLUE_SIZE: 36178;
        readonly RENDERBUFFER_ALPHA_SIZE: 36179;
        readonly RENDERBUFFER_DEPTH_SIZE: 36180;
        readonly RENDERBUFFER_STENCIL_SIZE: 36181;
        readonly FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 36048;
        readonly FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 36049;
        readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 36050;
        readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 36051;
        readonly COLOR_ATTACHMENT0: 36064;
        readonly DEPTH_ATTACHMENT: 36096;
        readonly STENCIL_ATTACHMENT: 36128;
        readonly DEPTH_STENCIL_ATTACHMENT: 33306;
        readonly NONE: 0;
        readonly FRAMEBUFFER_COMPLETE: 36053;
        readonly FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 36054;
        readonly FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 36055;
        readonly FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 36057;
        readonly FRAMEBUFFER_UNSUPPORTED: 36061;
        readonly FRAMEBUFFER_BINDING: 36006;
        readonly RENDERBUFFER_BINDING: 36007;
        readonly MAX_RENDERBUFFER_SIZE: 34024;
        readonly INVALID_FRAMEBUFFER_OPERATION: 1286;
        readonly UNPACK_FLIP_Y_WEBGL: 37440;
        readonly UNPACK_PREMULTIPLY_ALPHA_WEBGL: 37441;
        readonly CONTEXT_LOST_WEBGL: 37442;
        readonly UNPACK_COLORSPACE_CONVERSION_WEBGL: 37443;
        readonly BROWSER_DEFAULT_WEBGL: 37444;
    };
    WebGLActiveInfo: {
        prototype: WebGLActiveInfo;
        new (): WebGLActiveInfo;
    };
    WebGLBuffer: {
        prototype: WebGLBuffer;
        new (): WebGLBuffer;
    };
    WebGLContextEvent: {
        prototype: WebGLContextEvent;
        new (type: string, eventInit?: WebGLContextEventInit): WebGLContextEvent;
    };
    WebGLFramebuffer: {
        prototype: WebGLFramebuffer;
        new (): WebGLFramebuffer;
    };
    WebGLProgram: {
        prototype: WebGLProgram;
        new (): WebGLProgram;
    };
    WebGLQuery: {
        prototype: WebGLQuery;
        new (): WebGLQuery;
    };
    WebGLRenderbuffer: {
        prototype: WebGLRenderbuffer;
        new (): WebGLRenderbuffer;
    };
    WebGLRenderingContext: {
        prototype: WebGLRenderingContext;
        new (): WebGLRenderingContext;
        readonly DEPTH_BUFFER_BIT: 256;
        readonly STENCIL_BUFFER_BIT: 1024;
        readonly COLOR_BUFFER_BIT: 16384;
        readonly POINTS: 0;
        readonly LINES: 1;
        readonly LINE_LOOP: 2;
        readonly LINE_STRIP: 3;
        readonly TRIANGLES: 4;
        readonly TRIANGLE_STRIP: 5;
        readonly TRIANGLE_FAN: 6;
        readonly ZERO: 0;
        readonly ONE: 1;
        readonly SRC_COLOR: 768;
        readonly ONE_MINUS_SRC_COLOR: 769;
        readonly SRC_ALPHA: 770;
        readonly ONE_MINUS_SRC_ALPHA: 771;
        readonly DST_ALPHA: 772;
        readonly ONE_MINUS_DST_ALPHA: 773;
        readonly DST_COLOR: 774;
        readonly ONE_MINUS_DST_COLOR: 775;
        readonly SRC_ALPHA_SATURATE: 776;
        readonly FUNC_ADD: 32774;
        readonly BLEND_EQUATION: 32777;
        readonly BLEND_EQUATION_RGB: 32777;
        readonly BLEND_EQUATION_ALPHA: 34877;
        readonly FUNC_SUBTRACT: 32778;
        readonly FUNC_REVERSE_SUBTRACT: 32779;
        readonly BLEND_DST_RGB: 32968;
        readonly BLEND_SRC_RGB: 32969;
        readonly BLEND_DST_ALPHA: 32970;
        readonly BLEND_SRC_ALPHA: 32971;
        readonly CONSTANT_COLOR: 32769;
        readonly ONE_MINUS_CONSTANT_COLOR: 32770;
        readonly CONSTANT_ALPHA: 32771;
        readonly ONE_MINUS_CONSTANT_ALPHA: 32772;
        readonly BLEND_COLOR: 32773;
        readonly ARRAY_BUFFER: 34962;
        readonly ELEMENT_ARRAY_BUFFER: 34963;
        readonly ARRAY_BUFFER_BINDING: 34964;
        readonly ELEMENT_ARRAY_BUFFER_BINDING: 34965;
        readonly STREAM_DRAW: 35040;
        readonly STATIC_DRAW: 35044;
        readonly DYNAMIC_DRAW: 35048;
        readonly BUFFER_SIZE: 34660;
        readonly BUFFER_USAGE: 34661;
        readonly CURRENT_VERTEX_ATTRIB: 34342;
        readonly FRONT: 1028;
        readonly BACK: 1029;
        readonly FRONT_AND_BACK: 1032;
        readonly CULL_FACE: 2884;
        readonly BLEND: 3042;
        readonly DITHER: 3024;
        readonly STENCIL_TEST: 2960;
        readonly DEPTH_TEST: 2929;
        readonly SCISSOR_TEST: 3089;
        readonly POLYGON_OFFSET_FILL: 32823;
        readonly SAMPLE_ALPHA_TO_COVERAGE: 32926;
        readonly SAMPLE_COVERAGE: 32928;
        readonly NO_ERROR: 0;
        readonly INVALID_ENUM: 1280;
        readonly INVALID_VALUE: 1281;
        readonly INVALID_OPERATION: 1282;
        readonly OUT_OF_MEMORY: 1285;
        readonly CW: 2304;
        readonly CCW: 2305;
        readonly LINE_WIDTH: 2849;
        readonly ALIASED_POINT_SIZE_RANGE: 33901;
        readonly ALIASED_LINE_WIDTH_RANGE: 33902;
        readonly CULL_FACE_MODE: 2885;
        readonly FRONT_FACE: 2886;
        readonly DEPTH_RANGE: 2928;
        readonly DEPTH_WRITEMASK: 2930;
        readonly DEPTH_CLEAR_VALUE: 2931;
        readonly DEPTH_FUNC: 2932;
        readonly STENCIL_CLEAR_VALUE: 2961;
        readonly STENCIL_FUNC: 2962;
        readonly STENCIL_FAIL: 2964;
        readonly STENCIL_PASS_DEPTH_FAIL: 2965;
        readonly STENCIL_PASS_DEPTH_PASS: 2966;
        readonly STENCIL_REF: 2967;
        readonly STENCIL_VALUE_MASK: 2963;
        readonly STENCIL_WRITEMASK: 2968;
        readonly STENCIL_BACK_FUNC: 34816;
        readonly STENCIL_BACK_FAIL: 34817;
        readonly STENCIL_BACK_PASS_DEPTH_FAIL: 34818;
        readonly STENCIL_BACK_PASS_DEPTH_PASS: 34819;
        readonly STENCIL_BACK_REF: 36003;
        readonly STENCIL_BACK_VALUE_MASK: 36004;
        readonly STENCIL_BACK_WRITEMASK: 36005;
        readonly VIEWPORT: 2978;
        readonly SCISSOR_BOX: 3088;
        readonly COLOR_CLEAR_VALUE: 3106;
        readonly COLOR_WRITEMASK: 3107;
        readonly UNPACK_ALIGNMENT: 3317;
        readonly PACK_ALIGNMENT: 3333;
        readonly MAX_TEXTURE_SIZE: 3379;
        readonly MAX_VIEWPORT_DIMS: 3386;
        readonly SUBPIXEL_BITS: 3408;
        readonly RED_BITS: 3410;
        readonly GREEN_BITS: 3411;
        readonly BLUE_BITS: 3412;
        readonly ALPHA_BITS: 3413;
        readonly DEPTH_BITS: 3414;
        readonly STENCIL_BITS: 3415;
        readonly POLYGON_OFFSET_UNITS: 10752;
        readonly POLYGON_OFFSET_FACTOR: 32824;
        readonly TEXTURE_BINDING_2D: 32873;
        readonly SAMPLE_BUFFERS: 32936;
        readonly SAMPLES: 32937;
        readonly SAMPLE_COVERAGE_VALUE: 32938;
        readonly SAMPLE_COVERAGE_INVERT: 32939;
        readonly COMPRESSED_TEXTURE_FORMATS: 34467;
        readonly DONT_CARE: 4352;
        readonly FASTEST: 4353;
        readonly NICEST: 4354;
        readonly GENERATE_MIPMAP_HINT: 33170;
        readonly BYTE: 5120;
        readonly UNSIGNED_BYTE: 5121;
        readonly SHORT: 5122;
        readonly UNSIGNED_SHORT: 5123;
        readonly INT: 5124;
        readonly UNSIGNED_INT: 5125;
        readonly FLOAT: 5126;
        readonly DEPTH_COMPONENT: 6402;
        readonly ALPHA: 6406;
        readonly RGB: 6407;
        readonly RGBA: 6408;
        readonly LUMINANCE: 6409;
        readonly LUMINANCE_ALPHA: 6410;
        readonly UNSIGNED_SHORT_4_4_4_4: 32819;
        readonly UNSIGNED_SHORT_5_5_5_1: 32820;
        readonly UNSIGNED_SHORT_5_6_5: 33635;
        readonly FRAGMENT_SHADER: 35632;
        readonly VERTEX_SHADER: 35633;
        readonly MAX_VERTEX_ATTRIBS: 34921;
        readonly MAX_VERTEX_UNIFORM_VECTORS: 36347;
        readonly MAX_VARYING_VECTORS: 36348;
        readonly MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661;
        readonly MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660;
        readonly MAX_TEXTURE_IMAGE_UNITS: 34930;
        readonly MAX_FRAGMENT_UNIFORM_VECTORS: 36349;
        readonly SHADER_TYPE: 35663;
        readonly DELETE_STATUS: 35712;
        readonly LINK_STATUS: 35714;
        readonly VALIDATE_STATUS: 35715;
        readonly ATTACHED_SHADERS: 35717;
        readonly ACTIVE_UNIFORMS: 35718;
        readonly ACTIVE_ATTRIBUTES: 35721;
        readonly SHADING_LANGUAGE_VERSION: 35724;
        readonly CURRENT_PROGRAM: 35725;
        readonly NEVER: 512;
        readonly LESS: 513;
        readonly EQUAL: 514;
        readonly LEQUAL: 515;
        readonly GREATER: 516;
        readonly NOTEQUAL: 517;
        readonly GEQUAL: 518;
        readonly ALWAYS: 519;
        readonly KEEP: 7680;
        readonly REPLACE: 7681;
        readonly INCR: 7682;
        readonly DECR: 7683;
        readonly INVERT: 5386;
        readonly INCR_WRAP: 34055;
        readonly DECR_WRAP: 34056;
        readonly VENDOR: 7936;
        readonly RENDERER: 7937;
        readonly VERSION: 7938;
        readonly NEAREST: 9728;
        readonly LINEAR: 9729;
        readonly NEAREST_MIPMAP_NEAREST: 9984;
        readonly LINEAR_MIPMAP_NEAREST: 9985;
        readonly NEAREST_MIPMAP_LINEAR: 9986;
        readonly LINEAR_MIPMAP_LINEAR: 9987;
        readonly TEXTURE_MAG_FILTER: 10240;
        readonly TEXTURE_MIN_FILTER: 10241;
        readonly TEXTURE_WRAP_S: 10242;
        readonly TEXTURE_WRAP_T: 10243;
        readonly TEXTURE_2D: 3553;
        readonly TEXTURE: 5890;
        readonly TEXTURE_CUBE_MAP: 34067;
        readonly TEXTURE_BINDING_CUBE_MAP: 34068;
        readonly TEXTURE_CUBE_MAP_POSITIVE_X: 34069;
        readonly TEXTURE_CUBE_MAP_NEGATIVE_X: 34070;
        readonly TEXTURE_CUBE_MAP_POSITIVE_Y: 34071;
        readonly TEXTURE_CUBE_MAP_NEGATIVE_Y: 34072;
        readonly TEXTURE_CUBE_MAP_POSITIVE_Z: 34073;
        readonly TEXTURE_CUBE_MAP_NEGATIVE_Z: 34074;
        readonly MAX_CUBE_MAP_TEXTURE_SIZE: 34076;
        readonly TEXTURE0: 33984;
        readonly TEXTURE1: 33985;
        readonly TEXTURE2: 33986;
        readonly TEXTURE3: 33987;
        readonly TEXTURE4: 33988;
        readonly TEXTURE5: 33989;
        readonly TEXTURE6: 33990;
        readonly TEXTURE7: 33991;
        readonly TEXTURE8: 33992;
        readonly TEXTURE9: 33993;
        readonly TEXTURE10: 33994;
        readonly TEXTURE11: 33995;
        readonly TEXTURE12: 33996;
        readonly TEXTURE13: 33997;
        readonly TEXTURE14: 33998;
        readonly TEXTURE15: 33999;
        readonly TEXTURE16: 34000;
        readonly TEXTURE17: 34001;
        readonly TEXTURE18: 34002;
        readonly TEXTURE19: 34003;
        readonly TEXTURE20: 34004;
        readonly TEXTURE21: 34005;
        readonly TEXTURE22: 34006;
        readonly TEXTURE23: 34007;
        readonly TEXTURE24: 34008;
        readonly TEXTURE25: 34009;
        readonly TEXTURE26: 34010;
        readonly TEXTURE27: 34011;
        readonly TEXTURE28: 34012;
        readonly TEXTURE29: 34013;
        readonly TEXTURE30: 34014;
        readonly TEXTURE31: 34015;
        readonly ACTIVE_TEXTURE: 34016;
        readonly REPEAT: 10497;
        readonly CLAMP_TO_EDGE: 33071;
        readonly MIRRORED_REPEAT: 33648;
        readonly FLOAT_VEC2: 35664;
        readonly FLOAT_VEC3: 35665;
        readonly FLOAT_VEC4: 35666;
        readonly INT_VEC2: 35667;
        readonly INT_VEC3: 35668;
        readonly INT_VEC4: 35669;
        readonly BOOL: 35670;
        readonly BOOL_VEC2: 35671;
        readonly BOOL_VEC3: 35672;
        readonly BOOL_VEC4: 35673;
        readonly FLOAT_MAT2: 35674;
        readonly FLOAT_MAT3: 35675;
        readonly FLOAT_MAT4: 35676;
        readonly SAMPLER_2D: 35678;
        readonly SAMPLER_CUBE: 35680;
        readonly VERTEX_ATTRIB_ARRAY_ENABLED: 34338;
        readonly VERTEX_ATTRIB_ARRAY_SIZE: 34339;
        readonly VERTEX_ATTRIB_ARRAY_STRIDE: 34340;
        readonly VERTEX_ATTRIB_ARRAY_TYPE: 34341;
        readonly VERTEX_ATTRIB_ARRAY_NORMALIZED: 34922;
        readonly VERTEX_ATTRIB_ARRAY_POINTER: 34373;
        readonly VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 34975;
        readonly IMPLEMENTATION_COLOR_READ_TYPE: 35738;
        readonly IMPLEMENTATION_COLOR_READ_FORMAT: 35739;
        readonly COMPILE_STATUS: 35713;
        readonly LOW_FLOAT: 36336;
        readonly MEDIUM_FLOAT: 36337;
        readonly HIGH_FLOAT: 36338;
        readonly LOW_INT: 36339;
        readonly MEDIUM_INT: 36340;
        readonly HIGH_INT: 36341;
        readonly FRAMEBUFFER: 36160;
        readonly RENDERBUFFER: 36161;
        readonly RGBA4: 32854;
        readonly RGB5_A1: 32855;
        readonly RGBA8: 32856;
        readonly RGB565: 36194;
        readonly DEPTH_COMPONENT16: 33189;
        readonly STENCIL_INDEX8: 36168;
        readonly DEPTH_STENCIL: 34041;
        readonly RENDERBUFFER_WIDTH: 36162;
        readonly RENDERBUFFER_HEIGHT: 36163;
        readonly RENDERBUFFER_INTERNAL_FORMAT: 36164;
        readonly RENDERBUFFER_RED_SIZE: 36176;
        readonly RENDERBUFFER_GREEN_SIZE: 36177;
        readonly RENDERBUFFER_BLUE_SIZE: 36178;
        readonly RENDERBUFFER_ALPHA_SIZE: 36179;
        readonly RENDERBUFFER_DEPTH_SIZE: 36180;
        readonly RENDERBUFFER_STENCIL_SIZE: 36181;
        readonly FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 36048;
        readonly FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 36049;
        readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 36050;
        readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 36051;
        readonly COLOR_ATTACHMENT0: 36064;
        readonly DEPTH_ATTACHMENT: 36096;
        readonly STENCIL_ATTACHMENT: 36128;
        readonly DEPTH_STENCIL_ATTACHMENT: 33306;
        readonly NONE: 0;
        readonly FRAMEBUFFER_COMPLETE: 36053;
        readonly FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 36054;
        readonly FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 36055;
        readonly FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 36057;
        readonly FRAMEBUFFER_UNSUPPORTED: 36061;
        readonly FRAMEBUFFER_BINDING: 36006;
        readonly RENDERBUFFER_BINDING: 36007;
        readonly MAX_RENDERBUFFER_SIZE: 34024;
        readonly INVALID_FRAMEBUFFER_OPERATION: 1286;
        readonly UNPACK_FLIP_Y_WEBGL: 37440;
        readonly UNPACK_PREMULTIPLY_ALPHA_WEBGL: 37441;
        readonly CONTEXT_LOST_WEBGL: 37442;
        readonly UNPACK_COLORSPACE_CONVERSION_WEBGL: 37443;
        readonly BROWSER_DEFAULT_WEBGL: 37444;
    };
    WebGLSampler: {
        prototype: WebGLSampler;
        new (): WebGLSampler;
    };
    WebGLShader: {
        prototype: WebGLShader;
        new (): WebGLShader;
    };
    WebGLShaderPrecisionFormat: {
        prototype: WebGLShaderPrecisionFormat;
        new (): WebGLShaderPrecisionFormat;
    };
    WebGLSync: {
        prototype: WebGLSync;
        new (): WebGLSync;
    };
    WebGLTexture: {
        prototype: WebGLTexture;
        new (): WebGLTexture;
    };
    WebGLTransformFeedback: {
        prototype: WebGLTransformFeedback;
        new (): WebGLTransformFeedback;
    };
    WebGLUniformLocation: {
        prototype: WebGLUniformLocation;
        new (): WebGLUniformLocation;
    };
    WebGLVertexArrayObject: {
        prototype: WebGLVertexArrayObject;
        new (): WebGLVertexArrayObject;
    };
    WebSocket: {
        prototype: WebSocket;
        new (url: string | URL, protocols?: string | string[]): WebSocket;
        readonly CONNECTING: 0;
        readonly OPEN: 1;
        readonly CLOSING: 2;
        readonly CLOSED: 3;
    };
    WebTransport: {
        prototype: WebTransport;
        new (url: string | URL, options?: WebTransportOptions): WebTransport;
    };
    WebTransportBidirectionalStream: {
        prototype: WebTransportBidirectionalStream;
        new (): WebTransportBidirectionalStream;
    };
    WebTransportDatagramDuplexStream: {
        prototype: WebTransportDatagramDuplexStream;
        new (): WebTransportDatagramDuplexStream;
    };
    WebTransportError: {
        prototype: WebTransportError;
        new (message?: string, options?: WebTransportErrorOptions): WebTransportError;
    };
    WheelEvent: {
        prototype: WheelEvent;
        new (type: string, eventInitDict?: WheelEventInit): WheelEvent;
        readonly DOM_DELTA_PIXEL: 0;
        readonly DOM_DELTA_LINE: 1;
        readonly DOM_DELTA_PAGE: 2;
    };
    Window: {
        prototype: Window;
        new (): Window;
    };
    Worker: {
        prototype: Worker;
        new (scriptURL: string | URL, options?: WorkerOptions): Worker;
    };
    Worklet: {
        prototype: Worklet;
        new (): Worklet;
    };
    WritableStream: {
        prototype: WritableStream;
        new <W = any>(underlyingSink?: UnderlyingSink<W>, strategy?: QueuingStrategy<W>): WritableStream<W>;
    };
    WritableStreamDefaultController: {
        prototype: WritableStreamDefaultController;
        new (): WritableStreamDefaultController;
    };
    WritableStreamDefaultWriter: {
        prototype: WritableStreamDefaultWriter;
        new <W = any>(stream: WritableStream<W>): WritableStreamDefaultWriter<W>;
    };
    XMLDocument: {
        prototype: XMLDocument;
        new (): XMLDocument;
    };
    XMLHttpRequest: {
        prototype: XMLHttpRequest;
        new (): XMLHttpRequest;
        readonly UNSENT: 0;
        readonly OPENED: 1;
        readonly HEADERS_RECEIVED: 2;
        readonly LOADING: 3;
        readonly DONE: 4;
    };
    XMLHttpRequestEventTarget: {
        prototype: XMLHttpRequestEventTarget;
        new (): XMLHttpRequestEventTarget;
    };
    XMLHttpRequestUpload: {
        prototype: XMLHttpRequestUpload;
        new (): XMLHttpRequestUpload;
    };
    XMLSerializer: {
        prototype: XMLSerializer;
        new (): XMLSerializer;
    };
    XPathEvaluator: {
        prototype: XPathEvaluator;
        new (): XPathEvaluator;
    };
    XPathExpression: {
        prototype: XPathExpression;
        new (): XPathExpression;
    };
    XPathResult: {
        prototype: XPathResult;
        new (): XPathResult;
        readonly ANY_TYPE: 0;
        readonly NUMBER_TYPE: 1;
        readonly STRING_TYPE: 2;
        readonly BOOLEAN_TYPE: 3;
        readonly UNORDERED_NODE_ITERATOR_TYPE: 4;
        readonly ORDERED_NODE_ITERATOR_TYPE: 5;
        readonly UNORDERED_NODE_SNAPSHOT_TYPE: 6;
        readonly ORDERED_NODE_SNAPSHOT_TYPE: 7;
        readonly ANY_UNORDERED_NODE_TYPE: 8;
        readonly FIRST_ORDERED_NODE_TYPE: 9;
    };
    XSLTProcessor: {
        prototype: XSLTProcessor;
        new (): XSLTProcessor;
    };
    CSS: typeof CSS;
    WebAssembly: typeof WebAssembly;
    Audio: {
        new (src?: string): HTMLAudioElement;
    };
    Image: {
        new (width?: number, height?: number): HTMLImageElement;
    };
    Option: {
        new (text?: string, value?: string, defaultSelected?: boolean, selected?: boolean): HTMLOptionElement;
    };
    clientInformation: Navigator;
    closed: boolean;
    customElements: CustomElementRegistry;
    devicePixelRatio: number;
    document: Document;
    event: Event | undefined;
    external: External;
    frameElement: Element | null;
    frames: WindowProxy;
    history: History;
    innerHeight: number;
    innerWidth: number;
    length: number;
    location: Location;
    locationbar: BarProp;
    menubar: BarProp;
    navigator: Navigator;
    ondevicemotion: ((this: Window, ev: DeviceMotionEvent) => any) | null;
    ondeviceorientation: ((this: Window, ev: DeviceOrientationEvent) => any) | null;
    ondeviceorientationabsolute: ((this: Window, ev: DeviceOrientationEvent) => any) | null;
    onorientationchange: ((this: Window, ev: Event) => any) | null;
    opener: any;
    orientation: number;
    outerHeight: number;
    outerWidth: number;
    pageXOffset: number;
    pageYOffset: number;
    parent: WindowProxy;
    personalbar: BarProp;
    screen: Screen;
    screenLeft: number;
    screenTop: number;
    screenX: number;
    screenY: number;
    scrollX: number;
    scrollY: number;
    scrollbars: BarProp;
    self: Window & typeof globalThis;
    speechSynthesis: SpeechSynthesis;
    status: string;
    statusbar: BarProp;
    toolbar: BarProp;
    top: WindowProxy | null;
    visualViewport: VisualViewport | null;
    window: Window & typeof globalThis;
    onabort: ((this: Window, ev: UIEvent) => any) | null;
    onanimationcancel: ((this: Window, ev: AnimationEvent) => any) | null;
    onanimationend: ((this: Window, ev: AnimationEvent) => any) | null;
    onanimationiteration: ((this: Window, ev: AnimationEvent) => any) | null;
    onanimationstart: ((this: Window, ev: AnimationEvent) => any) | null;
    onauxclick: ((this: Window, ev: MouseEvent) => any) | null;
    onbeforeinput: ((this: Window, ev: InputEvent) => any) | null;
    onbeforetoggle: ((this: Window, ev: Event) => any) | null;
    onblur: ((this: Window, ev: FocusEvent) => any) | null;
    oncancel: ((this: Window, ev: Event) => any) | null;
    oncanplay: ((this: Window, ev: Event) => any) | null;
    oncanplaythrough: ((this: Window, ev: Event) => any) | null;
    onchange: ((this: Window, ev: Event) => any) | null;
    onclick: ((this: Window, ev: MouseEvent) => any) | null;
    onclose: ((this: Window, ev: Event) => any) | null;
    oncontextlost: ((this: Window, ev: Event) => any) | null;
    oncontextmenu: ((this: Window, ev: MouseEvent) => any) | null;
    oncontextrestored: ((this: Window, ev: Event) => any) | null;
    oncopy: ((this: Window, ev: ClipboardEvent) => any) | null;
    oncuechange: ((this: Window, ev: Event) => any) | null;
    oncut: ((this: Window, ev: ClipboardEvent) => any) | null;
    ondblclick: ((this: Window, ev: MouseEvent) => any) | null;
    ondrag: ((this: Window, ev: DragEvent) => any) | null;
    ondragend: ((this: Window, ev: DragEvent) => any) | null;
    ondragenter: ((this: Window, ev: DragEvent) => any) | null;
    ondragleave: ((this: Window, ev: DragEvent) => any) | null;
    ondragover: ((this: Window, ev: DragEvent) => any) | null;
    ondragstart: ((this: Window, ev: DragEvent) => any) | null;
    ondrop: ((this: Window, ev: DragEvent) => any) | null;
    ondurationchange: ((this: Window, ev: Event) => any) | null;
    onemptied: ((this: Window, ev: Event) => any) | null;
    onended: ((this: Window, ev: Event) => any) | null;
    onerror: OnErrorEventHandler;
    onfocus: ((this: Window, ev: FocusEvent) => any) | null;
    onformdata: ((this: Window, ev: FormDataEvent) => any) | null;
    ongotpointercapture: ((this: Window, ev: PointerEvent) => any) | null;
    oninput: ((this: Window, ev: Event) => any) | null;
    oninvalid: ((this: Window, ev: Event) => any) | null;
    onkeydown: ((this: Window, ev: KeyboardEvent) => any) | null;
    onkeypress: ((this: Window, ev: KeyboardEvent) => any) | null;
    onkeyup: ((this: Window, ev: KeyboardEvent) => any) | null;
    onload: ((this: Window, ev: Event) => any) | null;
    onloadeddata: ((this: Window, ev: Event) => any) | null;
    onloadedmetadata: ((this: Window, ev: Event) => any) | null;
    onloadstart: ((this: Window, ev: Event) => any) | null;
    onlostpointercapture: ((this: Window, ev: PointerEvent) => any) | null;
    onmousedown: ((this: Window, ev: MouseEvent) => any) | null;
    onmouseenter: ((this: Window, ev: MouseEvent) => any) | null;
    onmouseleave: ((this: Window, ev: MouseEvent) => any) | null;
    onmousemove: ((this: Window, ev: MouseEvent) => any) | null;
    onmouseout: ((this: Window, ev: MouseEvent) => any) | null;
    onmouseover: ((this: Window, ev: MouseEvent) => any) | null;
    onmouseup: ((this: Window, ev: MouseEvent) => any) | null;
    onpaste: ((this: Window, ev: ClipboardEvent) => any) | null;
    onpause: ((this: Window, ev: Event) => any) | null;
    onplay: ((this: Window, ev: Event) => any) | null;
    onplaying: ((this: Window, ev: Event) => any) | null;
    onpointercancel: ((this: Window, ev: PointerEvent) => any) | null;
    onpointerdown: ((this: Window, ev: PointerEvent) => any) | null;
    onpointerenter: ((this: Window, ev: PointerEvent) => any) | null;
    onpointerleave: ((this: Window, ev: PointerEvent) => any) | null;
    onpointermove: ((this: Window, ev: PointerEvent) => any) | null;
    onpointerout: ((this: Window, ev: PointerEvent) => any) | null;
    onpointerover: ((this: Window, ev: PointerEvent) => any) | null;
    onpointerup: ((this: Window, ev: PointerEvent) => any) | null;
    onprogress: ((this: Window, ev: ProgressEvent) => any) | null;
    onratechange: ((this: Window, ev: Event) => any) | null;
    onreset: ((this: Window, ev: Event) => any) | null;
    onresize: ((this: Window, ev: UIEvent) => any) | null;
    onscroll: ((this: Window, ev: Event) => any) | null;
    onscrollend: ((this: Window, ev: Event) => any) | null;
    onsecuritypolicyviolation: ((this: Window, ev: SecurityPolicyViolationEvent) => any) | null;
    onseeked: ((this: Window, ev: Event) => any) | null;
    onseeking: ((this: Window, ev: Event) => any) | null;
    onselect: ((this: Window, ev: Event) => any) | null;
    onselectionchange: ((this: Window, ev: Event) => any) | null;
    onselectstart: ((this: Window, ev: Event) => any) | null;
    onslotchange: ((this: Window, ev: Event) => any) | null;
    onstalled: ((this: Window, ev: Event) => any) | null;
    onsubmit: ((this: Window, ev: SubmitEvent) => any) | null;
    onsuspend: ((this: Window, ev: Event) => any) | null;
    ontimeupdate: ((this: Window, ev: Event) => any) | null;
    ontoggle: ((this: Window, ev: Event) => any) | null;
    ontouchcancel: ((this: Window, ev: TouchEvent) => any) | null | undefined;
    ontouchend: ((this: Window, ev: TouchEvent) => any) | null | undefined;
    ontouchmove: ((this: Window, ev: TouchEvent) => any) | null | undefined;
    ontouchstart: ((this: Window, ev: TouchEvent) => any) | null | undefined;
    ontransitioncancel: ((this: Window, ev: TransitionEvent) => any) | null;
    ontransitionend: ((this: Window, ev: TransitionEvent) => any) | null;
    ontransitionrun: ((this: Window, ev: TransitionEvent) => any) | null;
    ontransitionstart: ((this: Window, ev: TransitionEvent) => any) | null;
    onvolumechange: ((this: Window, ev: Event) => any) | null;
    onwaiting: ((this: Window, ev: Event) => any) | null;
    onwebkitanimationend: ((this: Window, ev: Event) => any) | null;
    onwebkitanimationiteration: ((this: Window, ev: Event) => any) | null;
    onwebkitanimationstart: ((this: Window, ev: Event) => any) | null;
    onwebkittransitionend: ((this: Window, ev: Event) => any) | null;
    onwheel: ((this: Window, ev: WheelEvent) => any) | null;
    onafterprint: ((this: Window, ev: Event) => any) | null;
    onbeforeprint: ((this: Window, ev: Event) => any) | null;
    onbeforeunload: ((this: Window, ev: BeforeUnloadEvent) => any) | null;
    ongamepadconnected: ((this: Window, ev: GamepadEvent) => any) | null;
    ongamepaddisconnected: ((this: Window, ev: GamepadEvent) => any) | null;
    onhashchange: ((this: Window, ev: HashChangeEvent) => any) | null;
    onlanguagechange: ((this: Window, ev: Event) => any) | null;
    onmessage: ((this: Window, ev: MessageEvent) => any) | null;
    onmessageerror: ((this: Window, ev: MessageEvent) => any) | null;
    onoffline: ((this: Window, ev: Event) => any) | null;
    ononline: ((this: Window, ev: Event) => any) | null;
    onpagehide: ((this: Window, ev: PageTransitionEvent) => any) | null;
    onpageshow: ((this: Window, ev: PageTransitionEvent) => any) | null;
    onpopstate: ((this: Window, ev: PopStateEvent) => any) | null;
    onrejectionhandled: ((this: Window, ev: PromiseRejectionEvent) => any) | null;
    onstorage: ((this: Window, ev: StorageEvent) => any) | null;
    onunhandledrejection: ((this: Window, ev: PromiseRejectionEvent) => any) | null;
    onunload: ((this: Window, ev: Event) => any) | null;
    localStorage: Storage;
    caches: CacheStorage;
    crossOriginIsolated: boolean;
    crypto: Crypto;
    indexedDB: IDBFactory;
    isSecureContext: boolean;
    origin: string;
    performance: Performance;
    sessionStorage: Storage;
    Map: MapConstructor;
    WeakMap: WeakMapConstructor;
    Set: SetConstructor;
    WeakSet: WeakSetConstructor;
    Iterator: IteratorConstructor;
    Proxy: ProxyConstructor;
    Reflect: typeof Reflect;
    SharedArrayBuffer: SharedArrayBufferConstructor;
    Atomics: Atomics;
    BigInt: BigIntConstructor;
    BigInt64Array: BigInt64ArrayConstructor;
    BigUint64Array: BigUint64ArrayConstructor;
    AggregateError: AggregateErrorConstructor;
    WeakRef: WeakRefConstructor;
    FinalizationRegistry: FinalizationRegistryConstructor;
    SuppressedError: SuppressedErrorConstructor;
    DisposableStack: DisposableStackConstructor;
    AsyncDisposableStack: AsyncDisposableStackConstructor;
    React: typeof import("react");
    ReactDOMServer: typeof import("react-dom/server");
    NodeJS: typeof NodeJS;
    ReactDOM: typeof import("react-dom");
    global: typeof globalThis;
    exports: any;
    gc: undefined | GCFunction;
    setImmediate: typeof setImmediate;
    clearImmediate(immediateId: NodeJS.Immediate | undefined): void;
    undefined: undefined;
};
export declare function extractOutputFiles(outputFiles: OutputFile[]): {
    sourceMapFile: OutputFile;
    bundledDocumentFile: OutputFile;
    cssFile: OutputFile | undefined;
};
export declare function configureSourceMap(sourceMapFile: OutputFile): RawSourceMap;
export declare function executeBuiltCode(builtDocumentCode: string, fakeContext: any, documentPath: string, sourceMapToDocument: RawSourceMap): {
    DocumentComponent: DocumentComponent;
    renderAsync: RenderAsyncFunction;
} | {
    error: ErrorObject;
};
//# sourceMappingURL=index.d.ts.map
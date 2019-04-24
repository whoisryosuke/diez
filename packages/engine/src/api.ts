/* tslint:disable:no-empty-interface */

/**
 * Primitive types. These can always be serialized over the wire without intervention.
 */
export type Primitive = (
  string | number | boolean | null |
  string[] | number[] | boolean[] | null[]
);

/**
 * Anything serializable is either primitive or provides its own serialization instructions.
 */
export type AnySerializable = Primitive | Serializable | {[property: string]: AnySerializable};

/**
 * A serializable interface for providing bespoke serialization instructions. Can return anything
 * recursively serializable.
 */
export interface Serializable {
  serialize (): any;
}

/**
 * Alias for any indexable type. Stateful<T> and Tweenable<T> interfaces use a generic type extending this.
 */
export interface Indexable {
  [key: string]: any;
}

/**
 * Stateful interfaces can be updated through partial state definitions.
 */
export interface Stateful<T extends Indexable> {
  get<K extends keyof T> (key: K): T[K];
  set (state: Partial<T>): void;
  has (key: keyof T): boolean;
}

/**
 * A curve is a mapping from [0, 1] to a number representing a normalized value progression over time.
 *
 * It is expected that a curve is always 0 at t = 0 and always 1 at t = 1.
 */
export type Curve = (t: number) => number;

/**
 * A tween specification should specify a duration and an optional curve.
 */
export interface TweenSpecification {
  duration: number;
  curve?: Curve;
}

/**
 * A tween provides complete instructions for changing a numeric value over time.
 */
export interface Tween {
  startValue: number;
  endValue: number;
  startTime: number;
  endTime: number;
  curve: Curve;
}

/**
 * Tweenable interfaces can be updated through partial state definitions with tween specifications.
 */
export interface Tweenable<T extends Indexable> {
  tween (state: Partial<T>, spec: TweenSpecification): Promise<void>;
}

/**
 * A listener is any function of a data payload. Its return value is ignored; it should rely on
 * side effects to mutate application state.
 */
export type Listener<D> = (data?: D) => void;

/**
 * A hashmap of Listener<any>s.
 */
export interface Listeners {
  [name: string]: Listener<any>;
}

/**
 * Listening interfaces can trigger a listener by name with a payload of a generically specified
 * type.
 */
export interface Listening {
  trigger<D> (name: string, payload: D): void;
}

/**
 * A patcher takes any serializable payload and patches it up to its controller.
 */
export type Patcher = (payload: any) => void;

/**
 * Tickable interfaces can tick an internal clock with a specified time.
 */
export interface Tickable {
  tick (time: number, onPatch?: Patcher): void;
}

/**
 * A special type of state for components, which only can contain values of a specific type.
 */
export interface HashMap<T extends AnySerializable> {
  [key: string]: T;
}

/**
 * A formula receives variously typed args and returns a specific type.
 */
export type Formula<T extends AnySerializable> = (...args: any[]) => T;

/**
 * An expression resolver can be any object that supports indexing. We use this to specify
 * what expression variables should be resolved from at runtime.
 */
export interface ExpressionResolver {
  [key: string]: any;
}

/**
 * @internal
 *
 * Since TypeScript doesn't provide proper Integer/Double types, we hack around this by making named types
 * using a union of `number` and an empty enum.
 */
enum AlwaysInt {}
enum AlwaysFloat {}

/**
 * Typealias for integer numbers.
 */
export type Integer = number | AlwaysInt;

/**
 * Typealias for double numbers.
 */
export type Float = number | AlwaysFloat;

/**
 * An expandable interface for property options.
 */
export interface PropertyOptions {
  never: never;
}

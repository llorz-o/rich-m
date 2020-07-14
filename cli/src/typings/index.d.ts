declare namespace NodeJs {
	export type AsyncPromiseError = NodeJS.ErrnoException | null;
	export type AsyncPromiseResolve = [AsyncPromiseError, any];
	export type AsyncPromise = Promise<AsyncPromiseResolve>;
}

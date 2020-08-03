export interface Operate {
	isDeleteKey(key: string, keyCode: number, which: number): boolean;
	isEnterKey(
		key: string,
		keyCode: number,
		which: number,
		charCode: number
	): boolean;
	disposeKeydown(e: KeyboardEvent): void;
}

export const Operate: Operate = {
	/**
	 * 当前是否删除键
	 */
	isDeleteKey(key: string, keyCode: number, which: number): boolean {
		return key === "Backspace" || keyCode === 8 || which === 8;
	},
	/**
	 * 当前是否回车键
	 */
	isEnterKey(
		key: string,
		keyCode: number,
		which: number,
		charCode: number
	): boolean {
		return (
			charCode === 13 || key === "Enter" || keyCode === 13 || which === 13
		);
	},
	/**
	 * 处理键盘特殊键入
	 */
	disposeKeydown(e: KeyboardEvent): void {}
};

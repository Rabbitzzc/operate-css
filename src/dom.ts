const createStyleElement = () => {
	const styleElement = document.createElement('style');
	styleElement.setAttribute('type', 'text/css');
	return styleElement;
};

interface DomOperation {
	css({
		el,
		styles,
	}: {
		el: { style: { [x: string]: any } };
		styles: { [x: string]: any };
	}): void;
	getStyleValue({ el, attr }: { el: HTMLElement; attr: string }): string;
	insertCSS(
		css: string,
		options: { target?: any; prepend?: boolean }
	): HTMLElement | undefined;
}

const dom: DomOperation = {
	// 设置样式
	css({
		el,
		styles,
	}: {
		el: { style: { [x: string]: any } };
		styles: { [x: string]: any };
	}) {
		if (!el) return;
		for (let k in styles) {
			if (styles.hasOwnProperty(k)) el.style[k] = styles[k];
		}
	},
	//获取指定样式
	getStyleValue({ el, attr }: { el: HTMLElement; attr: string }): string {
		let value = '';
		const defaultView = el.ownerDocument.defaultView;
		if (defaultView && defaultView.getComputedStyle) {
			attr = attr.replace(/([A-Z])/g, '-$1').toLowerCase();
			return defaultView.getComputedStyle(el, null).getPropertyValue(attr);
		} else if (el['currentStyle']) {
			// el.currentStyle to el['currentStyle'] ts error
			// IE
			attr = attr.replace(/\-(\w)/g, (str: string, letter) =>
				letter.toUpperCase()
			);
			value = el['currentStyle'][attr];
			return value;
		}

		return '';
	},
	insertCSS(css: string, options: { target?: any; prepend?: boolean }) {
		if (css === undefined || css === null)
			throw new Error('insertCSS 需要提供css字符串参数');

		options = options || {};
		const position: string = options.prepend ? 'prepend' : 'append';
		const container = options.target || document.querySelector('head');

		const styleElement = createStyleElement();

		if (position === 'prepend') {
			container.insertBefore(styleElement, container.childNodes[0]);
		} else {
			container.appendChild(styleElement);
		}

		// 某些低版本浏览器并不能使用 https://caniuse.com/#search=styleSheet
		if (styleElement['styleSheet']) {
			styleElement['styleSheet'].cssText += css;
		} else {
			styleElement.textContent += css;
		}
		return styleElement;
	},
};

export default dom;

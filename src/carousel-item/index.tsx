import { MixinChildren } from "../mixins";
import { createNamespace } from "../utils";
import "./index.less";

const [createComponent, b] = createNamespace("carousel-item")

export default createComponent({
	mixins: [MixinChildren("carousel")],
	render(h) {

		const { slots } = this

		return <div class={b()} style={this.rootStyle}>
			{slots()}
		</div>
	},
	computed: {
		rootStyle() {

			const { fillIndex, childrenLength, clientWidth } = this.carousel

			if (fillIndex !== null && fillIndex === this.index) {

				if (fillIndex === 0) {
					return {
						flexBasis: `${clientWidth}px`,
						transform: `translate3d(${childrenLength * clientWidth}px,0px,0px)`,
					}
				} else {
					return {
						flexBasis: `${clientWidth}px`,
						transform: `translate3d(-${childrenLength * clientWidth}px,0px,0px)`,
					}
				}

			}

			return {
				flexBasis: `${clientWidth}px`,
				transform: `translate3d(0px,0px,0px)`,
			}
		},
	}
})

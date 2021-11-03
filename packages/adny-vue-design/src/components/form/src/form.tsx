import { defineComponent, provide, getCurrentInstance, ref, onMounted } from 'vue';
import { props } from './formProps';
export default defineComponent({
	props,
	setup(props, ctx) {
		const formInstance = getCurrentInstance()
		provide('formInstance', props);
		const validate = (callback) => {
			const result = formInstance?.subTree.children[0].children
			const a = result.filter(item => item?.props?.prop)
			console.log(a)
		  const res = a.map(item => item.component.exposed.validator())
			console.log(res);
			
			return Promise.all(res).then(() => callback(true)).catch(() => callback(false))
		}

		ctx.expose({validate})
		return () => {
			return (
				<div>{ctx.slots.default ? ctx.slots.default() : null}</div>
			)
		};
	}
});

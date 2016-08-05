export default () => {
	return (module, controller) => {
		module.addSignals({
			addData: [
				({ input, state }) => {
					const { key, value } = input
					state.set(`items.${key}`, { key, value })
				}
			],
			clearData: [
				({ state }) => {
					state.unset('items')
				}
			],
			asyncAddData: [
				({ input, state }) => {
					setTimeout(() => {
						controller.getSignals('app.addData')(input)
					}, 100)
				}
			]
		})
	}
}

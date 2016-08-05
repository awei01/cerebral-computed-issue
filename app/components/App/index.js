import React, { Component } from 'react';
import { Computed } from 'cerebral'
import { connect } from 'cerebral-view-react'

const App = ({ items, itemByObj, itemByFn, addData, asyncAddData, clearData }) => {
	items = items || {}
	const keys = Object.keys(items)
	return (
		<div>
			<h2>results</h2>
			<ul style={{ fontWeight: 'bold', backgroundColor: '#eee', padding: '1em' }}>
			{
				keys.length
				? keys.map((key, index) => {
						const i = items[key]
						return (
							<li key={index}>key: [{i.key}] | value: [{i.value}]</li>
						)
					})
				: <li>No items yet</li>
			}
			</ul>
			<h2>specifically when key is "foo"</h2>
			<ul style={{ fontWeight: 'bold', backgroundColor: '#eee', padding: '1em' }}>
				{ itemByObj
					? (<li>key: {itemByObj.key} | value: [{itemByObj.value}]</li>)
					: (<li>computeItemByObj() returned falsy</li>)
				}
				{ itemByFn
					? (<li>key: {itemByFn.key} | value: [{itemByFn.value}]</li>)
					: (<li>computeItemByFn() returned falsy</li>)
				}
			</ul>
			<h2>add some data</h2>
			<form onSubmit={(event) => {
					event.preventDefault()
					const { target: { key, value } } = event
					if (!key.value || !value.value) {
						alert('Please enter a [key] and [value]')
						return
					}
					addData({ key: key.value, value: value.value })
					key.value = ''
					value.value = ''
				}}>
				<input name='key' placeholder='key'/>
				<br/>
				<input name='value' placeholder='value'/>
				<br/>
				<button type='submit'>submit</button>
			</form>
{/*			<h2>async</h2>
			<form onSubmit={(event) => {
					event.preventDefault()
					const { target: { key, value } } = event
					asyncAddData({ key: key.value, value: value.value })
				}}>
				<input name='key' placeholder='key'/>
				<br/>
				<input name='value' placeholder='value'/>
				<br/>
				<button type='submit'>submit</button>
			</form>
*/}
			<h2>What is happening</h2>
			<ul>
				<li>Add some keys and values</li>
				<li>Add a key as "foo" and some value. Note the results</li>
				<li>computeItems() correctly grabs all the items</li>
				<li>computeItemByObj() correctly the item when the key is set to 'foo'</li>
				<li>computeItemByFn() does not ever get re-run after initial computation</li>
			</ul>
		</div>
	)
}

const computeItems = Computed({
	items: 'items'
}, ({ items }) => {
	return items
})

const computeItemByFn = Computed((key) => {
	return {
		items: computeItems(),
		key
	}
}, ({ items, key }) => {
	items = items || {}
	return items[key]
})

const findKey = 'foo'
const computeItemByObj = Computed({
	items: computeItems()
}, ({ items }) => {
	items = items || {}
	return items[findKey]
})

export default connect({
	items: computeItems(),
	itemByFn: computeItemByFn(findKey),
	itemByObj: computeItemByObj()
}, {
	addData: 'app.addData',
	asyncAddData: 'app.asyncAddData',
	clearData: 'app.clearData'
}, App)

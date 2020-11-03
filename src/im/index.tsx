import { createNamespace, debounce } from "../utils";
import { hash } from "../utils/other";
import IMLocalCache from "./localCache";

const [createComponent, b] = createNamespace('im')

export type formatterKey = {
	id?: number,
	gen?: number,
	type?: string,
	abandoned?: boolean
}

export type formatterResult = {
	key: formatterKey,
	data: Record<string, unknown>,
}

export default createComponent({
	props: {
		roomId: {
			type: String,
			required: true
		},
		formatter: {
			type: Function,
			required: true,
			default: (): formatterResult => ({
				key: {
					id: 0,
				},
				data: {}
			})
		},
		cgen: {
			type: Function,
			default: () => hash(8)
		},
		driver: {
			type: Function,
			default: () => console.error("请实现对象储存堆")
		}
	},
	data() {
		return {
			localMeesageKeyList: [],
			// 只渲染key
			messageKeyList: [
				// {id:xxx,gen:xxx,type:txt}
			],
			isInit: false,
			// 推送流临时
			followTemporaryStorage: [
				// {id:xxx,gen:xxx,type:txt}
			],
			// 实际数据存储堆 [[对象储存,indexDB]]
			stackData: {
				// [id|gen]:data
			},
			// 用id或gen映射下标
			genOrIdMappingMessageKeyIndex: {
				// [id|gen]:messageKeyIndex
			},

			// 本地对象存储
			db: null
		}
	},
	watch: {

	},
	render(h) {

		const { slots, messageKeyList, stackData } = this



		const defSlot = slots('default', { queue: messageKeyList, stack: stackData })

		return defSlot || <div class={b()} />
	},
	created() {
		const { roomId, driver } = this
		const messageListDB = new IMLocalCache(String(roomId))

		this.db = driver()

		this.localMeesageKeyList = messageListDB.rw('messageKeyList') || []

		this.$on("hook:updated", () => {
			messageListDB && messageListDB.rw('messageKeyList', this.messageKeyList.filter(item => !item.abandoned))
		})

		this.$emit("created", this)
	},
	methods: {
		// 推送消息
		follow(messages: unknown[]) {
			const { isInit, formatter, genOrIdMappingMessageKeyIndex } = this
			messages.forEach(item => {
				const { key, data } = formatter(item)
				if (isInit) {
					const { id, gen } = key
					const curIndex = genOrIdMappingMessageKeyIndex[gen || id]
					if (curIndex !== undefined) {
						const messageKey = this.messageKeyList[curIndex]
						if (messageKey === undefined) {
							console.error("下标丢失", key, data);
						} else {
							const { gen } = messageKey
							messageKey.abandoned = true
							this.$set(this.messageKeyList, curIndex, messageKey)
							this.$nextTick(() => this.delGenData(gen))
						}
					}
					this.proxyMessaegKeyList([key])
				} else {
					this.followTemporaryStorage.push(key)
				}

				if (key.id !== undefined) {
					this.setStackData(key.id, data)
				} else {
					console.error("未获取到当前消息id");
				}

			})
		},
		// merge 本地缓存
		merge(messages: unknown[]) {
			const { formatter, localMeesageKeyList } = this
			const [firstItem] = messages
			const { key: firstKey } = formatter(firstItem)
			const messageLength = messages.length
			const localMeesageKeyListLength = localMeesageKeyList.length
			let localMeesageKeyListIndex = localMeesageKeyList.length - 1
			let messageKeyListIndex = 0

			for (; localMeesageKeyListIndex >= 0; localMeesageKeyListIndex--) {
				const { id } = localMeesageKeyList[localMeesageKeyListIndex]
				if (id !== undefined && id === firstKey.id) break
			}

			for (; messageKeyListIndex < messageLength;) {

				for (; localMeesageKeyListIndex < localMeesageKeyListLength;) {
					const localMessageItem = localMeesageKeyList[localMeesageKeyListIndex]
					const { id } = localMessageItem || {}

					const messageItem = messages[messageKeyListIndex]
					const { key: newKey, data } = formatter(messageItem || {})
					const { id: newId } = newKey || {}

					if (newId !== undefined && newId === id) {
						messageKeyListIndex++
						localMeesageKeyListIndex++
						this.setStackData(newId, data)
						this.proxyMessaegKeyList([newKey])

					} else {

						if (id) {
							localMeesageKeyListIndex++
							this.proxyMessaegKeyList([localMessageItem])
						} else {
							messageKeyListIndex++
							this.setStackData(newId, data)
							this.proxyMessaegKeyList([newKey])
						}

					}
				}
			}

		},
		initMerge(messages: unknown[]) {
			this.merge(messages)
			this.isInit = true
			this.proxyMessaegKeyList(this.followTemporaryStorage)
		},
		// 创建 gen
		gen(fn: (seed: string) => formatterResult) {
			const { key, data } = fn(this.cgen()) || {}
			this.proxyMessaegKeyList([key])
			this.setStackData(key.gen, data)
		},
		// 代理添加 messageKeyList 的条目
		proxyMessaegKeyList(list: formatterKey[]) {
			for (let index = 0; index < list.length; index++) {
				const { length: curLen } = this.messageKeyList
				const element = list[index]
				const { id, gen } = element
				this.messageKeyList.push(element)
				if (id) this.$set(this.genOrIdMappingMessageKeyIndex, id, curLen)
				if (gen) this.$set(this.genOrIdMappingMessageKeyIndex, gen, curLen)
			}
		},
		// 写入堆数据
		setStackData(key: number, data) {
			const { db } = this
			this.stackData[key] = data
			db && db.set(key, {
				c: Date.now(),
				data,
			})
		},
		// 删除gen对应的数据
		delGenData(key) {
			const { db } = this
			// 删除key转下标映射
			this.$delete(this.genOrIdMappingMessageKeyIndex, key)
			// 删除堆数据
			this.$delete(this.stackData, key)
			// 删除本地缓存
			db && db.remove(key)
		},
		// 获取堆上数据
		getStackItem(key) {
			const { db, stackData } = this
			const result = stackData[key]
			if (result) return
			return db && db.get(key)
		}
	}
})

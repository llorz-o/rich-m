/**
 *  本地存储管理
 *
 * @format
 */

export interface DataItem extends Record<string, unknown> {
    [key: string]: unknown
}

// 数据库名称 与 创建时间
export interface Bootstrap extends Record<string, unknown> {
    [dbName: string]: number
}

export default class IMLocalCache {
    // 数据索引库创建时间
    createTime: number = null

    // 引导数据
    bootstrap: Bootstrap = null

    // 索引map
    indexMap: Bootstrap = null

    // 索引List
    indexList: string[] = []

    // 引导字段
    private _bootstrapName = 'IMLocalCache-bootstrap'

    // 数据库名
    private _dbName = ''

    // 数据库过期时间
    private _expired: number = null

    // 当前创建时间
    private _now = Date.now()

    constructor(dbName: string, {expired = 86400000} = {}) {
        // 1. 检索本地数据库
        // 2. 有则热备数据库
        // 3. 无则创建数据库

        this._dbName = dbName
        this._expired = expired

        this._readBootstrap()
        this._readIndexMap()
        this._readIndexQueue()

        this._checkExpired()
    }

    /**
     * 获取索引队列
     */
    private _readIndexQueue() {
        if (this.indexMap) {
            Object.keys(this.indexMap).forEach(key => this.indexList.push(key))
        }
    }

    /**
     * 获取索引字典
     */
    private _readIndexMap() {
        this.indexMap = (this._rw(this._dbName) as Bootstrap) || {}
    }

    /**
     * 获取本地引导文件
     */
    private _readBootstrap() {
        // 1. 获取数据引导内容
        this.bootstrap = (this._rw(this._bootstrapName) as Bootstrap) || {}
    }

    /**
     *
     * @param key
     * @param value
     * 读写数据
     */
    private _rw(key, value?: unknown): Record<string, unknown> {
        if (value === undefined) {
            return JSON.parse(localStorage.getItem(key)) as DataItem
        } else {
            try {
                const data = JSON.stringify(value)
                localStorage.setItem(key, data)
            } catch (error) {
                console.error(error)
            }
        }
    }

    /**
     * 更新内存与本地储存
     */
    private _update(key: string) {
        const {_dbName} = this
        // 更新引导
        this.bootstrap[_dbName] = Date.now()
        // 更新数据库
        const itemKey = `${_dbName}-${key}`
        const itemUpdateTime = this.indexMap[itemKey]
        this.indexMap[itemKey] = Date.now()
        if (!itemUpdateTime) this.indexList.push(itemKey)

        this._rw(this._bootstrapName, this.bootstrap)
        this._rw(_dbName, this.indexMap)
    }

    /**
     * 检查过期数据
     */
    private _checkExpired() {
        const {_expired, _dbName, indexList} = this
        // 当前库的最后改动时间
        const updateTime = this.bootstrap[_dbName]
        const now = Date.now()
        if (updateTime !== undefined) {
            if (now - updateTime >= _expired) {
                this.rmBatch(indexList)
                this._rw(_dbName, this.indexMap)
            }
        }
    }

    /**
     * 读取消息 / 写入消息
     */
    rw(key: string, value?: unknown): Record<string, unknown> {
        this._update(key)
        const {_dbName} = this
        const localKey = `${_dbName}-${key}`
        return this._rw(localKey, value)
    }

    /**
     * 删除
     */
    rm(key: string): void {
        const {_dbName} = this
        const itemKey = `${_dbName}-${key}`
        // 更新引导
        Reflect.deleteProperty(this.indexMap, itemKey)
        localStorage.removeItem(itemKey)

        this._readIndexQueue()
        this._rw(_dbName, this.indexMap)
    }

    /**
     * 批量删除
     */
    rmBatch(keys: string[]) {
        const {_dbName} = this
        keys.forEach(key => {
            const itemKey = `${_dbName}-${key}`
            Reflect.deleteProperty(this.indexMap, itemKey)
            localStorage.removeItem(itemKey)
        })

        this._readIndexQueue()
        this._rw(_dbName, this.indexMap)
    }
}

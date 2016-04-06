import { _, base, debug } from './utils'
import mock from './mock'

const query = base()
query.Class = class extends query.Class {

    generate() {
        return (this._query = `{${_.mapValid(this._models, model => this.makeQuery(model.build(), this._spaces))}\n}`)
    }

    response() {
        this.generate()

        if (this._debug) {
            debug(this._query, `[query: ${this._models[0]._schema.key}]`)
        }

        if (this._mock) {
            return mock(this._models)
                .delay(this._mockDelay)
                .error(this._error)
                .response()
        }
        return this._api(this._query, {
            path: this._path,
            headers: this._headers
        })
    }
}

export { query as default, query }
Backbone.ListView = Backbone.View.extend({

	items: {},

	constructor: function(options) {

		this.options = options || {}

		_.bindAll(this, 'render', 'close')

		// Must go before event bindings.
		Backbone.View.prototype.constructor.apply(this, arguments)

		if (this.collection)
		{
			this.listenTo(this.collection, 'add', this.addItem)
			this.listenTo(this.collection, 'remove', this.removeItem)
			this.listenTo(this.collection, 'sort reset', this.renderItems)
		}

	},

	getItemView: function() {

		return this.itemView || null

	},

	getItemContainer: function() {

		if (this.itemViewContainer)
		{
			if (this.itemViewContainer instanceof Backbone.$)
				return this.itemViewContainer

			return this.$(this.itemViewContainer)
		}

		return this.$el

	},

	render: function() {

		var template = this.getTemplate()

		if (template)
		{
			var data = this.serializeData()
			var html = template(data)

			this.$el.html(html)
		}

		if (!this.getItemView || !this.getItemView())
			throw new Error('Cannot render list without "itemView"')

		if (!this.getItemContainer() || !this.getItemContainer()[0])
			throw new Error('Cannot render list without "itemViewContainer"')

		if (!this.collection)
			throw new Error('Cannot render list without a collection')

		this.renderItems()
		this.onRender()

		return this

	},

	renderItems: function() {

		var buffer = document.createDocumentFragment()
		var container = this.getItemContainer()

		this.removeAll()

		for (var i in this.collection.models)
		{
			var model = this.collection.models[i]
			var item = this.buildItem(model)

			buffer.appendChild( item.el )
		}

		container.append( buffer )

		this.onRenderItems()

		return this

	},

	onRenderItems: function() {
		// Left empty intentionally.
		// Override as needed.
	},

	buildItem: function(model, options) {

		options || (options = {})

		options.model = model

		var ItemView = this.getItemView()
		var item = new ItemView(options)

		item.render()

		this.items[model.cid] = item

		return item

	},

	addItem: function(model, collection, options) {

		var item = this.buildItem(model)

		// ?? Use index to insert into DOM in correct order?
		//var index = this.collection.indexOf(model)

		var container = this.getItemContainer()

		container.append( item.el )

	},

	onAddItem: function(model) {
		// Left empty intentionally.
		// Override as needed.
	},

	removeItem: function(model) {

		if (this.items[model.cid])
		{
			this.items[model.cid].close()
			delete this.items[model.cid]
		}

		this.onRemoveItem(model)

	},

	onRemoveItem: function(model) {
		// Left empty intentionally.
		// Override as needed.
	},

	isEmpty: function() {

		return !(this.collection.length > 0)

	},

	close: function() {

		Backbone.View.prototype.close.apply(this, arguments)

		this.removeAll()

		return this

	},

	removeAll: function() {

		for (var cid in this.items)
			this.items[cid].close()

		this.items = {}

		return this

	}

})
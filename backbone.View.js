_.extend(Backbone.View.prototype, {

	_rendered: false,

	getTemplate: function() {

		if (this.template)
			return Backbone.TemplateCache.get(this.template)

		return null

	},

	isRendered: function() {

		return this._rendered === true

	},

	render: function() {

		var template = this.getTemplate()

		if (!template)
			throw new Error('Cannot render view without a template')

		var data = this.serializeData()
		var html = template(data)

		this.$el.html(html)

		this._rendered = true

		this.onRender()

		return this

	},

	onRender: function() {
		// Left empty intentionally.
		// Override as needed.
	},

	serializeData: function() {

		if (this.model)
			return this.model.toJSON()

		if (this.collection)
			return {items: this.collection.toJSON()}

		return {}

	},

	close: function() {

		this.onClose()

		// Stop listening to other objects (models, collections, etc).
		this.stopListening()

		// Remove all callbacks bound to the view itself.
		this.unbind()

		// Remove the view from the DOM.
		this.remove()

		return this

	},

	onClose: function() {
		// Left empty intentionally.
		// Override as needed.
	}

})
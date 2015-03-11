Backbone.ItemView = Backbone.View.extend({

	constructor: function(options) {

		this.options = options || {}

		_.bindAll(this, 'render', 'close')

		Backbone.View.prototype.constructor.apply(this, arguments)

	}

})
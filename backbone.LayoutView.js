Backbone.LayoutView = Backbone.View.extend({

	constructor: function(options) {

		this.options = options || {}

		_.bindAll(this, 'render', 'close')

		this.prepareRegions()

		Backbone.View.prototype.constructor.apply(this, arguments)

	},

	prepareRegions: function() {

		for (var name in this.regions)
		{
			if (typeof this[name] != 'undefined')
				throw new Error('Region name conflict: "' + name + '"')

			var parent = this

			var options = {
				el: this.regions[name],
				name: name,
				parentEl: function() {
					return parent.$el
				}
			}

			var region = new Backbone.RegionView(options)

			this[name] = region
		}

	},

	close: function() {

		Backbone.View.prototype.close.apply(this, arguments)

		this.closeRegions()

		return this

	},

	closeRegions: function() {

		for (var name in this.regions)
			if (
				typeof this[name] != 'undefined' &&
				this[name] instanceof Backbone.RegionView
			)
				this[name].close()

		return this

	}

})
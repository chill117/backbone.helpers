Backbone.RegionView = Backbone.View.extend({

	_views: {},

	constructor: function(options) {

		this.options = options || {}

		Backbone.View.prototype.constructor.apply(this, arguments)

	},

	getEl: function() {

		var parentEl = this.options.parentEl
		var selector = this.options.el

		if (typeof parentEl == 'function')
			parentEl = parentEl()

		return parentEl.find(selector)

	},

	show: function(view) {

		var el = this.getEl()
		var uid = view.cid

		this.setElement(el)
		//this.hideAllViews()

		//if (!this._views[uid])
		//{
		//	this.$el.append(view.el)
			this.$el.html(view.el)

			view.render()

		//	this._views[uid] = view
		//}

		//this.showView(uid)

		return this

	},

	showView: function(uid) {

		if (this._views[uid])
			this._views[uid].$el.show()

	},

	hide: function() {

		var el = this.getEl()

		this.setElement(el)
		this.hideAllViews()

		return this
		
	},

	hideAllViews: function() {

		for (var uid in this._views)
			this.hideView(uid)

		return this

	},

	hideView: function(uid) {

		if (this._views[uid])
			this._views[uid].$el.hide()

		return this

	},

	close: function() {

		this.closeAllViews()

		return Backbone.View.prototype.close.call(this)

	},

	closeAllViews: function() {

		for (var uid in this._views)
			this.closeView(uid)

		return this

	},

	closeView: function(uid) {

		if (this._views[uid])
			this._views[uid].close()

		return this

	}

})
Backbone.TemplateCache = {

	cache: {},

	get: function(templateId) {

		if (typeof templateId != 'string')
			throw new Error('Invalid "templateId"; string expected')

		if (this.cache[templateId])
			return this.cache[templateId]

		return this.load(templateId)

	},

	load: function(templateId) {

		if (typeof templateId != 'string')
			throw new Error('Invalid "templateId"; string expected')

		var template = Backbone.$(templateId).html()

		if (!template)
			throw new Error('Failed to load template: "' + templateId + '"')

		template = this.compileTemplate(template)

		this.cache[templateId] = template

		return template

	},

	compileTemplate: function(rawTemplate) {

		Mustache.parse(rawTemplate)

		return function(data) {

			return Mustache.render(rawTemplate, data || {})

		}

	},

	clear: function() {

		this.cache = {}

	}

}
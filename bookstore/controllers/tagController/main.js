const BaseController = require('@partFramework/baseController');
const Tag = require('../../models/tag');

exports.controller = class TagController extends BaseController {
	
	#tagService;
	#utilsService;
	constructor(core, schema, config, tagService, utilsService) {
		super(core, schema, config);
		this.#tagService = tagService;
		this.#utilsService = utilsService;
	}

	async create(body) {
		const tag = new Tag(
			this.#utilsService.getUUID(),
			body.name
		);
		// return this.#atlas.project('Musa_ku_taghi').getTables();
		return this.#tagService.create(tag);
	}

	async readAll() {
		return this.#tagService.readAll();
	}

	async delete(params) {
		return this.#tagService.delete(params.id);
	}
}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));

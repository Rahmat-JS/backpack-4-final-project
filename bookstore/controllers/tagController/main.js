const BaseController = require('@partFramework/baseController');
const Tag = require('../../models/tag');

exports.controller = class TagController extends BaseController {

	#tagService;
	#utilsService;
	constructor(core, schema, config, TagService, UtilsService) {
		super(core, schema, config);
		this.#tagService = TagService;
		this.#utilsService = UtilsService;
	}

	async create(body) {
		const tag = new Tag(
			this.#utilsService.getUUID(),
			body.name
		);
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

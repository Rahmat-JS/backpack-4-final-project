const BaseController = require('@partFramework/baseController');
const Tag = require('../../models/tagModel');

exports.controller = class TagController extends BaseController {

	#tagService;
	constructor(core, schema, config, tagService) {
		super(core, schema, config);
		this.#tagService = tagService;
	}

	async create(body) {
		const tag = new Tag(
			body.name
		);
		return this.#tagService.create(tag);
	}

	async readAll() {
		return this.#tagService.readAll();
	}

	async readById(params) {
		return this.#tagService.readById(params.id);
	}

	async update(body) {
		const udpatedTag = new Tag(body.name);
		return this.#tagService.update(body.id, udpatedTag);
	}

	async delete(params) {
		return this.#tagService.delete(params.id);
	}
}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));

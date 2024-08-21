const BaseController = require('@partFramework/baseController');
const Tag = require('../../models/tagModel');

exports.controller = class TagController extends BaseController {

	#tagService;
	constructor(core, schema, config, tagService) {
		super(core, schema, config);
		this.#tagService = tagService;
	}

	async create(body) {
		const newTag = new Tag(
			body.name
		);
		return await this.#tagService.create(newTag);
	}

	async readAll() {
		return await this.#tagService.readAll();
	}

	async readById(params) {
		return await this.#tagService.readById(params.id);
	}

	async update(body) {
		const udpatedTag = new Tag(body.name);
		return await this.#tagService.update(body.id, udpatedTag);
	}

	async delete(params) {
		return await this.#tagService.delete(params.id);
	}
}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));

run:
	docker-compose -f docker-compose.yaml up --build

# preview docs
docs-preview: docs-dependencies
	pipenv run mike serve

# publish the versioned docs using mkdocs mike util
docs-publish: docs-dependencies
	pipenv run mike deploy v1.0 latest -p --update-aliases

# install dependencies needed to preview and publish docs
docs-dependencies:
	pipenv install --dev
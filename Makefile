run:
	docker-compose -f docker-compose.yaml up --build

# preview docs
docs-preview: docs-dependencies
	pipenv run mike serve

# publish the versioned docs using mkdocs mike util
docs-publish-v1: docs-dependencies
	pipenv run mike deploy v1.0 -p --update-aliases --ignore-remote-status

# publish v2 docs
docs-publish-v2: docs-dependencies
	pipenv run mike deploy v2.0 latest -p --update-aliases --ignore-remote-status
	pipenv run mike set-default latest --ignore-remote-status

# publish all versions
docs-publish-all: docs-publish-v1 docs-publish-v2

# install dependencies needed to preview and publish docs
docs-dependencies:
	pipenv install --dev
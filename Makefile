K8S_DEPLOYMENT_FILE  = kubernetes/application/deployment.yaml
IMAGE_NAME  = ghcr.io/counterapi/docs

.PHONY: cut-tag
cut-tag:
cut-tag:
	@echo "Commit $(version)"
	yq eval '.spec.template.spec.containers[0].image = "$(IMAGE_NAME):$(version)"' -i $(K8S_DEPLOYMENT_FILE)
	npm version $(version) --no-git-tag-version --allow-same-version
	yarn run build
	git commit -m "Bump to $(version)" package.json dist
	git push
	@echo "Cutting $(version)"
	git tag $(version)
	git push origin $(version)

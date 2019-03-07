# 项目名
NAME = frontend_saas_web
# 使用的docker镜像
DOCKER_IMAGE = hub.styd.cn/node:sr-8.12.0

pull-image:
	sudo docker pull $(DOCKER_IMAGE)

# 构建脚本
build:pull-image
	# dns=101.132.119.70 为了修正dns解析
	sudo docker run -i --rm \
	--dns=101.132.119.70 \
	-v $(PWD):/app \
	-v $(NAME)_nm:/app/node_modules \
	$(DOCKER_IMAGE) \
	npm run ci

# 部署脚本
release:

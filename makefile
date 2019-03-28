# 项目名 会作为部署的文件夹
NAME = frontend_saas_web

# 目标主机内容存放目录
CONTENT_PATH = /data/release

# 目标主机 web 服务目录
HTDOCS_PATH = /data/htdocs

# nginx 目录
NGINX_CONF_PATH = /application/nginx/conf

# 使用的docker镜像
DOCKER_IMAGE = hub.styd.cn/node:sr-8.12.0

connect:
	docker run -it --rm \
	--dns=101.132.119.70 \
	-v $(PWD):/app \
	-v $(NAME)_nm:/app/node_modules \
	$(DOCKER_IMAGE)

pull-image:
	docker pull $(DOCKER_IMAGE)

# 构建脚本
build:pull-image
	# dns=101.132.119.70 为了修正dns解析
	# user=1001 使用styd用户来构建文件 否则会产生权限问题
	docker run -i --rm \
	--dns=101.132.119.70 \
	-v $(PWD):/app \
	-v $(NAME)_nm:/app/node_modules \
	$(DOCKER_IMAGE) \
	npm run ci

# 同步文件
# @params {to} 推送服务器主机名
# @example :: make rsync to=saas-dev
rsync:
	ssh $(to) -t "mkdir -p $(CONTENT_PATH)/$(NAME)"
	rsync -auz --exclude=.git $(PWD)/ $(to):$(CONTENT_PATH)/$(NAME)


# 切换软连接
# @params {to} 推送服务器主机名
# @example :: make release to=saas-dev
release:
	ssh $(to) -t "mkdir -p $(HTDOCS_PATH)"
	ssh $(to) -t "ln -sfTv $(CONTENT_PATH)/$(NAME) $(HTDOCS_PATH)/$(NAME)"

clean:
	docker run -i --rm \
	-v $(PWD):/app \
	$(DOCKER_IMAGE) \
	rm -r ./dist/* && \
	rm -r ./docs/.vuepress/dist/*

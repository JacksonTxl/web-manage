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

# 从Jenkins环境变量process.env.GIT_BRANCH中或从git命令中获取分支名称
GIT_BRANCH_ENV = $(if $(GIT_BRANCH),$(GIT_BRANCH),$(shell git rev-parse --abbrev-ref HEAD))


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
	# 传递环境变量 GIT_BRANCH_ENV
	docker run -i --rm \
	--cpus=1 \
	--dns=101.132.119.70 \
	-v $(PWD):/app \
	-v $(NAME)_nm:/app/node_modules \
	-e GIT_BRANCH=$(GIT_BRANCH_ENV) \
	$(DOCKER_IMAGE) \
	npm run ci

# 同步文件
# @params {to} 推送服务器主机名
# @example :: make rsync to=saas-dev
rsync:
	ssh $(to) -t "mkdir -p $(CONTENT_PATH)/$(NAME)"
	rsync -auz --exclude=.git $(PWD)/ $(to):$(CONTENT_PATH)/$(NAME)

# 同步文件到分支目录
# @example :: make rsync to=app-dev2
rsync-branch:
	ssh $(to) -t "mkdir -p $(CONTENT_PATH)/$(NAME)_branches/$(GIT_BRANCH_ENV)"
	rsync -auz --exclude=.git $(PWD)/ $(to):$(CONTENT_PATH)/$(NAME)_branches/$(GIT_BRANCH_ENV)

# 切换软连接
# @params {to} 推送服务器主机名
# @example :: make release to=saas-dev
release:
	ssh $(to) -t "mkdir -p $(HTDOCS_PATH)"
	ssh $(to) -t "ln -sfTv $(CONTENT_PATH)/$(NAME) $(HTDOCS_PATH)/$(NAME)"

# 切换项目分支软链接
release-branch:
	ssh $(to) -t "mkdir -p $(HTDOCS_PATH)/$(NAME)_branches"
	ssh $(to) -t "ln -sfTv $(CONTENT_PATH)/$(NAME)_branches/$(GIT_BRANCH_ENV) $(HTDOCS_PATH)/$(NAME)_branches/$(GIT_BRANCH_ENV)"

clean1:
	sudo docker run -i --rm \
	-v $(PWD):/app \
	$(DOCKER_IMAGE) rm -r ./dist/

clean2:
	sudo docker run -i --rm \
	-v $(PWD):/app \
	$(DOCKER_IMAGE) rm -r ./docs/.vuepress/dist/

clean: clean1

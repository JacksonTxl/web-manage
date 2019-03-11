# 说明该镜像以哪个镜像为基础
FROM centos:latest

# 构建者的基本信息
MAINTAINER zlx

# 在build这个镜像时执行的操作
RUN yum update
RUN yum install -y git

# 拷贝本地文件到镜像中
COPY ./* /usr/share/zsh/
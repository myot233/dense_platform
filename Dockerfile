FROM node:latest
LABEL authors="myot233"

COPY  ./ /dense_platform
WORKDIR dense_platform
RUN ["rm","-r","node_modules"] 
RUN ["yarn","--registry=https://registry.npmmirror.com/"] 
CMD ["yarn","run","dev"] 
#CMD npm install --registry=https://registry.npm.taobao.org
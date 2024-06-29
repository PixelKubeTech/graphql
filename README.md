docker network create graphql-network

docker run -d --name graphql-server --network graphql-network -p 4000:4000 graphql

docker run -d --name nginx-proxy --network graphql-network -p 80:80 -v /path/to/nginx.conf:/etc/nginx/conf.d/default.conf:ro nginx



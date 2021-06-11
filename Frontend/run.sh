rm -rf build
npm run build

docker kill codiba && docker rm codiba
docker build . -t hanrasan/codiba:latest && docker run -d -p 80:3000 --name codiba hanrasan/codiba:latest

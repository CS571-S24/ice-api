build
```bash
docker build . -t ctnelson1997/cs571-s24-ice-api
docker push ctnelson1997/cs571-s24-ice-api
```

run
```bash
docker pull ctnelson1997/cs571-s24-ice-api
docker run --name=cs571_s24_ice_api -d --restart=always -p 59999:59999 -v /cs571/s24/ice:/cs571 ctnelson1997/cs571-s24-ice-api
```

run fa
```bash
docker pull ctnelson1997/cs571-s24-ice-api
docker run --name=cs571_fa_s24_ice_api -d --restart=always -p 58888:59999 -v /cs571_fa/s24/ice:/cs571 ctnelson1997/cs571-s24-ice-api
```

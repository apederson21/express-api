echo "generating new cert..."
openssl \
    req -x509 \
    -sha256 \
    -nodes \
    -newkey \
    rsa:2048 \
    -days 365 \
    -keyout server.key \
    -out server.crt

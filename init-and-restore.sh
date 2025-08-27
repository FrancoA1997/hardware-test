#!/bin/bash

# 1. Espera a que el servidor de MongoDB esté en ejecución en mongodb.
echo "Waiting for MongoDB to start on mongodb:27017..."

until mongosh --quiet --host mongodb --port 27017 --eval "db.runCommand({ ping: 1 }).ok" | grep 1 &>/dev/null; do
  sleep 1
done

echo "MongoDB has started successfully"

echo "Initiating MongoDB replica set..."

mongosh -u root -p root --host mongodb --port 27017 --eval "
  rs.initiate({
    _id: 'rs0',
    members: [
      {
        _id: 0,
        host: 'mongodb:27017'
      },
    ]
  })
"

# 4. Restaura los datos del backup.
echo "Iniciando la restauración de datos..."
mongorestore --host mongodb --authenticationDatabase admin -u root -p root --drop /data/backup/my_backup

echo "Restauración completada."
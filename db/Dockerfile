FROM postgres:14




COPY 0_schema.sql /docker-entrypoint-initdb.d/
COPY 1_dump.sql /docker-entrypoint-initdb.d/

RUN apt-get update && apt-get -y install git build-essential postgresql-server-dev-14

RUN git clone https://github.com/citusdata/pg_cron.git
RUN cd pg_cron && make && make install



# add the 'postgres' admin role
USER postgres

# expose Postgres port
EXPOSE 5432

CMD sed -i "s/#shared_preload_libraries = ''/shared_preload_libraries = 'pg_cron'/g" /var/lib/postgresql/data/postgresql.conf && echo cron.database_name = 'thinktogether' >> /var/lib/postgresql/data/postgresql.conf && postgres
# bind mount Postgres volumes for persistent data
#VOLUME ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

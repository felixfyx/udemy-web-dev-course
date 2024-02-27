###
# This is created because I was using docker containers for my postgres and 
# pgadmin
###
import psycopg2
import os

conn = psycopg2.connect(
    host="localhost",
    dbname="world",
    user="felixfoo",
)

print("Currently connected")
cur = conn.cursor()

# Debug
print(os.getcwd())

with open('./33 Postgres/countries.csv', 'r') as f:
    next(f) # Skip header row
    cur.copy_expert('COPY countries FROM stdin WITH CSV', f)

conn.commit()

print("Successfully added into list")
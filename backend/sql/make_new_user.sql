CREATE USER nodeuser@localhost identified by 'nodeuser@1234';
GRANT ALL privileges on node.* to nodeuser@localhost;
ALTER USER 'nodeuser'@localhost IDENTIFIED WITH mysql_native_password BY 'nodeuser@1234';

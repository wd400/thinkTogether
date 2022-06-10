create extension pg_trgm;
CREATE EXTENSION pg_cron;

SELECT set_limit(0);


CREATE TABLE users (
    userid SERIAL UNIQUE NOT NULL,
    email VARCHAR(35) UNIQUE NOT NULL,
    pseudo VARCHAR(35) UNIQUE NOT NULL,
    hash VARCHAR(35) NOT NULL,
    score INT NOT NULL DEFAULT 0,
    badBehaviour INT NOT NULL DEFAULT 0,
    banned BOOLEAN NOT NULL DEFAULT FALSE,
    
    PRIMARY KEY (userid,email,pseudo)
); 

CREATE TABLE tokens (
userid SERIAL NOT NULL,
token VARCHAR(100) NOT NULL,
created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (userid,token),
    FOREIGN KEY(userid) 
        REFERENCES users(userid)
        ON DELETE CASCADE
);

 
 
CREATE TABLE board (
    boardid SERIAL UNIQUE NOT NULL,
    userid SERIAL NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL DEFAULT '',
    public BOOL NOT NULL DEFAULT FALSE,
    anonym BOOL NOT NULL DEFAULT FALSE,
    category int NOT NULL DEFAULT 0,
    graphxml VARCHAR(10000000) NOT NULL DEFAULT '<root></root>',
    textcontent VARCHAR(10000000) NOT NULL DEFAULT '',
    lastmodif TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    PRIMARY KEY (boardid),
    FOREIGN KEY(userid) 
        REFERENCES users(userid)
        ON DELETE CASCADE
) ;

 CREATE index "user_board_idx" on public."board"("userid");
  CREATE index "categort_board_idx" on public."board"("category");

ALTER TABLE board
    ADD COLUMN textsearchable tsvector
               GENERATED ALWAYS AS (
         setweight(to_tsvector('english', coalesce(title, '')), 'A') || 
         setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
         setweight(to_tsvector('english', coalesce(textcontent, '')), 'C') )  STORED;

CREATE INDEX textsearch_idx ON board USING GIN(textsearchable);


CREATE MATERIALIZED VIEW words AS
SELECT word FROM ts_stat('SELECT to_tsvector(''simple'', title) || to_tsvector(''simple'', description) || to_tsvector(''simple'', textcontent)  FROM board');
CREATE INDEX words_idx ON words USING GIN (word gin_trgm_ops);



CREATE TABLE collaboration (
    boardid SERIAL NOT NULL,
    invited SERIAL NOT NULL,
    PRIMARY KEY (boardid,invited),
    FOREIGN KEY(invited) 
        REFERENCES users(userid)
        ON DELETE CASCADE,
    FOREIGN KEY(boardid) 
        REFERENCES board(boardid)
        ON DELETE CASCADE
 );
 
 CREATE index "user_collab_idx" on public."collaboration"("invited");
 
 
CREATE TABLE report (
    reportid SERIAL UNIQUE NOT NULL,
    ressourceid VARCHAR(255) NOT NULL DEFAULT 'user',
    reporter SERIAL NOT NULL,
    reported SERIAL NOT NULL,
    reason INT NOT NULL,
    detail VARCHAR(255) NOT NULL DEFAULT '',
    time timestamp NOT NULL DEFAULT NOW()
   );   
    

CREATE TABLE suggestion (
    suggestionid SERIAL UNIQUE NOT NULL,
    boardid SERIAL NOT NULL,
    writer SERIAL NOT NULL,
    suggestion VARCHAR(65535) NOT NULL DEFAULT '',
    caseid INT NOT NULL,
    anonym BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY(boardid) 
        REFERENCES board(boardid)
        ON DELETE CASCADE,
    FOREIGN KEY(writer) 
        REFERENCES users(userid)
        ON DELETE CASCADE
);

CREATE index "board_suggestion_idx" on public."suggestion"("boardid");



CREATE OR REPLACE FUNCTION newboard(
newuserid int,
newtitle character varying(100),
newdescription character varying(200),
newpublic boolean,
newanonym boolean,
cat int,
 OUT ret_id int ) AS $$
BEGIN
    IF ((SELECT COUNT(*) FROM board WHERE  board.userid=newuserid ) < 10) THEN
   INSERT INTO board(userid, title, description,public,anonym,category,lastmodif) VALUES (newuserid,newtitle,newdescription,newpublic,newanonym,cat,CURRENT_TIMESTAMP) RETURNING boardid  INTO  ret_id; 
  END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION invite(
newownerid int,
newinvited character varying(35),
newboardid int) RETURNS INT AS $$
Declare invit int;
BEGIN
  IF (select exists(SELECT 1 from board where boardid=newboardid and userid=newownerid)) THEN
  
  SELECT userid into invit from users where pseudo=newinvited;

  IF (invit IS NOT NULL) THEN 	
    INSERT INTO collaboration (boardid, invited) VALUES (newboardid,invit);
	
    RETURN  invit;
    END IF;
  END IF;
  RETURN null;
END;

$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION listinvited(
newuserid int,
newboardid int) RETURNS TABLE (userid INT,pseudo character varying(35)) AS $$
BEGIN

	IF (select exists(SELECT 1 from board where board.boardid=newboardid and board.userid=newuserid)) THEN
	
	  RETURN QUERY SELECT users.userid,users.pseudo FROM  users,collaboration WHERE users.userid=collaboration.invited and collaboration.boardid=newboardid;
	END IF;
END;

$$ LANGUAGE plpgsql;





SELECT cron.schedule('*/5 * * * *', 'REFRESH MATERIALIZED VIEW words');
SELECT cron.schedule('0 0 1 * *', 'DELETE FROM tokens where created < now() - interval ''1 month'' ');


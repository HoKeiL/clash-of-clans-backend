DROP TABLE IF EXISTS teams RESTRICT;

CREATE TABLE teams (
id SERIAL PRIMARY KEY,
  teamname TEXT NOT NULL UNIQUE,
  teamcaptain TEXT NOT NULL,
  teamplayer1 TEXT NOT NULL,
  teamplayer2 TEXT NOT NULL,
  teamplayer3 TEXT NOT NULL,
  teamplayer4 TEXT NOT NULL,
  teamplayer5 TEXT NOT NULL,
  teamplayer6 TEXT NOT NULL
);
INSERT INTO teams(teamname, teamcaptain, teamplayer1,teamplayer2,teamplayer3,teamplayer4,teamplayer5,teamplayer6) VALUES('test team', 'Gav', 'Kelvin','Adrian', 'James', 'HK','Vanessa','Henry') RETURNING *,
            
SELECT * FROM teams;

DROP TABLE IF EXISTS
  orderOfPlay RESTRICT;

CREATE TABLE
  orderOfPlay (
    id SERIAL PRIMARY KEY,
    teamname TEXT REFERENCES teams(teamname),
    Game1Player1 TEXT NOT NULL,
    Game1Player2 TEXT NOT NULL,
    Game2Player1 TEXT NOT NULL,
    Game2Player2 TEXT NOT NULL,
    Game3Player1 TEXT NOT NULL,
    Game3Player2 TEXT NOT NULL,
    Game4Player1 TEXT NOT NULL,
    Game4Player2 TEXT NOT NULL,
    Game5Player1 TEXT NOT NULL,
    Game5Player2 TEXT NOT NULL,
    Game6Player1 TEXT NOT NULL,
    Game6Player2 TEXT NOT NULL,
    Game7Player1 TEXT NOT NULL,
    Game7Player2 TEXT NOT NULL
  );
  
  SELECT * FROM orderofplay
INSERT INTO orderOfPlay(teamname, Game1Player1, Game1Player2, Game2Player1, Game2Player2, Game3Player1, Game3Player2, Game4Player1, Game4Player2, Game5Player1, Game5Player2,Game6Player1,Game6Player2, Game7Player1,Game7Player2) VALUES() RETURNING *,
            
SELECT * FROM orderOfPlay;




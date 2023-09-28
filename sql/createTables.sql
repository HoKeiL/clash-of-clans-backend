DROP TABLE IF EXISTS teams RESTRICT;

CREATE TABLE teams (
id SERIAL PRIMARY KEY,
  teamname TEXT NOT NULL,
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



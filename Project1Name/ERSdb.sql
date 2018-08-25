CREATE SCHEMA ers
    AUTHORIZATION postgres;
    
CREATE TABLE ers.users
(
    user_id serial NOT NULL,
    username character varying(20) NOT NULL,
    user_pass character varying(20) NOT NULL,
    user_fname character varying(20) NOT NULL,
    user_lname character varying(20),
    user_email character varying(30),
    user_role character varying (10) NOT NULL,
    CONSTRAINT unique_usernames UNIQUE (username),
    PRIMARY KEY (user_id)
);

CREATE TABLE ers.reimbursements
(
    reimb_id serial NOT NULL,
    reimb_submitted timestamp NOT NULL,
    reimb_resovled timestamp,
    reimb_description character varying(250),
    reimb_receipt character varying(250),
    reimb_author integer REFERENCES ers.users(user_id)ON DELETE CASCADE,
    reimb_resolver integer REFERENCES ers.users(user_id)ON DELETE CASCADE,
    reimb_status character varying(10),
    reimb_type character varying(8),
    PRIMARY KEY (reimb_id)
);


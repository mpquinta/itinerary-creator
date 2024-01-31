--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.itinerary DROP CONSTRAINT itinerary_user_id_fkey;
ALTER TABLE ONLY public.itinerary_entries DROP CONSTRAINT itinerary_entries_listing_id_fkey;
ALTER TABLE ONLY public.itinerary_entries DROP CONSTRAINT itinerary_entries_itinerary_id_fkey;
ALTER TABLE ONLY public.flight_deals DROP CONSTRAINT flight_deals_user_id_fkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.listings DROP CONSTRAINT listings_pkey;
ALTER TABLE ONLY public.itinerary DROP CONSTRAINT itinerary_pkey;
ALTER TABLE ONLY public.itinerary_entries DROP CONSTRAINT itinerary_entries_pkey;
ALTER TABLE ONLY public.flight_deals DROP CONSTRAINT flight_deals_pkey;
ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
ALTER TABLE public.listings ALTER COLUMN listing_id DROP DEFAULT;
ALTER TABLE public.itinerary_entries ALTER COLUMN itinerary_entry_id DROP DEFAULT;
ALTER TABLE public.itinerary ALTER COLUMN itinerary_id DROP DEFAULT;
ALTER TABLE public.flight_deals ALTER COLUMN flight_deal_id DROP DEFAULT;
DROP SEQUENCE public.users_user_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.listings_listing_id_seq;
DROP TABLE public.listings;
DROP SEQUENCE public.itinerary_itinerary_id_seq;
DROP SEQUENCE public.itinerary_entries_itinerary_entry_id_seq;
DROP TABLE public.itinerary_entries;
DROP TABLE public.itinerary;
DROP SEQUENCE public.flight_deals_flight_deal_id_seq;
DROP TABLE public.flight_deals;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: flight_deals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.flight_deals (
    flight_deal_id integer NOT NULL,
    user_id integer,
    city_fr character varying,
    city_to character varying,
    flight_price integer,
    departure_date timestamp without time zone,
    return_date timestamp without time zone,
    carrier character varying
);


--
-- Name: flight_deals_flight_deal_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.flight_deals_flight_deal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: flight_deals_flight_deal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.flight_deals_flight_deal_id_seq OWNED BY public.flight_deals.flight_deal_id;


--
-- Name: itinerary; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.itinerary (
    itinerary_id integer NOT NULL,
    name character varying,
    user_id integer,
    likes integer
);


--
-- Name: itinerary_entries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.itinerary_entries (
    itinerary_entry_id integer NOT NULL,
    itinerary_id integer,
    listing_id integer,
    scheduled_day timestamp without time zone
);


--
-- Name: itinerary_entries_itinerary_entry_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.itinerary_entries_itinerary_entry_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: itinerary_entries_itinerary_entry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.itinerary_entries_itinerary_entry_id_seq OWNED BY public.itinerary_entries.itinerary_entry_id;


--
-- Name: itinerary_itinerary_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.itinerary_itinerary_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: itinerary_itinerary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.itinerary_itinerary_id_seq OWNED BY public.itinerary.itinerary_id;


--
-- Name: listings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.listings (
    listing_id integer NOT NULL,
    yelp_id character varying NOT NULL,
    title character varying NOT NULL,
    city character varying NOT NULL,
    state character varying NOT NULL,
    zipcode integer NOT NULL,
    photo_url character varying NOT NULL,
    yelp_url character varying NOT NULL
);


--
-- Name: listings_listing_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.listings_listing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: listings_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.listings_listing_id_seq OWNED BY public.listings.listing_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    fname character varying NOT NULL,
    lname character varying NOT NULL,
    email character varying,
    username character varying,
    password character varying NOT NULL
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: flight_deals flight_deal_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flight_deals ALTER COLUMN flight_deal_id SET DEFAULT nextval('public.flight_deals_flight_deal_id_seq'::regclass);


--
-- Name: itinerary itinerary_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itinerary ALTER COLUMN itinerary_id SET DEFAULT nextval('public.itinerary_itinerary_id_seq'::regclass);


--
-- Name: itinerary_entries itinerary_entry_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itinerary_entries ALTER COLUMN itinerary_entry_id SET DEFAULT nextval('public.itinerary_entries_itinerary_entry_id_seq'::regclass);


--
-- Name: listings listing_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listings ALTER COLUMN listing_id SET DEFAULT nextval('public.listings_listing_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: flight_deals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.flight_deals (flight_deal_id, user_id, city_fr, city_to, flight_price, departure_date, return_date, carrier) FROM stdin;
1	1	San Francisco	San Diego	248	2024-01-30 19:49:27.200973	2024-01-31 19:49:27.200986	Alaska Airlines
2	1	San Francisco	San Diego	304	2024-01-30 19:49:27.201107	2024-01-31 19:49:27.201109	Alaska Airlines
3	1	San Francisco	San Diego	414	2024-01-30 19:49:27.201197	2024-01-31 19:49:27.201198	Alaska Airlines
4	1	San Francisco	San Diego	473	2024-01-30 19:49:27.20128	2024-01-31 19:49:27.201281	Alaska Airlines
5	1	San Francisco	San Diego	250	2024-01-30 19:49:27.20136	2024-01-31 19:49:27.201362	Alaska Airlines
6	2	San Francisco	San Diego	393	2024-01-30 19:49:27.201476	2024-01-31 19:49:27.201478	Alaska Airlines
7	2	San Francisco	San Diego	122	2024-01-30 19:49:27.201557	2024-01-31 19:49:27.201558	Alaska Airlines
8	2	San Francisco	San Diego	348	2024-01-30 19:49:27.201637	2024-01-31 19:49:27.201638	Alaska Airlines
9	2	San Francisco	San Diego	269	2024-01-30 19:49:27.201717	2024-01-31 19:49:27.201719	Alaska Airlines
10	2	San Francisco	San Diego	194	2024-01-30 19:49:27.20181	2024-01-31 19:49:27.201812	Alaska Airlines
11	3	San Francisco	San Diego	297	2024-01-30 19:49:27.201923	2024-01-31 19:49:27.201924	Alaska Airlines
12	3	San Francisco	San Diego	219	2024-01-30 19:49:27.202005	2024-01-31 19:49:27.202006	Alaska Airlines
13	3	San Francisco	San Diego	234	2024-01-30 19:49:27.202083	2024-01-31 19:49:27.202084	Alaska Airlines
14	3	San Francisco	San Diego	267	2024-01-30 19:49:27.202168	2024-01-31 19:49:27.20217	Alaska Airlines
15	3	San Francisco	San Diego	461	2024-01-30 19:49:27.202234	2024-01-31 19:49:27.202235	Alaska Airlines
\.


--
-- Data for Name: itinerary; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.itinerary (itinerary_id, name, user_id, likes) FROM stdin;
1	Favorites	1	0
2	Favorites	1	0
3	Favorites	1	0
4	Favorites	1	0
5	Favorites	1	0
6	Favorites	2	0
7	Favorites	2	0
8	Favorites	2	0
9	Favorites	2	0
10	Favorites	2	0
11	Favorites	3	0
12	Favorites	3	0
13	Favorites	3	0
14	Favorites	3	0
15	Favorites	3	0
\.


--
-- Data for Name: itinerary_entries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.itinerary_entries (itinerary_entry_id, itinerary_id, listing_id, scheduled_day) FROM stdin;
1	1	11	2022-08-04 01:00:00
2	2	21	2022-08-04 02:00:00
3	3	5	2022-08-04 03:00:00
4	4	15	2022-08-04 04:00:00
5	5	9	2022-08-04 05:00:00
6	1	4	2022-08-04 01:00:00
7	2	23	2022-08-04 02:00:00
8	3	3	2022-08-04 03:00:00
9	4	15	2022-08-04 04:00:00
10	5	22	2022-08-04 05:00:00
11	1	20	2022-08-04 01:00:00
12	2	18	2022-08-04 02:00:00
13	3	6	2022-08-04 03:00:00
14	4	12	2022-08-04 04:00:00
15	5	7	2022-08-04 05:00:00
\.


--
-- Data for Name: listings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.listings (listing_id, yelp_id, title, city, state, zipcode, photo_url, yelp_url) FROM stdin;
1	GrVZzAPrdMji66PfJ0fRXg	Mr. Hen Noodles House	San Francisco	CA	94114	https://s3-media4.fl.yelpcdn.com/bphoto/IL1kYM1va7LKlbNv7gvRNQ/o.jpg	https://www.yelp.com/biz/mr-hen-noodles-house-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
2	reXWH9Wo0ZTOuQsTMNOSxg	Fable	San Francisco	CA	94114	https://s3-media2.fl.yelpcdn.com/bphoto/ySVoH8IHIbB4WNgVVirTGw/o.jpg	https://www.yelp.com/biz/fable-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
3	ZSzXw0NgJTyOzcHwKY5eMA	Blind Butcher	San Francisco	CA	94114	https://s3-media4.fl.yelpcdn.com/bphoto/kpN_8IX_eSVwOETLJu-8pQ/o.jpg	https://www.yelp.com/biz/blind-butcher-san-francisco-2?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
4	2aW4J6wnsJ2vgcYLRoo5og	Hulu Wa China Bistro	San Francisco	CA	94114	https://s3-media3.fl.yelpcdn.com/bphoto/JSWo4TofLV5wKt-1UrsywA/o.jpg	https://www.yelp.com/biz/hulu-wa-china-bistro-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
5	bm7sU0_SNY0k2ZX65YqTsA	Wasabi Bistro	San Francisco	CA	94114	https://s3-media1.fl.yelpcdn.com/bphoto/RtwSVxVChNUj4UOOX5OoZQ/o.jpg	https://www.yelp.com/biz/wasabi-bistro-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
6	U7dwiRFypICr7gXvYOgMGw	Vulcan Stairway	San Francisco	CA	94114	https://s3-media3.fl.yelpcdn.com/bphoto/ouDnJ2X-kjgRtQP6R-tUyQ/o.jpg	https://www.yelp.com/biz/vulcan-stairway-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
7	LXLS1JJfPZCFWefStzJXQw	The Castro District	San Francisco	CA	94114	https://s3-media2.fl.yelpcdn.com/bphoto/V2EkwK2NwGFqCoRfkIKbDQ/o.jpg	https://www.yelp.com/biz/the-castro-district-san-francisco-2?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
8	a-90RJm-jT1trFmtUph4cA	The Poppy Gate	San Francisco	CA	94114	https://s3-media1.fl.yelpcdn.com/bphoto/hewyHwvBzk8TjjadoX_jmQ/o.jpg	https://www.yelp.com/biz/the-poppy-gate-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
9	3oL4tXukIXUNAB2rsfHKDg	Hibernia Beach	San Francisco	CA	94114	https://s3-media4.fl.yelpcdn.com/bphoto/AxLLABszHS6DSBH-zA31LA/o.jpg	https://www.yelp.com/biz/hibernia-beach-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
10	1FZM1wOnjMYg0KPSD9qTjg	Poesia	San Francisco	CA	94114	https://s3-media1.fl.yelpcdn.com/bphoto/DiUrMLzVkRNiyd35e2hUIA/o.jpg	https://www.yelp.com/biz/poesia-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
11	ms_7zCJhwaHM9zyyosSrwA	Live It Up Charter	Sausalito	CA	94965	https://s3-media1.fl.yelpcdn.com/bphoto/BCPuQXrByuBU8L8BbTziuQ/o.jpg	https://www.yelp.com/biz/live-it-up-charter-sausalito?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
12	7lpgrZ7dbo4yrFYH5S1udg	Napa Valley Trail Rides	Napa	CA	94558	https://s3-media3.fl.yelpcdn.com/bphoto/QhygoMJEa8wTLbUpFdNZ1A/o.jpg	https://www.yelp.com/biz/napa-valley-trail-rides-napa?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
13	am3O7pQ_y9h9t26cv7Wrrg	Free SF Tour	San Francisco	CA	94102	https://s3-media2.fl.yelpcdn.com/bphoto/ukWKEvlHgoYuC_JImbVhzQ/o.jpg	https://www.yelp.com/biz/free-sf-tour-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
14	zaw5vDV3VwNlCYmHLWPlOA	Million Services Limousine	San Francisco	CA	94114	https://s3-media1.fl.yelpcdn.com/bphoto/-jppEMLYCWCZMy-wZW6P4g/o.jpg	https://www.yelp.com/biz/million-services-limousine-san-francisco-3?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
15	Se_QTs0GdG7KNEt5jSlriQ	Five Emerald Limousine	San Francisco	CA	94111	https://s3-media4.fl.yelpcdn.com/bphoto/t2M332uV3btoFycbpvLUuA/o.jpg	https://www.yelp.com/biz/five-emerald-limousine-san-francisco-4?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
16	1sUCjMNaO57_Mji--mOCxA	Local Take	San Francisco	CA	94114	https://s3-media2.fl.yelpcdn.com/bphoto/ItoFyWITlGtmtePZSYypHg/o.jpg	https://www.yelp.com/biz/local-take-san-francisco-5?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
17	naSquvcFb3j3dgPYnHuk0w	Cliff's Variety	San Francisco	CA	94114	https://s3-media3.fl.yelpcdn.com/bphoto/Yt63_WJ4rHBIvED9yqd6WA/o.jpg	https://www.yelp.com/biz/cliffs-variety-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
18	6tVmZNKf7v06mj3zs074fQ	Outfit Castro	San Francisco	CA	94114	https://s3-media1.fl.yelpcdn.com/bphoto/O95sVWD-PdFgJymMG1BEMw/o.jpg	https://www.yelp.com/biz/outfit-castro-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
19	zUTSPZSl2r1DzSXNwadpZQ	Welcome Castro	San Francisco	CA	94114	https://s3-media2.fl.yelpcdn.com/bphoto/Z3iUxF1D0ICLu0lcI_hNcQ/o.jpg	https://www.yelp.com/biz/welcome-castro-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
20	6ivi79e_3NxGaBSAu3cyjg	Knobs	San Francisco	CA	94041	https://s3-media2.fl.yelpcdn.com/bphoto/Z_I34zvYWOQV5-9l75Lb5A/o.jpg	https://www.yelp.com/biz/knobs-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
21	5yZRLGlJ8KYWPTv925uskg	Seward Mini Park	San Francisco	CA	94114	https://s3-media1.fl.yelpcdn.com/bphoto/YqEm1rWS59rGrZrLqbveKw/o.jpg	https://www.yelp.com/biz/seward-mini-park-san-francisco-2?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
22	4pJDRTgAP3TdPNoAFq5-qg	Eureka Valley Dog Park	San Francisco	CA	94114	https://s3-media4.fl.yelpcdn.com/bphoto/xcoczs9Rj_u5dvXNuV2EkQ/o.jpg	https://www.yelp.com/biz/eureka-valley-dog-park-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
23	l6_rrAu2xEqETBMabUQO1w	State Street Park	San Francisco	CA	94114	https://s3-media3.fl.yelpcdn.com/bphoto/IuLT7d_JiF5hcF9sBEUZoQ/o.jpg	https://www.yelp.com/biz/state-street-park-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
24	2tyUyWTHNUZCe61XKXmEUQ	Saturn Street Stairway	San Francisco	CA	94114	https://s3-media4.fl.yelpcdn.com/bphoto/cyQRmWPSipZ3987ZTELkMw/o.jpg	https://www.yelp.com/biz/saturn-street-stairway-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
25	-g1C3Ab3O0yLdiRFBY8SAw	Noe & Beaver Mini Park Community Garden	San Francisco	CA	94114	https://s3-media4.fl.yelpcdn.com/bphoto/jfPdMvUABpahXMxUtVFPug/o.jpg	https://www.yelp.com/biz/noe-and-beaver-mini-park-community-garden-san-francisco?adjust_creative=cG0QjMTTCw8U6VBwuNwjDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cG0QjMTTCw8U6VBwuNwjDw
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, fname, lname, email, username, password) FROM stdin;
1	First 1	Last 1	user1@test.com	user1	test
2	First 2	Last 2	user2@test.com	user2	test
3	First 3	Last 3	user3@test.com	user3	test
\.


--
-- Name: flight_deals_flight_deal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.flight_deals_flight_deal_id_seq', 15, true);


--
-- Name: itinerary_entries_itinerary_entry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.itinerary_entries_itinerary_entry_id_seq', 15, true);


--
-- Name: itinerary_itinerary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.itinerary_itinerary_id_seq', 15, true);


--
-- Name: listings_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.listings_listing_id_seq', 25, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: flight_deals flight_deals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flight_deals
    ADD CONSTRAINT flight_deals_pkey PRIMARY KEY (flight_deal_id);


--
-- Name: itinerary_entries itinerary_entries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itinerary_entries
    ADD CONSTRAINT itinerary_entries_pkey PRIMARY KEY (itinerary_entry_id);


--
-- Name: itinerary itinerary_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itinerary
    ADD CONSTRAINT itinerary_pkey PRIMARY KEY (itinerary_id);


--
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (listing_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: flight_deals flight_deals_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flight_deals
    ADD CONSTRAINT flight_deals_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: itinerary_entries itinerary_entries_itinerary_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itinerary_entries
    ADD CONSTRAINT itinerary_entries_itinerary_id_fkey FOREIGN KEY (itinerary_id) REFERENCES public.itinerary(itinerary_id);


--
-- Name: itinerary_entries itinerary_entries_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itinerary_entries
    ADD CONSTRAINT itinerary_entries_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(listing_id);


--
-- Name: itinerary itinerary_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itinerary
    ADD CONSTRAINT itinerary_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--


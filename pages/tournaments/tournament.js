import { useRouter } from "next/router"
import Head from 'next/head'
import { Banner } from "../../src/components/Banner"
import { Container } from "@chakra-ui/layout"
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, useDisclosure, Grid, Flex, Avatar, Heading, Box } from "@chakra-ui/react"
import { Schedule } from "../../src/components/Schedule"
import { AddNewDate } from "../../src/components/Modals"
import { Standings } from "../../src/components/Standings"
import Player from "../../src/components/Player"

const list = [
    {
        name: 'Teamwork Tournament 2020',
        date: '24 June - 15 July',
        champion: 'LeeSin',
    },
    {
        name: 'LEC Spring 2020',
        date: '24 June - 15 July',
        champion: 'Gwen',
    },
    {
        name: 'LEC Summer 2020',
        date: '24 June - 15 July',
        champion: 'Jhin',
    }
]

const matchDates = [
    {
        date: '24 June',
        format: 'Group Stage BO1',
        matches: [
            {
                time: '2pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Nihilist Won'
            },
            {
                time: '3pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Stoics Won'
            },
            {
                time: '4pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Live'
            },
            {
                time: '5pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Match starts in 2 hours'
            },
            {
                time: '6pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: ''
            },
            {
                time: '7pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Cancelled'
            },
        ]
    },
    {
        date: '25 June',
        format: 'Semi-Final BO3',
        matches: [
            {
                time: '2pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Nihilist Won'
            },
            {
                time: '3pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Stoics Won'
            },
            {
                time: '4pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Live'
            },
            {
                time: '5pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Match starts in 2 hours'
            },
            {
                time: '6pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: ''
            },
            {
                time: '7pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Cancelled'
            },
        ]
    },
]

const standings = [
    { team: 'Astralis', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FAST-FullonDark.png', win: '5', lose: '6' },
    { team: 'Rogue', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FRogue_FullColor2.png', win: '8', lose: '3' },
    { team: 'Fnatic', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591295307_FnaticFNC-01-FullonDark.png', win: '8', lose: '3' },
    { team: 'Misfits Gaming', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591419157_MisfitsMSF-01-FullonDark.png', win: '8', lose: '4' },
    { team: 'MAD Lions', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591395339_MadLionsMAD-01-FullonDark.png', win: '7', lose: '4' },
    { team: 'G2 Esports', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FG2-FullonDark.png', win: '6', lose: '5' },
    { team: 'Team Vitality', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FVitality-logo-color-outline-rgb.png', win: '5', lose: '6' },
    { team: 'EXCEL', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FExcel_FullColor2.png', win: '4', lose: '8' },
    { team: 'Schalke 04', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FS04_Standard_Logo1.png', win: '3', lose: '8' },
    { team: 'SK Gaming', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FSK_FullColor.png', win: '2', lose: '9' }
].sort((a, b) => (b.win - b.lose) - (a.win - a.lose));

const users = [{ "gender": "male", "name": { "title": "Mr", "first": "Dwight", "last": "Mason" }, "location": { "street": { "number": 1722, "name": "Samaritan Dr" }, "city": "Overland Park", "state": "South Dakota", "country": "United States", "postcode": 80839, "coordinates": { "latitude": "89.5508", "longitude": "-120.9798" }, "timezone": { "offset": "+10:00", "description": "Eastern Australia, Guam, Vladivostok" } }, "email": "dwight.mason@example.com", "login": { "uuid": "48f2badc-1275-44fa-b5a1-050588c06252", "username": "purplebutterfly124", "password": "freefree", "salt": "fiBvt9N8", "md5": "cf643b6b464005b5d23097ca416268f3", "sha1": "8be3a8f742851822f6ff51d34e2272f0a9ea9fbd", "sha256": "e256385efc884ee40d7ac259743cdea5e69461fbfec56aed2d1184ba018e4892" }, "dob": { "date": "1964-08-15T02:08:59.417Z", "age": 57 }, "registered": { "date": "2002-07-23T04:27:16.775Z", "age": 19 }, "phone": "(557)-031-3198", "cell": "(236)-185-9514", "id": { "name": "SSN", "value": "099-86-1658" }, "picture": { "large": "https://randomuser.me/api/portraits/men/35.jpg", "medium": "https://randomuser.me/api/portraits/med/men/35.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/men/35.jpg" }, "nat": "US" }, { "gender": "female", "name": { "title": "Mrs", "first": "Brittany", "last": "Holt" }, "location": { "street": { "number": 5733, "name": "First Street" }, "city": "Bunbury", "state": "Victoria", "country": "Australia", "postcode": 1318, "coordinates": { "latitude": "74.2471", "longitude": "142.7122" }, "timezone": { "offset": "+3:30", "description": "Tehran" } }, "email": "brittany.holt@example.com", "login": { "uuid": "44a2d9f9-261f-4eea-998e-0a2689943d43", "username": "angrymeercat800", "password": "fordf150", "salt": "ntdiN8DL", "md5": "28cfcd038eaafb4ec84a6675a0683f91", "sha1": "8845dd9756d7a03799aa5262c13e3b35a4c9b826", "sha256": "561f03eef63c153b9936a26e38cd6572c0f03a24a4a3f3b0caad412df7a82f78" }, "dob": { "date": "1976-06-23T11:30:01.728Z", "age": 45 }, "registered": { "date": "2005-06-12T10:07:23.721Z", "age": 16 }, "phone": "09-2902-1570", "cell": "0491-256-524", "id": { "name": "TFN", "value": "391643425" }, "picture": { "large": "https://randomuser.me/api/portraits/women/69.jpg", "medium": "https://randomuser.me/api/portraits/med/women/69.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/women/69.jpg" }, "nat": "AU" }, { "gender": "male", "name": { "title": "Mr", "first": "Xavier", "last": "Harris" }, "location": { "street": { "number": 3149, "name": "Brock Rd" }, "city": "Radisson", "state": "Saskatchewan", "country": "Canada", "postcode": "Y5X 2O2", "coordinates": { "latitude": "-32.9227", "longitude": "-158.5675" }, "timezone": { "offset": "+4:30", "description": "Kabul" } }, "email": "xavier.harris@example.com", "login": { "uuid": "2af79509-c92b-4e3f-8418-b1e348a9465f", "username": "silverduck282", "password": "happy", "salt": "83iUAQHe", "md5": "34f0b9349c3828cf4cf683fcce7cdca6", "sha1": "f3e844c9b0ae62ff6e216939c60b86affbd30e7a", "sha256": "bb1c48d5497eacb39eccb639979864f5da2e1046a21d581aab325f49344c9f27" }, "dob": { "date": "1997-08-29T16:06:48.431Z", "age": 24 }, "registered": { "date": "2003-08-20T18:50:01.045Z", "age": 18 }, "phone": "224-205-1702", "cell": "189-677-3235", "id": { "name": "", "value": null }, "picture": { "large": "https://randomuser.me/api/portraits/men/59.jpg", "medium": "https://randomuser.me/api/portraits/med/men/59.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/men/59.jpg" }, "nat": "CA" }, { "gender": "male", "name": { "title": "Mr", "first": "Felix", "last": "Nuñez" }, "location": { "street": { "number": 309, "name": "Avenida del Planetario" }, "city": "La Coruña", "state": "Galicia", "country": "Spain", "postcode": 97717, "coordinates": { "latitude": "-64.1291", "longitude": "58.9724" }, "timezone": { "offset": "+7:00", "description": "Bangkok, Hanoi, Jakarta" } }, "email": "felix.nunez@example.com", "login": { "uuid": "66739121-f6a5-43ae-afe2-b6a816c33f19", "username": "organicdog133", "password": "holidays", "salt": "G6nXf3Ud", "md5": "dcb0942db9ad3dcf4a94dfc338bc8d0b", "sha1": "c1b32868c0da235d519a3ce3e297c0c6285f159f", "sha256": "3659aee6e29d5f59af2fff008c23df628a81490398e46ba48c69d98b00dd9f08" }, "dob": { "date": "1997-03-04T17:45:54.269Z", "age": 24 }, "registered": { "date": "2010-04-21T18:18:06.078Z", "age": 11 }, "phone": "974-972-733", "cell": "640-453-019", "id": { "name": "DNI", "value": "39335091-P" }, "picture": { "large": "https://randomuser.me/api/portraits/men/60.jpg", "medium": "https://randomuser.me/api/portraits/med/men/60.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/men/60.jpg" }, "nat": "ES" }, { "gender": "female", "name": { "title": "Mrs", "first": "Adna", "last": "Vatle" }, "location": { "street": { "number": 566, "name": "Arbeidergata" }, "city": "Namdalseid", "state": "Akershus", "country": "Norway", "postcode": "7493", "coordinates": { "latitude": "-51.0207", "longitude": "-82.7795" }, "timezone": { "offset": "-1:00", "description": "Azores, Cape Verde Islands" } }, "email": "adna.vatle@example.com", "login": { "uuid": "74092c13-3eea-4bc5-b58f-8e493525ad03", "username": "silversnake404", "password": "fugazi", "salt": "HIOMVVLY", "md5": "d1e6687790ae932786c4445fc9bf2635", "sha1": "70195362609ee24fdd8d31c7c6dcf29e30e15e9e", "sha256": "c73c5880d49dde2f21300455509cc49343b8dab91caf0571eda72ebf3c3bade7" }, "dob": { "date": "1968-08-14T17:20:06.526Z", "age": 53 }, "registered": { "date": "2002-12-02T22:31:37.773Z", "age": 19 }, "phone": "33221709", "cell": "94563639", "id": { "name": "FN", "value": "14086845254" }, "picture": { "large": "https://randomuser.me/api/portraits/women/47.jpg", "medium": "https://randomuser.me/api/portraits/med/women/47.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/women/47.jpg" }, "nat": "NO" }, { "gender": "male", "name": { "title": "Mr", "first": "Célian", "last": "Deschamps" }, "location": { "street": { "number": 7281, "name": "Place de L'Abbé-Franz-Stock" }, "city": "Lyon", "state": "Bouches-du-Rhône", "country": "France", "postcode": 42091, "coordinates": { "latitude": "-16.7789", "longitude": "65.9648" }, "timezone": { "offset": "-11:00", "description": "Midway Island, Samoa" } }, "email": "celian.deschamps@example.com", "login": { "uuid": "f8e3c1eb-0792-40f7-9b6f-c4b557079502", "username": "crazyfrog645", "password": "badboy", "salt": "I3SHL2Pb", "md5": "ff2f69cc04d7cf2bc2875e6c6293e448", "sha1": "85199084c14ad9aded1de864ce727355c717d3fa", "sha256": "fbc01cd28fee9df4263d6a91e273f72d3779b43828ff6c8bca53d9ba20d630f6" }, "dob": { "date": "1969-07-11T14:51:36.268Z", "age": 52 }, "registered": { "date": "2012-03-13T21:28:13.273Z", "age": 9 }, "phone": "01-69-70-74-41", "cell": "06-80-31-43-98", "id": { "name": "INSEE", "value": "1NNaN67421860 37" }, "picture": { "large": "https://randomuser.me/api/portraits/men/93.jpg", "medium": "https://randomuser.me/api/portraits/med/men/93.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/men/93.jpg" }, "nat": "FR" }, { "gender": "male", "name": { "title": "Mr", "first": "Jules", "last": "Leclerc" }, "location": { "street": { "number": 4547, "name": "Rue du Stade" }, "city": "Perpignan", "state": "Dordogne", "country": "France", "postcode": 84636, "coordinates": { "latitude": "73.7948", "longitude": "-43.2386" }, "timezone": { "offset": "0:00", "description": "Western Europe Time, London, Lisbon, Casablanca" } }, "email": "jules.leclerc@example.com", "login": { "uuid": "f4591e29-cd0e-4960-8804-88a9cc9d5bc5", "username": "angrymouse108", "password": "getsome", "salt": "FwwV2PeX", "md5": "7a420d8334719713b1fa7e2c3b5f840b", "sha1": "f64ad212aebcca1080a57bedd2ae6cd3db2fb3ed", "sha256": "c37f75b7e891ebc7bae0e82cc37641d5ea1688816035948a0804c9bcc0d3c4dd" }, "dob": { "date": "1995-05-30T07:41:07.557Z", "age": 26 }, "registered": { "date": "2017-01-07T05:30:22.059Z", "age": 4 }, "phone": "03-97-02-02-69", "cell": "06-80-08-69-06", "id": { "name": "INSEE", "value": "1NNaN10559571 05" }, "picture": { "large": "https://randomuser.me/api/portraits/men/48.jpg", "medium": "https://randomuser.me/api/portraits/med/men/48.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/men/48.jpg" }, "nat": "FR" }, { "gender": "male", "name": { "title": "Mr", "first": "رادین", "last": "سالاری" }, "location": { "street": { "number": 7426, "name": "فلسطین" }, "city": "ورامین", "state": "مازندران", "country": "Iran", "postcode": 59925, "coordinates": { "latitude": "-10.2449", "longitude": "-165.5548" }, "timezone": { "offset": "-4:00", "description": "Atlantic Time (Canada), Caracas, La Paz" } }, "email": "rdyn.slry@example.com", "login": { "uuid": "734342b1-ec69-4a6a-9f21-d73230b37158", "username": "blueladybug214", "password": "pablo", "salt": "iL9Lds2O", "md5": "a8014a4c7cb34da15e86c4391f66bf22", "sha1": "11a1c22c65ae54d3f4840189dc2ebc4427bb7f76", "sha256": "3e1fd6a61e9f2c9377c4f0464a3ce3a384c3c1f8772431434ceac3775c61034a" }, "dob": { "date": "1961-01-25T09:38:27.564Z", "age": 60 }, "registered": { "date": "2013-08-08T11:22:16.177Z", "age": 8 }, "phone": "053-81095468", "cell": "0973-088-3419", "id": { "name": "", "value": null }, "picture": { "large": "https://randomuser.me/api/portraits/men/54.jpg", "medium": "https://randomuser.me/api/portraits/med/men/54.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/men/54.jpg" }, "nat": "IR" }, { "gender": "female", "name": { "title": "Mrs", "first": "Nuran", "last": "Fritze" }, "location": { "street": { "number": 3226, "name": "Rosenstraße" }, "city": "Esslingen", "state": "Berlin", "country": "Germany", "postcode": 38876, "coordinates": { "latitude": "67.8274", "longitude": "81.2613" }, "timezone": { "offset": "+6:00", "description": "Almaty, Dhaka, Colombo" } }, "email": "nuran.fritze@example.com", "login": { "uuid": "89da0145-979e-40af-81c7-71d06165edab", "username": "brownbird264", "password": "denali", "salt": "0ZOxYwsS", "md5": "9005a856ec8f3665f93a2d0bf4bf8f7a", "sha1": "f1c8a6edf8b99ea487d44c48445c80aba93ee078", "sha256": "7772fb9dc4092db641837847a09783f2e78c8c49f102a186ae1739cfe0c3ada1" }, "dob": { "date": "1959-07-03T11:01:30.677Z", "age": 62 }, "registered": { "date": "2012-02-01T15:01:46.395Z", "age": 9 }, "phone": "0696-9887489", "cell": "0170-4568596", "id": { "name": "", "value": null }, "picture": { "large": "https://randomuser.me/api/portraits/women/11.jpg", "medium": "https://randomuser.me/api/portraits/med/women/11.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/women/11.jpg" }, "nat": "DE" }, { "gender": "male", "name": { "title": "Mr", "first": "Brede", "last": "Ramsøy" }, "location": { "street": { "number": 9117, "name": "Sandefjordgata" }, "city": "Frekhaug", "state": "Bergen", "country": "Norway", "postcode": "2967", "coordinates": { "latitude": "-7.0886", "longitude": "-92.3208" }, "timezone": { "offset": "+2:00", "description": "Kaliningrad, South Africa" } }, "email": "brede.ramsoy@example.com", "login": { "uuid": "1db05e74-6877-4db3-9855-cda1c60a0fd7", "username": "blueduck964", "password": "zenith", "salt": "Kql93dU0", "md5": "00bf801972b59045965d4667a07f803d", "sha1": "ad0d6249a49267944ec090b13c3dcdf9f429b14c", "sha256": "4876ab1eced90d094130235a45df784c1e54619280f020acf6e61666bef6900f" }, "dob": { "date": "1965-01-04T19:17:53.509Z", "age": 56 }, "registered": { "date": "2005-05-13T08:25:18.333Z", "age": 16 }, "phone": "80333711", "cell": "97879392", "id": { "name": "FN", "value": "04016535147" }, "picture": { "large": "https://randomuser.me/api/portraits/men/52.jpg", "medium": "https://randomuser.me/api/portraits/med/men/52.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/men/52.jpg" }, "nat": "NO" }, { "gender": "male", "name": { "title": "Mr", "first": "Jeff", "last": "Mills" }, "location": { "street": { "number": 1403, "name": "Albert Road" }, "city": "Trim", "state": "Westmeath", "country": "Ireland", "postcode": 29828, "coordinates": { "latitude": "-3.5403", "longitude": "152.1497" }, "timezone": { "offset": "+5:30", "description": "Bombay, Calcutta, Madras, New Delhi" } }, "email": "jeff.mills@example.com", "login": { "uuid": "b14139fc-00ea-4f0a-a088-f8b21aa3644b", "username": "beautifulswan735", "password": "51505150", "salt": "2OjMwnth", "md5": "d44bfaef863ef6a156a1547d2f4024bf", "sha1": "a16a0e80c36349305b543d6b993968854f8c88ce", "sha256": "f412d1733b186d3cdc3a070f628063dcacd1135dc609503ced6ff83260d120b6" }, "dob": { "date": "1972-09-13T10:41:58.515Z", "age": 49 }, "registered": { "date": "2010-02-24T07:32:37.527Z", "age": 11 }, "phone": "041-105-1787", "cell": "081-526-4882", "id": { "name": "PPS", "value": "5094633T" }, "picture": { "large": "https://randomuser.me/api/portraits/men/75.jpg", "medium": "https://randomuser.me/api/portraits/med/men/75.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg" }, "nat": "IE" }, { "gender": "male", "name": { "title": "Mr", "first": "Javier", "last": "Robertson" }, "location": { "street": { "number": 5342, "name": "Victoria Street" }, "city": "Portsmouth", "state": "Avon", "country": "United Kingdom", "postcode": "YH2 1LB", "coordinates": { "latitude": "14.7108", "longitude": "121.0265" }, "timezone": { "offset": "+3:30", "description": "Tehran" } }, "email": "javier.robertson@example.com", "login": { "uuid": "a829f904-daa2-4724-a895-d20f86aec51d", "username": "heavyfish156", "password": "grumpy", "salt": "Ds16ytn6", "md5": "540463a7702b89553e385fa226670420", "sha1": "06c9b648d8bfff66525bba1ec1f5cdbf945f233e", "sha256": "79736736602e861dbaca2835869d7906fd74be3487391fe1447b72f434967779" }, "dob": { "date": "1953-05-26T04:24:12.668Z", "age": 68 }, "registered": { "date": "2018-05-12T10:36:58.551Z", "age": 3 }, "phone": "015242 58414", "cell": "0747-967-706", "id": { "name": "NINO", "value": "LJ 13 94 82 U" }, "picture": { "large": "https://randomuser.me/api/portraits/men/62.jpg", "medium": "https://randomuser.me/api/portraits/med/men/62.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/men/62.jpg" }, "nat": "GB" }]

export default function Tournament() {
    const router = useRouter()
    const { id } = router.query
    const { name, champion, date } = list[id] || {}
    const {
        isOpen: isOpenAddNewDate,
        onOpen: onOpenAddNewDate,
        onClose: onCloseAddNewDate
    } = useDisclosure()
    return (
        <>
            <Head>
                <title>{`${name} | Tourny`}</title>
            </Head>
            <Container maxW="75vw">
                <Banner champion={champion} tournamentName={name} date={date} />
                <Tabs mt="1rem" isFitted colorScheme="twitter">
                    <TabList>
                        <Tab>Schedule</Tab>
                        <Tab>Standings</Tab>
                        <Tab>Players</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            {matchDates.map((matchDate, i) => {
                                return <Schedule key={i} matchDate={matchDate} />
                            })}
                            <Container display="flex" justifyContent="space-between" maxW="100%" padding="0">
                                <Button colorScheme="red">Delete Tournament</Button>
                                <Button onClick={onOpenAddNewDate} colorScheme="green">Add New Date</Button>
                            </Container>
                            <AddNewDate isOpen={isOpenAddNewDate} onClose={onCloseAddNewDate} />
                        </TabPanel>
                        <TabPanel>
                            <Standings standings={standings} />
                        </TabPanel>
                        <TabPanel>
                            <Flex justifyContent="center">
                                <Box w="100%">
                                    {users?.map((user, i) => {
                                        return <Player key={i} player={user} status role />
                                    })}
                                </Box>
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </>
    )
}
const getChampionImageUrl = (championName, skinID) => {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${skinID ? skinID : "0"}.jpg`;
}

export default getChampionImageUrl;
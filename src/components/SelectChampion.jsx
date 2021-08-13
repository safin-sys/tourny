import { Grid, Select, Tooltip } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react"

export default function SelectChampion({ selectedChamp, setSelectedChamp, selectedSkin, setSelectedSkin, offset, setOffset }) {
    const [champData, setChampData] = useState()
    const [champSkinData, setChampSkinData] = useState()

    const champURL = "http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion.json"
    const skinURL = `http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion/${selectedChamp}.json`

    if (!champData) fetch(champURL).then(res => res.json()).then(data => setChampData(data.data))

    useEffect(() => {
        if (selectedChamp) fetch(skinURL).then(res => res.json()).then(data => {
            setChampSkinData(data.data[selectedChamp].skins)
        })
    }, [selectedChamp])

    const champions = []

    if (champData) {
        for (const [key] of Object.entries(champData)) {
            champions.push(key);
        }
    }
    return (
        <Grid templateColumns="1fr 1fr 1fr" columnGap="1rem">
            <Select placeholder="Select Champion" value={selectedChamp} onChange={e => setSelectedChamp(e.target.value)}>
                {champions.map((champ, i) => {
                    return <option key={i} value={champ}>{champ}</option>
                })}
            </Select>
            <Select placeholder="Select Skin" value={selectedSkin} onChange={e => setSelectedSkin(e.target.value)}>
                {champSkinData?.map((champ, i) => {
                    return <option key={i} value={champ.num}>{champ.name}</option>
                })}
            </Select>
            <Tooltip hasArrow label="Offset changes position of the cover picture. Higher the number lower the picture.">
                <NumberInput allowMouseWheel defaultValue={offset} min={0} max={100} onChange={e => setOffset(e)}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Tooltip>
        </Grid>
    )
}

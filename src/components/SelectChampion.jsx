import { Grid, Input, Select, Tooltip } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect, useState } from "react"

export default function SelectChampion ({ setCover }) {
    const [champions, setChampions] = useState()
    const [skins, setSkins] = useState()
    const formik = useFormik({
        initialValues: {
            champion: '',
            skin: 0,
            offset: 0,
        },
        enableReinitialize: true
    })
    useEffect(() => {
        setCover(formik.values)
    }, [formik.values])
    const { champion, skin, offset } = formik.values

    const skinURL = `http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion/${champion}.json`


    if (!champions) fetch("/championList.json")
        .then(res => res.json())
        .then(data => setChampions(data))

    useEffect(() => {
        if (champion) fetch(skinURL)
            .then(res => res.json())
            .then(data => setSkins(data.data[champion].skins))
    }, [champion])

    return (
        <Grid templateColumns="1fr 1fr 1fr" columnGap="1rem">
            <Select placeholder="Select Champion" name="champion" value={champion} onChange={formik.handleChange}>
                {champions?.map((champ, i) => {
                    return <option key={i} value={champ}>{champ}</option>
                })}
            </Select>
            <Select placeholder="Select Skin" name="skin" value={skin} onChange={formik.handleChange}>
                {skins?.map((champ, i) => {
                    return <option key={i} value={champ.num}>{champ.name === "default" ? "Default" : champ.name}</option>
                })}
            </Select>
            <Tooltip hasArrow label="Offset changes position of the cover picture. Higher the number lower the picture.">
                <Input as="input" type="number" max="100" min="0" name="offset" value={offset} onChange={formik.handleChange} />
            </Tooltip>
        </Grid>
    )
}
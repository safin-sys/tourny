import { db } from "@utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const handler = async (req, res) => {
    const ign = req.query.ign;
    const q = query(collection(db, "users"), where("ign", "==", ign));
    const querySnapshot = await getDocs(q);
    let available = true;
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data) {
            available = false;
        }
    });
    res.status(200).json({ ign: req.query.ign, available });
};

export default handler;

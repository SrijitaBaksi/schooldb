import pool from '../db.js'

function calculateDistance(lat1, lon1, lat2, lon2){
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export async function addSchool(req, res){
    const {name, address, latitude, longitude} = req.body;

    if(!name || !address || !latitude || !longitude){
        return res.status(400).json({message: "All fields are required"});
    }

    try{
        const result = await pool.query(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, address, latitude, longitude]
            );
        res.status(201).json({ message: "School added successfully", data: result.rows[0] });
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}


export async function listSchools(req, res) {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    try {
        const result = await pool.query("SELECT * FROM schools");
        const schools = result.rows;

        const sorted = schools
            .map((school) => {
                const distance = calculateDistance(
                    parseFloat(latitude),
                    parseFloat(longitude),
                    school.latitude,
                    school.longitude
                );
                return { ...school, distance };
            })
            .sort((a, b) => a.distance - b.distance);

        res.status(200).json(sorted);
    } catch (err) {
        console.error(err);
        res.status(501).json({ message: "Failed to list the schools" });
    }
}
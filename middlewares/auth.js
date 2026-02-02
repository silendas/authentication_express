const checkMembership = (typeRequired) => {
    return (req, res, next) => {
        const userTier = req.user.membershipTier; 
        const tiers = { 'A': 1, 'B': 2, 'C': 3 };
        
        if (tiers[userTier] >= tiers[typeRequired]) {
            next();
        } else {
            res.status(403).json({ message: "Upgrade membership untuk akses konten ini!" });
        }
    };
};

module.exports = { checkMembership };
const checkRole = (...allowedRoles) => {
  try {
    return (req, res, next) => {
      const userRole = req.user?.role;
      if (!userRole) {
        return res.status(401).json({ error: 'No user role! '});
      }
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: 'You are not authorised!' });
      }
      next();
    };
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default checkRole;

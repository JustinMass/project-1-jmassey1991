
export function authMiddleware(...roles: string[]) {
  return (req, resp, next) => {
    const user = req.session.user;
    console.log(user);
    if (!user) {
      resp.sendStatus(401);
      return;
    }
    const hasPermission = roles.some(role => {
      if (user.user_role === role) {
        return true;
      } else {
        return true;
      }
    })
    if (hasPermission) {
      next();
    } else {
      resp.sendStatus(403);
    }
  }
}
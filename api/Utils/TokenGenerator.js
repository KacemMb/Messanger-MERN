import jwt from 'jsonwebtoken';

const generateTokenAndSerCookies = (user_id,res) => {
    const token = jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn: '2d' });
    res.cookie('tokenmessanger', token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sameSite : 'strict',
    });
    return token;
};

export default generateTokenAndSerCookies;